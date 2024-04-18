import { ApiResponse, SearchParam } from "@/packages/types";
import { Mst_Compartment } from "@/packages/types/master/Mst_Compartment";
import { AxiosInstance } from "axios";

export const useMst_CompartmentApi = (apiBase: AxiosInstance) => {
  return {
    Mst_Compartment_GetAllActive: async (): Promise<
      ApiResponse<Mst_Compartment>
    > => {
      return await apiBase.post<any, ApiResponse<Mst_Compartment>>(
        "/MstCompartment/GetAllActive",
        {}
      );
    },
    Mst_Compartment_Search: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_Compartment>> => {
      return await apiBase.post<any, ApiResponse<Mst_Compartment>>(
        "/MstCompartment/Search",
        {
          ...params,
        }
      );
    },
    Mst_Compartment_ExportExcel: async (
      params: Partial<SearchParam>
    ): Promise<ApiResponse<Mst_Compartment>> => {
      return await apiBase.post<any, ApiResponse<Mst_Compartment>>(
        "/MstCompartment/ExportExcel",
        {
          ...params,
        }
      );
    },
  };
};
