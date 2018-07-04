import * as React from 'react';
import {
  Baseline,
  Responsive,
  AppleHomeScreen,
} from '@shopify/react-app-metadata';

import favicon from './images/favicon.ico';

export default function Metadata() {
  return (
    <>
      <Baseline title="Shopify App" favicon={favicon} />
      <Responsive coverNotch allowPinchToZoom />
      <AppleHomeScreen />
    </>
  );
}
