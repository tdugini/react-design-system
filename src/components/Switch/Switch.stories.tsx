import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
function SwitchDemo() { const [checked, setChecked] = useState(true); return <Switch checked={checked} onCheckedChange={setChecked} label="Automatic updates" description="Install compatible patch releases without asking." />; }
const meta = { title: 'Components/Forms/Switch', component: SwitchDemo, parameters: { docs: { description: { component: 'Boolean setting control implemented with role=switch and an explicit checked state.' } } } } satisfies Meta<typeof SwitchDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interactive: Story = {};
