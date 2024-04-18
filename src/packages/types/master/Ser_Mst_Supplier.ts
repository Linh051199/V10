import { SearchParam } from "../clientgate";

export interface Ser_Mst_Supplier {
  SupplierID: string;
  SupplierCode: string;
  Address: string;
  Phone: string;
  Fax: string;
  ContactName: string;
  IsActive: string;
  SupplierName: string;
  ContactPhone: string;
  LogLUDateTime: string;
  LogLUBy: string;
  DealerCode: string;
  CreatedDate: string;
  CreatedBy: string;
  SupplierPhone: string;
  SupplierFax: string;
}

export interface Search_Ser_Mst_Supplier extends SearchParam {
  SupplierID: string;
  SupplierCode: string;
  SupplierName: string;
  IsActive: string;
  DealerCode: string;
  Address: string;
}
