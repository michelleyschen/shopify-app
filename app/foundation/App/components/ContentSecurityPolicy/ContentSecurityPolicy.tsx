import * as React from 'react';
import {
  DefaultSource,
  StyleSource,
  ScriptSource,
  ImageSource,
  SpecialSource,
} from '@shopify/react-network';

export default function ContentSecurityPolicy() {
  return (
    <>
      <DefaultSource
        sources={[SpecialSource.Self, 'localhost:8080', 'https://*']}
      />
      <ScriptSource
        sources={[
          SpecialSource.Self,
          // Need eval in dev for React Hot Loader
          SpecialSource.UnsafeEval,
          'localhost:8080',
          'https://*',
        ]}
      />
      <ImageSource
        sources={[SpecialSource.Self, 'localhost:8080', SpecialSource.Data]}
      />
      <StyleSource sources={[SpecialSource.UnsafeInline, 'localhost:8080']} />
    </>
  );
}
