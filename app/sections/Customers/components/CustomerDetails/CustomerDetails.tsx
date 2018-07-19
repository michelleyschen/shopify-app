import * as React from 'react';
import {Redirect} from 'react-router';
import {
  Page,
  FormLayout,
  TextField,
  Spinner,
  PageActions,
} from '@shopify/polaris';
import {withI18n, WithI18nProps} from '@shopify/react-i18n';
import FormState, {FormDetails, FormData} from '@shopify/react-form-state';
import compose from '@shopify/react-compose';
import {graphql, DataProps, MutationFn} from 'react-apollo';
import {composeGid} from '@shopify/admin-graphql-api-utilities';
import {autobind} from '@shopify/javascript-utilities/decorators';

import en from './translations/en.json';

import customerDetailsQuery, {
  CustomerDetailsQueryData,
} from './graphql/CustomerDetailsQuery.graphql';

import customerUpdateMutation, {
  CustomerUpdateMutationData,
} from './graphql/CustomerUpdateMutation.graphql';

import customerDeleteMutation, {
  CustomerDeleteMutationData,
} from './graphql/CustomerDeleteMutation.graphql';

interface Fields {
  firstName: string;
  lastName: string;
}

interface Props {
  id: string;
}

interface State {
  redirectUrl?: string;
}

type ComposedProps = Props &
  WithI18nProps &
  DataProps<CustomerDetailsQueryData, CustomerDetailsQueryData.Variables> & {
    customerUpdateMutation: MutationFn<
      CustomerUpdateMutationData,
      CustomerUpdateMutationData.Variables
    >;
  } & {
    customerDeleteMutation: MutationFn<
      CustomerDeleteMutationData,
      CustomerDeleteMutationData.Variables
    >;
  };

class CustomerDetails extends React.PureComponent<ComposedProps, State> {
  state: State = {};

  render() {
    const {i18n, data} = this.props;
    const {redirectUrl} = this.state;

    if (redirectUrl && redirectUrl !== '') {
      return <Redirect to={redirectUrl} />;
    }

    const customer = data && data.customer;

    if (!customer) {
      return <Spinner />;
    }

    const initialValues = {
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
    };

    return (
      <FormState
        initialValues={initialValues}
        onSubmit={this.handleCustomerUpdate}
      >
        {(formDetails: FormDetails<Fields>) => {
          const {fields, submit, submitting, dirty} = formDetails;

          return (
            <Page
              title={i18n.translate('title')}
              breadcrumbs={[{content: 'Customers', url: '/customers'}]}
            >
              <FormLayout>
                <TextField
                  {...fields.firstName}
                  label={i18n.translate('firstName')}
                />
                <TextField
                  {...fields.lastName}
                  label={i18n.translate('lastName')}
                />
              </FormLayout>
              <PageActions
                primaryAction={{
                  content: i18n.translate('save'),
                  onAction: submit,
                  loading: submitting,
                  disabled: !dirty,
                }}
                secondaryActions={[
                  {
                    content: i18n.translate('delete'),
                    onAction: this.handleCustomerDelete,
                    destructive: true,
                  },
                ]}
              />
            </Page>
          );
        }}
      </FormState>
    );
  }

  @autobind
  private async handleCustomerUpdate({fields}: FormData<Fields>) {
    const {customerUpdateMutation, id} = this.props;

    await customerUpdateMutation({
      variables: {
        input: {
          id: composeGid('Customer', id),
          firstName: fields.firstName.value,
          lastName: fields.lastName.value,
        },
      },
    });
  }

  @autobind
  private async handleCustomerDelete() {
    const {customerDeleteMutation, id} = this.props;

    await customerDeleteMutation({
      variables: {
        input: {
          id: composeGid('Customer', id),
        },
      },
    });

    this.setState({redirectUrl: '/customers'});
  }
}

export default compose<Props>(
  graphql(customerDetailsQuery, {
    skip: ({id}: ComposedProps) => !id,
    options: ({id}: ComposedProps) => ({
      variables: {
        id: composeGid('Customer', id),
      },
    }),
  }),
  graphql(customerUpdateMutation, {
    name: 'customerUpdateMutation',
    options: {
      refetchQueries: ['CustomerList'],
    },
  }),
  graphql(customerDeleteMutation, {
    name: 'customerDeleteMutation',
  }),
  withI18n({
    id: 'CustomerDetails',
    fallback: en,
    async translations(locale) {
      try {
        const dictionary = await import(/* webpackChunkName: "CustomerDetails-i18n-[request]" */ `./translations/${locale}.json`);
        return dictionary;
      } catch (err) {}
    },
  }),
)(CustomerDetails);
