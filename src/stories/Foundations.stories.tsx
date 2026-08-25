import type { Meta, StoryObj } from '@storybook/react-vite';
import './foundations.css';

const colors = [
  ['Background', '--td-color-bg'], ['Surface', '--td-color-surface'], ['Text', '--td-color-text'],
  ['Muted', '--td-color-text-muted'], ['Border', '--td-color-border'], ['Accent', '--td-color-accent'],
  ['Success', '--td-color-success'], ['Warning', '--td-color-warning'], ['Danger', '--td-color-danger'], ['Info', '--td-color-info'],
];

const spaces = [1,2,3,4,5,6,8,10,12];

function Foundations() {
  return (
    <div className="td-foundations">
      <header><span>Foundations</span><h1>Tokens before components.</h1><p>Raw values are hidden behind semantic decisions so themes can change without rewriting component APIs.</p></header>
      <section><h2>Semantic color</h2><div className="td-foundations__colors">{colors.map(([label, token]) => <div key={token}><span className="td-foundations__color" style={{ background: `var(${token})` }} /><strong>{label}</strong><code>{token}</code></div>)}</div></section>
      <section><h2>Spacing / 4px grid</h2><div className="td-foundations__spaces">{spaces.map((space) => <div key={space}><code>space-{space}</code><span style={{ width: `var(--td-space-${space})` }} /></div>)}</div></section>
      <section><h2>Typography</h2><div className="td-foundations__type"><p className="td-foundations__display">Interface typography should disappear into the work.</p><p>Body text prioritizes compact readability. Labels rely on weight before size, and monospace is reserved for metadata or technical values.</p><code>const density = 'comfortable';</code></div></section>
    </div>
  );
}

const meta = { title: 'Foundations/Tokens', component: Foundations, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Foundations>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Reference: Story = {};
