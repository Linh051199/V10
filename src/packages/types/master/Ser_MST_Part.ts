import { SearchParam } from "../clientgate";

export interface Ser_MST_Part {
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
export interface Search_Ser_MST_Part extends SearchParam {
  PartID: string;
  DealerCode: string;
  PartCode: string;
  EngName: string;
  VieName: string;
  CusTypeID: string;
  FreqUsed: string;
  IsActive: string;
  PartGroupID: string;
}
