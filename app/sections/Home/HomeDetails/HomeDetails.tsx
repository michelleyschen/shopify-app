import * as React from 'react';
import {Page, Layout, Card} from '@shopify/polaris';

export interface Props {}

export default function HomeDetails() {
  return (
    <Page title="your-app-name">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <p>
              To get started, edit{' '}
              <code>app/sections/Home/HomeDetails/HomeDetails.tsx</code>
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
