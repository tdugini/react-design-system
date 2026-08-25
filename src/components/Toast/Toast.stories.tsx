import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { ToastProvider, useToast, type ToastTone } from './Toast';

function ToastDemo() {
  const { toast, dismissAll } = useToast();
  const show = (tone: ToastTone) => toast({
    tone,
    title: tone === 'danger' ? 'Publish failed' : tone === 'warning' ? 'Review needed' : 'Changes saved',
    description: tone === 'danger' ? 'The API rejected this revision. Your draft is still safe.' : 'The workspace is up to date.',
    action: tone === 'danger' ? { label: 'Retry', onClick: () => undefined } : undefined,
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button onClick={() => show('success')}>Show success</Button>
      <Button variant="secondary" onClick={() => show('info')}>Show info</Button>
      <Button variant="secondary" onClick={() => show('warning')}>Show warning</Button>
      <Button variant="danger" onClick={() => show('danger')}>Show error</Button>
      <Button variant="ghost" onClick={dismissAll}>Dismiss all</Button>
    </div>
  );
}

function StoryFrame() {
  return <ToastProvider><ToastDemo /></ToastProvider>;
}

const meta = {
  title: 'Components/Feedback/Toast',
  component: StoryFrame,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Provider-driven transient feedback with a bounded queue, semantic live-region roles, optional actions, keyboard-accessible dismissal and motion that respects reduced-motion preferences.',
      },
    },
  },
} satisfies Meta<typeof StoryFrame>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const TopRight: Story = {
  render: () => <ToastProvider position="top-right"><ToastDemo /></ToastProvider>,
};
