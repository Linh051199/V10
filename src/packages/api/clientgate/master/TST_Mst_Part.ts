import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  SearchTST_Mst_PartParam,
  TST_Mst_Part,
} from "@/packages/types/master/TST_Mst_Part";
import { AxiosInstance } from "axios";

export const useTST_Mst_PartApi = (apiBase: AxiosInstance) => {
  return {
    //Search
    TST_Mst_Part_Search: async (
      params: Partial<SearchTST_Mst_PartParam>
    ): Promise<ApiResponse<TST_Mst_Part>> => {
      return await apiBase.post<
        Partial<SearchTST_Mst_PartParam>,
        ApiResponse<TST_Mst_Part>
      >("/TSTMstPart/Search", {
        ...params,
      });
    },
    //getTSTMstPartGroup
    TSTMstPartGroup_Search: async () => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/TSTMstPartGroup/Search",
        {
          GroupCode: "",
          GroupName: "",
          FlagActive: "",
          IsGet_TST_Mst_PartGroup: "1",
          Ft_PageIndex: 0,
          Ft_PageSize: 99999999,
        }
      );
    },
    //getTSTMstPartGroup
    TSTMstPartType_Search: async () => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/TSTMstPartType/Search",
        {
          TypeCode: "",
          TypeName: "",
          FlagActive: "",
          IsGet_TST_Mst_PartType: "1",
          Ft_PageIndex: 0,
          Ft_PageSize: 99999999,
        }
      );
    },
    //     //SearchDL
    //     TST_Mst_Part_SearchDL: async (
    //       params: Partial<SearchTST_Mst_PartParam>
    //     ): Promise<ApiResponse<TST_Mst_Part>> => {
    //       return await apiBase.post<
    //         Partial<SearchTST_Mst_PartParam>,
    //         ApiResponse<TST_Mst_Part>
    //       >("/TSTMstPart/SearchDL", {
    //         ...params,
    //       });
    //     },
    //     //Create
    //     TST_Mst_Part_Create: async (
    //       params: Partial<TST_Mst_Part>
    //     ): Promise<ApiResponse<TST_Mst_Part>> => {
    //       return await apiBase.post<
    //         Partial<SearchTST_Mst_PartParam>,
    //         ApiResponse<TST_Mst_Part>
    //       >("/TSTMstPart/Create", {
    //         strJson: JSON.stringify({ ...params }),
    //       });
    //     },
    //     //Delete
    //     TST_Mst_Part_Delete: async (
    //       params: Partial<SearchTST_Mst_PartParam>
    //     ): Promise<ApiResponse<TST_Mst_Part>> => {
    //       return await apiBase.post<
    //         Partial<SearchTST_Mst_PartParam>,
    //         ApiResponse<TST_Mst_Part>
    //       >("/TSTMstPart/Delete", {
    //         ...params,
    //       });
    //     },
    //Update
    TST_Mst_Part_Update: async (
      params: Partial<TST_Mst_Part>
    ): Promise<ApiResponse<TST_Mst_Part>> => {
      const dataSave = { Lst_TST_Mst_Part: [params] };
      return await apiBase.post<
        Partial<SearchTST_Mst_PartParam>,
        ApiResponse<TST_Mst_Part>
      >("/TSTMstPart/Update", {
        strJson: JSON.stringify(dataSave),
      });
    },
    //Export template
    TST_Mst_Part_ExportTemplate: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/TSTMstPart/ExportTemplate",
        {}
      );
    },
    //Import excel
    TST_Mst_Part_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/TSTMstPart/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    //ExportHQ
    TST_Mst_Part_ExportHQ: async (
      params?: Partial<SearchTST_Mst_PartParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/TSTMstPart/ExportHQ",
        {
          ...params,
        }
      );
    },
    //ExportDL
    TST_Mst_Part_ExportDL: async (
      params?: Partial<SearchTST_Mst_PartParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/TSTMstPart/ExportDL",
        {
          ...params,
        }
      );
    },
    //     //getAllActive
    //     TST_Mst_Part_GetAllActive: async () => {
    //       return await apiBase.post<
    //         Partial<TST_Mst_Part>,
    //         ApiResponse<TST_Mst_Part>
    //       >("/TSTMstPart/GetAllActive");
    //     },
  };
};
