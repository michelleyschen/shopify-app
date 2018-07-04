import * as React from 'react';
import {Responsive, AppleHomeScreen} from '@shopify/react-html';

export default function Metadata() {
  return (
    <>
      <Responsive coverNotch allowPinchToZoom />
      <AppleHomeScreen />
    </>
  );
}
