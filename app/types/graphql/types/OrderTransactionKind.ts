export enum OrderTransactionKind {
  Sale = "SALE",
  Capture = "CAPTURE",
  Authorization = "AUTHORIZATION",
  Void = "VOID",
  Refund = "REFUND",
  Change = "CHANGE",
  EmvAuthorization = "EMV_AUTHORIZATION",
  SuggestedRefund = "SUGGESTED_REFUND",
}