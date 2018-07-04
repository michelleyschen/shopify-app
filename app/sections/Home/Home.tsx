import * as React from 'react';
import {Page, Button} from '@shopify/polaris';

function handleClick() {
  console.log('this was clicked');
}

export default function Home() {
  return (
    <Page title="App Name">
      <Button onClick={handleClick}>Click Here</Button>
    </Page>
  );
}
