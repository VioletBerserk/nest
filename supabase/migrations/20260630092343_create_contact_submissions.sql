/*
# Create contact_submissions table

A public contact form table — no auth required. Anyone visiting the NEST website
can submit a message via the contact form. All submissions are visible to admins
through the Supabase dashboard.

1. New Tables
   - `contact_submissions`
     - `id` (uuid, primary key, auto-generated)
     - `name` (text, not null) — sender's full name
     - `email` (text, not null) — sender's email address
     - `subject` (text, nullable) — chosen topic from the dropdown
     - `message` (text, not null) — the message body
     - `created_at` (timestamptz, default now())

2. Security
   - RLS is enabled.
   - Anon + authenticated INSERT so the contact form works without sign-in.
   - No SELECT/UPDATE/DELETE policy for anon — submissions are write-only from the public.

3. Notes
   - This is a no-auth app — no `user_id` column needed.
   - `TO anon, authenticated` on INSERT so the anon-key frontend client can write.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL,
  subject    text,
  message    text        NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
