// ================== 65. Quản lý phiếu nhập kho ==============
// * Search Admin
export interface Ser_Inv_StockIn_Search {
  DealerCode: string;
  StockInNo: string; // Số phiếu nhập
  SupplierID: string; // NCC = 2951(HTC)
  TruckNo: string;
  StockDateFromTo?: Date[]; // Ngày nhập kho
  StockDateFrom?: string;
  StockDateTo?: string;
  OrderNo: string | boolean; // Số đơn hàng
  IsPending: string | boolean; // Mới tạo
  IsExecuting: string | boolean; // Tiến hành
  IsFinished: string | boolean; // Kết thúc
  IsAdjustment: string | boolean; // Điều chỉnh
  IsReject: string | boolean; // Hủy
  Ft_PageIndex: number;
  Ft_PageSize: number;
  FlagDataWH: boolean; // Lấy dữ liệu lịch sử
}
// * Admin
export interface Ser_Inv_StockIn {
  PartID: string;
  PartGroupID: string;
  PartTypeID: string;
  DealerCode: string;
  PartCode: string;
  EngName: string;
  VieName: string;
  Note: string;
  Unit: string;
  Location: string;
  VAT: string;
  Quantity: string;
  MinQuantity: string;
  Cost: string;
  Price: string;
  Model: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FreqUsed: string;
  CusDebt: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagInTST: string;
}
// * Get Detail
export interface Ser_Inv_StockInResponse {
  Lst_Ser_Inv_StockIn: Ser_Inv_StockInMst[];
  Lst_Ser_Inv_StockInDetail: Ser_Inv_StockInDtl[];
}
// Master
export interface Ser_Inv_StockInMst {
  StockInID: string;
  StockInNo: string;
  StockInType: string;
  StockInDate: string;
  Description: string;
  DriverName: string;
  DrivingLicense: string;
  DriverID: string;
  TruckNo: string;
  StockOutNo: string;
  LogLUDateTime: string;
  LogLUBy: string;
  SupplierID: string;
  UserCode: string;
  Status: string;
  StatusText: string;
  DealerCode: string;
  BillNo: string;
  IsAdjustment: string;
  AdjustmentBy: string;
  AdjustmentDate: string;
  AdjustmentNote: string;
  OldStockInID: string;
  RejectBy: string;
  RejectDate: string;
  RejectDescription: string;
  OrderPartId: string;
  OrderPartNo: string;
  CreatedDate: string;
  CreatedBy: string;
  TSTRequestNo: string;
  SupplierName: string;
  UserName: string;
  OldStockInNo: string;
  OrderPartType: string;
  FlagOrderNCC: string;
  StaffID: string;
}
// Detail
export interface Ser_Inv_StockInDtl {
  StockInDetailIndex: string;
  Quantity: string;
  Description: string;
  StockOutOrderNo: string;
  LogLUDateTime: string;
  LogLUBy: string;
  PartID: string;
  PartCode: string;
  VieName: string;
  Unit: string;
  StockInID: string;
  StockInNO: string;
  DealerCode: string;
  PlanLocationID: string;
  ActualLocationID: string;
  Price: string;
  VAT: string;
  InStock: string;
  BeforeTax: string;
  AfterTax: string;
}
// Gen StockInNo
export interface Ser_Inv_StockIn_GetMaxStockInNo {
  AdjustmentBy: string;
  AdjustmentDate: string;
  AdjustmentNote: string;
  BillNo: string;
  CreatedBy: string;
  CreatedDate: string;
  DealerCode: string;
  Description: string;
  DriverID: string;
  DriverName: string;
  DrivingLicense: string;
  FlagOrderNCC: string;
  IsAdjustment: string;
  LogLUBy: string;
  LogLUDateTime: string;
  OldStockInID: string;
  OldStockInNo: string;
  OrderPartId: string;
  OrderPartNo: string;
  OrderPartType: string;
  RejectBy: string;
  RejectDate: string;
  RejectDescription: string;
  StaffID: string;
  Status: string;
  StatusText: string;
  StockInDate: string;
  StockInID: string;
  StockInNo: string;
  StockInType: string;
  StockOutNo: string;
  SupplierID: string;
  SupplierName: string;
  TSTRequestNo: string;
  TruckNo: string;
  UserCode: string;
  UserName: string;
}

export interface Ser_CusDebit {
  CusDebitID: string; // FK
  DealerCode: string;
  CusID: string;
  ROID: string;
  DebitAmount: string;
  DebitDate: string;
  Note: string;
  LogLUDateTime: string;
  LogLUBy: string;
  InsNo: string;
  StockInID: string;
  SupplierID: string;
  DebitType: string;
  CreatedDate: string;
  CreatedBy: string;
  RONo: string;
  PlateNo: string;
  StockInNo: string;
}
export interface Ser_CusDebitResponse {
  lst_Ser_CusDebit: Ser_CusDebit[];
}
