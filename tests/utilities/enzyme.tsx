import * as React from 'react';

import {ErrorBoundary, createAppContextMount} from '@shopify/react-testing';
import {
  Provider as I18nProvider,
  Manager as I18nManager,
} from '@shopify/react-i18n';
import {AppProvider} from '@shopify/polaris';

export * from '@shopify/enzyme-utilities';

export interface I18nManagerContext {
  i18nManager: I18nManager;
}

interface Options {
  locale?: string;
  currency?: string;
}
type Context = I18nManagerContext;

export const mountWithAppContext = createAppContextMount<
  true,
  Options,
  Context
>({
  context(options: Options) {
    const {locale = 'en', currency = 'usd'} = options;

    const i18nManager = new I18nManager({
      fallbackLocale: 'en',
      locale,
      currency,
    });
    return {i18nManager};
  },
  render(element: React.ReactNode, {i18nManager}) {
    return <AppContext i18nManager={i18nManager}>{element}</AppContext>;
  },
});

interface Props {
  children: React.ReactNode;
  i18nManager: I18nManager;
}

function AppContext({children, i18nManager}: Props) {
  return (
    <AppProvider>
      <I18nProvider manager={i18nManager}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </I18nProvider>
    </AppProvider>
  );
}
