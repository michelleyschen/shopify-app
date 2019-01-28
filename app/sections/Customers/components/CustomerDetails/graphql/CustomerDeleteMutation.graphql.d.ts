import { DocumentNode } from "graphql-typed";
import { CustomerDeleteInput } from "../../../../../types/graphql/types";
export namespace CustomerDeleteMutationPartialData {
  export interface CustomerDeleteUserErrors {
    __typename?: "UserError" | null;
    field?: (string | null)[] | null;
    message?: string | null;
  }
  export interface CustomerDelete {
    __typename?: "CustomerDeletePayload" | null;
    userErrors?: (CustomerDeleteMutationPartialData.CustomerDeleteUserErrors | null)[] | null;
  }
}
export interface CustomerDeleteMutationPartialData {
  customerDelete?: CustomerDeleteMutationPartialData.CustomerDelete | null;
}
export namespace CustomerDeleteMutationData {
  export interface Variables {
    input: CustomerDeleteInput;
  }
  export interface CustomerDeleteUserErrors {
    __typename: "UserError";
    field?: string[] | null;
    message: string;
  }
  export interface CustomerDelete {
    __typename: "CustomerDeletePayload";
    userErrors: CustomerDeleteMutationData.CustomerDeleteUserErrors[];
  }
}
export interface CustomerDeleteMutationData {
  customerDelete?: CustomerDeleteMutationData.CustomerDelete | null;
}
declare const document: DocumentNode<CustomerDeleteMutationData, CustomerDeleteMutationData.Variables, CustomerDeleteMutationPartialData>;
export default document;