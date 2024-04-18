import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_ReportHistoryCostParam {
  DealerCode: string;
  PartCode: string;
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  FlagDataWH: any;
}

export interface Ser_ReportHistoryCostRecord {
  PartID: string;
  RefID: string;
  RefNo: string;
  RefDate: string;
  Remark: string;
  LocationID: string;
  SLN: string;
  TGN: string;
  Price: string;
  PartGroupID: string;
  PartTypeID: string;
  DealerCode: string;
  PartCode: string;
  EngName: string;
  VieName: string;
  Note: string;
  Unit: string;
  Location: string;
  VAT: string;
  Quantity: string;
  MinQuantity: string;
  Cost: string;
  Model: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FreqUsed: string;
  CusDebt: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagInTST: string;
}

interface Ser_ReportHistoryCostRecordParamData {
  lst_Ser_ReportHistoryCost: Ser_ReportHistoryCostRecord[];
  lst_Ser_Mst_Part: Ser_ReportHistoryCostRecord[];
}
export const useSer_ReportHistoryCostApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_ReportHistoryCost_SearchDL: async (
      params: Ser_ReportHistoryCostParam
    ): Promise<ApiResponse<Ser_ReportHistoryCostRecordParamData>> => {
      return await apiBase.post<
        Ser_ReportHistoryCostParam,
        ApiResponse<Ser_ReportHistoryCostRecordParamData>
      >("/Ser_ReportHistoryCost/SearchDL", {
        ...params,
      });
    },

    Ser_ReportHistoryCost_ExportSearchDL: async (
      params: Ser_ReportHistoryCostParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_ReportHistoryCostParam,
        ApiResponse<string>
      >("/Ser_ReportHistoryCost/ExportSearchDL", {
        ...params,
      });
    },

    Ser_ReportHistoryCost_PrintDL: async (
      param: Partial<Ser_ReportHistoryCostParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/Ser_ReportHistoryCost/PrintDL",

        {
          ...param,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
  };
};
