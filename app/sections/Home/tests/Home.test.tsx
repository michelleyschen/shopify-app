import React from 'react';
import {mount} from 'enzyme';
import {createWithAppMountOptions} from 'tests/utilities';

import {Page} from '@shopify/polaris';
import Home from '../Home';

describe('<Home />', () => {
  describe('<Page />', () => {
    it('renders by default', () => {
      const home = mount(<Home />, createWithAppMountOptions());
      expect(home.find(Page)).toHaveLength(1);
    });

    it('renders with app title', () => {
      const home = mount(<Home />, createWithAppMountOptions());
      expect(home.find(Page).prop('title')).toBe('App Name');
    });
  });
});
