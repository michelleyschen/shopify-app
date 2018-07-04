import * as React from 'react';
import {Meta, Link} from '@shopify/react-html';

export enum IconSize {
  Large = 114,
  Medium = 72,
  Small = 57,
}

interface Icon {
  size: IconSize;
  url: string;
}

interface Props {
  icons?: Icon[];
  startupImage?: string;
}

export default function AppleHomeScreen({icons = [], startupImage}: Props) {
  const iconsMarkup = icons.map(({size, url}) => (
    <Link
      key={size}
      rel="apple-touch-icon"
      sizes={`${size}x${size}`}
      href={url}
    />
  ));

  const startupImageMarkup = startupImage ? (
    <Link rel="apple-touch-startup-image" href={startupImage} />
  ) : null;

  return (
    <>
      <Meta name="apple-mobile-web-app-capable" content="yes" />
      <Meta name="apple-mobile-web-app-status-bar-style" content="black" />
      {iconsMarkup}
      {startupImageMarkup}
    </>
  );
}
