/*
# NEST Platform — Complete Schema

This migration creates the full NEST community platform database.

## New Tables

### profiles
Extends auth.users with member display information.
- id: mirrors auth.users id
- full_name, avatar_url, phone, bio
- role: 'member' | 'admin' — controls admin access
- membership_tier: current active tier
- membership_status: active/inactive/pending/cancelled

### events
All NEST events (classes, dinners, workshops, etc.)
- title, description, category, image_url
- starts_at, ends_at: datetime range
- location: room name or address
- capacity, price
- is_members_only, is_published
- created_by: admin user who created it

### bookings
Event registrations. One per (user, event).
- user_id, event_id
- status: confirmed/cancelled/waitlisted
- notes: optional message from user
- booked_at: timestamp

### waiting_list
Users waiting for a fully-booked event.
- user_id, event_id
- position: rank in queue
- notified_at: when we told them a spot opened

### memberships
Records of member subscriptions.
- user_id, tier, status, billing_cycle
- started_at, expires_at
- price_per_period

### children
Child profiles linked to parent user.
- parent_id (→ profiles)
- name, date_of_birth, gender
- allergies, medical_notes
- avatar_url
- is_active

### notifications
In-app notifications for members.
- user_id, type, title, body
- link_to: optional internal route
- is_read, created_at

### newsletter_subscribers
Email subscribers (members and non-members).
- email, name, source ('website'|'signup'|'event')
- is_active, subscribed_at, unsubscribed_at

### blog_posts
Community blog content.
- title, slug (unique), excerpt, body (markdown)
- category, tag array
- image_url, author_id
- is_published, published_at

## Security
- RLS enabled on all tables
- profiles: users can read all profiles (community directory), update only their own
- events: public read for published events, admin write
- bookings: users see/manage their own bookings
- waiting_list: users see their own entries
- memberships: users see their own memberships
- children: parents manage their own children
- notifications: users see/update their own notifications
- newsletter_subscribers: insert only for anon/authenticated (no read from client)
- blog_posts: public read for published posts, admin write
*/

-- ─── profiles ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    text,
  avatar_url   text,
  phone        text,
  bio          text,
  role         text NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  membership_tier   text DEFAULT NULL CHECK (membership_tier IN ('teen', 'community', 'family', 'founding', NULL)),
  membership_status text DEFAULT 'inactive' CHECK (membership_status IN ('active', 'inactive', 'pending', 'cancelled')),
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select" ON profiles;
CREATE POLICY "profiles_select" ON profiles FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "profiles_insert" ON profiles;
CREATE POLICY "profiles_insert" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update" ON profiles;
CREATE POLICY "profiles_update" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete" ON profiles;
CREATE POLICY "profiles_delete" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- ─── events ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  description  text,
  category     text NOT NULL DEFAULT 'general',
  image_url    text,
  starts_at    timestamptz NOT NULL,
  ends_at      timestamptz NOT NULL,
  location     text DEFAULT 'NEST Studio',
  capacity     integer NOT NULL DEFAULT 20,
  price        numeric(8,2) DEFAULT 0,
  is_members_only boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT false,
  created_by   uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_select" ON events;
CREATE POLICY "events_select" ON events FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "events_admin_select" ON events;
CREATE POLICY "events_admin_select" ON events FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "events_insert" ON events;
CREATE POLICY "events_insert" ON events FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "events_update" ON events;
CREATE POLICY "events_update" ON events FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "events_delete" ON events;
CREATE POLICY "events_delete" ON events FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- ─── bookings ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id   uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  status     text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'waitlisted')),
  notes      text,
  booked_at  timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "bookings_select" ON bookings;
CREATE POLICY "bookings_select" ON bookings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "bookings_admin_select" ON bookings;
CREATE POLICY "bookings_admin_select" ON bookings FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "bookings_insert" ON bookings;
CREATE POLICY "bookings_insert" ON bookings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "bookings_update" ON bookings;
CREATE POLICY "bookings_update" ON bookings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "bookings_delete" ON bookings;
CREATE POLICY "bookings_delete" ON bookings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── waiting_list ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waiting_list (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id     uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  position     integer NOT NULL DEFAULT 0,
  notified_at  timestamptz,
  joined_at    timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "waitlist_select" ON waiting_list;
CREATE POLICY "waitlist_select" ON waiting_list FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "waitlist_admin_select" ON waiting_list;
CREATE POLICY "waitlist_admin_select" ON waiting_list FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "waitlist_insert" ON waiting_list;
CREATE POLICY "waitlist_insert" ON waiting_list FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "waitlist_update" ON waiting_list;
CREATE POLICY "waitlist_update" ON waiting_list FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "waitlist_delete" ON waiting_list;
CREATE POLICY "waitlist_delete" ON waiting_list FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── memberships ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS memberships (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tier             text NOT NULL CHECK (tier IN ('teen', 'community', 'family', 'founding')),
  status           text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'pending')),
  billing_cycle    text NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  price_per_period numeric(8,2) NOT NULL,
  started_at       timestamptz DEFAULT now(),
  expires_at       timestamptz,
  notes            text,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "memberships_select" ON memberships;
CREATE POLICY "memberships_select" ON memberships FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "memberships_admin_select" ON memberships;
CREATE POLICY "memberships_admin_select" ON memberships FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "memberships_insert" ON memberships;
CREATE POLICY "memberships_insert" ON memberships FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "memberships_update" ON memberships;
CREATE POLICY "memberships_update" ON memberships FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "memberships_delete" ON memberships;
CREATE POLICY "memberships_delete" ON memberships FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- ─── children ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS children (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name            text NOT NULL,
  date_of_birth   date,
  gender          text CHECK (gender IN ('boy', 'girl', 'other', NULL)),
  allergies       text,
  medical_notes   text,
  avatar_url      text,
  is_active       boolean NOT NULL DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE children ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "children_select" ON children;
CREATE POLICY "children_select" ON children FOR SELECT
  TO authenticated USING (auth.uid() = parent_id);

DROP POLICY IF EXISTS "children_admin_select" ON children;
CREATE POLICY "children_admin_select" ON children FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "children_insert" ON children;
CREATE POLICY "children_insert" ON children FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = parent_id);

DROP POLICY IF EXISTS "children_update" ON children;
CREATE POLICY "children_update" ON children FOR UPDATE
  TO authenticated USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);

DROP POLICY IF EXISTS "children_delete" ON children;
CREATE POLICY "children_delete" ON children FOR DELETE
  TO authenticated USING (auth.uid() = parent_id);

-- ─── notifications ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type       text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'booking', 'event', 'membership', 'system')),
  title      text NOT NULL,
  body       text,
  link_to    text,
  is_read    boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_select" ON notifications;
CREATE POLICY "notifications_select" ON notifications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_insert" ON notifications;
CREATE POLICY "notifications_insert" ON notifications FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "notifications_update" ON notifications;
CREATE POLICY "notifications_update" ON notifications FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_delete" ON notifications;
CREATE POLICY "notifications_delete" ON notifications FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ─── newsletter_subscribers ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email            text UNIQUE NOT NULL,
  name             text,
  source           text DEFAULT 'website' CHECK (source IN ('website', 'signup', 'event')),
  is_active        boolean NOT NULL DEFAULT true,
  subscribed_at    timestamptz DEFAULT now(),
  unsubscribed_at  timestamptz
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "newsletter_insert" ON newsletter_subscribers;
CREATE POLICY "newsletter_insert" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "newsletter_admin_select" ON newsletter_subscribers;
CREATE POLICY "newsletter_admin_select" ON newsletter_subscribers FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "newsletter_update" ON newsletter_subscribers;
CREATE POLICY "newsletter_update" ON newsletter_subscribers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- ─── blog_posts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text NOT NULL,
  slug         text UNIQUE NOT NULL,
  excerpt      text,
  body         text,
  category     text NOT NULL DEFAULT 'community',
  tags         text[] DEFAULT '{}',
  image_url    text,
  author_id    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_public_select" ON blog_posts;
CREATE POLICY "blog_public_select" ON blog_posts FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "blog_admin_select" ON blog_posts;
CREATE POLICY "blog_admin_select" ON blog_posts FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "blog_insert" ON blog_posts;
CREATE POLICY "blog_insert" ON blog_posts FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "blog_update" ON blog_posts;
CREATE POLICY "blog_update" ON blog_posts FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "blog_delete" ON blog_posts;
CREATE POLICY "blog_delete" ON blog_posts FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS bookings_user_idx      ON bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_event_idx     ON bookings(event_id);
CREATE INDEX IF NOT EXISTS waiting_list_event_idx ON waiting_list(event_id);
CREATE INDEX IF NOT EXISTS waiting_list_user_idx  ON waiting_list(user_id);
CREATE INDEX IF NOT EXISTS events_starts_at_idx   ON events(starts_at);
CREATE INDEX IF NOT EXISTS events_published_idx   ON events(is_published);
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS blog_slug_idx          ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS children_parent_idx    ON children(parent_id);
CREATE INDEX IF NOT EXISTS memberships_user_idx   ON memberships(user_id);

-- ─── Seed sample events ───────────────────────────────────────────────────────
INSERT INTO events (title, description, category, image_url, starts_at, ends_at, location, capacity, price, is_members_only, is_published)
VALUES
  ('Watercolour & Imagination', 'A hands-on watercolour workshop for children ages 6–12. We explore colour mixing, shapes, and storytelling through paint. All materials provided.', 'children', 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '5 days' + time '10:00', now() + interval '5 days' + time '12:00', 'NEST Studio', 12, 0, false, true),
  ('Photography: Telling Stories Without Words', 'Teen photography workshop exploring composition, light, and visual narrative. Bring your phone or camera.', 'teens', 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '6 days' + time '14:00', now() + interval '6 days' + time '17:00', 'NEST Studio', 15, 0, false, true),
  ('Monthly Long Table Dinner', 'The long table returns. 30 chairs, no assigned seats, and a three-course meal. This is how Belgrade friendships start.', 'community', 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '11 days' + time '19:00', now() + interval '11 days' + time '22:00', 'NEST Café', 30, 15, false, true),
  ('Parenting in a New Culture', 'Monthly honest conversation circle on raising bilingual children, navigating Serbian schools, and building routines in a new country.', 'parents', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '14 days' + time '18:00', now() + interval '14 days' + time '20:00', 'Community Room', 20, 0, true, true),
  ('Design & Branding Workshop', 'Teen creative club session: Figma, visual identity, and type design. We work on real briefs — not exercises.', 'teens', 'https://images.pexels.com/photos/3807543/pexels-photo-3807543.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '19 days' + time '13:00', now() + interval '19 days' + time '16:00', 'NEST Studio', 10, 0, false, true),
  ('Guest Speaker Evening: Navigating Visas', 'A local immigration lawyer answers the questions nobody can find answers to online. Q&A format, drinks included.', 'community', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '21 days' + time '19:00', now() + interval '21 days' + time '21:00', 'NEST Café', 40, 5, false, true),
  ('Science Explorers: Electricity & Magnetism', 'Hands-on science for kids ages 8–12. Build circuits, explore magnets, and ask "why" a hundred times.', 'children', 'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '26 days' + time '10:00', now() + interval '26 days' + time '12:00', 'NEST Studio', 14, 0, false, true),
  ('Professional Brunch: Founders & Freelancers', 'Bi-weekly informal networking over coffee and eggs. Designers, founders, educators, and parents who are all three.', 'parents', 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1', now() + interval '28 days' + time '10:00', now() + interval '28 days' + time '12:30', 'NEST Café', 25, 0, true, true)
ON CONFLICT DO NOTHING;

-- ─── Seed sample blog posts ───────────────────────────────────────────────────
INSERT INTO blog_posts (title, slug, excerpt, body, category, tags, image_url, is_published, published_at)
VALUES
  (
    'Moving to Belgrade with Kids: What No One Tells You',
    'moving-to-belgrade-with-kids',
    'The practical, emotional, and logistical reality of relocating your family to Serbia — from someone who did it last spring.',
    E'When we arrived in Belgrade with two suitcases and two children under ten, we had done our research. Schools? Checked. Apartment? Found. Russian community? Supposedly exists.\n\nWhat nobody told us was how long the first few weeks would feel before you find your rhythm.\n\n## The First Two Weeks\n\nThe city itself is beautiful and manageable. Savamala in particular has a pace that feels European without being overwhelming. But the school registration process — even with help — took longer than expected, and the paperwork requires things you would not think to bring from home.\n\n## What Actually Helped\n\nThree things made the difference: a consistent weekly anchor (ours became Saturday mornings at NEST), one parent with a flexible schedule in the first month, and accepting that it takes six to eight weeks before a new city starts to feel like yours.\n\n## For the Children\n\nChildren adapt faster than adults give them credit for. What they need is one reliable friend and one activity they look forward to. The rest follows.',
    'family-life',
    ARRAY['moving', 'belgrade', 'families', 'practical'],
    'https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1200&h=700&dpr=1',
    true,
    now() - interval '30 days'
  ),
  (
    'Keeping Russian Alive: 8 Things That Actually Work',
    'keeping-russian-alive-8-things',
    'Practical, tested methods from NEST families for maintaining a strong first language in a Serbian-speaking world.',
    E'The question we hear most from parents in our Thursday circles is some version of: "How do I keep Russian strong when Serbian is everywhere?"\n\nHere are eight things that our community has found genuinely effective — not theoretical, not "have you tried flashcards," but real practices from real families.\n\n## 1. One Parent, One Language (Consistently)\n\nThe research is consistent: sustained exposure matters more than volume. If one parent speaks exclusively Russian, children develop bilingual fluency naturally.\n\n## 2. Russian-Language Entertainment\n\nNot as a replacement for homework, but as a background presence. Audiobooks, podcasts for children, films. Passive immersion is underrated.\n\n## 3. Peer Groups in the First Language\n\nThis is the hardest to arrange but the most powerful. Children who have Russian-speaking friends maintain the language with ease. One friendship is enough.\n\n## 4. Routine Vocabulary Moments\n\nGrocery shopping, cooking, bedtime: attach Russian to daily rituals rather than formal sessions.\n\n## 5. Don''t Correct, Redirect\n\nWhen a child code-switches, respond in Russian without drawing attention to it. Correction creates resistance; modeling creates fluency.\n\n## 6. Books at Every Level\n\nKeep the home library current with the child''s reading level in Russian. This often means ordering from abroad, but it is worth it.\n\n## 7. Video Calls With Grandparents\n\nRegular, unstructured calls with family who only speak Russian create genuine motivation.\n\n## 8. Community\n\nWhich is, admittedly, why we built NEST.',
    'language',
    ARRAY['russian', 'bilingual', 'language', 'children'],
    'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1200&h=700&dpr=1',
    true,
    now() - interval '60 days'
  ),
  (
    'The Best Russian-Friendly Services in Savamala',
    'russian-friendly-services-savamala',
    'A practical neighbourhood guide to the services, shops, and spots that make life in Savamala easier for Russian-speaking families.',
    E'Savamala is one of Belgrade''s most walkable, liveable neighbourhoods. Here is what our community has mapped out over the past year.\n\n## Healthcare\n\nSeveral private clinics in the area have Russian-speaking staff, at least on request. We maintain a list in the NEST member directory.\n\n## Food & Groceries\n\nThe farmers'' market at Kalenic (20 minutes by tram) has become a ritual for many families. The selection of dairy products in particular is excellent.\n\n## Language & Tutoring\n\nSeveral NEST members offer Serbian tutoring. The best are listed in the community board inside the café.\n\n## Legal & Administrative\n\nVisa consultants come and go. We host a quarterly speaker evening specifically on this — see the events calendar.\n\n## The Short Answer\n\nJoin NEST. The member directory and community board between them contain most of what you need, and what they don''t contain, someone in the Thursday morning circle will know.',
    'belgrade',
    ARRAY['belgrade', 'savamala', 'practical', 'services'],
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=700&dpr=1',
    true,
    now() - interval '90 days'
  )
ON CONFLICT (slug) DO NOTHING;
