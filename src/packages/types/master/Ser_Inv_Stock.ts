import { SearchParam } from "../clientgate";

export interface Ser_Inv_Stock {
  StockNo: string;
  StockName: string;
  Contact: string;
  Address: string;
  Email: string;
  Telephone: string;
  Fax: string;
  Mobi: string;
  Manager: string;
  Description: string;
  DealerCode: string;
  IsActive: string;
}

export interface SearchSer_Inv_StockParam extends SearchParam {
  StockNo: string;
  StockName: string;
  Address: string;
  IsActive: string;
  DealerCode: string;
}
