import {
  Search_SerWarrantyAcceptRpt_Params,
  SerWarrantyAcceptRpt,
} from "@/packages/types/report/SerWarrantyAcceptRpt";
import {
  ApiResponse,
  Mst_Dealer,
  SearchDealerParam,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_WarrantyAcceptRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerWarrantyAcceptRpt_SearchDL: async (
      param: Partial<Search_SerWarrantyAcceptRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerWarrantyAcceptRpt_Params>,
        ApiResponse<SerWarrantyAcceptRpt>
      >("/SerWarrantyAcceptRpt/SearchDL", {
        ...param,
      });
    },
    // SearchHQ
    SerWarrantyAcceptRpt_SearchHQ: async (
      param: Partial<Search_SerWarrantyAcceptRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerWarrantyAcceptRpt_Params>,
        ApiResponse<SerWarrantyAcceptRpt>
      >("/SerWarrantyAcceptRpt/SearchHQ", {
        ...param,
      });
    },
    //   //Export-SearchDL
    //  SerWarrantyAcceptRpt_ExportSearchDL: async (
    //     param: Partial<Search_SerWarrantyAcceptRpt_Params>
    //   ): Promise<ApiResponse<SerWarrantyAcceptRpt>> => {
    //     return await apiBase.post<
    //       Partial<Search_SerWarrantyAcceptRpt_Params>,
    //       ApiResponse<SerWarrantyAcceptRpt>
    //     >("/SerWarrantyAcceptRpt/ExportSearchDL", {
    //       ...param,
    //     });
    //   },
    //Export-SearchHQ
    SerWarrantyAcceptRpt_ExportSearchHQ: async (
      param: Partial<Search_SerWarrantyAcceptRpt_Params>
    ): Promise<ApiResponse<SerWarrantyAcceptRpt>> => {
      return await apiBase.post<
        Partial<Search_SerWarrantyAcceptRpt_Params>,
        ApiResponse<SerWarrantyAcceptRpt>
      >("/SerWarrantyAcceptRpt/ExportHQ", {
        ...param,
      });
    },
    //ExportDetail-SearchHQ
    SerWarrantyAcceptRpt_ExportDetailSearchHQ: async (
      param: Partial<Search_SerWarrantyAcceptRpt_Params>
    ): Promise<ApiResponse<SerWarrantyAcceptRpt>> => {
      return await apiBase.post<
        Partial<Search_SerWarrantyAcceptRpt_Params>,
        ApiResponse<SerWarrantyAcceptRpt>
      >("/SerWarrantyAcceptRpt/ExportAllDetailHQ", {
        ...param,
      });
    },
    //   // Get all DealerCode
    //   Dealer_GetAllActive: async (): Promise<ApiResponse<Mst_Dealer>> => {
    //     return await apiBase.post<
    //       Partial<SearchDealerParam>,
    //       ApiResponse<Mst_Dealer>
    //     >("/MstDealer/GetAllActive");
    //   },
    //Print-SearchHQ
    SerWarrantyAcceptRpt_PrintHQ: async (
      param: Partial<Search_SerWarrantyAcceptRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerWarrantyAcceptRpt/PrintHQ",
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
    //   //Print-SearchDL
    //  SerWarrantyAcceptRpt_PrintDL: async (
    //     param: Partial<Search_SerWarrantyAcceptRpt_Params>
    //   ): Promise<ApiResponse<any>> => {
    //     return await apiBase.post<any, ApiResponse<string>>(
    //       "/SerWarrantyAcceptRpt/PrintDL",
    //       {
    //         ...param,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //       }
    //     );
    //   },
  };
};
