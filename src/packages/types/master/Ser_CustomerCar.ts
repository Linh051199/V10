import { SearchParam } from "../clientgate";

export interface Ser_CustomerCar {
  CusID: string;
  CusName: string;
  Sex: boolean;
  Address: string;
  Tel: string;
  Mobile: string;
  Fax: string;
  Email: string;
  Website: string;
  Bank: string;
  BankAccountNo: string;
  TaxCode: string;
  IsContact: boolean;
  Note: string;
  ContName: string;
  ContSex: boolean;
  ContAddress: string;
  ContTel: string;
  ContMobile: string;
  ContFax: string;
  ContEmail: string;
  CusTypeID: string;
  OrgTypeID: string;
  DOB: string;
  IDCardNo: string;
  ProvinceCode: string;
  DistrictCode: string;
  IsActive: boolean;
}

export interface SearchSer_CustomerCarParam extends SearchParam {
  CusId: string;
  CusID: string;
  CusName: string;
  DealerCode: string;
  Address: string;
  Phone: string;
  PlateNo: string;
  FrameNo: string;
  EngineNo: string;
  TradeMarkCode: string;
  ModelId: string;
}
