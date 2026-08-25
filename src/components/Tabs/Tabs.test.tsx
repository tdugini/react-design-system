import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs, TabsList, TabsPanel, TabsTrigger } from './Tabs';

describe('Tabs', () => {
  it('changes the visible panel', () => {
    render(
      <Tabs defaultValue="one">
        <TabsList ariaLabel="Demo">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsPanel value="one">First panel</TabsPanel>
        <TabsPanel value="two">Second panel</TabsPanel>
      </Tabs>,
    );
    expect(screen.getByText('First panel')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByText('Second panel')).toBeInTheDocument();
    expect(screen.queryByText('First panel')).not.toBeInTheDocument();
  });
});
