import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('reports its current state and requests the inverse state on click', () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} label="Updates" />);
    const control = screen.getByRole('switch', { name: 'Updates' });
    expect(control).toHaveAttribute('aria-checked', 'false');
    fireEvent.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
