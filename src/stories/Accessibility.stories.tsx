import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Switch } from '../components/Switch/Switch';
import { TextField } from '../components/TextField/TextField';
import './accessibility.css';

function Accessibility() {
  return (
    <main className="td-a11y">
      <header className="td-a11y__hero">
        <p className="td-a11y__eyebrow">Foundations / Accessibility</p>
        <h1>Interaction is part of the visual system.</h1>
        <p>
          Accessibility is handled in component behavior and semantics first. The Storybook a11y addon then acts as a regression gate rather than a substitute for design decisions.
        </p>
      </header>

      <section className="td-a11y__principles" aria-label="Accessibility principles">
        <article><span>01</span><h2>Keyboard first</h2><p>Interactive primitives expose predictable focus order, activation and escape behavior without mouse-only affordances.</p></article>
        <article><span>02</span><h2>Semantic state</h2><p>Error, selection, loading and live feedback are communicated through native or ARIA semantics, not color alone.</p></article>
        <article><span>03</span><h2>Visible focus</h2><p>A shared focus token keeps the ring consistent across light and dark surfaces while remaining distinct from hover.</p></article>
        <article><span>04</span><h2>Reduced motion</h2><p>Motion explains state changes, then collapses globally when the operating system requests reduced motion.</p></article>
      </section>

      <section className="td-a11y__states" aria-labelledby="states-heading">
        <div className="td-a11y__section-copy">
          <p className="td-a11y__eyebrow">State inventory</p>
          <h2 id="states-heading">States are documented, not discovered in production.</h2>
        </div>
        <div className="td-a11y__state-grid">
          <div className="td-a11y__sample"><span>Loading action</span><Button loading>Saving changes</Button></div>
          <div className="td-a11y__sample"><span>Unavailable action</span><Button disabled>Publish</Button></div>
          <div className="td-a11y__sample"><span>Validation error</span><TextField label="Workspace slug" defaultValue="north star" error="Use lowercase letters, numbers and hyphens only." /></div>
          <div className="td-a11y__sample"><span>Partial selection</span><Checkbox label="Select all projects" indeterminate /></div>
          <div className="td-a11y__sample"><span>Disabled preference</span><Switch checked={false} onCheckedChange={() => undefined} label="Email summaries" description="Managed by your organization." disabled /></div>
          <div className="td-a11y__sample"><span>Status + text</span><Badge dot tone="warning">Review required</Badge></div>
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: 'Foundations/Accessibility',
  component: Accessibility,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A visible contract for keyboard behavior, semantic state, focus treatment and reduced motion across TD/UI.',
      },
    },
  },
} satisfies Meta<typeof Accessibility>;

export default meta;
type Story = StoryObj<typeof meta>;
export const PrinciplesAndStates: Story = {};
