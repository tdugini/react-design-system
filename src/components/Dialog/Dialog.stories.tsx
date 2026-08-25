import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Dialog } from './Dialog';
function DialogDemo() { const [open, setOpen] = useState(false); return <><Button variant="secondary" onClick={() => setOpen(true)}>Open dialog</Button><Dialog open={open} onOpenChange={setOpen} title="Rename workspace" description="This name appears in navigation and invitations." footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={() => setOpen(false)}>Rename</Button></>}><TextField label="Workspace name" defaultValue="Northstar" /></Dialog></>; }
const meta = { title: 'Components/Overlays/Dialog', component: DialogDemo, parameters: { docs: { description: { component: 'Modal surface built on the native dialog element: browser focus management first, custom behavior only where needed.' } } } } satisfies Meta<typeof DialogDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
