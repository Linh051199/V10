import {
  Search_SerReportReceivableDebitRpt_Params,
  SerReportReceivableDebitRpt,
} from "@/packages/types/report/SerReportReceivableDebitRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_ReportReceivableDebitRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerReportReceivableDebitRpt_SearchDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<SerReportReceivableDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerReportReceivableDebitRpt_Params>,
        ApiResponse<SerReportReceivableDebitRpt>
      >("/SerReportReceivableDebitRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerReportReceivableDebitRpt_ExportSearchDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<SerReportReceivableDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerReportReceivableDebitRpt_Params>,
        ApiResponse<SerReportReceivableDebitRpt>
      >("/SerReportReceivableDebitRpt/ExportExcelDL", {
        ...param,
      });
    },
    //Print-SearchDL
    SerReportReceivableDebitRpt_PrintDL: async (
      param: Partial<Search_SerReportReceivableDebitRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerReportReceivableDebitRpt/Print",

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
