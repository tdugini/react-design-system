import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToastProvider, useToast } from './Toast';

function Harness() {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: 'Saved', description: 'Changes are live.', duration: 0 })}>Notify</button>;
}

describe('Toast', () => {
  it('announces and dismisses a notification', () => {
    render(<ToastProvider><Harness /></ToastProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));

    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Saved' }));
    expect(screen.queryByText('Changes are live.')).not.toBeInTheDocument();
  });
});
