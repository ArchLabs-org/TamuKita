-- =============================================================================
-- TamuKita — Disable Email Confirmation (Development / Quick Setup)
-- =============================================================================
-- Run this in Supabase SQL Editor to allow login WITHOUT email confirmation.
-- 
-- ⚠️  For production, re-enable email confirmation in:
--     Supabase Dashboard → Authentication → Email → Confirm email: ON
-- =============================================================================

-- Option 1: Auto-confirm all existing unconfirmed users
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email_confirmed_at IS NULL;

-- Option 2: The trigger below auto-confirms new signups immediately
-- This replaces the need to click confirmation email during development

CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = now()
  WHERE id = NEW.id
    AND email_confirmed_at IS NULL;
  RETURN NEW;
END;
$$;

-- Drop if exists, then recreate
DROP TRIGGER IF EXISTS auto_confirm_on_signup ON auth.users;

CREATE TRIGGER auto_confirm_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_confirm_user();
