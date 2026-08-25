import { useMemo, useState, type Key, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './DataTable.css';

export type SortDirection = 'asc' | 'desc';

export interface DataTableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (row: T) => Key;
  caption?: string;
  emptyState?: ReactNode;
  className?: string;
  initialSort?: { columnId: string; direction?: SortDirection };
}

function compareValues(a: string | number, b: string | number): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function DataTable<T>({
  rows,
  columns,
  getRowKey,
  caption,
  emptyState = 'No results found.',
  className,
  initialSort,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ columnId: string; direction: SortDirection } | null>(
    initialSort ? { columnId: initialSort.columnId, direction: initialSort.direction ?? 'asc' } : null,
  );

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((item) => item.id === sort.columnId);
    if (!column?.sortValue) return rows;
    const next = [...rows].sort((a, b) => compareValues(column.sortValue!(a), column.sortValue!(b)));
    return sort.direction === 'asc' ? next : next.reverse();
  }, [columns, rows, sort]);

  const toggleSort = (columnId: string) => {
    setSort((current) => {
      if (current?.columnId !== columnId) return { columnId, direction: 'asc' };
      return { columnId, direction: current.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  return (
    <div className={cx('td-data-table', className)}>
      <div className="td-data-table__scroller">
        <table>
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((column) => {
                const sortable = Boolean(column.sortValue);
                const active = sort?.columnId === column.id;
                const ariaSort = active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none';
                return (
                  <th
                    key={column.id}
                    scope="col"
                    style={{ width: column.width, textAlign: column.align ?? 'left' }}
                    aria-sort={sortable ? ariaSort : undefined}
                  >
                    {sortable ? (
                      <button type="button" className="td-data-table__sort" onClick={() => toggleSort(column.id)}>
                        <span>{column.header}</span>
                        <span className={cx('td-data-table__sort-icon', active && 'td-data-table__sort-icon--active')} aria-hidden="true">
                          {active && sort.direction === 'desc' ? '↓' : '↑'}
                        </span>
                      </button>
                    ) : column.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length === 0 ? (
              <tr><td className="td-data-table__empty" colSpan={columns.length}>{emptyState}</td></tr>
            ) : sortedRows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td key={column.id} style={{ textAlign: column.align ?? 'left' }}>{column.cell(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
