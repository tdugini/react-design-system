import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('disables interaction while loading', () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('defaults to type button', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button', { name: 'Action' })).toHaveAttribute('type', 'button');
  });
});
