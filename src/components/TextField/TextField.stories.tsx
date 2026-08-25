import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';
const meta = { title: 'Components/Forms/TextField', component: TextField, tags: ['autodocs'], args: { label: 'Email address', placeholder: 'name@company.com', hint: 'Used for account notifications.' }, parameters: { docs: { description: { component: 'A labeled text input that wires hint/error copy through aria-describedby and keeps visual focus on the field boundary.' } } } } satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Error: Story = { args: { defaultValue: 'tommaso@', error: 'Enter a valid email address.' } };
export const Disabled: Story = { args: { defaultValue: 'Locked value', disabled: true } };
export const WithAffixes: Story = { args: { label: 'Project URL', defaultValue: 'design-system', prefix: <span>github.com/</span>, suffix: <span>↗</span> } };
