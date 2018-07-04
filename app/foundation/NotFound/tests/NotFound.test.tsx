import React from 'react';
import {shallow} from 'enzyme';
import {Page, EmptyState} from '@shopify/polaris';
import NotFound from '../NotFound';

describe('<NotFound />', () => {
  it('renders one <Page />', () => {
    const notFound = shallow(<NotFound />);
    expect(notFound.find(Page)).toHaveLength(1);
  });

  it('renders one <EmptyState />', () => {
    const notFound = shallow(<NotFound />);
    expect(notFound.find(EmptyState)).toHaveLength(1);
  });
});
