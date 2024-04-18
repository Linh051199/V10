export interface SerInvReportTotalStockOutRpt {
  StockOutNo: string;
  StockOutTime: string;
  Note: string;
  StockOutType: string;
  Amount: string;
  Lst_Ser_InvReportTotalStockOutRpt: any;
}

export interface Search_SerInvReportTotalStockOutRpt_Params {
  FromDate: string;
  DealerCode: string;
  ToDate: string;
  FlagDataWH: any;

  FromDateFromTo: any;
}
