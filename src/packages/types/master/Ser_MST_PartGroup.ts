import { SearchParam } from "../clientgate";

export interface Search_Ser_MST_PartGroup extends SearchParam {
  PartGroupID: string;
  GroupCode: string;
  GroupName: string;
  IsActive: string;
}
export interface Ser_MST_PartGroup {
  PartGroupID: string;
  DealerCode: string;
  ParentID: string;
  FamilyID: string;
  OrderID: string;
  GroupCode: string;
  GroupName: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
}
