import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { DataTable, type DataTableColumn } from './DataTable';

type Project = { id: number; name: string; owner: string; status: 'Live' | 'Review' | 'Paused'; score: number; updated: string };
const rows: Project[] = [
  { id: 1, name: 'Checkout', owner: 'A. Romano', status: 'Live', score: 98, updated: '2h ago' },
  { id: 2, name: 'CMS migration', owner: 'M. Ferri', status: 'Review', score: 84, updated: 'Yesterday' },
  { id: 3, name: 'Search indexing', owner: 'L. Conti', status: 'Paused', score: 71, updated: '3d ago' },
  { id: 4, name: 'Booking funnel', owner: 'S. Bianchi', status: 'Live', score: 94, updated: '4d ago' },
];
const columns: DataTableColumn<Project>[] = [
  { id: 'name', header: 'Project', cell: row => <strong>{row.name}</strong>, sortValue: row => row.name, width: '34%' },
  { id: 'owner', header: 'Owner', cell: row => row.owner, sortValue: row => row.owner },
  { id: 'status', header: 'Status', cell: row => <Badge dot tone={row.status === 'Live' ? 'success' : row.status === 'Review' ? 'warning' : 'neutral'}>{row.status}</Badge>, sortValue: row => row.status },
  { id: 'score', header: 'Quality', cell: row => `${row.score}%`, sortValue: row => row.score, align: 'right' },
  { id: 'updated', header: 'Updated', cell: row => <span style={{ color: 'var(--td-color-text-muted)' }}>{row.updated}</span>, align: 'right' },
];
function TableDemo() { return <div style={{ minWidth: 680 }}><DataTable rows={rows} columns={columns} getRowKey={row => row.id} caption="Active delivery work" initialSort={{ columnId: 'score', direction: 'desc' }} /></div>; }
const meta = { title: 'Components/Data Display/DataTable', component: TableDemo, parameters: { layout: 'padded', docs: { description: { component: 'Generic typed table with column-level rendering, stable row keys and accessible sortable headers. No domain-specific row model is baked into the component.' } } } } satisfies Meta<typeof TableDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Sortable: Story = {};
export const Empty: Story = { render: () => <div style={{ minWidth: 680 }}><DataTable<Project> rows={[]} columns={columns} getRowKey={row => row.id} emptyState="No projects match these filters." /></div> };
