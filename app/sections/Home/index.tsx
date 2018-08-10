import * as React from 'react';
import * as Loadable from 'react-loadable';
import {Switch, Route, withRouter, RouteComponentProps} from 'react-router';
import compose from '@shopify/react-compose';
import {ReactComponent} from '@shopify/react-utilities/types';

import {NotFound} from 'components';
import {HomeSkeleton, HomeSkeletonProps} from './components';

interface Props {}
type ComposedProps = RouteComponentProps<{}> & Props;

const HomeDetails = Loadable({
  loader: () => import(/* webpackChunkName: 'homeDetails' */ './HomeDetails'),
  loading: HomeSkeleton as ReactComponent<HomeSkeletonProps>,
});

function HomeRoutes({match}: ComposedProps) {
  return (
    <Switch>
      <Route exact path={match.url} component={HomeDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default compose<Props>(withRouter)(HomeRoutes);
