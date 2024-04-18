import { SearchParam } from "../clientgate";

export interface Mst_Staff {
  StaffCode: string;
  StaffName: string;
  FlagActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
}

export interface Search_Mst_Staff_Param extends Partial<SearchParam> {
  StaffCode: string;
  StaffName: string;
}
