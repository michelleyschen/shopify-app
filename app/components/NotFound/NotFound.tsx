import * as React from 'react';

import {withI18n, WithI18nProps} from '@shopify/react-i18n';
import compose from '@shopify/react-compose';
import {Page, EmptyState} from '@shopify/polaris';
import {Status, StatusCode} from '@shopify/react-network';
import {Omit} from '@shopify/useful-types';

import emptyStateIllustration from './illustrations/404.svg';
import en from './translations/en.json';

export interface Props {
  goToUrl?: string;
  shortPageName?: string;
  pageName?: string;
  resourceName?: string;
}

type ComposedProps = WithI18nProps & Props;

function NotFound({
  i18n,
  resourceName = i18n.translate('defaultResource'),
  shortPageName = i18n.translate('defaultPageName'),
  pageName = i18n.translate('defaultPageName'),
  goToUrl = '/',
}: ComposedProps) {
  return (
    <>
      <Status code={StatusCode.NotFound} />
      <Page title="">
        <EmptyState
          heading={i18n.translate('heading', {resourceName})}
          image={emptyStateIllustration}
          action={{
            content: i18n.translate('cta', {
              pageName: shortPageName,
            }),
            url: goToUrl,
          }}
        >
          <p>
            {i18n.translate('body', {
              pageName,
              resourceName,
            })}
          </p>
        </EmptyState>
      </Page>
    </>
  );
}

export default compose<Props>(
  withI18n({
    id: 'NotFound',
    fallback: en,
    async translations(locale) {
      try {
        const dictionary = await import(/* webpackChunkName: "NotFound-i18n-[request]" */ `./translations/${locale}.json`);
        return dictionary;
      } catch (err) {}
    },
  }),
)(NotFound) as React.ComponentType<Omit<WithI18nProps, 'i18n'>>;
