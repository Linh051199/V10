export interface SerCountCustomerOnlyHTC {
  CusID: string;
  CusName: string;
  Address: string;
  Phone: string;
  PlateNo: string;
  RONO: string;
  TradeMarkName: string;
  FrameNo: string;
  CheckInDate: string;
  CusRequest: string;
  lst_Ser_Count_Customer_OnlyHTC: any;
}

export interface Search_SerCountCustomerOnlyHTC_Params {
  FromDate: string;
  ToDate: string;
  DealerCode: string;
  Vin: string;
  PlateNo: string;
  FlagDataWH?: any;

  FromDateFromTo: any;
}
