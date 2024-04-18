import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_BieuMauIn = (apiBase: AxiosInstance) => {
  return {
    Mst_BieuMauIn_GetAllPrintType: async () => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/DlrMstDealerContractFormPrint/GetAllPrintType"
      );
    },

    Mst_BieuMauIn_GetTempPrint: async (tempprinttype: string) => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/DlrMstDealerContractFormPrint/GetTempPrint",
        {
          tempprinttype: tempprinttype,
        }
      );
    },
    Mst_BieuMauIn_SaveDlrMstDealerContractFormPrint: async (params: any) => {
      const form = new FormData();
      form.append("file", params.file);
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/DlrMstDealerContractFormPrint/SaveDlrMstDealerContractFormPrint",

        { form, ...params },

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
