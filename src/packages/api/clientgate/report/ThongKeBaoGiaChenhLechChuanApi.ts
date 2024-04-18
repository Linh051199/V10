import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useThongKeBaoGiaChenhLechChuanApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    ThongKeBaoGiaChenhLechChuanApiSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<SerPayment>> => {
      delete param.NgayVaoXuong
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<SerPayment>
      >("/Ser_ReportRoVarianceCost/SearchHQ", {
        ...param,
        Ft_PageSize: param.Ft_PageSize == 0 ? 100 : param.Ft_PageSize
      });
    },
    ThongKeBaoGiaChenhLechChuanApiSearchDL: async (
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
    ThongKeBaoGiaChenhLechChuanApiExportSearch: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/Ser_ReportRoVarianceCost/ExportSearchDL", {
        ...param,
      });
    },
  };
};
