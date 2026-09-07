DROP FUNCTION IF EXISTS public.create_pooja_booking(uuid,text,text,text,text);
CREATE OR REPLACE FUNCTION public.create_pooja_booking(_slot_id uuid, _name text, _gothram text, _phone text, _address text)
 RETURNS TABLE(booking_id uuid, slot_date date, start_time time without time zone, end_time time without time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  SELECT s.capacity, s.is_blocked, s.slot_date, s.start_time, s.end_time
    INTO _cap, _blocked, _s_date, _s_start, _s_end
    FROM public.pooja_slots s WHERE s.id = _slot_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'slot_not_found'; END IF;
  IF _blocked THEN RAISE EXCEPTION 'slot_blocked'; END IF;
  IF _s_date < CURRENT_DATE THEN RAISE EXCEPTION 'slot_past'; END IF;
  SELECT count(*) INTO _current FROM public.pooja_bookings b
    WHERE b.slot_id = _slot_id AND b.status = 'confirmed';
  IF _current >= _cap THEN RAISE EXCEPTION 'slot_full'; END IF;
  INSERT INTO public.pooja_bookings(slot_id, name, gothram, phone, address)
    VALUES (_slot_id, _name, _gothram, _phone, _address) RETURNING id INTO _new_id;
  booking_id := _new_id;
  slot_date := _s_date;
  start_time := _s_start;
  end_time := _s_end;
  RETURN NEXT;
END; $function$;