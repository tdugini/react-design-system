import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
const Dots = () => <svg viewBox="0 0 16 16" fill="currentColor"><circle cx="3" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="13" cy="8" r="1.2"/></svg>;
const meta = { title: 'Components/Actions/IconButton', component: IconButton, tags: ['autodocs'], args: { label: 'More options', icon: <Dots />, size: 'md' } } satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Danger: Story = { args: { tone: 'danger', label: 'Delete item' } };
