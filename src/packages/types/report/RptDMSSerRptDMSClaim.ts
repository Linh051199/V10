export interface RptDMSSerRptDMSClaim {
  DealerCode: string;
  CusName: string;
  CusCarPlateNo: string;
  CusCarFrameNo: string;
  CusCarModel: string;
  CusPhoneNo: string;
  ClaimNo: string;
  ClaimType: string;
  ClaimLevel: string;
  ReceiveDate: string;
  Rate: string;
  CusRequest: string;
  Lst_DMSClaimByClaimType: any;
  TotalSell: any;
  SLKNXeMoi: any;
  TiLe: any;
  SLKNChatLuong: any;
}

export interface Search_RptDMSSerRptDMSClaim_Params {
  TDate_From: string;
  TDate_To: string;
  DealerCode: any;
  FlagDataWH: any;

  TDate_FromFromTo: any;
}
