import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';
function SkeletonDemo() { return <div style={{ width: 340, display: 'grid', gridTemplateColumns: '44px 1fr', gap: 12, alignItems: 'center' }}><Skeleton width={44} height={44} radius="50%"/><div style={{ display:'grid', gap:8 }}><Skeleton width="58%" height={13}/><Skeleton width="88%" height={10}/></div></div>; }
const meta = { title: 'Components/Feedback/Skeleton', component: SkeletonDemo } satisfies Meta<typeof SkeletonDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ContentPlaceholder: Story = {};
