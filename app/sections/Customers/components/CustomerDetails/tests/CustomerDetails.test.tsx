import * as React from 'react';
import {TextField, Spinner} from '@shopify/polaris';

import {createGraphQL, fillGraphQL, mountWithAppContext} from 'tests/utilities';

import CustomerDetails from '../CustomerDetails';
import customerDetailsQuery from '../graphql/CustomerDetailsQuery.graphql';

describe('<CustomerDetails />', () => {
  it('load first name into the text field', async () => {
    const firstName = 'Tobi';

    const customerDetails = await mountWithAppContext(
      <CustomerDetails id="123" />,
      {
        graphQL: createGraphQL({
          CustomerDetails: fillGraphQL(customerDetailsQuery, {
            customer: {firstName},
          }),
        }),
      },
    );

    expect(customerDetails.find(TextField).at(0)).toHaveProp(
      'value',
      firstName,
    );
  });

  it('renders <Spinner/> before the query returned', async () => {
    const customerDetails = await mountWithAppContext(
      <CustomerDetails id="123" />,
      {
        graphQL: createGraphQL({
          CustomerDetails: fillGraphQL(customerDetailsQuery),
        }),
        resolveInitialGraphQL: false,
      },
    );

    expect(customerDetails.find(Spinner)).toExist();
  });
});
