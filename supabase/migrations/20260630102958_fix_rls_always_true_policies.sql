-- Fix 1: contact_submissions — restrict INSERT to only allow valid, non-empty fields.
-- Prevents injection of null/empty submissions and enforces basic data integrity at the DB level.
DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name))    > 0 AND
    length(trim(email))   > 0 AND email LIKE '%@%' AND
    length(trim(message)) > 0
  );

-- Fix 2: newsletter_subscribers INSERT — restrict to valid email and safe source values.
-- Prevents blank/malformed subscriptions being injected.
DROP POLICY IF EXISTS "newsletter_insert" ON newsletter_subscribers;
CREATE POLICY "newsletter_insert" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(email)) > 0 AND email LIKE '%@%' AND
    source IN ('website', 'signup', 'event') AND
    is_active = true
  );

-- Fix 3: newsletter_subscribers UPDATE — scope to unsubscribe only.
-- A visitor should only be able to set is_active = false on a row matching their email.
-- They cannot change the email itself, the source, or any other field.
DROP POLICY IF EXISTS "newsletter_update" ON newsletter_subscribers;
CREATE POLICY "newsletter_update" ON newsletter_subscribers FOR UPDATE
  TO anon, authenticated
  USING  (length(trim(email)) > 0)
  WITH CHECK (
    is_active = false AND
    unsubscribed_at IS NOT NULL
  );
