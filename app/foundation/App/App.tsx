import * as React from 'react';
import * as Loadable from 'react-loadable';
import {AppProvider} from '@shopify/polaris';
import Link from '../Link';
import Routes from '../Routes';

const modules: string[] = [];

export default function App() {
  return (
    <Loadable.Capture
      // eslint-disable-next-line react/jsx-no-bind
      report={moduleName => modules.push(moduleName)}
    >
      <AppProvider linkComponent={Link}>
        <Routes />
      </AppProvider>
    </Loadable.Capture>
  );
}
