import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import {
  DUMMY_DATA_DL,
  DUMMY_DATA_HQ,
  DUMMY_DATA_HTV,
} from "@/pages/reports/XemBaoCaoAPI_PhanThang/list/DUMMY_DATA";
import { AxiosInstance } from "axios";
import { format } from "date-fns";

export const useTraCuuLichSuaSuaChuaApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    TraCuuLichSuaSuaChua_SearchHQ: async (params: any): Promise<any> => {
      const request = {
        ...params,
        Month: params.Month ? format(params.Month, "yyyy-MM") : "",
      };
      // fake response data
      const promise = new Promise((resolve, reject) => {
        try {
          switch (params.DealerCode) {
            case "":
              resolve(DUMMY_DATA_HQ); // lấy toàn bộ đại lý
              break;
            case "HTC":
              resolve(DUMMY_DATA_HTV);
              break;
            default:
              resolve(DUMMY_DATA_DL);
          }
        } catch (err) {
          throw new Error(JSON.stringify(err));
        }
      });
      return await promise;
      //   return await apiBase.post<any, ApiResponse<any>>(
      //     "/RptNXTQuyenDoiNo/SearchHQ",
      //     {
      //       ...params,
      //     }
      //   );
    },
    TraCuuLichSuaSuaChua_SearchDL: async (params: any): Promise<any> => {
      // fake response data
      return new Promise((resolve, reject) => {
        try {
          resolve(DUMMY_DATA_DL);
        } catch (err) {
          throw new Error(JSON.stringify(err));
        }
      });
      //   return await apiBase.post<any, ApiResponse<any>>(
      //     "/RptNXTQuyenDoiNo/SearchHQ",
      //     {
      //       ...params,
      //     }
      //   );
    },

    // Get all DealerCode
    TraCuuLichSuaSuaChua_GetAllActive: async (): Promise<
      ApiResponse<Mst_Dealer>
    > => {
      return await apiBase.post<
        Partial<SearchDealerParam>,
        ApiResponse<Mst_Dealer>
      >("/MstDealer/GetAllActive");
    },
  };
};
