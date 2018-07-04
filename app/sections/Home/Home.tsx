import * as React from 'react';
import {Switch, Route, withRouter, RouteComponentProps} from 'react-router';
import compose from '@shopify/react-compose';

import {NotFound} from 'components';
import {HomeDetails} from './components';

interface Props {}
type ComposedProps = RouteComponentProps<{}> & Props;

function Home({match}: ComposedProps) {
  return (
    <Switch>
      <Route exact path={match.url} component={HomeDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default compose<Props>(withRouter)(Home);
