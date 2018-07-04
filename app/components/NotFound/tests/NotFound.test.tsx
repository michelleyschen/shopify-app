import * as React from 'react';
import {Page, PageProps, EmptyState, EmptyStateProps} from '@shopify/polaris';
import {mountWithAppContext} from 'tests/utilities';
import NotFound from '../NotFound';

jest.mock('@shopify/polaris', () => ({
  ...require.requireActual('@shopify/polaris'),
  Page: function Page({children}: PageProps) {
    return children;
  },
  EmptyState: function EmptyState({children}: EmptyStateProps) {
    return children;
  },
}));

describe('<NotFound />', () => {
  it('renders one <Page />', async () => {
    const notFound = await mountWithAppContext(<NotFound />);
    expect(notFound.find(Page)).toExist();
  });

  it('renders one <EmptyState />', async () => {
    const notFound = await mountWithAppContext(<NotFound />);
    expect(notFound.find(EmptyState)).toExist();
  });
});
