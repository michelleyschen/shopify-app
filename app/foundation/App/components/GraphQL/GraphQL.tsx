import * as React from 'react';

import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

import {createSerializer} from '@shopify/react-html';
import {Omit} from '@shopify/useful-types';

import createGraphQLClient, {Options} from './client';

interface Props {
  client?: ApolloClient<unknown>;
  initialData?: Options['initialData'];
}

interface State {
  client: ApolloClient<unknown>;
}

const {Serialize, WithSerialized} = createSerializer<Options['initialData']>(
  'apollo',
);

class GraphQL extends React.Component<Props, State> {
  state: State = {client: this.props.client || createGraphQLClient(this.props)};

  render() {
    const {client} = this.state;
    const {children} = this.props;

    return (
      <>
        <ApolloProvider client={client}>{children}</ApolloProvider>
        <Serialize data={() => client.extract() as Options['initialData']} />
      </>
    );
  }
}

export default function ConnectedGraphQL(props: Omit<Props, 'initialData'>) {
  return (
    <WithSerialized>
      {(initialData) => <GraphQL {...props} initialData={initialData} />}
    </WithSerialized>
  );
}
