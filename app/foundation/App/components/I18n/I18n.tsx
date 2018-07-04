import * as React from 'react';

import {createSerializer} from '@shopify/react-html';
import {Provider, Manager} from '@shopify/react-i18n';

interface Props {
  locale: string;
  children: React.ReactNode;
}

interface Data {
  locale: string;
  translations: ReturnType<Manager['extract']>;
}

const {Serialize, WithSerialized} = createSerializer<Data>('i18n');

export default function I18n({locale: explicitLocale, children}: Props) {
  return (
    <WithSerialized>
      {(serialized) => {
        const locale = serialized ? serialized.locale : explicitLocale;
        const translations = serialized && serialized.translations;
        const manager = new Manager(
          {locale, fallbackLocale: 'en'},
          translations,
        );

        return (
          <>
            <Provider manager={manager}>{children}</Provider>
            <Serialize
              data={() => ({
                locale: manager.details.locale,
                translations: manager.extract(),
              })}
            />
          </>
        );
      }}
    </WithSerialized>
  );
}
