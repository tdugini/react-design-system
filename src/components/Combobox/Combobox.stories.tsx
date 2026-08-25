import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Combobox } from './Combobox';

type Person = { id: string; name: string; team: string };

const people: Person[] = [
  { id: 'alessia', name: 'Alessia Romano', team: 'Design' },
  { id: 'davide', name: 'Davide Neri', team: 'Engineering' },
  { id: 'elena', name: 'Elena Conti', team: 'Content' },
  { id: 'marco', name: 'Marco Ferri', team: 'Engineering' },
  { id: 'sara', name: 'Sara Bianchi', team: 'Product' },
];

function Demo() {
  const [value, setValue] = useState('');
  const selected = people.find((person) => person.id === value);
  return (
    <div style={{ width: 360, display: 'grid', gap: 16 }}>
      <Combobox
        options={people}
        value={value}
        onValueChange={setValue}
        getOptionValue={(person) => person.id}
        getOptionLabel={(person) => person.name}
        filterOption={(person, query) => `${person.name} ${person.team}`.toLowerCase().includes(query.toLowerCase())}
        label="Owner"
        hint="Search by name or team. Arrow keys and Enter work without a mouse."
        placeholder="Find a teammate"
      />
      {selected && <div><Badge tone="info">{selected.team}</Badge></div>}
    </div>
  );
}

const meta = {
  title: 'Components/Inputs/Combobox',
  component: Demo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Generic searchable selection built around the ARIA combobox/listbox pattern. Filtering, keyboard navigation and value mapping stay independent from the option model.',
      },
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const EmptyResult: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Combobox
        options={people}
        getOptionValue={(person) => person.id}
        getOptionLabel={(person) => person.name}
        label="Owner"
        defaultValue="alessia"
      />
    </div>
  ),
};
export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Combobox
        options={people}
        getOptionValue={(person) => person.id}
        getOptionLabel={(person) => person.name}
        label="Owner"
        defaultValue="marco"
        disabled
      />
    </div>
  ),
};
