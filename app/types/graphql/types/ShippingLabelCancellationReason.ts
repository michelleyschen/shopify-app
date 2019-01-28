export enum ShippingLabelCancellationReason {
  WrongMailService = "WRONG_MAIL_SERVICE",
  WrongPackageSize = "WRONG_PACKAGE_SIZE",
  WrongWeight = "WRONG_WEIGHT",
  WrongShipDate = "WRONG_SHIP_DATE",
  ErrorDownloadingLabel = "ERROR_DOWNLOADING_LABEL",
  ErrorPrintingLabel = "ERROR_PRINTING_LABEL",
  WrongLabelFormat = "WRONG_LABEL_FORMAT",
  LabelTooExpensive = "LABEL_TOO_EXPENSIVE",
  Other = "OTHER",
}