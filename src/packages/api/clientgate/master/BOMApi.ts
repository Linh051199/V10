import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  Search_BOM_Param,
  BOM,
} from "@/packages/types/master/BOM";
import { AxiosInstance } from "axios";



export const useBOMApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    BOM_SearchHQ: async (
      params: Partial<Search_BOM_Param>
    ): Promise<ApiResponse<BOM>> => {
      return await apiBase.post<
        Partial<Search_BOM_Param>,
        ApiResponse<any>
      >("/MstBOM/Search", {
        ...params,
      });
    },
    BOM_GetByBOMCode: async (
      code: Partial<any>
    ): Promise<ApiResponse<BOM>> => {
      console.log(26, code)
      return await apiBase.post<
        Partial<Search_BOM_Param>,
        ApiResponse<any>
      >("/MstBOM/GetByBOMCode", {
        ...code
      });
    },
    //SearchDL
    BOM_SearchDL: async (
      params: Partial<Search_BOM_Param>
    ): Promise<ApiResponse<BOM>> => {
      return await apiBase.post<
        Partial<Search_BOM_Param>,
        ApiResponse<BOM>
      >("/BOM/SearchDL", {
        ...params,
      });
    },

    //Create
    BOM_Create: async (
      params: any
    ): Promise<ApiResponse<BOM>> => {
      return await apiBase.post<
        Partial<Search_BOM_Param>,
        ApiResponse<BOM>
      >("/MstBOM/Create", {
        strJson: JSON.stringify({ ...params }),
      });
    },



    //Delete
    BOM_Delete: async (
      code: any
    ): Promise<ApiResponse<BOM>> => {
      return await apiBase.post<
        Partial<Search_BOM_Param>,
        ApiResponse<BOM>
        >("/MstBOM/Delete", {
        BOMcode: code
      });
    },

    //Update
    BOM_Update: async (
      params: Partial<any>
    ): Promise<ApiResponse<BOM>> => {
      return await apiBase.post<
        Partial<Search_BOM_Param>,
        ApiResponse<BOM>
      >("/MstBOM/Update",
        {
          strJson: JSON.stringify(params),
          ColsUpd: "BOMDesc,FlagActive",
        },
      );
    },

    //Export template
    BOM_ExportTemplate: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/BOM/ExportTemplate",
        {}
      );
    },

    //Import excel
    BOM_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstBOM/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    //ExportHQ
    BOM_Export: async (
      params?: Partial<Search_BOM_Param>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstBOM/ExportExcel",
        {
          ...params,
        }
      );
    },

    //ExportDL
    BOM_ExportDL: async (
      params?: Partial<Search_BOM_Param>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/BOM/ExportDL",
        {
          ...params,
        }
      );
    },

    //getAllActive
    BOM_GetAllActive: async () => {
      return await apiBase.post<
        Partial<BOM>,
        ApiResponse<BOM>
      >("/BOM/GetAllActive");
    },
  };
};
