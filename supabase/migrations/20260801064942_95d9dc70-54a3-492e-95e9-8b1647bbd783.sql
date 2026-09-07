CREATE OR REPLACE FUNCTION public.claim_admin_role(_admin_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _email text;
BEGIN
  IF _uid IS NULL THEN RETURN false; END IF;
  SELECT lower(u.email) INTO _email FROM auth.users u WHERE u.id = _uid;
  IF _email IS NULL OR _email <> lower(trim(_admin_email)) THEN RETURN false; END IF;
  INSERT INTO public.user_roles(user_id, role) VALUES (_uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END; $$;

REVOKE ALL ON FUNCTION public.claim_admin_role(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin_role(text) TO authenticated;

ALTER TABLE public.donations
  ADD CONSTRAINT donations_utr_required
  CHECK (utr_ref IS NOT NULL AND length(trim(utr_ref)) >= 4) NOT VALID;