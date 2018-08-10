import * as React from 'react';
import {SkeletonPage, Layout, Card, SkeletonBodyText} from '@shopify/polaris';

function HomeSkeleton() {
  return (
    <SkeletonPage title="your-app-name">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default HomeSkeleton;
