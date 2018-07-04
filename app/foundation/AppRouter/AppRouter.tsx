import React from 'react';
import {Switch, Route} from 'react-router';
import {Home} from 'sections';
// import NotFound from '../NotFound';

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}
