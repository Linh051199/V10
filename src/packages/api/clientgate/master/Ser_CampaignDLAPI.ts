import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_Cavity_Param,
  Ser_Cavity,
} from "@/packages/types/master/Ser_Cavity";
import { AxiosInstance } from "axios";

export const useSer_CampaignDLApi = (apiBase: AxiosInstance) => {
  return {
    Ser_CampaignDL_GetAllActive: async (): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/GetAllActive",
        {}
      );
    },
    Ser_CampaignDL_SearchHQ: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/SearchHQ",
        {
          ...params,
        }
      );
    },
    Ser_CampaignDL_SearchDL: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCampaign/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_CampaignDL_ExportExcelDL: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaign/ExportDL",
        {
          ...params,
        }
      );
    },
    Ser_CampaignDL_DetailDL: async (
      code: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCampaign/GetByCamID",
        {
          CamID: code,
        }
      );
    },
  };
};
