// import {
//   any,
//   Ser_Mst_FilePathVideoApi,
// } from "@/packages/types/master/Ser_Mst_FilePathVideoApi";
import {
  ApiResponse,
  DeleteDealerParam,
  FlagActiveEnum,
  SearchParam,
  UploadedFile,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_Mst_FilePathVideoApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Mst_FilePathVideoApi_Search: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<any>,
        ApiResponse<any>
      >("/SerMstFilePathVideo/Search", {
        ...param,
      });
    },

    Ser_Mst_FilePathVideoApi_Create: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<any>,
        ApiResponse<any>
      >("/SerMstFilePathVideo/Create", {
        strJson: JSON.stringify(param),
      });
    },

    Ser_Mst_FilePathVideoApi_Delete: async (
      key: string
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<any>,
        ApiResponse<any>
      >("/SerMstFilePathVideo/Delete",
        {
          FilePathVideoCode: key
        });
    },
    Ser_Mst_FilePathVideoApi_GetByFilePathVideoCode: async (
      key: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<any>,
        ApiResponse<any>
      >("/SerMstFilePathVideo/GetByFilePathVideoCode",
        {
          FilePathVideoCode: key.current.FilePathVideoCode
        });
    },



    Ser_Mst_FilePathVideoApi_Update: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post(
        "/SerMstFilePathVideo/Update",
        {
          strJson: JSON.stringify({
            ...param,
          }),
          ColsUpd: "FilePathVideoName,IdxView,FilePathVideo,FilePathAvatar,FlagActive,Remark"
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

    },

    Ser_Mst_FilePathVideoApi_ExportExcel: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstFilePathVideo/ExportExcel",
        {
          ...param,
        }
      );
    },

    Ser_Mst_FilePathVideoApi_ExportHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstLocation/ExportHQ",
        { ...param }
      );
    },

    Ser_Mst_FilePathVideoApi_ExportByListLocationCode: async (
      selectedCodes: {
        LocationCode: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListLocationCode.push(currentValue.LocationCode);
          return accumulator;
        },
        {
          ListLocationCode: [],
        }
      );

      data.ListLocationCode = data.ListLocationCode.join(",");
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstLocation/ExportByListLocationCode",
        data
      );
    },

    Ser_Mst_FilePathVideoApi_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<string>>(
        "/SerMstLocation/ExportTemplate"
      );
    },

    Ser_Mst_FilePathVideoApi_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<any>>(
        "/SerMstLocation/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_Mst_FilePathVideoApi_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMstLocation/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    File_UploadFile: async (
      file: File,
      onSetData: any
    ): Promise<ApiResponse<UploadedFile>> => {
      // file is the file you want to upload
      const form = new FormData();
      form.append("file", file);
      return await apiBase.post<File, ApiResponse<any>>(
        "/File/UploadFile",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e: any) => onSetData(e),
        }
      );
    },
  };
};
