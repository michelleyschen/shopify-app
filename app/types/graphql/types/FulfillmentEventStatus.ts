export enum FulfillmentEventStatus {
  LabelPurchased = "LABEL_PURCHASED",
  LabelPrinted = "LABEL_PRINTED",
  ReadyForPickup = "READY_FOR_PICKUP",
  Confirmed = "CONFIRMED",
  InTransit = "IN_TRANSIT",
  OutForDelivery = "OUT_FOR_DELIVERY",
  AttemptedDelivery = "ATTEMPTED_DELIVERY",
  Delivered = "DELIVERED",
  Failure = "FAILURE",
}