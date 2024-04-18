import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_ROWarrantyReportHTMVApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Ser_ROWarrantyReportHTMV_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      delete param.NgayVaoXuong
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/SerROWarrantyReportHTMV/SearchHQ", {
        ...param,
        Ft_PageSize: param.Ft_PageSize == 0 ? 100 : param.Ft_PageSize
      });
    },

    //Export-SearchDL
    Ser_ROWarrantyReportHTMV_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
        >("/SerROWarrantyReportHTMV/ExportHQ", {
        ...param,
      });
    },
  };
};
