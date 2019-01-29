import * as React from 'react';

import {createSerializer} from '@shopify/react-html';
import {AppProvider} from '@shopify/polaris';
import {Props as PropsType} from '@shopify/useful-types';

interface AppDetails {
  apiKey: string;
  shop: string;
}

type Props = {
  children: React.ReactNode;
} & PropsType<typeof AppProvider> &
  Partial<AppDetails>;

const {Serialize, WithSerialized} = createSerializer<AppDetails>('appDetails');

export default function AppDetails({
  children,
  apiKey: explicitApiKey,
  shop: explicitShop,
  ...appProviderProps
}: Props) {
  return (
    <WithSerialized>
      {(appDetails) => {
        const apiKey = explicitApiKey || (appDetails && appDetails.apiKey);
        const shop = explicitShop || (appDetails && appDetails.shop);

        return apiKey && shop ? (
          <>
            <AppProvider
              {...appProviderProps}
              shopOrigin={shop}
              apiKey={apiKey}
            >
              {children}
            </AppProvider>
            <Serialize
              data={() => ({
                apiKey,
                shop,
              })}
            />
          </>
        ) : null;
      }}
    </WithSerialized>
  );
}
