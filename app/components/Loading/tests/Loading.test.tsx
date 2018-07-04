import React from 'react';
import {shallow} from 'enzyme';
import {Spinner} from '@shopify/polaris';
import Loading from '../Loading';

describe('<Loading />', () => {
  it('renders one <Spinner />', () => {
    const loading = shallow(<Loading />);
    expect(loading.find(Spinner)).toHaveLength(1);
  });
});
