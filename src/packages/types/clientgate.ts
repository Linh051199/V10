import { _dicExcs } from "../store";

export interface ClientGateInfo {
  SolutionCode: string;
  NetworkID: string;
  NetworkName: string;
  GroupNetworkID: string;
  CoreAddr: string | null;
  PingAddr: string | null;
  XSysAddr: string | null;
  WSUrlAddr: string;
  WSUrlAddrLAN: string;
  DBUrlAddr: string | null;
  DefaultVersion: string;
  MinVersion: string;
  FlagActive: string;
  LogLUDTime: string;
  LogLUBy: string;
}

export interface ClientGateInfoResponse {
  Data: {
    _strTId: string;
    _strAppTId: string;
    _objTTime: string;
    _strType: string;
    _strErrCode: string;
    _objResult?: ClientGateInfo[];
    _excResult: any;
    _dicDebugInfo: {
      strTid: string;
      strAppTId: string;
      "dataInput.SolutionCode": string;
      "dataInput.NetworkIDSearch": string;
    };
  };
}
export interface DeleteBankAccountParam {
  AccountNo: string;
  BankCode: string;
}

export interface Mst_Province {
  ProvinceCode: string;
  AreaCode: string;
  ProvinceName: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface Mst_Dealer {
  DealerCode: string;
  DealerType: string;
  ProvinceCode: string;
  BUCode: string;
  BUPattern: string;
  DealerName: string;
  FlagDirect: string;
  FlagActive: string;
  DealerScale: string;
  DealerPhoneNo: string;
  DealerFaxNo: string;
  CompanyName: string;
  CompanyAddress: string;
  ShowroomAddress: string;
  GarageAddress: string | null;
  GaragePhoneNo: string | null;
  GarageFaxNo: string | null;
  DirectorName: string | null;
  DirectorPhoneNo: string | null;
  DirectorEmail: string | null;
  SalesManagerName: string | null;
  SalesManagerPhoneNo: string | null;
  SalesManagerEmail: string;
  GarageManagerName: string | null;
  GarageManagerPhoneNo: string | null;
  GarageManagerEmail: string | null;
  TaxCode: string;
  ContactName: string;
  Signer: string | null;
  SignerPosition: string | null;
  CtrNoSigner: string | null;
  CtrNoSignerPosition: string | null;
  HTCStaffInCharge: string | null;
  Remark: string;
  DealerAddress01: string | null;
  DealerAddress02: string | null;
  DealerAddress03: string | null;
  DealerAddress04: string | null;
  DealerAddress05: string | null;
  FlagTCG: string;
  FlagAutoLXX: string;
  FlagAutoMapVIN: string;
  FlagAutoSOAppr: string;
}

export interface Mst_TransporterCar {
  TransporterCode: string;
  PlateNo: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_UnitPriceAVN {
  AVNCode: string;
  EffDateTime: string;
  UnitPriceAVN: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Transporter {
  TransporterCode: string;
  TransporterName: string;
  FlagActive: number;
  TransportContractNo: string;
  Address: string;
  PhoneNo: string;
  FaxNo: string;
  DirectorFullName: string;
  DirectorPhoneNo: string;
  ContactorFullName: string;
  ContactorPhoneNo: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
  BizUserType: string;
}

export interface Auto_MapVIN_StorageRate {
  StorageCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBTVal: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarAllocationByArea {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  MBPercent: number;
  MTPercent: number;
  MNPercent: number;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_DelayTransports {
  StorageCode: string;
  StorageName: string;
  DealerCode: string;
  DealerName: string;
  DelayTransport: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InsuranceType {
  InsCompanyCode: string;
  InsTypeCode: string;
  EffectiveDate: string;
  InsTypeName: string;
  Rate: string;
  FlagActive: number;
  Remark: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_UnitPriceGPS {
  ContractNo: string;
  UnitPrice: string;
  EffStartDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InsuranceFee {
  InsuranceContractNo: string;
  InsurancePercent: string;
  EffStartDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Dlr_CA {
  AutoId: string;
  DealerCode: string;
  CAIssuer: string;
  CASubject: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Port {
  PortCode: string;
  PortName: string;
  ProvinceCode: string;
  PortAddress: string;
  PortType: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_PortType {
  PortType: string;
  PortTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_InsuranceCompany {
  InsCompanyCode: string;
  InsCompanyName: string;
  FlagActive: number;
  Remark: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_District {
  DistrictCode: string;
  ProvinceCode: string;
  DistrictName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_DealerType {
  DealerType: string;
  DealerTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface CGResult<T> {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  ItemCount: number;
  DataList: T[];
}

export interface CGResponse<T> {
  Data: {
    _strTId: string;
    _strAppTId: string;
    _objTTime: string;
    _strType: string;
    _strErrCode: string;
    _objResult: CGResult<T> | T;
    _excResult: any;
    _dicDebugInfo: {
      strTid: string;
      strAppTId: string;
    };
  };
  isSuccess?: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  // errorCode: string;
  // errorInfo?: errorInfo;
  // debugInfo: object;
  _strErrCode: string;
  _strTId?: string;
  _strAppTId?: string;
  _objTTime?: string;
  _strType?: string;
  _dicDebug: object;
  _dicExcs: _dicExcs;
  DataList?: T[];
  Data?: T;
  ItemCount?: number;
  PageCount?: number;
  PageIndex?: number;
  PageSize?: number;
}

export enum FlagActiveEnum {
  Active = "1",
  Inactive = "0",
  All = "",
}

export interface SearchParam {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}
export interface SearchSys_UserControl {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
  GroupCode: string;
  GroupName: string;
}

export interface Search_Mst_Quota extends SearchParam {
  DealerCode: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
  SOApprDateFromTo: any;
}

export interface Search_Mst_CarPrice extends SearchParam {
  SOType: string;
  SpecCode: string;
}

export interface Search_Mst_Bank extends SearchParam {
  BankCode: string;
  BankName: string;
  FlagPaymentBank: FlagActiveEnum;
  FlagMonitorBank: FlagActiveEnum;
  FlagMortageBank: FlagActiveEnum;
}

export interface Search_Mst_Quota_Param extends SearchParam {
  DealerCode: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
}

export interface Search_Mst_Transporter extends SearchParam {
  TransporterCode: string;
  TransporterName: string;
}
export interface Search_Mst_TCGCarPrice extends SearchParam {
  SOType: string;
  SpecCode: string;
}

export interface SearchDealerParam extends SearchParam {
  DealerCode: string;
  DealerName: string;
  FlagAutoLXX: FlagActiveEnum;
  FlagAutoMapVIN: FlagActiveEnum;
  FlagAutoSOAppr: FlagActiveEnum;
}

export interface Search_Mst_BankAccount extends SearchParam {
  DealerCode?: string;
  AccountNo?: string;
}

export interface Search_Mst_BankDealer extends SearchParam {
  DealerCode?: string;
  BankCode?: string;
}
// TCGCarSalesPrice
export interface SearchTCGCarSalePriceParam extends SearchParam {
  SpecCode: string;
}

export interface DeleteTCGCarSalePriceParam {
  SpecCode: string;
}

export interface Mst_TCGCarSalePriceParam {
  SpecCode: string;
  SpecDescription: string;
  UnitPrice: number;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface Mst_InvoiceIDSearch {
  InvoiceIDCode?: string;
  CreatedDateFrom?: any;
  CreatedDateTo?: any;
  FlagActive?: any;
  Ft_PageSize?: number;
  Ft_PageIndex?: number;
  CreatedDateFromTo?: Date[]; //  thêm theo chuẩn frame của anh Đức => DateRangeBox custom
}
// Mst_SalesManType
export interface Mst_SalesManType extends SearchParam {
  DepartmentCode: string;
  SMType: string;
  SMTypeName: string;
  FlagEmail: string;
  FlagActive: any;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface DeleteDealerParam {
  DealerCode: string;
}

export interface Mst_WarrantyExpires {
  ModelCode: string;
  WarrantyExpires: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  WarrantyKM: string;
  mcm_ModelName: string;
}

export interface Mst_MngRateTonKhoBanHang {
  DealerCode: string;
  ModelCode: string;
  NguongBH: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Bank {
  BankCode: string;
  BankCodeParent: string;
  BankName: string;
  BankBUCode: string;
  BankBUPattern: string;
  FlagPaymentBank: string;
  FlagMortageBank: string;
  FlagActive: string;
  PhoneNo: string;
  FaxNo: string;
  Address: string;
  PICName: string;
  PICPhoneNo: string;
  PICEmail: string;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FlagMonitorBank: string;
  ProvinceCode: string;
  ProvinceName: string;
  BenBankCode: string;
  NumberOfGuaranteeExt: string;
}

export interface Mst_BankAccount {
  AccountNo: string;
  KeyWord: string;
  BankCode: string;
  DealerCode: string;
  AccountName: string;
  FlagAccGrtClaim: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  AccountNoHTC: string;
  md_DealerName: string;
  mb_BankName: string;
  BankName?: string;
}

// export interface Mst_BankAccount {
//   AccountNo?: string;
//   KeyWord?: string;
//   BankCode?: string;
//   DealerCode?: string;
//   AccountName?: string;
//   FlagAccGrtClaim?: string;
//   FlagActive?: string;
//   LogLUDateTime?: string;
//   LogLUBy?: string;
//   AccountNoHTC?: string;
//   md_DealerName?: string;
//   mb_BankName?: string;
// }

export interface Mst_AmplitudeApprOrd {
  DealerCode: string;
  ModelCode: string;
  AmplitudeOrdMax: string;
  AmplitudePlanMax: string;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm_ModelName: string;
}

export interface Mst_MaintainTaskItem {
  MtnTkCode: string;
  MtnTkItemCode: string;
  MtnTkItemName: string;
  ViewIdx: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_Part {
  PartCode: string;
  PartName: string;
  PartNameFS: string;
  PartDesc: string;
  PartUnitCodeStd: string;
  PartUnitCodeDefault: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface Sys_UserControl {
  DataList: {
    GroupCode: string;
    GroupName: string;
    FlagActive: string;
    LogLUDTimeUTC: string;
    LogLUBy: string;
    MST: string;
  };
  Lst_Map_SG_SO?: any;
  Lst_Map_SG_SU?: any;
  FlagActive?: any;
  Lst_Sys_UserNotMap?: any;
  Lst_Sys_ObjectNotMap?: any;
}

export interface UploadedFile {
  FileId: string;
  NodeID: string;
  NetworkID: string;
  SolutionCode: string;
  FileUrlLocal: string;
  FileUrlFS: string;
  FileFullName: string;
  FileType: string;
  FileSize: number;
  FileContent: string;
  RefNo: string;
  RefType: string;
  FileIdDelete: string;
  CreateDTimeUTC: string;
  CreateBy: string;
  LUDTimeUTC: string;
  LUBy: string;
  UpdDTimeUTC: string;
  UpdBy: string;
  DeleteDTimeUTC: string;
  DeleteBy: string;
  FlagIsDeleted: string;
  FlagIsRecycle: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
  isUploading?: boolean;
}
export interface Sys_UserControlData {
  GroupCode: string;
  GroupName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
  MST: string;
}

export interface Mng_Quota {
  DealerCode: string;
  SpecCode: string;
  QtyQuota: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  UpdateBy: string;
  UpdateDTime: string;
  md_DealerName: string;
  mcm_ModelCode: string;
  mcm_ModelName: string;
  mcs_SpecDescription: string;
}

export interface Mst_Area {
  AreaCode: string;
  AreaName: string;
  AreaRootCode: string;
  Level: string;
  FlagActive?: FlagActiveEnum;
  LogLUDTimeUTC?: string;
  LogLUBy: string;
}

// Quản lý địa điểm nhận xe của Đại lý
export interface Mst_PointRegis {
  PointRegisCode: string; // Mã địa điểm
  DealerCode: string; // Mã đại lý
  PointRegisName: string; // Địa chỉ giao xe
  MapLongitude: string; // Kinh độ
  MapLatitude: string; // Vĩ độ
  Radius: string; // Bán kính
  Remark: string; // Ghi chú
  FlagActive: string; // Trạng thái
  LogLUDateTime?: string;
  LogLUBy: string;
  md_DealerName: string; // Tên đại lý
}
type BizUserTypes = "MAIN.HQ" | "MAIN.DL";

export interface User {
  UserCode: string;
  UserName: string;
  UserPassword: string;
  Email: string;
  DealerCode: string;
  BankCode: string;
  TransporterCode?: string;
  InsCompanyCode?: string;
  Language?: string;
  PhoneNo?: string;
  TimeZone?: string;
  UserID?: string;
  FlagSysAdmin: string;
  FlagSysViewer: string;
  FlagActive: string;
  LogLUDTimeUTC?: string;
  LogLUBy?: string;
  md_DealerName: string;
  mb_BankName: string;
  mt_TransporterName?: string;
  mic_InsCompanyName?: string;
  BizUserType: BizUserTypes;
  SUDealerCode?: string;
  SUBankCode?: string;
  SUFlagActive?: string;
  SUTransporterCode?: string;
  SUInsCompanyCode?: string;
  NetworkID?: string;
  UserPasswordNew?: string;
  MST?: string;
  OrganCode?: string;
  DepartmentCode?: string;
  Position?: string;
  VerificationCode?: string;
  Avatar?: string;
  UUID?: string;
  FlagDLAdmin?: string;
  FlagNNTAdmin?: string;
  OrgID?: string;
  CustomerCodeSys?: string;
  CustomerCode?: string;
  CustomerName?: string;
  ACId?: string;
  ACAvatar?: string;
  ACEmail?: string;
  ACLanguage?: string;
  ACName?: string;
  ACPhone?: string;
  ACTimeZone?: string;
  mo_OrganCode?: string;
  mo_OrganName?: string;
  mdept_DepartmentCode?: string;
  mdept_DepartmentName?: string;
  mnnt_DealerType?: string;
  ctitctg_CustomerGrpCode?: string;
  md_FlagTCG?: string;
}
export interface Permission {
  GroupCode: string;
  ObjectCode: string;
  LogLUDateTime: string;
  LogLUBy: string;
  so_ObjectCode: string;
  so_ObjectName: string;
  so_ServiceCode: string;
  so_ObjectType: string;
  so_FlagExecModal: "0" | "1";
  so_FlagActive: "0" | "1";
}

export interface Mst_SalesOrderType {
  SOType: string;
  SOTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Storage {
  StorageCode: string;
  StorageName: string;
  ProvinceCode: string;
  StorageAddress: string;
  StorageType: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_VINProductionYear_Actual {
  AssemblyStatus: string;
  VINCharacters: string;
  ProductionYear: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_MinInventory {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  QtyInv: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_PaymentType {
  PaymentType: string;
  PaymentTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CarCancelType {
  CarCancelType: string;
  CarCancelTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Plant {
  PlantCode: string;
  PlantName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
  Ft_PageIndex: any;
  Ft_PageSize: any;
  KeyWord: any;
  FlagActive: any;
}

export interface Mst_CarInvoice {
  SpecCode: string;
  VehiclesType: string;
  NumberOfSeats: string;
  CarType: string;
  VAT: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CabinCertificate {
  CabinCertificateNo: string;
  CarType: string;
  FlagActive: number;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_StorageAreaRate {
  StorageCode: string;
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBTVal: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Auto_MapVIN_DistributionSumRate {
  ModelCode: string;
  ModelName: string;
  SpecCode: string;
  SpecDescription: string;
  ColorExtCode: string;
  ColorExtNameVN: string;
  MBVal: string;
  MTVal: string;
  MNVal: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_RegistrationInfo {
  RegistYear: string;
  ProvinceCode: string;
  ProvinceName: string;
  Qty: string;
  RegistPercent: string;
  TotalAmount: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_InventoryCost {
  StorageCode: string;
  StorageName: string;
  CostTypeCode: string;
  CostTypeName: string;
  UnitPrice: string;
  FlagActive: number;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CustomerBase {
  CustomerBaseCode: string;
  CustomerBaseName: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLuBy: string;
}

export interface Mst_CarSpec {
  ModelCode: string;
  RootSpec: string;
  SpecCode: string;
  SpecDescription: string;
  StdOptCode: string;
  OCNCode: string;
  GradeCode: string;
  AssemblyStatus: string;
  FlagAmbulance: string;
  FlagInvoiceFactory: string;
  NumberOfSeats: string;
  QuotaDate: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_DealerSalesGroupType {
  SalesGroupType: string;
  SalesGroupTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_DealerSalesType {
  SalesType: string;
  SalesGroupType: string;
  SalesTypeName: string;
  SalesTypeNameVN: string;
  SalesTypeDescription: string;
  SalesTypeDescriptionVN: string;
  FlagActive: string;
  FlagActiveLogLUDTimeUTC: string;
  LogLUBy: string;
}
export interface Mst_InvoiceIDType {
  InvoiceIDCode: string;
  InvoiceIDType: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagActive: string;
  LogLUDTimeUTC: null;
  LogLUBy: string;
}

export interface Mst_InvoiceIDHTCSearch {
  InvoiceIDCode?: string;
  CreatedDateFrom?: any;
  CreatedDateTo?: any;
  FlagActive?: string;
  Ft_PageIndex?: number;
  Ft_PageSize?: number;
  CreatedDate?: string;
  CreatedDateFromTo?: Date[]; //  thêm theo chuẩn frame của anh Đức => DateRangeBox custom
}
export interface Mst_InvoiceIDHTC {
  InvoiceIDCode: string;
  InvoiceIDType: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_Discount {
  EffectiveDate: string;
  EffectiveDateEnd: string;
  DiscountPercent: string;
  PenaltyPercent: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FnExpPercent: string;
  PmtDsTCGPercent: string;
}

export interface Mst_TransporterDriver {
  TransporterCode: string;
  DriverId: string;
  DriverFullName: string;
  DriverLicenseNo: string;
  DriverPhoneNo: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarModel {
  ModelCode: string;
  ModelProductionCode: string;
  ModelName: string;
  SegmentType: string;
  QuotaDate: string;
  FlagBusinessPlan: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_CarOCN {
  ModelCode: string;
  OCNCode: string;
  OCNDescription: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Rpt_PrincipleContract {
  DealerCode: string;
  PrincipleContractNo: string;
  PrincipleContractDate: string | Date;
  BankInfo: string;
  Representative: string;
  JobTitle: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Rpt_PenaltyPmtDelay {
  DEALERCODE: string;
  DEALERNAME: string;
  SOCODE: number;
  OSO_APPROVEDDATE2: number;
  TOTALAPPROVEDQUANTITY: number;
  TOTALUNITPRICEACTUAL: number;
  MAX_QTYDATEDELAYPMTCOC: number;
  MAX_QTYDATEDELAYOPENGRM: number;
  MAX_QTYDATEDELAYPMTGRM: number;
  MAX_QTYDATEDELAY60PMT: number;
  MAX_QTYDELAY40PMTREMAIN: number;
  TOTALDATEPENALTY: number;
  MDC_PENALTYPERCENT: number;
  AMOUNTPENALTYTTC: number;
  PENALIZEACTUAL: number;
}

export interface Mst_StorageGlobal {
  StorageCode: string;
  StorageName: string;
  ModelCode: string;
  ModelName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Dlr_StorageLocal {
  StorageCode: string;
  StorageName: string;
  DealerCode: string;
  DealerName: string;
  FlagActive: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_CostType {
  CostTypeCode: string;
  CostTypeName: string;
  FlagActive: number;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}

export interface Mst_ContractUpdateType {
  ContractUpdateType: string;
  ContractUpdateTypeName: string;
  LogLUDTimeUTC: string;
  LogLUBy: string;
}
export interface DeleteCarColorParam {
  ModelCode: string;
  ColorCode: string;
}
export interface SearchCarColor {
  KeyWord: string;
  FlagActive?: FlagActiveEnum;
  Ft_PageIndex?: number;
  ModelCode: string;
  ColorCode: string;
  ColorExtNameVN: string;
  ColorIntNameVN: string;
  Ft_PageSize?: number;
}

export interface Mst_Quota {
  QuotaCode: string;
  DealerCode: string;
  QuotaName: string;
  ModelCondition: string;
  ModelPromotion: string;
  SpecCodeCondition: string;
  SpecCodePromotion: string;
  QtyCondition: string;
  QtyPromotion: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
  FlagActive: number;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm1_ModelNameCondition: string;
  mcm2_ModelNamePromotion: string;
  mcs1_SpecDescriptionCondition: string;
  mcs2_SpecDescriptionPromotion: string;
}

export interface Mst_CarColor {
  ModelCode: string;
  ColorCode: string;
  ColorExtType: string;
  ColorExtCode: string;
  ColorExtName: string;
  ColorExtNameVN: string;
  ColorIntCode: string;
  ColorIntName: string;
  ColorIntNameVN: string;
  ColorFee: string;
  FlagActive?: any;
  Remark: string;
}

export interface Mst_CarStdOpt {
  ModelCode: string;
  StdOptCode: string;
  GradeCode: string;
  StdOptDescription: string;
  GradeDescription: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchMst_CarSpecParam extends SearchParam {
  SpecCode: string;
  SpecDescription: string;
  FlagActive: FlagActiveEnum;
  AssemblyStatus: string;
}

export interface SearchMst_CarStdOptParam extends SearchParam {
  ModelCode: string;
  StdOptCode: string;
  StdOptDescription: string;
}

export interface Mst_RateApprOrderModelMax {
  DealerCode: string;
  ModelCode: string;
  RateApprMax: string;
  LogLUDateTime: string;
  LogLUBy: string;
  md_DealerName: string;
  mcm_ModelName: string;
}

// DongNV

export interface Mst_Marriage {
  MarriageCode: string;
  Description: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface SearchSysUser {
  UserName: string;
  KeyWord: string;
  UserCode: string;
  DealerCode: string;
  BankCode: string;
  TransporterCode: string;
  InsCompanyCode: string;
  FlagActive: string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface SearchBankParam extends SearchParam {
  BankCode: string;
  BankName: string;
  FlagPaymentBank: FlagActiveEnum;
  FlagMortageBank: FlagActiveEnum;
  FlagMonitorBank: FlagActiveEnum;
}

export interface DeleteTCGCarPriceParam {
  SOType: string;
  SpecCode: string;
  EffectiveDate: Date | string;
}

export interface Mst_TCGCarPrice {
  SOType: string;
  SpecCode: string;
  SpecDescription: string;
  EffectiveDate: any;
  UnitPrice: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchTCGCarPriceParam {
  SOType: string;
  SpecCode: string;
  EffectiveDate: Date | string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}
// export interface SearchTCGCarPriceParam extends SearchParam {
//   SOType: string;
//   SpecCode: string;
// }

export interface DeleteBankParam {
  BankCode: string;
  BankName: string;
}

// ===================================

export interface Mst_Qualification {
  QualificationCode: string;
  QualificationName: string;
  Remark: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Mst_BankDealer {
  DealerCode: string;
  BankName: string;
  DealerName: string;
  BankCode: string;
  FlagActive: string;
  FlagBankGrt: FlagActiveEnum;
  FlagBankPmt: FlagActiveEnum;
  Remark: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchBankDealerParam {
  // KeyWord: string;
  FlagActive: FlagActiveEnum;
  BankCode: string;
  DealerCode: string;
  FlagBankPmt: FlagActiveEnum;
  FlagBankGrt: FlagActiveEnum;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface Mst_CarPrice {
  SOType: string;
  SpecCode: string;
  SpecDescription: string;
  EffectiveDate: string;
  UnitPrice: number;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface SearchCarPriceParam {
  KeyWord: string;
  FlagActive: FlagActiveEnum;
  SOType: string;
  SpecCode: string;
  EffectiveDate: Date | string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}
export interface RptPaymentParam {
  GrtNo: string;
  VIN: string;
  DateOpenFrom: string;
  DateOpenTo: string;
  SoCode: string;
  ModelCode: string;
  OSODAppDateFrom: string;
  OSODAppDateTo: string;
  Status: string;
  DealDateFrom: string;
  DealDateTo: string;
  PMGDateEndFrom: string;
  PMGDateEndTo: string;
  DealerCode: string;
  CPTCStatus: string;
  FlagEarlyCancel: string;
  FlagisHTC: string;
  FlagDataWH: string | boolean;
  DateOpenFromTo: any;
  OSODAppDateFromTo: any;
  DealDateFromTo: any;
  PMGDateEndFromTo: any;
}
export interface RptPaymentRecord {
  CARID: string;
  OSO_APPROVEDDATE2: string;
  CARCANCELDATE: string | null;
  PMG_BANKCODE: string;
  DUTYCOMPLETEDDATE: string;
  DEALERCODE: string;
  DLRCTRNO: string;
  FLAGDEALERCONTRACTDMS40: string;
  OSOD_DEPOSITDUTYENDDATE: string;
  PMG_BANKGUARANTEENO: string;
  PMG_DATEOPEN: string;
  PMGD_GUARANTEEVALUE: number;
  DEBTPOLICY_PAYMENTENDDATE: string;
  PMGD_DATESTART: string;
  TOTALCOMPLETEDDATE: string;
  PM1_PAYMENTENDDATE: string;
  PM2_PAYMENTENDDATE: string | null;
  PM3_PAYMENTENDDATE: string | null;
  PMGD_GUARANTEEPERCENT: number;
  SOCODE: string;
  PMG_TERMACTUAL: number;
  PM1_DISCOUNTDAYS: number;
  PM2_DISCOUNTDAYS: number | null;
  PM3_DISCOUNTDAYS: number | null;
  PM1_PMTDTLAMOUNT: number;
  PM2_PMTDTLAMOUNT: number | null;
  PM3_PMTDTLAMOUNT: number | null;
  GUARANTEEDISCOUNT: number;
  SPECCODE: string;
  GUARANTEECOMPLETEDAMOUNT: number;
  TOTALCOMPLETEDAMOUNT: number;
  PM1_DISCOUNTPERCENT: number;
  PM2_DISCOUNTPERCENT: number | null;
  PM3_DISCOUNTPERCENT: number | null;
  UNITPRICEACTUAL: number;
  VIN: string;
  PMGD_DATEEXPIRED: string;
  PM1_DISCOUNTVALUE: number;
  PM2_DISCOUNTVALUE: number | null;
  PM3_DISCOUNTVALUE: number | null;
  COCONLY_COMPLETEDDATE: string;
  PMG_APPROVEDDATE: string;
  CMP1_AMOUNTACCUM_CBU30_CKD15: number;
  CMP1_PAYMENTENDDATE_CBU30_CKD15: string;
  PMGD_DATEEND: string;
  CPTCSTATUS: string;
  OSO_FLAGPMTDELAYDONE: string;
  OSOD_GRTENDDATE: string;
  CMP1_60_PAYMENTENDDATE: string;
  CDOAPPROVEDDATE2: string;
  CDODDELIVERYENDDATE: string;
  CDODDELIVERYOUTDATE: string;
  MYCOLORCODE: string;
  MYMODELCODE: string;
  MYSPECCODE: string;
  OSOD_APPROVEDDATE: string;
  MD_DEALERNAME: string;
  DISCOUNTVALUE: number;
  FLAGEARLYCANCEL: string;
  PM1_CREATEDDATE: string;
  PM2_CREATEDDATE: string | null;
  PM3_CREATEDDATE: string | null;
  PM1_TOTALAMOUNT: number;
  PM2_TOTALAMOUNT: number | null;
  PM3_TOTALAMOUNT: number | null;
}

export interface RptPayment01Data {
  Lst_RptPayment_01_Mst: RptPaymentRecord[];
}

export interface RptHRSalesManParam {
  DealerCodeInput: string[];
  AreaCode: string;
  SMType: string;
  HRMonthFrom: string;
  HRMonthTo: string;
  FlagDataWH: number;
}

export interface RptHRSalesManParamDto
  extends Omit<RptHRSalesManParam, "HRMonthFrom" | "HRMonthTo" | "FlagDataWH"> {
  ReportBy: "A" | "D";
  HRMonthFrom: any;
  HRMonthTo: any;
  FlagDataWH: boolean;
  HRMonthFromTo?: any;
}
export interface MonthData {
  year: number;
  month: number;
}

export interface RptStatisticHTCStockOut02Param {
  MonthReport: string;
  FlagDataWH: 0 | 1;
  DealerCodes?: string;
  ModelCodes?: string;
}

export interface RptSalesReportParam {
  MonthReport: string;
  FlagDataWH: 0 | 1;
  DealerCodes?: string;
  ModelCodes?: string;
}

export interface RptStatisticHTCStockOut02ParamDto {
  ReportBy?: "M" | "D";
  MonthReport: Date;
  FlagDataWH: number;
  DealerCodes?: string[];
  ModelCodes?: string[];
}

export interface RptSalesReportParamDto {
  ReportBy: "M" | "D";
  MonthReport: any;
  FlagDataWH: number;
  DealerCodes?: string[];
  ModelCodes?: string[];
}

export interface RptHRSalesManByDealerRecord {
  DEALERCODE: string;
  HRMONTH: string;
  QUY: number;
  YEAR: number;
  SMTYPE: string;
  TOTALQTYSMWORKING: number;
  TOTALQTYSMNOWORKING: number;
}
export interface RptHRSalesManByAreaRecord {
  AREACODE: string;
  HRMONTH: string;
  QUY: number;
  YEAR: number;
  SMTYPE: string;
  TOTALQTYSMWORKING: number;
  TOTALQTYSMNOWORKING: number;
}

export type RptHRSalesManRecord =
  | RptHRSalesManByDealerRecord
  | RptHRSalesManByAreaRecord;
export interface RptStatisticHTCStockOut02ByModelRecord {
  CVModelCode: string;
  Total: number;
  Level: number;
  ModelName: string;
  ModelProductionCode: string;
  Day01: number;
  Day02: number;
  Day03: number;
  Day04: number;
  Day05: number;
  Day06: number;
  Day07: number;
  Day08: number;
  Day09: number;
  Day10: number;
  Day11: number;
  Day12: number;
  Day13: number;
  Day14: number;
  Day15: number;
  Day16: number;
  Day17: number;
  Day18: number;
  Day19: number;
  Day20: number;
  Day21: number;
  Day22: number;
  Day23: number;
  Day24: number;
  Day25: number;
  Day26: number;
  Day27: number;
  Day28: number;
  Day29: number;
  Day30: number;
  Day31: number;
}
export interface RptStatisticHTCStockOut02ByDealerRecord {
  DealerCode: string;
  DealerName: string;
  Total: number;
  Level: number;
  Day01: number;
  Day02: number;
  Day03: number;
  Day04: number;
  Day05: number;
  Day06: number;
  Day07: number;
  Day08: number;
  Day09: number;
  Day10: number;
  Day11: number;
  Day12: number;
  Day13: number;
  Day14: number;
  Day15: number;
  Day16: number;
  Day17: number;
  Day18: number;
  Day19: number;
  Day20: number;
  Day21: number;
  Day22: number;
  Day23: number;
  Day24: number;
  Day25: number;
  Day26: number;
  Day27: number;
  Day28: number;
  Day29: number;
  Day30: number;
  Day31: number;
}

export type RptStatisticHTCStockOut02Record =
  | RptStatisticHTCStockOut02ByDealerRecord
  | RptStatisticHTCStockOut02ByModelRecord;

export type RptSalesReportRecord =
  | RptSalesReportByDealerRecord
  | RptSalesReportByModelRecord;

export interface RptSalesReportByDealerRecord {
  DealerCode: string;
  DealerName: string;
  Total: number;
  Level: number;
  Day01: number;
  Day02: number;
  Day03: number;
  Day04: number;
  Day05: number;
  Day06: number;
  Day07: number;
  Day08: number;
  Day09: number;
  Day10: number;
  Day11: number;
  Day12: number;
  Day13: number;
  Day14: number;
  Day15: number;
  Day16: number;
  Day17: number;
  Day18: number;
  Day19: number;
  Day20: number;
  Day21: number;
  Day22: number;
  Day23: number;
  Day24: number;
  Day25: number;
  Day26: number;
  Day27: number;
  Day28: number;
  Day29: number;
  Day30: number;
  Day31: number;
}

export interface RptSalesReportByModelRecord {
  CVModelCode: string;
  Total: number;
  Level: number;
  ModelName: string;
  ModelProductionCode: string;
  Day01: number;
  Day02: number;
  Day03: number;
  Day04: number;
  Day05: number;
  Day06: number;
  Day07: number;
  Day08: number;
  Day09: number;
  Day10: number;
  Day11: number;
  Day12: number;
  Day13: number;
  Day14: number;
  Day15: number;
  Day16: number;
  Day17: number;
  Day18: number;
  Day19: number;
  Day20: number;
  Day21: number;
  Day22: number;
  Day23: number;
  Day24: number;
  Day25: number;
  Day26: number;
  Day27: number;
  Day28: number;
  Day29: number;
  Day30: number;
  Day31: number;
}

export interface MstCarDriverTestParamSearch {
  FlagActive: number;
}

export interface DLR_CtmVisit_Create {
  DealerCode: string;
  CtmVisitCode: string;
  Gender: string;
  RangeAgeCode: string;
  ModelCode: string;
}

export interface MstCarDriverTestParam {
  FlagActive: number | string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export interface MstCarDriverTestExportPayloadParam {
  Lst_Mst_CarDriverTest: MstCarDriverTestExportParam[];
}

export interface MstCarDriverTestExportParam {
  DrvTestPlateNo: string;
}

export interface MstCarDriverTestUpdateByAccountantHQParam {
  DrvTestPlateNo: string;
  DateSupport1: string;
  DateSupport2: string;
}

export interface MstCarDriverTestUpdateByMarketingHQParam {
  DrvTestPlateNo: string;
  Price: number;
  AmountSupport1: number;
  AmountSupport2: number;
  ClaimNoSupport: string;
}

export interface MstCarDriverTest_Create {
  Mst_CarDriverTest: MstCarDriverTest;
}

export interface MstCtmRangeAgeGetAllActive {
  RangeAgeCode: string;
  RangeAgeName: string;
}

export interface MstCarModelGetAllActive {
  ModelCode: string;
  ModelProductionCode: string;
  ModelName: string;
  SegmentType: string;
  QuotaDate: string;
  FlagBusinessPlan: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface MstCarDriverTestResponse {
  DrvTestPlateNo: string;
  SpecCode: string;
  ModelCode: string;
  ColorCode: string;
  DealerCode: string;
  DrvTestVIN: string;
  Remark: string;
  DrvTestEngineNo: string;
  Price: number;
  AmountSupport1: number;
  DateSupport1: string | null;
  AmountSupport2: number;
  DateSupport2: string | null;
  ClaimNoSupport: string;
  CarDrvTestGPS: string;
  DealerName: string;
  ModelName: string;
  SpecDescription: string;
  Color_Int_Ext_EN: string;
  Color_Int_Ext_VN: string;
  FlagActive: string;
  CreatedDate: string;
  ColorIntName: string;
  ColorIntnameVN: string;
  ColorExtname: string;
  ColorExtnameVN: string;
  StdOptCode: string;
  OCNCode: string;
}

export interface MstCarDriverTest {
  DataList: MstCarDriverTestResponse[];
}

export interface SearchCarDeliveryOrderParam {
  DeliveryOrderNo: string;
  DealerCode: string;
  DeliveryOrderStatus: string;
  CreatedDateFrom: string;
  CreatedDateTo: string;
  CarId: string;
  DeliveryVIN: string;
  SOCode: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  CreatedDateFromTo: Date[];
  FlagDataWH: boolean;
}

export interface CarDeliveryOrder {
  MyIdxSeq: number;
  DeliveryOrderNo: string;
  DealerCode: string;
  md_DealerName: string;
  DeliveryAddress: string;
  TransportCompanyName: string;
  TransportCompanyPhoneNo: string;
  TransportCompanyFaxNo: string;
  DeliveryOrderStatus: string;
  CreatedDate: string;
  CreatedBy: string;
  ApprovedDate1: string;
  ApprovedBy1: string;
  ApprovedDate2: string;
  ApprovedBy2: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
export interface CTContractOverseaSearchHQ {
  ContractNo: string;
  RefNo: string;
  CreatedDateFrom: string;
  CreatedDateTo: string;
  FlagDataWH: any;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  CreatedDate: any;
  CreatedDateFromTo: any;
  Lst_CT_ContractOversea?: any;
  Lst_Ord_PerformanceInvoiceDetail?: any;
  DataList?: any;
  OrderMonth: any;
  OrderMonthFrom: any;
  OrderMonthTo: any;
}
export interface CTPackingListData {
  PackingListNo: string;
  Lst_Car_CarForCarDocReq?: any;
  LCNo: string;
  CreatedDateFrom: string;
  CreatedDateTo: string;
  FlagDataWH: any;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  CreatedDate: any;
  PortCode?: any;
  VIN: string;
  PLType: string;
  DataList?: any;
  Lst_CT_PackingList?: any;
  lst_CT_LC?: any;
  Lst_Car_VINForPL?: any;
}
export interface CarTestCarData {
  DealerCode: string;
  TestCarCode: string;
  ApprovedDateFrom: string;
  ApprovedDateTo: string;
  CreatedDateTo: string;
  CreatedDateFrom: string;
  FlagDataWH: any;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  CreatedDate: any;
  ApprovedDate: any;
  CarId: string;
  TestCarStatus: string;
  DataList?: any;
  Lst_Car_TestCar?: any;
  Lst_Car_TestCarDtl?: any;
  EffDateStart?: string;
  EffDateEnd?: string;
}
export interface CarDocReqData {
  CarId: string;
  VIN: string;
  FlagMapVIN: string;
  SOCode: string;
  CancelStatus: string;
  ApprovedDateFrom: string;
  ApprovedDateTo: string;
  ApprovedDate: string;
  DlrCtrNo: string;
  FlagGrtStatus: string;
  GuaranteeDetailStatus: string;
  FlagDateStart: string;
  FlagDocumentsStatus: string;
  StatusMortageEnd: string;
  PmtPercentFrom: string;
  PmtPercentTo: string;
  FlagDRListCode: string;
  DeliveryOrderStatus: string;
  Ft_PageIndex: string;
  Ft_PageSize: string;
  FlagDataWH: any;
  DataList: any;
}
export interface Dlr_ContractData {
  DlrContractNo: string;
  DealerCode: string;
  DealerCodeBuyer: string;
  CustomerCode: string;
  TransactorCode: string;
  DlrContractNoUser: string;
  SalesType: string;
  SMCode: string;
  ContractDate: string;
  BankCode: string;
  lst_Mst_Bank?: any;
  Lst_Mst_SalesMan?: any;
  Lst_Mst_DealerSalesGroupType?: any;
  lst_Mst_DealerSalesType?: any;
  lst_Dlr_Contract?: any;
  lst_Dlr_ContractDtl?: any;
  DataList?: any;
  FlagDataWH: boolean;
  CreatedDateFrom: any;
  CreatedDateTo: any;
  FullName: string;
  ModelCode: string;
  IDCardNo: string;
  FlagDealFinish: string;
  Ft_PageIndex: 0;
  Ft_PageSize: 100;
  CreatedDate: any;
  Lst_Dlr_Contract?: any;
  lst_Dlr_ContractForDlsDeal?: any;
}
export interface Dlr_DealData {
  CreatedDate: any;
  DealNo: string;
  DealNoUser: string;
  CarId: string;
  VIN: string;
  ModelCode: string;
  DeliveryDate: any;
  DealType: string;
  DealerCodeBuyer: string;
  SalesType: string;
  CustomerCode: string;
  BuyerFullName: string;
  CusInvoiceNo: string;
  CusInvoiceDate: any;
  DataList?: any;
  FlagDataWH: boolean;
  Lst_DLS_Deal?: any;
  Lst_DLS_DealDetail?: any;
  dataExport?: any;
  Ft_PageIndex: 0;
  Ft_PageSize: 100;
}
export interface Mst_CarDrvTestSearch {
  CreatedDateFrom: string;
  CreatedDateTo: string;
  DriveDTimeFrom: string;
  DriveDTimeTo: string;
  CreatedDate?: any;
  DriveDTime: any;
  FlagDataWH: any;
  Ft_PageIndex: number;
  Ft_PageSize: number;
  DriverTestGroup: any;
  DriverTestStatus?: any;
  DataList?: any;
  Lst_Dlr_DriveTest?: any;
  DriveTestCode?: string;
  DealerCode?: string;
  DriveDTimeCopy?: string;
  Data?: string;
}

export interface CarDeliveryOrderDetail {
  MyIdxSeq: number;
  DeliveryOrderNo: string;
  CarId: string;
  StorageCode: string;
  DeliveryVIN: string;
  DeliveryStartDate: Date | null; //
  DeliveryOutDate: string; //
  DeliveryExpectedDate: Date | null; //
  TransportMinutesExpectedDate: Date | null;
  DeliveryEndDate: string; //
  DeliveryRemark: string | null;
  ConfirmRemark: string | null;
  ConfirmStatus: string;
  ConfirmDate: string;
  ConfirmBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
  ModelCode: string;
  ColorCode: string;
  SpecCode: string;
  SpecDescription: string;
  ActualSpec: string;
  AC_SpecDescription: string;
  PMGBankGuaranteeNo: string;
  VINColorCode: string;
  VIN_Color_VN_Combined: string;
  CVEngineNo: string;
  PaymentPercent: string;
  GuaranteePercent: string;
  OSOSOCode: string;
  CVLocation: string | null;
  OSODCarDueDate: string;
  OCNCode: string;
  UnitPriceActual: number;
  BankCode: string;
  cdo_ApprovedDate2: string;
}

export interface CarDeliveryOrderResponse {
  Lst_Car_DeliveryOrderDetail: CarDeliveryOrderDetail[];
  Lst_Car_DeliveryOrder: CarDeliveryOrder[];
}

export interface Mst_Dealer_Address {
  DealerCode: string;
  Idx: number;
  DealerAddress: string;
}

export interface Car_CarForLXXSearch {
  VIN: string; // Số VIN
  FlagMappedVIN: string; // TT map Vin (1=đã map)
  SOCode: string; // Số đơn hàng
  FlagCancelCar: string; // TT hủy xe (0=đã hủy)
  DealerCode: string; // Đại lý
  FlagAbleToCreateDO: string; // Có thể xuất xe (1=Có thể)
  FlagCQDate: string; // Ngày kiểm tra CL (1=có) --> Ko có truyền điều kiện vào mà để xử lý sau khi call hàm: CVCQStartDate
  FlagTaxPaymentDate: string; // Ngày nộp thuế (1=có) --> Ko có truyền điều kiện vào mà để xử lý dữ liệu sau khi call hàm: CVTaxPaymentDate
  PaymentPercentFrom: string; // % thanh toán từ
  PaymentPercentTo: string; // % thanh toán đến
  MonthOrderFrom: string; // Tháng đơn hàng từ
  MonthOrderTo: string; // Tháng đơn hàng đến
  SOApprovedDateFrom: string; // Ngày xác nhận ĐH từ
  SOApprovedDateTo: string; // Ngày xác nhận ĐH đến
  DealerContractNo: string; // Số PLHĐ/Số HĐ --> Thấy có truyền vào ở hàm Client cũ nhưng không thấy truyền điều kiện vào hàm Biz ??
  CarId: string; // Số xe - Tìm kiếm 1 hàm Get
  SOApprovedDates?: any[];
  MonthOrders?: string[];
  PaymentPercents?: string[];
  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export interface Car_CarForLXX {
  CarId: any; // Mã xe
  DealerCode: any; // Mã đại lý
  OSOSOCode: any; // Số đơn hàng
  OSODApprovedDate: any; // Ngày xác nhận ĐH
  VIN: any; // VIN
  ModelCode: any; // Mã model
  ModelName: any; // Tên model
  SpecCode: any; // Mã spec thực tế
  SpecDescription: any; // Đặc tả xe thực tế
  VINColorCode: any; // Mã màu/Mã màu thực tế
  VIN_Color_VN_Combined: any; // Tên màu TV/Tên màu thực tế
  STORAGECODECURRENT: any; // Mã kho
  UNITPRICEACTUAL: any; // Giá cuối cùng
  PMPDAMOUNTTOTAL: any; // Tổng thanh toán
  Payment_Deposit_Percent: any; // % TT cọc
  Grt_Percent: any; // % bảo lãnh
  PMT_Percent_Current: any;
  Payment_Percent: any; // % thanh toán
  DutyCompleted_Percent: any; // % hoàn thành nghĩa vụ giao xe
  DutyCompleted_Percent_AF: any; // % HT điều kiện giao xe
  CarCancelRemark: any; // Ghi chú hủy xe
  MapVINDate: any; // Ngày map VIN
  SSR_REARRANGESTATUS: any; // TT lệnh điều chuyển kho
  OCNCode: any; // OCN
  CVEngineNo: any; // Số máy
  DlrCtrNo: any; // Số PLHĐ/Số HĐ

  //sd: any; // Ngày đến hạn trả xe ĐL
}

export interface Pmt_GrtClaim_Search {
  GrtClaimNo: string; //Số công văn
  CreatedDateFrom: string; //Ngày tạo từ
  CreatedDateTo: string; //Ngày tạo đến
  DealerCode: string; //Đại lý
  BankCodeMonitor: string; //Ngân hàng giám sát
  BankCode: string; //Ngân hàng phát hành BL
  SignDateFrom: string; //Ngày ký từ
  SignDateTo: string; //Ngày ký đến
  GuaranteeNo: string; //Số bảo lãnh
  BankGuaranteeNo: string; //Số BL ngân hàng
  VIN: string; //VIN
  DlrCtrNo: string; //Số hợp đồng
  FlagisHTC: string; //Pháp nhân

  CreatedDate: any[];
  SignDate: any[];

  FlagDataWH: boolean;

  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export interface QLCV_List_Car_Detail {
  CarId: string; // Mã xe
  VIN: string; // VIN
  ModelCode: string; // Mã model
  SpecCode: string; // Mã spec
  SpecDescription: string; // Đặc tả xe
  ColorCode: string; // Mã màu
  Color_VN: string; // Tên màu
  BankGuaranteeNo: string; // Số bảo lãnh ngân hàng
  DateOpen: string; // Ngày mở bảo lãnh
  DlrCtrNo: string; // Số hợp đồng
  FlagDealerContractDMS40: string; // Là HĐĐT
  DateStart: string; // Ngày giao giấy tờ
  UnitPriceActual: string; // Giá xe
  GuaranteeValue: string; // Giá trị bảo lãnh
  DateEnd: string; // Ngày hết hạn TT
  BankName: string; // Ngân hàng bảo lãnh
  BankCodeMonitor: string; // Ngân hàng giám sát
  VinSignStatus: string; // Trạng thái
}

export interface DMS40_FnExp_Calc_FnExp_PmDc_Search {
  CreateDTimeFrom: string; //	Ngày tạo từ
  CreateDTimeTo: string; //	Ngày tạo đến
  CaNo: string; //	Số bảng tính
  DealerCode: string; //	Đại lý
  CarId: string; //	Mã xe
  VIN: string; //	VIN
  FlagEarlyCancel: string; //		Xe sắp Hủy
  FlagisHTC: string; //	Pháp nhân
  FlagDataWH: string | boolean; //	Lấy dữ liệu lịch sử
  Ft_PageIndex: number;
  Ft_PageSize: number;
  CreatedDateFromTo: Date[];
}

export interface DMS40_FnExp_Calc_FnExp_PmDc_SearchCar {
  TermDateFrom: string; // Kỳ tính CPTC hiện tại
  TermDateTo: string; // Kỳ tính CPTC đến
  TermPrevDateFrom: string; // Ký tính CPTC trước
  TermPrevDateTo: string; // Ký tính CPTC đến
  OSODApprovedDateFrom: string; // Ngày xác nhận ĐH từ
  OSODApprovedDateTo: string; // Ngày xác nhận ĐH đến
  DealerCode: string; // Đại lý
  CPTCStatus: string; // TT CPTC và CKTT
  FlagTCG: string; // Cờ đại lý TCG
  FnExpPercent: string; // Lãi suất CPTC (%)
  PmtDsTCGPercent: string; // Lãi suất CKTT(%)

  Ft_PageIndex: number;
  Ft_PageSize: number;

  Term: any;
  TermPrev: any;
  OSODApprovedDate: any;
}

export interface DMS40_FnExp_Calc_FnExp_PmDc_SearchCar_List_Car_Detail {
  CaNo: string;
  CarId: string;
  DealerCode: string;
  SOCode: string;
  UnitPriceActual: string;
  VIN: string;
  CarCancelDate: string;
  ModelCode: string;
  ApprovedDate: string;
  DepositDutyEndDate: string;
  TotalCompletedDate: string;
  DateStart: string;
  DateEnd: string;
  TermActual: string;
  SpecDescription: string;
  AssemblyStatus: string;
  FnDepositCountDate: string;
  FnDepositAmount: string;
  FnGrtCountDate: string;
  FnGrtAmount: string;
  FnTotalAmount: string;
  PDCountDate: string;
  PDAmount: string;
  FlagEarlyCancel: string;
}
