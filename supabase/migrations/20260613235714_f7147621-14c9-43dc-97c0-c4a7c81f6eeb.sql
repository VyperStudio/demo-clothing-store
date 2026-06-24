DROP TRIGGER IF EXISTS assign_first_admin_role_on_signup ON auth.users;
DROP FUNCTION IF EXISTS public.assign_first_admin_role();