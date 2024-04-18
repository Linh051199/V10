import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_Insurance_Param,
  Ser_Insurance,
} from "@/packages/types/master/Ser_Insurance";
import { AxiosInstance } from "axios";

export const useSer_InsuranceAPIApi = (apiBase: AxiosInstance) => {
  return {
    Ser_InsuranceAPI_GetAllActive: async (): Promise<
      ApiResponse<Ser_Insurance>
    > => {
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsurance/GetAllActive"
      );
    },
    Ser_InsuranceAPI_Search: async (
      params: Partial<Search_Ser_Insurance_Param>
    ): Promise<ApiResponse<Ser_Insurance>> => {
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsurance/SearchDL",
        {
          ...params,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_Insurance_ExportExcel: async (
      params: Partial<Search_Ser_Insurance_Param>
    ): Promise<ApiResponse<Ser_Insurance>> => {
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsurance/ExportDL",
        {
          ...params,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_Insurance_ExportTemplate: async (): Promise<
      ApiResponse<Ser_Insurance>
    > => {
      return await apiBase.post<any, ApiResponse<Ser_Insurance>>(
        "/SerInsurance/ExportTemplate",
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_InsuranceAPI_Create: async (param: Partial<any>) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsurance/Create",
        {
          strJson: JSON.stringify({
            ...param,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Ser_InsuranceAPI_Update: async (param: any) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsurance/Update",
        {
          strJson: JSON.stringify({
            ...param,
          }),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
    Ser_InsuranceAPI_Delete: async (code: string) => {
      return await apiBase.post<any, ApiResponse<any>>("/SerInsurance/Delete", {
        InsNo: code,
      });
    },
  };
};
