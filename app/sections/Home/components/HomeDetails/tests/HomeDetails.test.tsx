import * as React from 'react';
import {Page} from '@shopify/polaris';
import {mountWithAppContext} from 'tests/utilities';

import HomeDetails from '../HomeDetails';

jest.mock('@shopify/polaris', () => ({
  ...require.requireActual('@shopify/polaris'),
  Page: function Page() {
    return null;
  },
}));

describe('<HomeDetails />', () => {
  describe('<Page />', () => {
    it('renders', async () => {
      const homeDetails = await mountWithAppContext(<HomeDetails />);
      expect(homeDetails.find(Page)).toExist();
    });

    it('renders app title', async () => {
      const homeDetails = await mountWithAppContext(<HomeDetails />);
      expect(homeDetails.find(Page)).toHaveProp('title', 'your-app-name');
    });
  });
});
