import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_Ability_Supply_PartsParam {
  DealerCode: string;
  PeriodMonth: any;
  PartCode: string;
  VieName: string;
  RespondType: number;
  FlagDataWH: 1 | 0;
}

export interface Rpt_Ability_Supply_PartsRecord {
  RequestQuantityTotal: string;
  ResponseQuantityTotal: string;
  ResponseRateByPartCode: string;
  ROQuantity: string;
  ROResponseQuantity: string;
  ResponseRateByRO: string;
  StockOutTime: string;
  ROID: string;
  RONo: string;
  PlateNo: string;
  PartID: string;
  PartCode: string;
  VieName: string;
  Unit: string;
  RequestQuantity: string;
  ResponseQuantity: string;
  NotResponseQuantity: string;
}

interface Rpt_Ability_Supply_PartsRecordParamData {
  Lst_Rpt_AbilitySupplyParts_ResponseRateByPartCode: Rpt_Ability_Supply_PartsRecord;
  Lst_Rpt_AbilitySupplyParts_ResponseRateByRO: Rpt_Ability_Supply_PartsRecord;
  Lst_Rpt_AbilitySupplyParts: Rpt_Ability_Supply_PartsRecord[];
}
export const useRpt_Ability_Supply_PartsApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_Ability_Supply_Parts_SearchHQ: async (
      params: Rpt_Ability_Supply_PartsParam
    ): Promise<ApiResponse<Rpt_Ability_Supply_PartsRecordParamData>> => {
      return await apiBase.post<
        Rpt_Ability_Supply_PartsParam,
        ApiResponse<Rpt_Ability_Supply_PartsRecordParamData>
      >("/RptAbilitySupplyParts/SearchHQ", {
        ...params,
      });
    },

    Rpt_Ability_Supply_Parts_SearchDL: async (
      params: Rpt_Ability_Supply_PartsParam
    ): Promise<ApiResponse<Rpt_Ability_Supply_PartsRecordParamData>> => {
      return await apiBase.post<
        Rpt_Ability_Supply_PartsParam,
        ApiResponse<Rpt_Ability_Supply_PartsRecordParamData>
      >("/RptAbilitySupplyParts/SearchDL", {
        ...params,
      });
    },

    Rpt_Ability_Supply_Parts_ExportSearchHQ: async (
      params: Rpt_Ability_Supply_PartsParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_Ability_Supply_PartsParam,
        ApiResponse<string>
      >("/RptAbilitySupplyParts/ExportHQ", {
        ...params,
      });
    },

    Rpt_Ability_Supply_Parts_ExportSearchDL: async (
      params: Rpt_Ability_Supply_PartsParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_Ability_Supply_PartsParam,
        ApiResponse<string>
      >("/RptAbilitySupplyParts/ExportDL", {
        ...params,
      });
    },
  };
};
