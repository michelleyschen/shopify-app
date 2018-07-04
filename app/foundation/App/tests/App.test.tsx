import * as React from 'react';
import {AppProvider} from '@shopify/polaris';
import {mountWithAppContext} from 'tests/utilities';

import App from '../App';

jest.mock('@shopify/polaris', () => ({
  ...require.requireActual('@shopify/polaris'),
  AppProvider: function AppProvider() {
    return null;
  },
}));

describe('<App />', () => {
  it('renders one <AppProvider />', async () => {
    const app = await mountWithAppContext(<App />);
    expect(app.find(AppProvider)).toExist();
  });
});
