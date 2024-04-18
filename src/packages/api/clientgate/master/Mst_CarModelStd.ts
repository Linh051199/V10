import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  Search_Mst_CarModelStd_Param,
  Mst_CarModelStd,
} from "@/packages/types/master/Mst_CarModelStd";
import { AxiosInstance } from "axios";

export const useMst_CarModelStdApi = (apiBase: AxiosInstance) => {
  return {
    //Search
    Mst_CarModelStd_SearchHQ: async (
      params: Partial<Search_Mst_CarModelStd_Param>
    ): Promise<ApiResponse<Mst_CarModelStd>> => {
      return await apiBase.post<
        Partial<Search_Mst_CarModelStd_Param>,
        ApiResponse<Mst_CarModelStd>
      >("/MstCarModelStd/Search", {
        ...params,
      });
    },

    //Create
    Mst_CarModelStd_Create: async (
      params: Partial<Mst_CarModelStd>
    ): Promise<ApiResponse<Mst_CarModelStd>> => {
      return await apiBase.post<
        Partial<Search_Mst_CarModelStd_Param>,
        ApiResponse<Mst_CarModelStd>
      >("/MstCarModelStd/Create", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Delete
    Mst_CarModelStd_Delete: async (
      params: Partial<Search_Mst_CarModelStd_Param>
    ): Promise<ApiResponse<Mst_CarModelStd>> => {
      return await apiBase.post<
        Partial<Search_Mst_CarModelStd_Param>,
        ApiResponse<Mst_CarModelStd>
      >("/MstCarModelStd/Delete", {
        ...params,
      });
    },

    //Update
    Mst_CarModelStd_Update: async (
      key: any,
      data: Partial<any>
    ): Promise<ApiResponse<Mst_CarModelStd>> => {
      return await apiBase.post<
        Partial<Search_Mst_CarModelStd_Param>,
        ApiResponse<Mst_CarModelStd>
      >("/MstCarModelStd/Update", {
        strJson: JSON.stringify(key),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    //Export template
    Mst_CarModelStd_ExportTemplate: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/MstCarModelStd/ExportTemplate",
        {}
      );
    },

    //Import excel
    Mst_CarModelStd_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstCarModelStd/ImportExcel",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    //Export
    Mst_CarModelStd_Export: async (
      params?: Partial<Search_Mst_CarModelStd_Param>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstCarModelStd/ExportExcel",
        {
          ...params,
        }
      );
    },

    // //ExportDL
    // Mst_CarModelStd_ExportDL: async (
    //   params?: Partial<Search_Mst_CarModelStd_Param>
    // ): Promise<ApiResponse<any>> => {
    //   return await apiBase.post<Partial<any>, ApiResponse<any>>(
    //     "/MstCarModelStd/ExportDL",
    //     {
    //       ...params,
    //     }
    //   );
    // },

    // //getAllActive
    // Mst_CarModelStd_GetAllActive: async () => {
    //   return await apiBase.post<
    //     Partial<Mst_CarModelStd>,
    //     ApiResponse<Mst_CarModelStd>
    //   >("/MstCarModelStd/GetAllActive");
    // },
  };
};
