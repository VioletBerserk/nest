import { useState } from 'react';
import { Heart, ArrowRight, Plus, Search, Loader2, Mail, User, Star } from 'lucide-react';
import { Button, IconButton } from '../../components/ds/Button';
import { Field, Input, PasswordInput, Textarea, Select, Checkbox, Radio, Toggle, SearchInput } from '../../components/ds/Input';
import { Badge, StatusBadge, CountBadge, Pill } from '../../components/ds/Badge';
import { DSSection, DSTitle, DSPreview, DSRow } from './DSPrimitives';

/* ── Buttons ─────────────────────────────────────────────────────── */
export function ButtonsSection() {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <DSSection id="ds-buttons">
      <DSTitle
        number="06 — Buttons"
        title="Button System"
        subtitle="6 variants × 5 sizes × 4 states. Every button is keyboard-accessible, has a visible focus ring, and meets WCAG AA contrast."
      />

      <div className="space-y-8">
        <DSPreview label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
        </DSPreview>

        <DSPreview label="Sizes">
          <Button variant="primary" size="xs">Extra Small</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="xl">Extra Large</Button>
        </DSPreview>

        <DSPreview label="With Icons">
          <Button variant="primary" iconLeft={<ArrowRight />}>Continue</Button>
          <Button variant="secondary" iconLeft={<Plus />}>Add Member</Button>
          <Button variant="outline" iconRight={<ArrowRight />}>Learn More</Button>
          <Button variant="ghost" iconLeft={<Heart />}>Save Event</Button>
          <Button variant="primary" iconLeft={<Mail />} size="sm">Send Invite</Button>
        </DSPreview>

        <DSPreview label="States">
          <Button variant="primary">Default</Button>
          <Button variant="primary" loading={loading} onClick={handleLoad}>
            {loading ? 'Booking…' : 'Book Now'}
          </Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </DSPreview>

        <DSPreview label="Icon Buttons">
          <IconButton label="Favourite" variant="ghost"><Heart /></IconButton>
          <IconButton label="Search" variant="outline"><Search /></IconButton>
          <IconButton label="Add" variant="primary"><Plus /></IconButton>
          <IconButton label="Add small" variant="primary" size="sm"><Plus /></IconButton>
          <IconButton label="Add large" variant="secondary" size="lg"><Plus /></IconButton>
        </DSPreview>

        <DSPreview label="Full Width">
          <Button variant="primary" fullWidth iconRight={<ArrowRight />}>Join the Community</Button>
        </DSPreview>
      </div>
    </DSSection>
  );
}

/* ── Forms ───────────────────────────────────────────────────────── */
export function FormsSection() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [pill, setPill] = useState('children');
  const [checked, setChecked] = useState(false);

  return (
    <DSSection id="ds-forms">
      <DSTitle
        number="07 — Forms"
        title="Form Components"
        subtitle="Every form element follows a consistent visual language: 10px height, soft border, terracotta focus ring, clear error states."
      />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-5">
          <h3 className="font-sans font-semibold text-heading-sm text-neutral-700">Text Inputs</h3>
          <Field id="f1" label="Full Name" required hint="As it appears on your passport">
            <Input id="f1" placeholder="Elena Sokolova" iconLeft={<User />} />
          </Field>
          <Field id="f2" label="Email Address" required>
            <Input id="f2" type="email" placeholder="elena@example.com" iconLeft={<Mail />} />
          </Field>
          <Field id="f3" label="Password">
            <PasswordInput id="f3" placeholder="••••••••" />
          </Field>
          <Field id="f4" label="Search events">
            <SearchInput placeholder="Art workshop, cooking, photography…" />
          </Field>
          <Field id="f5" label="Email" error="This email is already registered.">
            <Input id="f5" type="email" placeholder="used@example.com" status="error" />
          </Field>
          <Field id="f6" label="Username" success="This username is available!">
            <Input id="f6" placeholder="elena_nest" status="success" />
          </Field>
          <Field id="f7" label="Disabled field">
            <Input id="f7" placeholder="Not editable" disabled />
          </Field>
        </div>

        {/* Other elements */}
        <div className="space-y-5">
          <h3 className="font-sans font-semibold text-heading-sm text-neutral-700">Other Elements</h3>

          <Field id="f8" label="Membership tier" required>
            <Select id="f8">
              <option value="">Choose a plan…</option>
              <option value="community">Community — €29/month</option>
              <option value="family">Family — €69/month</option>
              <option value="teen">Teen — €19/month</option>
            </Select>
          </Field>

          <Field id="f9" label="Tell us about your family" hint="Max 500 characters">
            <Textarea id="f9" placeholder="We are a family of four, moved from Moscow last year…" rows={3} />
          </Field>

          <div>
            <p className="text-label-md text-neutral-700 mb-3">Age group</p>
            <div className="flex gap-4 flex-wrap">
              {['children', 'teens', 'parents'].map((v) => (
                <Radio key={v} id={`radio-${v}`} name="agegroup" value={v} label={v.charAt(0).toUpperCase() + v.slice(1)} defaultChecked={v === 'children'} />
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <Checkbox id="cb1" label="I agree to receive event updates via email" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <Checkbox id="cb2" label="Subscribe to the NEST community newsletter" defaultChecked />
            <Checkbox id="cb3" label="This option is disabled" disabled />
          </div>

          <div className="space-y-3">
            <p className="text-label-md text-neutral-700">Toggles</p>
            <Toggle checked={toggle1} onChange={setToggle1} label="Enable email notifications" />
            <Toggle checked={toggle2} onChange={setToggle2} label="Show profile in member directory" />
            <Toggle checked={false} onChange={() => {}} label="Disabled toggle" disabled />
          </div>

          <div>
            <p className="text-label-md text-neutral-700 mb-3">Filter Pills</p>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Children', 'Teens', 'Parents', 'Family'].map((p) => (
                <Pill key={p} selected={pill === p.toLowerCase()} onClick={() => setPill(p.toLowerCase())}>{p}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DSSection>
  );
}

/* ── Badges ──────────────────────────────────────────────────────── */
export function BadgesSection() {
  return (
    <DSSection id="ds-badges">
      <DSTitle
        number="08 — Badges & Status"
        title="Badges & Labels"
        subtitle="Semantic colours for states, categories, and counts. Never use colour alone to convey meaning — pair with text."
      />

      <div className="space-y-8">
        <DSPreview label="Badge Variants">
          <Badge variant="terracotta">Terracotta</Badge>
          <Badge variant="sage">Sage</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="default">Default</Badge>
          <Badge variant="outline">Outline</Badge>
        </DSPreview>

        <DSPreview label="With Dot Indicator">
          <Badge variant="terracotta" dot>Workshop</Badge>
          <Badge variant="sage" dot>Community</Badge>
          <Badge variant="success" dot>Available</Badge>
          <Badge variant="warning" dot>3 spots left</Badge>
          <Badge variant="error" dot>Fully booked</Badge>
        </DSPreview>

        <DSPreview label="Sizes">
          <Badge variant="terracotta" size="sm">Small</Badge>
          <Badge variant="terracotta" size="md">Medium</Badge>
          <Badge variant="terracotta" size="lg">Large</Badge>
        </DSPreview>

        <DSPreview label="Removable Tags">
          <Badge variant="terracotta" onRemove={() => {}}>Art</Badge>
          <Badge variant="sage" onRemove={() => {}}>Photography</Badge>
          <Badge variant="neutral" onRemove={() => {}}>Cooking</Badge>
          <Badge variant="default" onRemove={() => {}}>Music</Badge>
        </DSPreview>

        <DSPreview label="Status Indicators">
          <StatusBadge status="online" />
          <StatusBadge status="offline" />
          <StatusBadge status="busy" label="In session" />
          <StatusBadge status="away" />
          <StatusBadge status="new" label="New member" />
        </DSPreview>

        <DSPreview label="Count Badges">
          <div className="relative inline-flex">
            <IconButton label="notifications" variant="outline"><Star /></IconButton>
            <span className="absolute -top-1.5 -right-1.5"><CountBadge count={3} /></span>
          </div>
          <div className="relative inline-flex">
            <IconButton label="messages" variant="outline"><Mail /></IconButton>
            <span className="absolute -top-1.5 -right-1.5"><CountBadge count={142} /></span>
          </div>
          <CountBadge count={5} />
          <CountBadge count={0} variant="neutral" />
          <CountBadge count={100} />
        </DSPreview>
      </div>
    </DSSection>
  );
}
