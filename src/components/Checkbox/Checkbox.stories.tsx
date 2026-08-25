import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
const meta = { title: 'Components/Forms/Checkbox', component: Checkbox, tags: ['autodocs'], args: { label: 'Include archived projects', description: 'Archived rows remain searchable but are hidden from default views.' } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Select current page' } };
