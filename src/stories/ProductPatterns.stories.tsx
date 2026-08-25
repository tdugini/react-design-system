import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Combobox } from '../components/Combobox/Combobox';
import { DataTable, type DataTableColumn } from '../components/DataTable/DataTable';
import { Switch } from '../components/Switch/Switch';
import { TextField } from '../components/TextField/TextField';
import { ToastProvider, useToast } from '../components/Toast/Toast';
import './product-patterns.css';

type Member = {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Invited';
};

const roles = [
  { id: 'admin', label: 'Admin', description: 'Manage members and workspace settings' },
  { id: 'editor', label: 'Editor', description: 'Create and publish content' },
  { id: 'viewer', label: 'Viewer', description: 'Read-only workspace access' },
] as const;

const members: Member[] = [
  { id: 1, name: 'Alessia Romano', email: 'alessia@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Davide Neri', email: 'davide@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Elena Conti', email: 'elena@example.com', role: 'Viewer', status: 'Invited' },
];

const columns: DataTableColumn<Member>[] = [
  {
    id: 'member',
    header: 'Member',
    cell: (member) => <div className="td-pattern__person"><strong>{member.name}</strong><span>{member.email}</span></div>,
    sortValue: (member) => member.name,
    width: '45%',
  },
  { id: 'role', header: 'Role', cell: (member) => member.role, sortValue: (member) => member.role },
  {
    id: 'status',
    header: 'Status',
    cell: (member) => <Badge dot tone={member.status === 'Active' ? 'success' : 'warning'}>{member.status}</Badge>,
    sortValue: (member) => member.status,
  },
];

function TeamManagementSurface() {
  const { toast } = useToast();
  const [role, setRole] = useState<string>('editor');
  const [email, setEmail] = useState('');

  const invite = () => {
    if (!email.trim()) {
      toast({ tone: 'warning', title: 'Email required', description: 'Add an email address before sending the invitation.' });
      return;
    }
    const roleLabel = roles.find((item) => item.id === role)?.label ?? 'Member';
    toast({ tone: 'success', title: 'Invitation sent', description: `${email} was invited as ${roleLabel}.` });
    setEmail('');
  };

  return (
    <main className="td-pattern">
      <header className="td-pattern__header">
        <div>
          <p className="td-pattern__eyebrow">Workspace / Members</p>
          <h1>Team access</h1>
          <p>Invite teammates and keep permissions explicit as the workspace grows.</p>
        </div>
        <Badge dot tone="success">3 seats available</Badge>
      </header>

      <section className="td-pattern__section" aria-labelledby="invite-title">
        <div className="td-pattern__section-copy">
          <h2 id="invite-title">Invite a teammate</h2>
          <p>Invitations expire after seven days. Roles can be changed later.</p>
        </div>
        <div className="td-pattern__invite-grid">
          <TextField label="Work email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" />
          <Combobox
            options={roles}
            value={role}
            onValueChange={setRole}
            getOptionValue={(item) => item.id}
            getOptionLabel={(item) => item.label}
            filterOption={(item, query) => `${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase())}
            label="Role"
            clearable={false}
          />
          <Button onClick={invite}>Send invite</Button>
        </div>
      </section>

      <section className="td-pattern__section td-pattern__section--table" aria-labelledby="members-title">
        <div className="td-pattern__section-copy td-pattern__section-copy--row">
          <div>
            <h2 id="members-title">Current members</h2>
            <p>Sort the table to audit access without leaving the page.</p>
          </div>
          <Button variant="secondary" size="sm">Export CSV</Button>
        </div>
        <DataTable rows={members} columns={columns} getRowKey={(member) => member.id} />
      </section>
    </main>
  );
}

function TeamManagement() {
  return <ToastProvider><TeamManagementSurface /></ToastProvider>;
}

function NotificationSettingsSurface() {
  const { toast } = useToast();
  const [digest, setDigest] = useState(true);
  const [mentions, setMentions] = useState(true);

  return (
    <main className="td-pattern td-pattern--compact">
      <header className="td-pattern__header">
        <div>
          <p className="td-pattern__eyebrow">Account / Notifications</p>
          <h1>Keep signal, remove noise.</h1>
          <p>Settings are grouped by intent rather than by notification channel.</p>
        </div>
      </header>
      <section className="td-pattern__settings-card">
        <Switch checked={digest} onCheckedChange={setDigest} label="Weekly digest" description="A single summary of notable workspace activity." />
        <Switch checked={mentions} onCheckedChange={setMentions} label="Mentions and replies" description="Immediate notifications when someone needs your attention." />
        <div className="td-pattern__settings-actions">
          <Button variant="ghost">Reset</Button>
          <Button onClick={() => toast({ tone: 'success', title: 'Preferences saved', description: 'Notification settings were updated.' })}>Save preferences</Button>
        </div>
      </section>
    </main>
  );
}

function NotificationSettings() {
  return <ToastProvider><NotificationSettingsSurface /></ToastProvider>;
}

const meta = {
  title: 'Patterns/Product surfaces',
  component: TeamManagement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Composition examples deliberately avoid dashboard theatre. They show how primitives behave together in ordinary product workflows, at wide and narrow viewport widths.',
      },
    },
  },
} satisfies Meta<typeof TeamManagement>;

export default meta;
type Story = StoryObj<typeof meta>;
export const TeamAccess: Story = {};
export const NotificationPreferences: Story = { render: () => <NotificationSettings /> };
