import { DocumentNode } from "graphql-typed";
import { CustomerInput } from "../../../../../types/graphql/types";
export namespace CustomerUpdateMutationPartialData {
  export interface CustomerUpdateCustomer {
    __typename?: "Customer" | null;
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  }
  export interface CustomerUpdateUserErrors {
    __typename?: "UserError" | null;
    field?: (string | null)[] | null;
    message?: string | null;
  }
  export interface CustomerUpdate {
    __typename?: "CustomerUpdatePayload" | null;
    customer?: CustomerUpdateMutationPartialData.CustomerUpdateCustomer | null;
    userErrors?: (CustomerUpdateMutationPartialData.CustomerUpdateUserErrors | null)[] | null;
  }
}
export interface CustomerUpdateMutationPartialData {
  customerUpdate?: CustomerUpdateMutationPartialData.CustomerUpdate | null;
}
export namespace CustomerUpdateMutationData {
  export interface Variables {
    input: CustomerInput;
  }
  export interface CustomerUpdateCustomer {
    __typename: "Customer";
    id: string;
    firstName?: string | null;
    lastName?: string | null;
  }
  export interface CustomerUpdateUserErrors {
    __typename: "UserError";
    field?: string[] | null;
    message: string;
  }
  export interface CustomerUpdate {
    __typename: "CustomerUpdatePayload";
    customer?: CustomerUpdateMutationData.CustomerUpdateCustomer | null;
    userErrors: CustomerUpdateMutationData.CustomerUpdateUserErrors[];
  }
}
export interface CustomerUpdateMutationData {
  customerUpdate?: CustomerUpdateMutationData.CustomerUpdate | null;
}
declare const document: DocumentNode<CustomerUpdateMutationData, CustomerUpdateMutationData.Variables, CustomerUpdateMutationPartialData>;
export default document;