import * as React from 'react';
import compose from '@shopify/react-compose';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {withI18n, WithI18nProps} from '@shopify/react-i18n';
import {
  Page,
  Card,
  ResourceList,
  Avatar,
  TextStyle,
  Stack,
  Spinner,
} from '@shopify/polaris';
import {graphql, DataProps} from 'react-apollo';
import {parseGid} from '@shopify/admin-graphql-api-utilities';

import en from './translations/en.json';
import cstomerListQuery, {
  CustomerListQueryData,
} from './graphql/CustomerListQuery.graphql';

export interface Props {}
type ComposedProps = Props &
  WithI18nProps &
  DataProps<CustomerListQueryData, CustomerListQueryData.Variables>;

interface State {
  reverse: boolean;
}

class CustomerList extends React.PureComponent<ComposedProps, State> {
  state: State = {
    reverse: false,
  };

  render() {
    const {i18n, data} = this.props;

    if (!data || !data.customers) {
      return <Spinner />;
    }

    const sortValue = this.state.reverse ? 'desc' : 'asc';

    return (
      <Page title={i18n.translate('title')}>
        <Card>
          <ResourceList
            resourceName={{
              singular: i18n.translate('resourceName.singular'),
              plural: i18n.translate('resourceName.plural'),
            }}
            items={data.customers.edges}
            renderItem={this.renderCustomerRow}
            sortValue={sortValue}
            sortOptions={[
              {label: i18n.translate('customersAsc'), value: 'asc'},
              {label: i18n.translate('customersDesc'), value: 'desc'},
            ]}
            onSortChange={this.handleSortChange}
          />
        </Card>
      </Page>
    );
  }

  @autobind
  private renderCustomerRow(item: CustomerListQueryData.CustomersEdges) {
    const {i18n} = this.props;
    const {
      node: {id, displayName, lifetimeDuration},
    } = item;
    const media = <Avatar customer size="medium" name={displayName} />;
    const url = `/customers/${parseGid(id)}`;

    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={i18n.translate('viewDetails', {name: displayName})}
      >
        <Stack>
          <Stack.Item fill>
            <h3>
              <TextStyle variation="strong">{displayName}</TextStyle>
            </h3>
          </Stack.Item>
          <div>{lifetimeDuration}</div>
        </Stack>
      </ResourceList.Item>
    );
  }

  @autobind
  private async handleSortChange(selected: string) {
    const {data} = this.props;

    if (!data) {
      return;
    }

    const newReverse = Boolean(selected === 'desc');

    await data.refetch({
      reverse: newReverse,
    });

    this.setState({
      reverse: newReverse,
    });
  }
}

export default compose<Props>(
  graphql(cstomerListQuery),
  withI18n({
    id: 'CustomerList',
    fallback: en,
    async translations(locale) {
      try {
        const dictionary = await import(/* webpackChunkName: "CustomerList-i18n-[request]" */ `./translations/${locale}.json`);
        return dictionary;
      } catch (err) {}
    },
  }),
)(CustomerList);
