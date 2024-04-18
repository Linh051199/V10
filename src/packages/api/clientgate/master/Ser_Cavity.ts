import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_Cavity_Param,
  Ser_Cavity,
} from "@/packages/types/master/Ser_Cavity";
import { AxiosInstance } from "axios";

export const useSer_CavityApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Cavity_GetAllActive: async (): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/GetAllActive",
        {}
      );
    },
    Mst_Compartment_GetAllActive: async (): Promise<
      ApiResponse<Ser_Cavity>
    > => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/MstCompartment/GetAllActive",
        {}
      );
    },
    Ser_Cavity_GetCavityStatusHQ: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/GetCavityStatusHQ",
        {
          ...params,
        }
      );
    },
    Ser_Cavity_GetCavityStatusDL: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/GetCavityStatusDL",
        {
          ...params,
        }
      );
    },

    Ser_Cavity_SearchHQ: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/SearchHQ",
        {
          ...params,
        }
      );
    },

    Ser_Cavity_SearchDL: async (
      params: Partial<Search_Ser_Cavity_Param>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_Cavity_Create: async (
      data: Partial<Ser_Cavity>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_Cavity_Update: async (
      data: Partial<Ser_Cavity>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_Cavity_GetByCavityNoDL: async (
      params: Partial<Ser_Cavity>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/GetByCavityNoDL",
        {
          ...params,
        }
      );
    },
    Ser_Cavity_GetByCavityNoHQ: async (
      params: Partial<Ser_Cavity>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/GetByCavityNoHQ",
        {
          ...params,
        }
      );
    },
    Ser_Cavity_Delete: async (
      data: Partial<Ser_Cavity>
    ): Promise<ApiResponse<Ser_Cavity>> => {
      return await apiBase.post<any, ApiResponse<Ser_Cavity>>(
        "/SerCavity/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
  };
};
