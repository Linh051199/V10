import {
  Search_SerInvReportInsuranceDebitRpt_Params,
  SerInvReportInsuranceDebitRpt,
} from "@/packages/types/report/SerInvReportInsuranceDebitRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportInsuranceDebitRptApi = (
  apiBase: AxiosInstance
) => {
  return {
    // SearchDL
    SerInvReportInsuranceDebitRpt_SearchDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<SerInvReportInsuranceDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportInsuranceDebitRpt_Params>,
        ApiResponse<SerInvReportInsuranceDebitRpt>
      >("/SerInvReportInsuranceDebitRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportInsuranceDebitRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<SerInvReportInsuranceDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportInsuranceDebitRpt_Params>,
        ApiResponse<SerInvReportInsuranceDebitRpt>
      >("/SerInvReportInsuranceDebitRpt/ExportExcelDL", {
        ...param,
      });
    },

    //Print-SearchDL
    SerInvReportInsuranceDebitRpt_PrintDL: async (
      param: Partial<Search_SerInvReportInsuranceDebitRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportInsuranceDebitRpt/Print",

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
