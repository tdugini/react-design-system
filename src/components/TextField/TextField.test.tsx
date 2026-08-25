import { render, screen } from '@testing-library/react';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associates label and hint with the input', () => {
    render(<TextField label="Email" hint="Work email only" />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    const hint = screen.getByText('Work email only');
    expect(input).toHaveAttribute('aria-describedby', hint.id);
  });

  it('announces invalid state', () => {
    render(<TextField label="Email" error="Invalid address" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  });
});
