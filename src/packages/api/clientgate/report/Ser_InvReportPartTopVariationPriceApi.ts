import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_InvReportPartTopVariationPriceParam {
  Top: string;
  ToDate: any;
  FromDate: any;
  DateFromTo: any[];
  DealerCode: string;
  FlagDataWH: 1 | 0;
}

export interface Ser_InvReportPartTopVariationPriceRecord {
  Partid: string;
  partCode: string;
  VieName: string;
  Unit: string;
  MinPrice: string;
  MaxPrice: string;
  CountPrice: string;
}

interface Ser_InvReportPartTopVariationPriceRecordParamData {
  lst_Ser_InvReportPartTopVariationPrice: Ser_InvReportPartTopVariationPriceRecord[];
}
export const useSer_InvReportPartTopVariationPriceApi = (
  apiBase: AxiosInstance
) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_InvReportPartTopVariationPrice_SearchDL: async (
      params: Ser_InvReportPartTopVariationPriceParam
    ): Promise<
      ApiResponse<Ser_InvReportPartTopVariationPriceRecordParamData>
    > => {
      return await apiBase.post<
        Ser_InvReportPartTopVariationPriceParam,
        ApiResponse<Ser_InvReportPartTopVariationPriceRecordParamData>
      >("/Ser_InvReportPartTopVariationPrice/SearchDL", {
        ...params,
      });
    },

    Ser_InvReportPartTopVariationPrice_ExportSearchDL: async (
      params: Ser_InvReportPartTopVariationPriceParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_InvReportPartTopVariationPriceParam,
        ApiResponse<string>
      >("/Ser_InvReportPartTopVariationPrice/ExportSearchDL", {
        ...params,
      });
    },
  };
};
