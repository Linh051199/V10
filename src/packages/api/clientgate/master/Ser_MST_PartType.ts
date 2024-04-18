import { useI18n } from "@/i18n/useI18n";
import { Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_PartType = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_PartType_SearchHQ: async (
      params: SearchParam
    ): Promise<ApiResponse<Ser_MST_PartType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_PartType>>(
        "/SerMSTPartType/SearchHQ",
        {
          // ...params,
          PartTypeID: "",
          TypeName: params.KeyWord,
          IsActive: params.FlagActive,
          Ft_PageIndex: params.Ft_PageIndex,
          Ft_PageSize: params.Ft_PageSize,
        }
      );
    },
    Ser_MST_PartType_SearchDL: async (
      params: SearchParam
    ): Promise<ApiResponse<Ser_MST_PartType>> => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_PartType>>(
        "/SerMSTPartType/SearchDL",
        {
          // ...params,
          PartTypeID: "",
          TypeName: params.KeyWord,
          IsActive: params.FlagActive,
          Ft_PageIndex: params.Ft_PageIndex,
          Ft_PageSize: params.Ft_PageSize,
        }
      );
    },
    Ser_MST_PartType_GetAllActive: async (): Promise<
      ApiResponse<Ser_MST_PartType>
    > => {
      return await apiBase.post<
        Partial<Ser_MST_PartType>,
        ApiResponse<Ser_MST_PartType>
      >("/SerMSTPartType/GetAllActive", {});
    },
    Ser_MST_PartType_Create: async (
      params: Partial<Ser_MST_PartType>
    ): Promise<ApiResponse<Ser_MST_PartType>> => {
      return await apiBase.post<
        Partial<Ser_MST_PartType>,
        ApiResponse<Ser_MST_PartType>
      >("/SerMSTPartType/Create", {
        strJson: JSON.stringify(params),
      });
    },
    Ser_MST_PartType_Update: async (
      key: string,
      data: Partial<Ser_MST_PartType>
    ): Promise<ApiResponse<Ser_MST_PartType>> => {
      return await apiBase.post<
        Partial<Ser_MST_PartType>,
        ApiResponse<Ser_MST_PartType>
      >("/SerMSTPartType/Update", {
        strJson: JSON.stringify({
          PartTypeID: key,
          ...data,
        }),
      });
    },

    Ser_MST_PartType_Delete: async (key: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_PartType>>(
        "/SerMSTPartType/Delete",
        {
          PartTypeID: key,
        }
      );
    },

    Ser_MST_PartType_DeleteMulti: async (keys: string[]) => {
      let error: any[] = [];
      Promise.all(
        keys.map(async (PartTypeID: string) => {
          const response = await apiBase.post<
            SearchParam,
            ApiResponse<Ser_MST_PartType>
          >("/SerMSTPartType/Delete", {
            PartTypeID,
          });
          if (!response.isSuccess) {
            error = [...error];
          }
        })
      );
      return error;
    },

    Ser_MST_PartType_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_MST_PartType>, ApiResponse<string>>(
        "/SerMSTPartType/ExportTemplate",
        {}
      );
    },

    Ser_MST_PartType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTPartType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Ser_MST_PartType_ExportExcelDL: async (
      params: string
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Ser_MST_PartType>,
          ApiResponse<Ser_MST_PartType>
        >("/SerMSTPartType/ExportDL", {
          // KeyWord: keyword,
          // FlagActive: "",
          PartTypeID: "",
          TypeName: params,
          IsActive: "",
        });
      }
    },

    Ser_MST_PartType_ExportExcelHQ: async (
      params: string
    ): Promise<ApiResponse<any>> => {
      console.log("🟡 ~ params:", params);
      {
        return await apiBase.post<
          Partial<Ser_MST_PartType>,
          ApiResponse<Ser_MST_PartType>
        >("/SerMSTPartType/ExportHQ", {
          // KeyWord: keyword,
          // FlagActive: "",
          PartTypeID: "",
          TypeName: params,
          IsActive: "",
        });
      }
    },
    Ser_MST_PartType_ExportByListCode: async (
      keys: string[]
    ): Promise<ApiResponse<any>> => {
      const condition = keys.map((item: any) => {
        return item.SpecCode;
      });
      {
        return await apiBase.post<
          Partial<Ser_MST_PartType>,
          ApiResponse<string>
        >("/SerMSTPartType/ExportByListCode", {
          ListSpecCode: condition.join(","),
        });
      }
    },
  };
};
