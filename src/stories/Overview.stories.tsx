import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { TextField } from '../components/TextField/TextField';
import { Switch } from '../components/Switch/Switch';
import './overview.css';

function Overview() {
  return (
    <main className="td-overview">
      <section className="td-overview__hero">
        <p className="td-overview__kicker">TD/UI · React design system</p>
        <h1>Quiet by default.<br />Precise when it matters.</h1>
        <p className="td-overview__lede">
          A deliberately restrained component system built around semantic tokens,
          accessible interaction and APIs that remain useful beyond a single product.
        </p>
        <div className="td-overview__badges">
          <Badge dot tone="success">Accessible primitives</Badge>
          <Badge>React + TypeScript</Badge>
          <Badge>Zero UI dependencies</Badge>
        </div>
      </section>

      <section className="td-overview__grid">
        <article className="td-overview__card td-overview__card--wide">
          <span className="td-overview__eyebrow">01 / Intent</span>
          <h2>Designed for product work, not screenshots.</h2>
          <p>States, focus, density and content edge cases are treated as first-class design decisions. Decoration is secondary.</p>
        </article>
        <article className="td-overview__card">
          <span className="td-overview__eyebrow">02 / Tokens</span>
          <h2>Semantic, themeable foundations.</h2>
          <div className="td-overview__swatches" aria-label="Core semantic colors">
            <span style={{ background: 'var(--td-color-text)' }} />
            <span style={{ background: 'var(--td-color-accent)' }} />
            <span style={{ background: 'var(--td-color-info)' }} />
            <span style={{ background: 'var(--td-color-danger)' }} />
          </div>
        </article>
        <article className="td-overview__card">
          <span className="td-overview__eyebrow">03 / Motion</span>
          <h2>Short, functional, optional.</h2>
          <p>Transitions explain state change rather than adding spectacle, and reduced-motion preferences are respected globally.</p>
        </article>
      </section>

      <section className="td-overview__demo">
        <div className="td-overview__demo-copy">
          <span className="td-overview__eyebrow">Composition sample</span>
          <h2>A settings surface made from primitives.</h2>
          <p>No special “settings card” component: the system stays small by composing stable primitives.</p>
        </div>
        <div className="td-overview__panel">
          <TextField label="Workspace name" defaultValue="Northstar" hint="Visible to everyone in your workspace." />
          <Switch checked label="Weekly digest" description="Receive a compact summary every Monday." onCheckedChange={() => undefined} />
          <Checkbox label="Include product updates" defaultChecked />
          <div className="td-overview__actions">
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: 'Overview/TD UI',
  component: Overview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The visual and engineering principles behind TD/UI. The system intentionally avoids visual trends that make unrelated products look identical.',
      },
    },
  },
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Introduction: Story = {};
