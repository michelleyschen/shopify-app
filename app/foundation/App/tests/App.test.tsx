import React from 'react';
import {shallow} from 'enzyme';
import {AppProvider} from '@shopify/polaris';
import AppRouter from '../../AppRouter';
import App from '../App';

describe('<AppProvider />', () => {
  it('renders one <AppProvider />', () => {
    const app = shallow(<App />);
    expect(app.find(AppProvider)).toHaveLength(1);
  });

  it('renders <AppRouter />', () => {
    const app = shallow(<App />);
    expect(app.find(AppRouter)).toHaveLength(1);
  });
});
