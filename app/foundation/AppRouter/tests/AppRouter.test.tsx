import React from 'react';
import {shallow} from 'enzyme';
import {Switch, Route} from 'react-router';
import {Home} from 'sections';
import NotFound from '../../NotFound';
import AppRouter from '../AppRouter';

describe('<AppRouter />', () => {
  it('renders one <Switch />', () => {
    const appRouter = shallow(<AppRouter />);
    expect(appRouter.find(Switch)).toHaveLength(1);
  });

  it('renders root <Route /> with <Home /> as component', () => {
    const appRouter = shallow(<AppRouter />);

    const rootRoute = appRouter.find(Route).filter({path: '/'});
    expect(rootRoute.prop('exact')).toBe(true);
    expect(rootRoute.prop('component')).toBe(Home);
  });

  it('renders the last <Route /> with <NotFound /> as component', () => {
    const appRouter = shallow(<AppRouter />);

    const lastRoute = appRouter.find(Route).last();
    expect(lastRoute.prop('path')).toBeUndefined();
    expect(lastRoute.prop('component')).toBe(NotFound);
  });
});
