import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_Correct_Repair_RateParam {
  DealerCode: string;
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  FlagDataWH: any;
}

export interface Rpt_Correct_Repair_RateRecord {
  TotalRO: number;
  TotalROBackRepair: number;
  DealerCode: string;
  RONo: string;
  CusName: string;
  PlateNo: string;
  FrameNo: string;
  ModelName: string;
  Km: number;
  Creator: string;
  CheckInDate: string;
  ActualDeliveryDate: string;
  CusRequest: string;
}

interface Rpt_Correct_Repair_RateRecordParamData {
  Lst_Rpt_Correct_Repair_Rate: Rpt_Correct_Repair_RateRecord;
  Lst_Rpt_Correct_Repair_RateDtl: Rpt_Correct_Repair_RateRecord[];
}
export const useRpt_Correct_Repair_RateApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_Correct_Repair_Rate_SearchHQ: async (
      params: Rpt_Correct_Repair_RateParam
    ): Promise<ApiResponse<Rpt_Correct_Repair_RateRecordParamData>> => {
      return await apiBase.post<
        Rpt_Correct_Repair_RateParam,
        ApiResponse<Rpt_Correct_Repair_RateRecordParamData>
      >("/RptCorrectRepairRate/SearchHQ", {
        ...params,
      });
    },

    Rpt_Correct_Repair_Rate_SearchDL: async (
      params: Rpt_Correct_Repair_RateParam
    ): Promise<ApiResponse<Rpt_Correct_Repair_RateRecordParamData>> => {
      return await apiBase.post<
        Rpt_Correct_Repair_RateParam,
        ApiResponse<Rpt_Correct_Repair_RateRecordParamData>
      >("/RptCorrectRepairRate/SearchDL", {
        ...params,
      });
    },

    Rpt_Correct_Repair_Rate_ExportSearchHQ: async (
      params: Rpt_Correct_Repair_RateParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_Correct_Repair_RateParam,
        ApiResponse<string>
      >("/RptCorrectRepairRate/ExportHQ", {
        ...params,
      });
    },

    Rpt_Correct_Repair_Rate_ExportSearchDL: async (
      params: Rpt_Correct_Repair_RateParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_Correct_Repair_RateParam,
        ApiResponse<string>
      >("/RptCorrectRepairRate/ExportDL", {
        ...params,
      });
    },
  };
};
