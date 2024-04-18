import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_Engineer_Param,
  Ser_Engineer,
} from "@/packages/types/master/Ser_Engineer";
import { AxiosInstance } from "axios";

export const useSer_EngineerApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Engineer_GetAllActive: async (): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/GetAllActive",
        {}
      );
    },
    Ser_Engineer_SearchHQ: async (
      params: Partial<Search_Ser_Engineer_Param>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/SearchHQ",
        {
          ...params,
        }
      );
    },
    Ser_Engineer_SearchDL: async (
      params: Partial<Search_Ser_Engineer_Param>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_Engineer_GetByStatusHQ: async (
      params: Partial<Search_Ser_Engineer_Param>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/GetByStatusHQ",
        {
          ...params,
        }
      );
    },
    Ser_Engineer_GetByStatusDL: async (
      params: Partial<Search_Ser_Engineer_Param>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/GetByStatusDL",
        {
          ...params,
        }
      );
    },
    Ser_Engineer_Delete: async (
      params: Partial<Search_Ser_Engineer_Param>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/Delete",
        {
          ...params,
        }
      );
    },
    Ser_Engineer_GetByEngineerNoDL: async (
      params: Partial<Search_Ser_Engineer_Param>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/GetByEngineerNoDL",
        {
          ...params,
        }
      );
    },
    Ser_Engineer_Update: async (
      data: Partial<any>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_Engineer_Create: async (
      data: Partial<any>
    ): Promise<ApiResponse<Ser_Engineer>> => {
      return await apiBase.post<any, ApiResponse<Ser_Engineer>>(
        "/SerEngineer/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
  };
};
