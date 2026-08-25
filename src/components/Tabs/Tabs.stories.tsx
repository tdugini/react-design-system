import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from './Tabs';
function TabsDemo() { return <Tabs defaultValue="overview"><TabsList ariaLabel="Project sections"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger><TabsTrigger value="billing" disabled>Billing</TabsTrigger></TabsList><TabsPanel value="overview">A compact summary of the current project.</TabsPanel><TabsPanel value="activity">Recent events and system changes.</TabsPanel><TabsPanel value="settings">Project-level preferences and access.</TabsPanel></Tabs>; }
const meta = { title: 'Components/Navigation/Tabs', component: TabsDemo, parameters: { docs: { description: { component: 'Compound tabs with roving keyboard navigation, controlled/uncontrolled state and semantic tab relationships.' } } } } satisfies Meta<typeof TabsDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
