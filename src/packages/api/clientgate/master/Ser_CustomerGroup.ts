import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  SearchSer_CustomerGroupParam,
  Ser_CustomerGroup,
} from "@/packages/types/master/Ser_CustomerGroup";
import { AxiosInstance } from "axios";

export const useSer_Customer_GroupApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    Ser_CustomerGroup_SearchHQ: async (
      params: Partial<SearchSer_CustomerGroupParam>
    ): Promise<ApiResponse<Ser_CustomerGroup>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerGroupParam>,
        ApiResponse<Ser_CustomerGroup>
      >("/SerCustomerGroup/SearchHQ", {
        ...params,
      });
    },
    //SearchDL
    Ser_CustomerGroup_SearchDL: async (
      params: Partial<SearchSer_CustomerGroupParam>
    ): Promise<ApiResponse<Ser_CustomerGroup>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerGroupParam>,
        ApiResponse<Ser_CustomerGroup>
      >("/SerCustomerGroup/SearchDL", {
        ...params,
        // Ft_PageSize: params.Ft_PageSize == 0 ? 100 : params.Ft_PageSize
      });
    },

    //Create
    Ser_CustomerGroup_Create: async (
      params: Partial<Ser_CustomerGroup>
    ): Promise<ApiResponse<Ser_CustomerGroup>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerGroupParam>,
        ApiResponse<Ser_CustomerGroup>
      >("/SerCustomerGroup/Create", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Update
    Ser_CustomerGroup_Update: async (
      params: Partial<Ser_CustomerGroup>
    ): Promise<ApiResponse<Ser_CustomerGroup>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerGroupParam>,
        ApiResponse<Ser_CustomerGroup>
      >("/SerCustomerGroup/Update", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Delete
    Ser_CustomerGroup_Delete: async (
      params: Partial<any>
    ): Promise<ApiResponse<Ser_CustomerGroup>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerGroupParam>,
        ApiResponse<Ser_CustomerGroup>
      >("/SerCustomerGroup/Delete", {
        ...params,
      });
    },

    //ExportDL
    Ser_CustomerGroup_ExportDL: async (
      params?: Partial<SearchSer_CustomerGroupParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomerGroup/ExportDL",
        {
          ...params,
        }
      );
    },

    // View Detail
    Ser_CustomerGroup_GetByCustomerGroupNo: async (
      params?: Partial<SearchSer_CustomerGroupParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomerGroup/GetByCustomerGroupNo",
        {
          ...params,
        }
      );
    },
  };
};
