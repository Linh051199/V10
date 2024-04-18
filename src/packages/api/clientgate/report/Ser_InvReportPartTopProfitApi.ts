import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface SerInvReportPartMinQuantity_SearchDLParam {
  DealerCode: string;
  FlagDataWH: 0 | 1;
  ToDate: Date | null;
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
export const useSer_InvReportPartTopProfitApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_InvReportPartTopProfit_SearchDL: async (
      params: SerInvReportPartMinQuantity_SearchDLParam
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        SerInvReportPartMinQuantity_SearchDLParam,
        ApiResponse<any>
      >("/SerInvReportPartTopProfit/SearchDL", {
        ...params,
      });
    },
    Ser_InvReportPartTopProfit_ExportSearchDL: async (
      params: SerInvReportPartMinQuantity_SearchDLParam
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        SerInvReportPartMinQuantity_SearchDLParam,
        ApiResponse<any>
      >("/SerInvReportPartTopProfit/ExportSearchDL", {
        ...params,
      });
    },
  };
};
