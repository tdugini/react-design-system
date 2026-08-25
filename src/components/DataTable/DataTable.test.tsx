import { fireEvent, render, screen, within } from '@testing-library/react';
import { DataTable, type DataTableColumn } from './DataTable';

type Row = { id: number; name: string; score: number };
const rows: Row[] = [{ id: 1, name: 'Beta', score: 80 }, { id: 2, name: 'Alpha', score: 90 }];
const columns: DataTableColumn<Row>[] = [
  { id: 'name', header: 'Name', cell: row => row.name, sortValue: row => row.name },
  { id: 'score', header: 'Score', cell: row => row.score, sortValue: row => row.score },
];

describe('DataTable', () => {
  it('sorts by a sortable header', () => {
    render(<DataTable rows={rows} columns={columns} getRowKey={row => row.id} />);
    fireEvent.click(screen.getByRole('button', { name: /name/i }));
    const bodyRows = screen.getAllByRole('row').slice(1);
    expect(within(bodyRows[0]).getByText('Alpha')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /name/i }));
    const reversedRows = screen.getAllByRole('row').slice(1);
    expect(within(reversedRows[0]).getByText('Beta')).toBeInTheDocument();
  });
});
