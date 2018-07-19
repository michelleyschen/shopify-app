import * as React from 'react';
import {Switch, Route, withRouter, RouteComponentProps} from 'react-router';
import compose from '@shopify/react-compose';

import {NotFound} from 'components';
import {CustomerList, CustomerDetails} from './components';

interface Props {}
type ComposedProps = RouteComponentProps<{}> & Props;

function Customers({match}: ComposedProps) {
  return (
    <Switch>
      <Route exact path={match.url} component={CustomerList} />
      <Route
        exact
        path={`${match.url}/:id`}
        render={({
          match: {
            params: {id},
          },
        }: RouteComponentProps<{id: string}>) => (
          <CustomerDetails key={id} id={id} />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default compose<Props>(withRouter)(Customers);
