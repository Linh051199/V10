export interface SerInvReportTotalStockInRpt {
  StockInNo: string;
  DateIn: string;
  Remark: string;
  SupplierName: string;
  AMOUNT: string;
  VATAMOUNT: string;
  SUMAMOUNT: string;
  Lst_Ser_InvReportTotalStockInRpt: any;
}

export interface Search_SerInvReportTotalStockInRpt_Params {
  FromDate: string;
  FlagDataWH: any;
  DealerCode: string;
  ToDate: string;

  FromDateFromTo: any;
}
