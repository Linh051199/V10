import { SearchParam } from "../clientgate";

export interface Mst_CarModelStd {
  ModelCode: string;
  ModelName: string;
  Remark: string;
}

export interface Search_Mst_CarModelStd_Param extends SearchParam {
  ModelCode: string;
  ModelName: string;
  FlagActive: any;
}
