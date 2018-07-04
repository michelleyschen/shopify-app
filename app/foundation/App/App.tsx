import * as React from 'react';
import {AppProvider as PolarisProvider} from '@shopify/polaris';
import AppRouter from '../AppRouter';

export default function App() {
  return (
    <PolarisProvider>
      <AppRouter />
    </PolarisProvider>
  );
}
