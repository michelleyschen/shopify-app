import * as React from 'react';
import {AppProvider} from '@shopify/polaris';
import Link from '../Link';
import AppRouter from '../AppRouter';

export default function App() {
  return (
    <AppProvider linkComponent={Link}>
      <AppRouter />
    </AppProvider>
  );
}
