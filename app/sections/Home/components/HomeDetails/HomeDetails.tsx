import * as React from 'react';
import {Page, Link} from '@shopify/polaris';

export interface Props {}

export default function HomeDetails() {
  return (
    <Page title="your-app-name">
      <Link url="/customers">Customers</Link>
    </Page>
  );
}
