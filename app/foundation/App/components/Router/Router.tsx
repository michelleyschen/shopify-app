import * as React from 'react';
import {StaticRouter, BrowserRouter} from 'react-router-dom';

export interface Props {
  children?: React.ReactNode;
  location?: string;
}

export default function Router({location, children}: Props) {
  return location ? (
    <StaticRouter location={location} context={{}}>
      {children}
    </StaticRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
}
