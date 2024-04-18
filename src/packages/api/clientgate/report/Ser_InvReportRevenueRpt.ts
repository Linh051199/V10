import { Ser_Engineer } from "@/packages/types/master/Ser_Engineer";
import {
  Search_Ser_InvReportRevenueRpt_Params,
  Ser_InvReportRevenueRpt,
} from "@/packages/types/report/Ser_InvReportRevenueRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportRevenueRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Ser_InvReportRevenueRpt_SearchDL: async (
      param: Partial<Search_Ser_InvReportRevenueRpt_Params>
    ): Promise<ApiResponse<Ser_InvReportRevenueRpt>> => {
      return await apiBase.post<
        Partial<Search_Ser_InvReportRevenueRpt_Params>,
        ApiResponse<Ser_InvReportRevenueRpt>
      >("/Ser_InvReportRevenueRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    Ser_InvReportRevenueRpt_ExportSearchDL: async (
      param: Partial<Search_Ser_InvReportRevenueRpt_Params>
    ): Promise<ApiResponse<Ser_InvReportRevenueRpt>> => {
      return await apiBase.post<
        Partial<Search_Ser_InvReportRevenueRpt_Params>,
        ApiResponse<Ser_InvReportRevenueRpt>
      >("/Ser_InvReportRevenueRpt/ExportSearchDL", {
        ...param,
      });
    },

    // List User
    Ser_User_GetAllActive: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SysUser/SearchDL",
        {
          ...param,
        }
      );
    },

    //Print-SearchDL
    Ser_InvReportRevenueRpt_PrintDL: async (
      param: Partial<Search_Ser_InvReportRevenueRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/Ser_InvReportRevenueRpt/PrintDL",

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
