import { SearchParam } from "../clientgate";

export interface Search_Ser_Mst_Location extends SearchParam {
  LocationID: string;
  LocationCode: string;
  LocationName: string;
  LocationType: string;
  IsActive: string;
}
export interface Ser_Mst_Location {
  LocationID: string;
  LocationName: string;
  LocationType: string;
  LocationSurface: string;
  LocationHight: string;
  LogLUDateTime: string;
  LogLUBy: string;
  LocationCode: string;
  IsActive: string;
  DealerCode: string;
  StockNo: string;
  CreatedDate: string;
  CreatedBy: string;
}
