import { DSSection, DSTitle, DSGrid } from './DSPrimitives';
import { Card, FeatureCard, EventCard, StatCard, MembershipCard } from '../../components/ds/Card';
import { Heart, Users, BookOpen, Palette } from 'lucide-react';

export function CardsSection() {
  return (
    <DSSection id="ds-cards">
      <DSTitle
        number="09 — Cards"
        title="Card System"
        subtitle="Cards are the primary content containers. Five variants cover every data pattern in the NEST product."
      />

      {/* Base card */}
      <div className="mb-10">
        <p className="text-overline text-neutral-400 uppercase mb-4">Base Cards — Default / Hover / Bordered</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card padding="md">
            <p className="text-label-md text-neutral-500 mb-2">Default card</p>
            <p className="text-body-sm text-neutral-700">Uses shadow-card for subtle depth. No border by default.</p>
          </Card>
          <Card padding="md" hover>
            <p className="text-label-md text-neutral-500 mb-2">Hoverable card</p>
            <p className="text-body-sm text-neutral-700">Lifts on hover. Use for clickable content items.</p>
          </Card>
          <Card padding="md" bordered>
            <p className="text-label-md text-neutral-500 mb-2">Bordered card</p>
            <p className="text-body-sm text-neutral-700">Clean border instead of shadow. Good on light backgrounds.</p>
          </Card>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mb-10">
        <p className="text-overline text-neutral-400 uppercase mb-4">Feature Cards</p>
        <DSGrid cols={3}>
          <FeatureCard
            icon={<Heart />}
            title="For Families"
            description="A space where parents can relax while children explore and learn."
            accent="terracotta"
          />
          <FeatureCard
            icon={<Users />}
            title="Community Events"
            description="Weekly workshops, dinners, and creative sessions for all ages."
            accent="sage"
          />
          <FeatureCard
            icon={<BookOpen />}
            title="Language Learning"
            description="Russian-language programmes that keep cultural identity alive."
            accent="neutral"
          />
        </DSGrid>
      </div>

      {/* Event cards */}
      <div className="mb-10">
        <p className="text-overline text-neutral-400 uppercase mb-4">Event Cards</p>
        <DSGrid cols={3}>
          <EventCard
            category="Children · 6–10"
            title="Watercolour & Imagination Workshop"
            date="Saturday, 15 June"
            time="10:00 – 12:00"
            location="NEST Studio, Savamala"
            attendees={8}
            maxAttendees={12}
            onBook={() => {}}
          />
          <EventCard
            category="Teen Creative"
            title="Photography: Telling Stories Without Words"
            date="Sunday, 16 June"
            time="14:00 – 17:00"
            location="NEST Studio"
            attendees={14}
            maxAttendees={15}
            onBook={() => {}}
          />
          <EventCard
            category="Community"
            title="Monthly Long Table Dinner"
            date="Friday, 21 June"
            time="19:00 – 22:00"
            location="NEST Café"
            attendees={30}
            maxAttendees={30}
            onBook={() => {}}
          />
        </DSGrid>
      </div>

      {/* Stat cards */}
      <div className="mb-10">
        <p className="text-overline text-neutral-400 uppercase mb-4">Stat Cards</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="247" label="Active Members" sub="families" trend="up" trendValue="12% this month" accent="terracotta" />
          <StatCard value="34" label="Events This Month" sub="across all categories" trend="up" trendValue="6 more than last" accent="sage" />
          <StatCard value="4.9" label="Average Rating" sub="from 180 reviews" trend="neutral" trendValue="unchanged" />
          <StatCard value="€12.4k" label="Monthly Revenue" sub="membership + events" trend="up" trendValue="8% growth" />
        </div>
      </div>

      {/* Membership cards */}
      <div>
        <p className="text-overline text-neutral-400 uppercase mb-4">Membership Cards</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MembershipCard
            tier="Community"
            price="€29"
            description="For individuals who want to belong."
            features={['Discounted café', 'Priority booking', 'Community board', 'One guest pass/month']}
            onSelect={() => {}}
          />
          <MembershipCard
            tier="Family"
            price="€69"
            description="Parents + up to 3 children."
            features={['Everything in Community', '2 programme credits/month', 'Family events priority', 'Annual portrait session']}
            highlighted
            onSelect={() => {}}
          />
          <MembershipCard
            tier="Teen"
            price="€19"
            description="Creative space for ages 13–18."
            features={['Teen studio access', 'Workshop priority', 'Mentorship eligible', 'Portfolio reviews']}
            onSelect={() => {}}
          />
          <MembershipCard
            tier="Founding"
            price="€149"
            description="First 50 families — forever."
            features={['Everything in Family', 'Named community tile', 'Quarterly founder dinner', 'Unlimited credits']}
            onSelect={() => {}}
          />
        </div>
      </div>
    </DSSection>
  );
}
