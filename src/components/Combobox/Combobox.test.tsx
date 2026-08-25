import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Combobox } from './Combobox';

const options = [
  { id: 'design', label: 'Design' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'product', label: 'Product' },
];

describe('Combobox', () => {
  it('filters and selects an option with the keyboard', () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={options}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.label}
        label="Team"
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole('combobox', { name: 'Team' });
    fireEvent.change(input, { target: { value: 'eng' } });
    expect(screen.getByRole('option', { name: 'Engineering' })).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onValueChange).toHaveBeenCalledWith('engineering', options[1]);
    expect(input).toHaveValue('Engineering');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('supports clearing a selected value', () => {
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={options}
        getOptionValue={(option) => option.id}
        getOptionLabel={(option) => option.label}
        label="Team"
        defaultValue="product"
        onValueChange={onValueChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Clear Team' }));
    expect(onValueChange).toHaveBeenCalledWith('', undefined);
    expect(screen.getByRole('combobox', { name: 'Team' })).toHaveValue('');
  });
});
