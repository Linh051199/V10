import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_SlowRotationPartsParam {
  DealerCode: string;
  PartCode: string;
  VieName: string;
  RotationTimeValueFrom: any;
  RotationTimeValueTo: any;
  TradingDateFrom: any;
  TradingDateTo: any;
  RotationTimeValueFromTo: any;
  TradingDateFromTo: any[];
  FlagDataWH: 1 | 0;
}

export interface Rpt_SlowRotationPartsRecord {
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

interface Rpt_SlowRotationPartsRecordParamData {
  lst_Rpt_SlowRotationParts: Rpt_SlowRotationPartsRecord[];
}
export const useRpt_SlowRotationPartsApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_SlowRotationParts_SearchHQ: async (
      params: Rpt_SlowRotationPartsParam
    ): Promise<ApiResponse<Rpt_SlowRotationPartsRecordParamData>> => {
      return await apiBase.post<
        Rpt_SlowRotationPartsParam,
        ApiResponse<Rpt_SlowRotationPartsRecordParamData>
      >("/RptSlowRotationParts/SearchHQ", {
        ...params,
      });
    },

    Rpt_SlowRotationParts_SearchDL: async (
      params: Rpt_SlowRotationPartsParam
    ): Promise<ApiResponse<Rpt_SlowRotationPartsRecordParamData>> => {
      return await apiBase.post<
        Rpt_SlowRotationPartsParam,
        ApiResponse<Rpt_SlowRotationPartsRecordParamData>
      >("/RptSlowRotationParts/SearchDL", {
        ...params,
      });
    },

    Rpt_SlowRotationParts_ExportSearchHQ: async (
      params: Rpt_SlowRotationPartsParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_SlowRotationPartsParam,
        ApiResponse<string>
      >("/RptSlowRotationParts/ExportSearchHQ", {
        ...params,
      });
    },

    Rpt_SlowRotationParts_ExportSearchDL: async (
      params: Rpt_SlowRotationPartsParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_SlowRotationPartsParam,
        ApiResponse<string>
      >("/RptSlowRotationParts/ExportSearchDL", {
        ...params,
      });
    },
  };
};
