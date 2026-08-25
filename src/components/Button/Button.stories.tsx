import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const Arrow = () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" /></svg>;

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Primary action primitive with restrained hierarchy, predictable loading behavior and no layout shift.' } } },
  args: { children: 'Save changes', variant: 'primary', size: 'md' },
  argTypes: { variant: { control: 'select' }, size: { control: 'radio' } },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'View details' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Delete workspace' } };
export const Loading: Story = { args: { loading: true, children: 'Saving…' } };
export const WithIcon: Story = { args: { trailingIcon: <Arrow />, children: 'Continue' } };
export const Disabled: Story = { args: { disabled: true } };
