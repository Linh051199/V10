import { ApiResponse, SearchParam } from "@/packages/types"; 
import { AxiosInstance } from "axios";

export const useQRBoxApi = (apiBase: AxiosInstance) => {
  return {
    Mst_SubmissionForm_Search: async (
        param: Partial<SearchParam>
      ): Promise<ApiResponse<any>> => {
        return await apiBase.post<any, ApiResponse<any>>(
          "/MstSubmissionForm/Search",
          { ...param }
        );
      },
  };
};
