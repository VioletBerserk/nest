import { Section, SectionTitle, Card, Tag, Bullets, PersonaCard, Collapsible } from './ui';

export function BrandStory() {
  return (
    <Section id="brand-story" className="bg-nest-espresso text-cream-100">
      <div className="max-w-3xl">
        <span className="text-xs font-sans font-medium tracking-widest text-nest-terracotta uppercase mb-3 block">
          01
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-cream-100 leading-tight mb-8">
          Brand Story
        </h2>
        <p className="font-serif text-xl italic text-cream-300 leading-loose mb-8">
          "You move to a new city and everything is unfamiliar — the streets, the language, the
          school system, the social codes. Your children adapt faster than you do. They make
          friends you haven't met. You smile and tell yourself it's fine. But somewhere deep down,
          you miss your people."
        </p>
        <p className="font-sans text-base text-cream-400 leading-relaxed mb-5">
          NEST was born from this exact feeling. Founded in Belgrade by people who had lived this
          experience firsthand, NEST is not a service. It is not a programme. It is a place — a
          real, physical, warm place — where Russian-speaking families can exhale.
        </p>
        <p className="font-sans text-base text-cream-400 leading-relaxed mb-5">
          Children can explore, create, and learn. Teenagers can find peers who understand their
          dual identity — born in one world, growing up in another. Parents can sit with a coffee,
          meet someone who speaks their language, and feel like themselves again.
        </p>
        <p className="font-sans text-base text-cream-400 leading-relaxed">
          NEST is designed like a second home. Not because it replaces what was left behind — but
          because it builds something new. A community. A family. A place you choose to return to.
        </p>
      </div>
    </Section>
  );
}

export function MissionVision() {
  return (
    <Section id="mission">
      <SectionTitle
        number="02"
        title="Mission & Vision"
        subtitle="The north star that guides every decision — from interior design to event planning to hiring."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Card accent="terracotta">
          <Tag color="terracotta">Mission</Tag>
          <p className="font-serif text-2xl font-medium text-nest-espresso leading-snug mt-4 mb-4">
            To create a warm, premium community space where Russian-speaking families in Belgrade
            can grow, connect, and feel at home.
          </p>
          <p className="font-sans text-sm text-nest-sand leading-relaxed">
            Every programme, every cup of coffee, every event serves this singular purpose: making
            people feel they belong.
          </p>
        </Card>
        <Card accent="sage">
          <Tag color="sage">Vision</Tag>
          <p className="font-serif text-2xl font-medium text-nest-espresso leading-snug mt-4 mb-4">
            To become the most beloved community brand for international families in Europe —
            expanding to every city where families long for belonging.
          </p>
          <p className="font-sans text-sm text-nest-sand leading-relaxed">
            NEST starts in Belgrade. But Belgrade is just chapter one.
          </p>
        </Card>
      </div>
    </Section>
  );
}

export function BrandPersonality() {
  const values = [
    {
      name: 'Belonging',
      desc: 'Everyone deserves a place that feels like home — even when they are far from it.',
      icon: '❤',
    },
    {
      name: 'Growth',
      desc: 'Learning and creativity thrive at every age, at every stage.',
      icon: '◎',
    },
    {
      name: 'Connection',
      desc: 'Real human relationships, built over coffee and conversation.',
      icon: '◇',
    },
    {
      name: 'Quality',
      desc: 'Premium in every detail — the materials, the programming, the hospitality.',
      icon: '◈',
    },
    {
      name: 'Safety',
      desc: 'A place where children and parents feel physically and emotionally safe.',
      icon: '◉',
    },
    {
      name: 'Warmth',
      desc: 'Genuine care for every member — not transactional, truly human.',
      icon: '◐',
    },
  ];

  const personality = [
    { trait: 'Warm', not: 'Clinical' },
    { trait: 'Sophisticated', not: 'Pretentious' },
    { trait: 'Playful', not: 'Childish' },
    { trait: 'Premium', not: 'Exclusive' },
    { trait: 'Minimalist', not: 'Sparse' },
    { trait: 'Caring', not: 'Sentimental' },
  ];

  return (
    <Section id="personality">
      <SectionTitle
        number="03"
        title="Brand Personality & Values"
        subtitle="What NEST is — and what it consciously chooses not to be."
      />

      <div className="mb-12">
        <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-nest-sand mb-6">
          Core Values
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v) => (
            <Card key={v.name}>
              <span className="text-2xl mb-3 block opacity-40">{v.icon}</span>
              <h4 className="font-sans font-semibold text-nest-espresso text-sm mb-2">{v.name}</h4>
              <p className="font-sans text-sm text-nest-sand leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-nest-sand mb-6">
          Personality Spectrum — We Are vs. We Are Not
        </h3>
        <div className="space-y-3">
          {personality.map((p) => (
            <div
              key={p.trait}
              className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-sm"
            >
              <span className="font-sans font-semibold text-nest-espresso text-sm w-32">
                {p.trait}
              </span>
              <div className="flex-1 h-px bg-nest-mist" />
              <span className="font-sans text-sm text-nest-sand line-through">{p.not}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function ToneOfVoice() {
  const principles = [
    {
      title: 'Speak like a trusted friend, not a brand',
      desc: 'We write as if we are speaking to someone we care about. Warm, direct, unhurried.',
    },
    {
      title: 'Elegant vocabulary, no corporate jargon',
      desc: 'Words like "synergy", "leverage", "ecosystem" are banned. Words like "home", "gather", "together" belong.',
    },
    {
      title: 'Bilingual by nature',
      desc: 'Our voice works equally in Russian and English. Translations are not afterthoughts — they are equal expressions of the same feeling.',
    },
    {
      title: 'Short sentences breathe',
      desc: 'Paragraphs should feel like rooms, not corridors. White space is intentional. Silence communicates.',
    },
    {
      title: 'Never oversell',
      desc: 'Understatement is confidence. We let the space speak. We let the community speak. We describe, we do not hype.',
    },
  ];

  const examples = [
    {
      wrong: 'BOOK YOUR PREMIUM FAMILY EXPERIENCE TODAY!',
      right: 'Come as you are. Leave as neighbours.',
    },
    {
      wrong: 'Our state-of-the-art facility offers world-class programming.',
      right: 'A place where children learn, teenagers connect, and parents finally breathe.',
    },
    {
      wrong: 'Join our exclusive community membership programme.',
      right: 'This is your place too.',
    },
  ];

  return (
    <Section id="tone">
      <SectionTitle
        number="04"
        title="Tone of Voice"
        subtitle="Every word is a design decision. NEST speaks with restraint, warmth, and clarity."
      />
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          {principles.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-sans font-semibold text-nest-espresso text-sm mb-2">{p.title}</h4>
              <p className="font-sans text-sm text-nest-sand leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-nest-sand mb-4">
            Voice Examples
          </h3>
          {examples.map((e, i) => (
            <Card key={i}>
              <div className="mb-3">
                <p className="text-xs font-medium text-nest-sand/60 mb-1 tracking-wider uppercase">
                  Never say
                </p>
                <p className="font-sans text-sm text-nest-sand line-through">{e.wrong}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-nest-terracotta mb-1 tracking-wider uppercase">
                  Instead
                </p>
                <p className="font-serif text-base italic text-nest-espresso">{e.right}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function EmotionalPositioning() {
  const emotions = [
    { feeling: 'Relief', caption: '"I finally found my people."', color: 'terracotta' as const },
    { feeling: 'Warmth', caption: '"I feel completely safe here."', color: 'sage' as const },
    { feeling: 'Pride', caption: '"I belong to something special."', color: 'cream' as const },
    { feeling: 'Joy', caption: '"My children love it here."', color: 'terracotta' as const },
    { feeling: 'Peace', caption: '"I can finally relax."', color: 'sage' as const },
    { feeling: 'Identity', caption: '"Here, I don\'t have to explain myself."', color: 'cream' as const },
  ];

  return (
    <Section id="emotional">
      <SectionTitle
        number="05"
        title="Emotional Positioning"
        subtitle="Great brands don't sell products — they sell feelings. Here is what NEST is designed to make people feel."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {emotions.map((e) => (
          <Card key={e.feeling} className="text-center py-8">
            <h3 className="font-serif text-3xl font-semibold text-nest-espresso mb-3">{e.feeling}</h3>
            <p className="font-serif italic text-sm text-nest-sand">{e.caption}</p>
          </Card>
        ))}
      </div>
      <Card accent="espresso" className="bg-nest-espresso">
        <p className="font-serif text-xl text-cream-200 italic leading-loose">
          "NEST is the place you discover on a grey Tuesday, when the language barrier is heavy and
          the kids are restless — and you walk in and someone smiles and says your name and you
          think: <em>this is mine too.</em>"
        </p>
      </Card>
    </Section>
  );
}

export function CustomerPersonas() {
  const personas = [
    {
      name: 'Marina',
      age: '34 years old',
      role: 'Remote marketing manager, mother of two',
      location: 'Relocated from Moscow, 8 months in Belgrade',
      pain: [
        'Misses her social circle deeply',
        'Feels isolated working from home',
        'Worries about children\'s Russian declining',
        'Hard to meet quality friends as an adult',
      ],
      desire: [
        'Adult conversation and coffee',
        'Safe enrichment for her kids',
        'A community she trusts',
        'Time to breathe',
      ],
      quote:
        'I\'m productive and I love this city, but some days I just need to sit with someone who gets it.',
      color: 'terracotta' as const,
    },
    {
      name: 'Artem',
      age: '16 years old',
      role: 'Student, aspiring designer',
      location: 'Lives between two worlds — Russian home, Serbian school',
      pain: [
        'Feels like he doesn\'t fully belong anywhere',
        'Few peers who share his dual identity',
        'Serbian friends don\'t understand certain references',
        'Parents don\'t understand his creative ambitions',
      ],
      desire: [
        'A crew that accepts him fully',
        'Creative space and tools',
        'Mentors who actually get design',
        'A place that takes teenagers seriously',
      ],
      quote: 'I just want somewhere to go where I don\'t have to code-switch every five seconds.',
      color: 'sage' as const,
    },
    {
      name: 'Sofia',
      age: '8 years old',
      role: 'Third-grader, wild imagination',
      location: 'Born in St. Petersburg, grew up in Belgrade',
      pain: [
        'School friends mostly speak Serbian',
        'Limited quality Russian-language play',
        'Bored by traditional activities',
        'Parents are often stressed',
      ],
      desire: [
        'Fun that also teaches her something',
        'Friends who speak like her at home',
        'Art, stories, and adventures',
        'A safe space that feels magical',
      ],
      quote: 'I want to go back tomorrow. Can we go back tomorrow?',
      color: 'terracotta' as const,
    },
    {
      name: 'Dmitri & Olga',
      age: '38 & 36 years old',
      role: 'Dual remote-working couple',
      location: 'Relocated from Saint Petersburg, 18 months ago',
      pain: [
        'Need quality childcare while both work',
        'Belgrade social scene feels inaccessible',
        'Children\'s Russian is slipping',
        'No couple time, ever',
      ],
      desire: [
        'Reliable, trusted environment for kids',
        'Interesting adult social events',
        'A broader friend network',
        'Community that evolves with them',
      ],
      quote: 'If we could work nearby while the kids are here, that would change our entire week.',
      color: 'sage' as const,
    },
  ];

  return (
    <Section id="personas">
      <SectionTitle
        number="06"
        title="Customer Personas"
        subtitle="Four real humans NEST is designed for. Every feature, every programme, every menu item should serve at least one of them."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {personas.map((p) => (
          <PersonaCard key={p.name} {...p} />
        ))}
      </div>
    </Section>
  );
}

export function UserJourneys() {
  const journeys = [
    {
      persona: 'Marina',
      stages: [
        { stage: 'Awareness', action: 'Sees NEST post in a Belgrade expat Telegram group', feeling: 'Curious, slightly hopeful' },
        { stage: 'Consideration', action: 'Visits the website, reads about the café and children\'s programmes', feeling: 'Intrigued. The design feels premium and trustworthy.' },
        { stage: 'First Visit', action: 'Brings kids on a Saturday morning. Stays 3 hours.', feeling: 'Surprised by the quality. Relieved. Connects with another mother.' },
        { stage: 'Return', action: 'Books a weekday slot for herself while kids attend a workshop', feeling: 'This is becoming a habit. A good one.' },
        { stage: 'Membership', action: 'Signs up for the Family membership after her third visit', feeling: 'Ownership. This place is mine now.' },
        { stage: 'Advocacy', action: 'Shares with three other families from her building', feeling: 'Pride. She introduced good people to a good place.' },
      ],
    },
    {
      persona: 'Artem',
      stages: [
        { stage: 'Discovery', action: 'Hears about NEST from a classmate who "went to this cool place"', feeling: 'Skeptical. Probably for little kids.' },
        { stage: 'Exploration', action: 'Checks Instagram. Sees photography of the teen creative space.', feeling: 'This looks different. Maybe worth a look.' },
        { stage: 'First Visit', action: 'Comes alone on a Wednesday. Stays for a design workshop.', feeling: 'Unexpectedly engaged. Talks to someone his age about type design.' },
        { stage: 'Deeper Engagement', action: 'Joins the teen creative club. Starts a photography project.', feeling: 'Identity forming. Belonging growing.' },
        { stage: 'Contribution', action: 'Helps design posters for a NEST event.', feeling: 'Purpose. Recognition. Real-world portfolio.' },
      ],
    },
  ];

  return (
    <Section id="journeys">
      <SectionTitle
        number="07"
        title="User Journeys"
        subtitle="The paths people take from stranger to member to advocate. Design every touchpoint."
      />
      <div className="space-y-6">
        {journeys.map((j) => (
          <Collapsible key={j.persona} title={`Journey: ${j.persona}`} defaultOpen={j.persona === 'Marina'}>
            <div className="mt-4 space-y-3">
              {j.stages.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-nest-terracotta/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-nest-terracotta">{i + 1}</span>
                    </div>
                    {i < j.stages.length - 1 && (
                      <div className="w-px flex-1 bg-nest-mist mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-medium tracking-widest uppercase text-nest-sand mb-1">
                      {s.stage}
                    </p>
                    <p className="font-sans text-sm text-nest-espresso mb-1">{s.action}</p>
                    <p className="font-serif italic text-xs text-nest-terracotta">
                      Feeling: {s.feeling}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>
        ))}
      </div>
    </Section>
  );
}

export function InformationArchitecture() {
  const pages = [
    {
      path: '/',
      name: 'Home',
      purpose: 'First impression, brand story, emotional hook, primary CTAs',
      sections: ['Hero with tagline', 'What is NEST?', 'For whom?', 'Featured events', 'Testimonials', 'Membership teaser', 'Newsletter'],
    },
    {
      path: '/about',
      name: 'About',
      purpose: 'Brand story, founding vision, team, the physical space',
      sections: ['Our story', 'Why Belgrade', 'The founding team', 'The space (gallery)', 'Values in action'],
    },
    {
      path: '/children',
      name: 'For Children',
      purpose: 'All programmes for ages 6–12',
      sections: ['Age groups', 'Activity types', 'Weekly schedule', 'Teachers & facilitators', 'Safety & approach'],
    },
    {
      path: '/teens',
      name: 'For Teens',
      purpose: 'Teen-specific space, clubs, events',
      sections: ['Teen creative studio', 'Clubs & interest groups', 'Mentorship programme', 'Teen events calendar', 'Teen voice / community board'],
    },
    {
      path: '/parents',
      name: 'For Parents',
      purpose: 'Café, community, coworking, adult events',
      sections: ['The café concept', 'Community tables', 'Coworking corner', 'Parent events', 'Resources & support'],
    },
    {
      path: '/events',
      name: 'Events',
      purpose: 'Full calendar of all events across all age groups',
      sections: ['Upcoming events', 'Event categories', 'Book a seat', 'Private events / venue hire', 'Past events gallery'],
    },
    {
      path: '/membership',
      name: 'Membership',
      purpose: 'Plans, benefits, sign-up flow',
      sections: ['Why membership?', 'Plan comparison', 'Family / individual / teen plans', 'Sign up / login', 'Member stories'],
    },
    {
      path: '/space',
      name: 'The Space',
      purpose: 'Visual showcase of the physical space',
      sections: ['Full gallery', 'Zone map (café, kids, teen, cowork)', 'The design philosophy', 'Opening hours', 'Location & transport'],
    },
    {
      path: '/community',
      name: 'Community',
      purpose: 'Blog, stories, resources, member voices',
      sections: ['Community stories', 'Articles & resources', 'Recommendations in Belgrade', 'Member spotlights', 'Language resources'],
    },
    {
      path: '/contact',
      name: 'Contact',
      purpose: 'Find us, reach us, visit us',
      sections: ['Address & map', 'Opening hours', 'Contact form', 'FAQ', 'Social channels'],
    },
  ];

  return (
    <Section id="ia">
      <SectionTitle
        number="08"
        title="Information Architecture"
        subtitle="Every page has a single purpose. Every section has a reason to exist."
      />
      <div className="space-y-3">
        {pages.map((p) => (
          <Collapsible key={p.path} title={`${p.path === '/' ? 'Home' : p.path} — ${p.name}`}>
            <div className="mt-3">
              <p className="font-sans text-sm text-nest-espresso mb-3">{p.purpose}</p>
              <Bullets items={p.sections} color="terracotta" />
            </div>
          </Collapsible>
        ))}
      </div>
    </Section>
  );
}

export function FunctionalRequirements() {
  const features = [
    {
      category: 'Core',
      items: [
        'Responsive website (mobile-first, desktop-optimised)',
        'Bilingual content: Russian and English',
        'Event calendar with booking/RSVP capability',
        'Membership sign-up and account management',
        'Newsletter subscription',
        'Photo gallery and media library',
        'Contact form and FAQ',
        'Interactive space map / zone guide',
      ],
    },
    {
      category: 'Community',
      items: [
        'Member directory (opt-in)',
        'Community board / notice board',
        'Member-submitted stories and spotlights',
        'Resource library (schools, services in Belgrade)',
        'Telegram channel or community widget integration',
        'Event RSVP and waitlist system',
      ],
    },
    {
      category: 'Admin',
      items: [
        'CMS for events, blog posts, gallery',
        'Member management dashboard',
        'Booking management for events and programmes',
        'Newsletter management',
        'Analytics dashboard (engagement, membership growth)',
        'Multi-language content editor',
      ],
    },
  ];

  return (
    <Section id="requirements">
      <SectionTitle
        number="09"
        title="Functional Requirements"
        subtitle="What the platform must do. Organised by priority."
      />
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Card key={f.category} accent={f.category === 'Core' ? 'terracotta' : f.category === 'Community' ? 'sage' : 'sand'}>
            <Tag color={f.category === 'Core' ? 'terracotta' : f.category === 'Community' ? 'sage' : 'cream'}>
              {f.category}
            </Tag>
            <div className="mt-4">
              <Bullets
                items={f.items}
                color={f.category === 'Core' ? 'terracotta' : f.category === 'Community' ? 'sage' : 'sand'}
              />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function CaféConcept() {
  return (
    <Section id="cafe">
      <SectionTitle
        number="10"
        title="Café Concept"
        subtitle="The café is not the business. It is the heartbeat. The smell and taste of belonging."
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Card accent="terracotta">
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Philosophy</h3>
            <p className="font-sans text-sm text-nest-sand leading-relaxed">
              The NEST café is not about volume or turnover. It is about atmosphere. Long tables for
              community. Small tables for focus. A counter where the barista knows your name by
              your third visit. Quality over novelty. Warmth over efficiency.
            </p>
          </Card>
          <Card>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Menu Direction</h3>
            <Bullets
              items={[
                'Specialty single-origin coffee programme',
                'Eastern European pastries alongside modern café staples',
                'Children\'s menu — real food, not just juice boxes',
                'Seasonal, local, thoughtfully sourced',
                'Russian tea culture honoured — samovar-inspired ritual teas',
                'Healthy snacks for kids during programmes',
              ]}
              color="terracotta"
            />
          </Card>
        </div>
        <div className="space-y-5">
          <Card accent="sage">
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Spatial Zones</h3>
            <Bullets
              items={[
                'Community table — long shared surface, for meeting strangers',
                'Quiet nook — soft seating, for reading, for working alone',
                'Counter stools — for quick coffees, spontaneous conversation',
                'Children\'s view zone — parents can see the activity room',
                'Outdoor terrace (seasonal) — neighbourhood presence',
              ]}
              color="sage"
            />
          </Card>
          <Card>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Rituals</h3>
            <Bullets
              items={[
                'Friday afternoon "community table" — open seating, no reservations',
                'Monthly café events — book clubs, film screenings, Q&As',
                'Barista introduces regulars to newcomers by name',
                'Birthday drinks — members get a free coffee on their birthday',
                'Weekly specials board — handwritten, local, personal',
              ]}
              color="terracotta"
            />
          </Card>
        </div>
      </div>
    </Section>
  );
}

export function MembershipConcept() {
  const tiers = [
    {
      name: 'Community',
      price: '€29 / month',
      color: 'cream' as const,
      forWhom: 'Individual adults',
      benefits: [
        'Discounted café pricing',
        'Priority event booking',
        'Community board access',
        'Monthly newsletter',
        'One guest pass per month',
      ],
    },
    {
      name: 'Family',
      price: '€69 / month',
      color: 'terracotta' as const,
      forWhom: 'Parents + up to 3 children',
      benefits: [
        'Everything in Community',
        'Two children\'s programme credits/month',
        'Family event priority',
        'Member directory access',
        'Annual family portrait session',
        'Dedicated family locker',
      ],
    },
    {
      name: 'Teen',
      price: '€19 / month',
      color: 'sage' as const,
      forWhom: 'Ages 13–18',
      benefits: [
        'Teen creative studio access',
        'Workshop priority booking',
        'Mentorship programme eligibility',
        'Teen event invitations',
        'Portfolio review sessions',
      ],
    },
    {
      name: 'Founding',
      price: '€149 / month',
      color: 'cream' as const,
      forWhom: 'First 50 families — lifetime legacy',
      benefits: [
        'Everything in Family',
        'Named tile on the community wall',
        'Quarterly founder dinner',
        'Unlimited programme credits',
        'Private event space access',
        'Influence on programming direction',
        'Price locked forever',
      ],
    },
  ];

  return (
    <Section id="membership">
      <SectionTitle
        number="11"
        title="Membership Architecture"
        subtitle="Membership is not just a revenue stream. It is how we build the community. Every tier creates belonging."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((t) => (
          <Card
            key={t.name}
            accent={t.color === 'terracotta' ? 'terracotta' : t.color === 'sage' ? 'sage' : undefined}
            className="flex flex-col"
          >
            <Tag color={t.color}>{t.name}</Tag>
            <p className="font-serif text-2xl font-semibold text-nest-espresso mt-3 mb-1">{t.price}</p>
            <p className="text-xs text-nest-sand mb-4">{t.forWhom}</p>
            <div className="flex-1">
              <Bullets
                items={t.benefits}
                color={t.color === 'terracotta' ? 'terracotta' : t.color === 'sage' ? 'sage' : 'sand'}
              />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function EventIdeas() {
  const categories = [
    {
      title: 'Children (6–12)',
      color: 'terracotta' as const,
      events: [
        'Russian language story hours with illustrations',
        'Art workshops: watercolour, clay, collage',
        'Cooking lessons — traditional recipes, new discoveries',
        'Science experiments and discovery afternoons',
        'Theatre and performance workshops',
        'Book clubs with bilingual reading',
        'Nature and garden sessions (seasonal)',
        '"What do you want to be?" career discovery days',
      ],
    },
    {
      title: 'Teenagers (13–18)',
      color: 'sage' as const,
      events: [
        'Photography and visual storytelling workshops',
        'Design thinking and branding sessions',
        'Music production and DJing introduction',
        'Debate club (Russian/English/Serbian)',
        'Film screening + director Q&A series',
        'Entrepreneurship mini-course',
        'Portfolio review sessions with professionals',
        'Teen market — sell what you make',
        '"Between two worlds" cultural identity discussions',
      ],
    },
    {
      title: 'Parents & Adults',
      color: 'sand' as const,
      events: [
        'Monthly community dinner — long table, open invitation',
        'Book club — rotating fiction and non-fiction',
        'Parenting in a new culture: conversation circles',
        'Wine and cheese evenings (monthly)',
        'Guest speakers: local entrepreneurs, artists, experts',
        'Serbian language casual sessions',
        'Craft evenings — ceramics, macramé, candle making',
        'Film club with post-film discussions',
        'Professional networking brunches',
      ],
    },
    {
      title: 'Family',
      color: 'terracotta' as const,
      events: [
        'Holiday celebrations: New Year, Maslenitsa, Easter, birthday season',
        'Family game tournaments',
        'Annual NEST family portrait day',
        'End-of-season family festival',
        'Summer camp week',
        'Family volunteering in Belgrade community',
        'Inter-generational cooking days',
      ],
    },
  ];

  return (
    <Section id="events">
      <SectionTitle
        number="12"
        title="Event Programme Ideas"
        subtitle="Events are the pulse of the community. Each one should create a story worth sharing."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((c) => (
          <Card key={c.title} accent={c.color}>
            <Tag color={c.color === 'sand' ? 'cream' : c.color}>{c.title}</Tag>
            <div className="mt-4">
              <Bullets items={c.events} color={c.color === 'sand' ? 'sand' : c.color} />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function DesignPhilosophy() {
  const inspirations = [
    { brand: 'Apple', lesson: 'Precision, restraint, intentional white space. Every detail matters.' },
    { brand: 'Airbnb', lesson: 'Warmth at scale. Photography that makes you feel, not just see.' },
    { brand: 'Linear', lesson: 'Speed, hierarchy, dark/light polish. Nothing extraneous.' },
    { brand: 'Framer', lesson: 'Motion with purpose. Interactions that delight without distracting.' },
    { brand: 'Muji', lesson: 'Quiet confidence. No branding noise — the quality speaks.' },
    { brand: 'Soho House', lesson: 'The feeling of belonging to something curated. Exclusivity through curation, not price.' },
    { brand: 'Aesop', lesson: 'Texture, language, sensory branding. Copy as design element.' },
  ];

  return (
    <Section id="design">
      <SectionTitle
        number="13"
        title="Design Philosophy"
        subtitle="Design is not decoration. It is the physical embodiment of what we believe. Every visual choice must serve the brand's emotional goals."
      />
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-nest-sand mb-5">
            Inspiration References
          </h3>
          <div className="space-y-3">
            {inspirations.map((i) => (
              <div key={i.brand} className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm">
                <span className="font-sans font-semibold text-nest-terracotta text-sm w-20 flex-shrink-0">
                  {i.brand}
                </span>
                <p className="font-sans text-sm text-nest-sand leading-relaxed">{i.lesson}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <Card accent="terracotta">
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Color System</h3>
            <div className="space-y-2">
              {[
                { name: 'Cream', value: '#FAF5EE', desc: 'Primary background — warm, not white' },
                { name: 'Espresso', value: '#1C1410', desc: 'Primary text — rich, not pure black' },
                { name: 'Terracotta', value: '#C4715A', desc: 'Primary accent — warmth, energy' },
                { name: 'Sage', value: '#3D5A47', desc: 'Secondary accent — nature, calm' },
                { name: 'Sand', value: '#B8A89A', desc: 'Secondary text — quiet, supporting' },
                { name: 'Mist', value: '#E8E2DC', desc: 'Borders, dividers — barely there' },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded flex-shrink-0 border border-nest-mist"
                    style={{ backgroundColor: c.value }}
                  />
                  <span className="font-sans text-xs font-medium text-nest-espresso w-20">{c.name}</span>
                  <span className="font-sans text-xs text-nest-sand">{c.desc}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Typography</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-nest-sand mb-1">Headlines</p>
                <p className="font-serif text-2xl font-semibold text-nest-espresso">Playfair Display</p>
                <p className="text-xs text-nest-sand">Warm, editorial, elegant — old soul, modern heart</p>
              </div>
              <div>
                <p className="text-xs text-nest-sand mb-1">Body & UI</p>
                <p className="font-sans text-base text-nest-espresso font-medium">Inter</p>
                <p className="text-xs text-nest-sand">Neutral, legible, trustworthy — invisible when right</p>
              </div>
              <div>
                <p className="text-xs text-nest-sand mb-1">Quotes & Emphasis</p>
                <p className="font-serif italic text-base text-nest-terracotta">Playfair Display Italic</p>
                <p className="text-xs text-nest-sand">For moments that deserve to breathe</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

export function Monetization() {
  const streams = [
    {
      stream: 'Memberships',
      model: 'Recurring monthly / annual',
      potential: 'Primary revenue — high LTV, predictable',
      details: [
        'Family: €69/mo × 100 families = €6,900/mo',
        'Teen: €19/mo × 60 teens = €1,140/mo',
        'Individual: €29/mo × 80 people = €2,320/mo',
        'Annual prepay discount (15%) improves cash flow',
      ],
    },
    {
      stream: 'Café & Food',
      model: 'Daily transaction revenue',
      potential: 'Secondary revenue — community building multiplier',
      details: [
        'Specialty coffee programme',
        'Pastry and light food menu',
        'Private café hire for events',
        'Catering for in-house events',
      ],
    },
    {
      stream: 'Events & Workshops',
      model: 'Per-ticket or per-workshop',
      potential: 'Tertiary — also acquisition channel',
      details: [
        'Drop-in workshop tickets: €15–€35',
        'Multi-session courses: €90–€200',
        'Private workshops: €200–€600',
        'Corporate team events: €500–€2,000',
      ],
    },
    {
      stream: 'Venue Hire',
      model: 'Hourly / half-day / full-day',
      potential: 'High margin, low overhead',
      details: [
        'Birthday parties (children): €350–€700',
        'Corporate offsite: €400–€800/day',
        'Private dinners: €600+',
        'Photography shoots: €150/hour',
      ],
    },
    {
      stream: 'Partnerships',
      model: 'B2B relationships',
      potential: 'Brand equity and additional revenue',
      details: [
        'Language schools cross-referral',
        'Relocation agencies partner programme',
        'Children\'s brands and sponsors',
        'Local producers and suppliers',
      ],
    },
    {
      stream: 'Digital Products',
      model: 'Future — scalable revenue',
      potential: 'Long-term: international community growth',
      details: [
        'Online Russian language curriculum (downloadable)',
        'NEST parenting resource library (subscription)',
        'City guide for Russian families in Belgrade (digital)',
        'Online community for remote NEST members',
      ],
    },
  ];

  return (
    <Section id="monetization">
      <SectionTitle
        number="14"
        title="Monetization Strategy"
        subtitle="Revenue built on genuine value, not extraction. Every income stream should deepen community."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((s) => (
          <Card key={s.stream}>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-1">{s.stream}</h3>
            <p className="text-xs text-nest-terracotta mb-1">{s.model}</p>
            <p className="font-sans text-xs text-nest-sand mb-4 leading-relaxed">{s.potential}</p>
            <Bullets items={s.details} color="terracotta" />
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function Roadmap() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      timeline: 'Months 1–6',
      focus: 'Launch, establish, prove',
      items: [
        'Website launch (this product)',
        'Physical space opens in Belgrade',
        'Founding member programme (50 families)',
        'Core children\'s programme launched',
        'Café operational',
        'Social media presence established',
        'First community event series',
        'Telegram community channel live',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Growth',
      timeline: 'Months 7–18',
      focus: 'Scale community, deepen programming',
      items: [
        'Teen creative studio launched',
        'Full event programme running weekly',
        'Membership reaches 200 families',
        'Community blog and magazine launched',
        'First partnerships with schools and relocation agencies',
        'Mobile app (MVP): events, membership, community board',
        'Venue hire programme launched',
        'Second Belgrade location scouted',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Expansion',
      timeline: 'Year 2–3',
      focus: 'Multi-city, digital layer, franchise potential',
      items: [
        'Second location in Belgrade or Novi Sad',
        'Digital NEST: online community for international families',
        'NEST curriculum published (Russian language, cultural content)',
        'Podcast: "Between Two Worlds" — family stories',
        'European expansion study: Berlin, Vienna, Lisbon, Tbilisi',
        'NEST Academy: professional development for facilitators',
        'Merchandise and lifestyle brand elements',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Platform',
      timeline: 'Year 3–5',
      focus: 'NEST becomes a movement, not a location',
      items: [
        'Franchise / partner model for other cities',
        'NEST Fund: supporting Russian-speaking creative families',
        'Annual NEST Summit — gathering of families across cities',
        'AI-powered community assistant (see AI ideas)',
        'NEST as a cultural institution, not just a business',
        'Publishing arm: books, curriculum, research on expat families',
      ],
    },
  ];

  return (
    <Section id="roadmap">
      <SectionTitle
        number="15"
        title="Future Roadmap"
        subtitle="NEST is built for the long game. Each phase unlocks the next."
      />
      <div className="space-y-4">
        {phases.map((p, i) => (
          <Collapsible key={p.phase} title={`${p.phase}: ${p.title} — ${p.timeline}`} defaultOpen={i === 0}>
            <div className="mt-3">
              <p className="font-sans text-xs font-medium text-nest-terracotta mb-3 tracking-wide uppercase">
                Focus: {p.focus}
              </p>
              <Bullets items={p.items} color="terracotta" />
            </div>
          </Collapsible>
        ))}
      </div>
    </Section>
  );
}

export function TechArchitecture() {
  return (
    <Section id="tech">
      <SectionTitle
        number="16"
        title="Technical Architecture"
        subtitle="Chosen for maintainability, performance, and the ability to grow without re-engineering."
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card accent="terracotta">
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Frontend</h3>
            <Bullets
              items={[
                'React + TypeScript — component-based, maintainable',
                'Vite — fast builds, excellent DX',
                'Tailwind CSS — design token system, consistent spacing',
                'Framer Motion — purposeful, premium micro-animations',
                'React Router — client-side navigation',
                'i18next — bilingual Russian/English content',
              ]}
              color="terracotta"
            />
          </Card>
          <Card accent="sage">
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Backend & Data</h3>
            <Bullets
              items={[
                'Supabase — authentication, database, storage, realtime',
                'PostgreSQL — relational data: members, events, bookings',
                'Supabase Auth — email/password + social login',
                'Supabase Storage — photo gallery, document uploads',
                'Row Level Security — privacy by default',
                'Edge Functions — custom business logic',
              ]}
              color="sage"
            />
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Key Database Models</h3>
            <Bullets
              items={[
                'members — profiles, membership tier, join date',
                'events — title, category, date, capacity, bookings',
                'bookings — member ↔ event relationship',
                'programmes — recurring children/teen programme schedule',
                'posts — community blog and stories',
                'gallery — curated photo albums per event/space',
                'waitlist — pre-launch and event waitlists',
              ]}
              color="sand"
            />
          </Card>
          <Card>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Future Mobile App</h3>
            <Bullets
              items={[
                'React Native — shared codebase with web',
                'Push notifications for events and community updates',
                'QR code check-in for events and space access',
                'Digital membership card',
                'In-app community board and messaging',
                'AI assistant: "What\'s on today? What should my child try?"',
                'Offline access to key info',
              ]}
              color="terracotta"
            />
          </Card>
        </div>
      </div>
    </Section>
  );
}

export function AIIdeas() {
  const ideas = [
    {
      name: 'NEST Assistant',
      desc: 'A conversational AI embedded in the website and app. Answers questions in Russian and English: "What programmes are right for my 9-year-old?", "What\'s happening this weekend?", "I\'m new to Belgrade — what do I need to know?"',
    },
    {
      name: 'Programme Recommender',
      desc: 'Based on a child\'s age, interests, and past attendance, recommends upcoming workshops and events. Reduces decision fatigue for parents. Increases engagement.',
    },
    {
      name: 'Community Connector',
      desc: 'Identifies new members who have similar profiles to established members and gently prompts introductions. "Olga joined last week — she\'s also a remote designer with a 7-year-old. Would you like to meet?"',
    },
    {
      name: 'Language Learning Layer',
      desc: 'Subtle bilingual content throughout the platform — Russian words annotated with English, English with Russian. Children who use the app reinforce language naturally.',
    },
    {
      name: 'Memory Archive',
      desc: 'Each year, NEST generates a family\'s "Year at NEST" — photos from events attended, milestones, workshops completed. A digital scrapbook that makes the community tangible.',
    },
    {
      name: 'Sentiment Pulse',
      desc: 'An internal tool that monitors event ratings, post engagement, and membership churn signals. Alerts team when community energy is dropping before it becomes a problem.',
    },
  ];

  return (
    <Section id="ai">
      <SectionTitle
        number="17"
        title="AI & Intelligence Ideas"
        subtitle="Technology should serve warmth — never replace it. AI at NEST is quiet, helpful, and invisible until needed."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <Card key={idea.name}>
            <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-2">{idea.name}</h3>
            <p className="font-sans text-sm text-nest-sand leading-relaxed">{idea.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function SEOStrategy() {
  return (
    <Section id="seo">
      <SectionTitle
        number="18"
        title="SEO & Growth Strategy"
        subtitle="Organic discovery built on genuine authority and community-first content."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Card accent="terracotta">
          <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Target Keywords</h3>
          <Bullets
            items={[
              '"Russian community Belgrade"',
              '"Russian families Serbia"',
              '"Русские в Белграде" (Russian: Russians in Belgrade)',
              '"Детские мероприятия Белград" (children\'s events Belgrade)',
              '"Expat family club Belgrade"',
              '"Russian school Belgrade"',
              '"International family café Belgrade"',
              '"Creative club for kids Belgrade"',
            ]}
            color="terracotta"
          />
        </Card>
        <Card accent="sage">
          <h3 className="font-sans font-semibold text-nest-espresso text-sm mb-3">Content Strategy</h3>
          <Bullets
            items={[
              'Bilingual blog: parenting, culture, Belgrade city guides',
              '"Moving to Belgrade with kids" comprehensive guide',
              '"Best Russian-language resources for children in Serbia"',
              'Monthly event recaps with real photography',
              'Member spotlights and community stories',
              'Video content: space tours, event highlights, testimonials',
              'Telegram and Instagram as primary social channels',
              'Word-of-mouth amplification through referral programme',
            ]}
            color="sage"
          />
        </Card>
      </div>
    </Section>
  );
}
