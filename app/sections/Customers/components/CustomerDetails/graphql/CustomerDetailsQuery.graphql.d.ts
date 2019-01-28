import { DocumentNode } from "graphql-typed";
export namespace CustomerDetailsQueryPartialData {
  export interface Customer {
    __typename?: "Customer" | null;
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  }
}
export interface CustomerDetailsQueryPartialData {
  customer?: CustomerDetailsQueryPartialData.Customer | null;
}
export namespace CustomerDetailsQueryData {
  export interface Variables {
    id: string;
  }
  export interface Customer {
    __typename: "Customer";
    id: string;
    firstName?: string | null;
    lastName?: string | null;
  }
}
export interface CustomerDetailsQueryData {
  customer?: CustomerDetailsQueryData.Customer | null;
}
declare const document: DocumentNode<CustomerDetailsQueryData, CustomerDetailsQueryData.Variables, CustomerDetailsQueryPartialData>;
export default document;