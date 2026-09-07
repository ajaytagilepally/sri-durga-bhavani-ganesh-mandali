-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Enums
CREATE TYPE public.donation_category AS ENUM ('idol', 'annadanam', 'laddu_token');
CREATE TYPE public.donation_status AS ENUM ('pending','submitted','verified','failed','cancelled');
CREATE TYPE public.booking_status AS ENUM ('confirmed','cancelled','completed');

-- Donations (devotees create with status=submitted; admin verifies)
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category donation_category NOT NULL,
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  utr_ref TEXT,
  status donation_status NOT NULL DEFAULT 'submitted',
  provider TEXT NOT NULL DEFAULT 'upi_manual',
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ
);
GRANT INSERT ON public.donations TO anon, authenticated;
GRANT SELECT, UPDATE ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can submit donation" ON public.donations FOR INSERT TO anon, authenticated WITH CHECK (status IN ('submitted','pending'));
CREATE POLICY "admins view donations" ON public.donations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update donations" ON public.donations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Pooja slots (admin-managed; public reads)
CREATE TABLE public.pooja_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  capacity INT NOT NULL DEFAULT 1 CHECK (capacity > 0),
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(slot_date, start_time)
);
GRANT SELECT ON public.pooja_slots TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pooja_slots TO authenticated;
GRANT ALL ON public.pooja_slots TO service_role;
ALTER TABLE public.pooja_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone read slots" ON public.pooja_slots FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage slots" ON public.pooja_slots FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Bookings (writes only via SECURITY DEFINER function to enforce capacity)
CREATE TABLE public.pooja_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id UUID NOT NULL REFERENCES public.pooja_slots(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  gothram TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  status booking_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.pooja_bookings TO authenticated;
GRANT ALL ON public.pooja_bookings TO service_role;
ALTER TABLE public.pooja_bookings ENABLE ROW LEVEL SECURITY;
-- No public INSERT policy; inserts go through create_pooja_booking()
CREATE POLICY "admins view bookings" ON public.pooja_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update bookings" ON public.pooja_bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX pooja_bookings_slot_idx ON public.pooja_bookings(slot_id) WHERE status = 'confirmed';

CREATE OR REPLACE FUNCTION public.create_pooja_booking(
  _slot_id UUID, _name TEXT, _gothram TEXT, _phone TEXT, _address TEXT
) RETURNS TABLE(booking_id UUID, slot_date DATE, start_time TIME, end_time TIME)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  _cap INT; _current INT; _blocked BOOLEAN;
  _s_date DATE; _s_start TIME; _s_end TIME;
  _new_id UUID;
BEGIN
  IF length(trim(coalesce(_name,'')))=0 OR length(trim(coalesce(_gothram,'')))=0
     OR length(regexp_replace(coalesce(_phone,''), '\D', '', 'g'))<10
     OR length(trim(coalesce(_address,'')))=0 THEN
    RAISE EXCEPTION 'invalid_input';
  END IF;
  SELECT capacity, is_blocked, slot_date, start_time, end_time
    INTO _cap, _blocked, _s_date, _s_start, _s_end
    FROM public.pooja_slots WHERE id = _slot_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'slot_not_found'; END IF;
  IF _blocked THEN RAISE EXCEPTION 'slot_blocked'; END IF;
  IF _s_date < CURRENT_DATE THEN RAISE EXCEPTION 'slot_past'; END IF;
  SELECT count(*) INTO _current FROM public.pooja_bookings
    WHERE slot_id = _slot_id AND status = 'confirmed';
  IF _current >= _cap THEN RAISE EXCEPTION 'slot_full'; END IF;
  INSERT INTO public.pooja_bookings(slot_id, name, gothram, phone, address)
    VALUES (_slot_id, _name, _gothram, _phone, _address) RETURNING id INTO _new_id;
  RETURN QUERY SELECT _new_id, _s_date, _s_start, _s_end;
END; $$;
GRANT EXECUTE ON FUNCTION public.create_pooja_booking(UUID,TEXT,TEXT,TEXT,TEXT) TO anon, authenticated;

-- Historical donors
CREATE TABLE public.past_donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year INT NOT NULL,
  amount NUMERIC(10,2),
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.past_donors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.past_donors TO authenticated;
GRANT ALL ON public.past_donors TO service_role;
ALTER TABLE public.past_donors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public sees public donors" ON public.past_donors FOR SELECT TO anon USING (is_public = true);
CREATE POLICY "auth sees donors" ON public.past_donors FOR SELECT TO authenticated USING (is_public = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage donors" ON public.past_donors FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Laddu auction history
CREATE TABLE public.laddu_auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year INT NOT NULL,
  winning_amount NUMERIC(10,2) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.laddu_auctions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.laddu_auctions TO authenticated;
GRANT ALL ON public.laddu_auctions TO service_role;
ALTER TABLE public.laddu_auctions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public sees public auctions" ON public.laddu_auctions FOR SELECT TO anon USING (is_public = true);
CREATE POLICY "auth sees auctions" ON public.laddu_auctions FOR SELECT TO authenticated USING (is_public = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage auctions" ON public.laddu_auctions FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Notification logs (admin-only visibility)
CREATE TABLE public.notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel TEXT NOT NULL,
  recipient_masked TEXT NOT NULL,
  template_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notification_logs TO authenticated;
GRANT ALL ON public.notification_logs TO service_role;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins view notifications" ON public.notification_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Seed sample historical records (edit / hide via admin dashboard later)
INSERT INTO public.past_donors (name, year, is_public) VALUES
  ('Sri Ramesh Rao', 2022, true),
  ('Sri Venkatesh Kumar', 2023, true),
  ('Sri Prakash Reddy', 2024, true),
  ('Sri Anil Kumar', 2025, true);

INSERT INTO public.laddu_auctions (name, year, winning_amount, is_public) VALUES
  ('Sri Suresh Babu', 2022, 11000, true),
  ('Sri Ganesh Reddy', 2023, 21000, true),
  ('Sri Mahesh Kumar', 2024, 31000, true),
  ('Sri Kiran Kumar', 2025, 51000, true);

-- Seed pooja slots for the 11-day Utsav (Sep 14 – Sep 24, 2026), 6 slots per day, 30 min each
INSERT INTO public.pooja_slots (slot_date, start_time, end_time, capacity)
SELECT d::date, (t || ':00')::time,
       ((t::time + interval '30 minutes')::time), 1
FROM generate_series('2026-08-27'::date, '2026-09-06'::date, '1 day') d
CROSS JOIN unnest(ARRAY['18:00','18:30','19:00','19:30','20:00','20:30']) t;
