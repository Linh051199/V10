import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_DMSSerThongKeBaoHanhTheoModelApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_DMSSerThongKeBaoHanhTheoModel_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      delete param.NgayVaoXuong
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerThongKeBaoHanhTheoModel/SearchHQ", {
        ...param,
        Ft_PageSize: param.Ft_PageSize == 0 ? 100 : param.Ft_PageSize
      });
    },
    Rpt_DMSSerThongKeBaoHanhTheoModel_SearchDL: async (
      param: Partial<Search_SerPayment_Params>
    ): Promise<ApiResponse<SerPayment>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<SerPayment>
      >("/Ser_ReportRoVarianceCost/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    Rpt_DMSSerThongKeBaoHanhTheoModel_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerThongKeBaoHanhTheoModel/ExportSearchHQ", {
        ...param,
      });
    },
    Rpt_DMSSerThongKeBaoHanhTheoModel_ExportDetailSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerThongKeBaoHanhTheoModel/ExportDetailSearchHQ", {
        ...param,
      });
    },
  };
};
