import { AxiosInstance } from "axios";
import { ApiResponse } from "../types";
// import { Sto_TranspReqResponse } from "../types/carservice/Sto_TranspReq";

export const useCommonApi = (apiBase: AxiosInstance) => {
  return {
    // Get realtime
    GetTime: async () => {
      return await apiBase.post<string, ApiResponse<any>>("/Common/GetDTime");
    },
    // End get realtime
  };
};
