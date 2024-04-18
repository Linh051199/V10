import { excludeDuplicateObjOfArr } from "@/packages/common";
import {
  Search_Ser_MST_PartGroup,
  Ser_MST_PartGroup,
} from "@/packages/types/master/Ser_MST_PartGroup";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_PartGroup = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_PartGroup_SearchDL: async (
      param: Partial<Search_Ser_MST_PartGroup>
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_PartGroup>,
        ApiResponse<Ser_MST_PartGroup>
      >("/SerMSTPartGroup/SearchDL", {
        ...param,
      });
    },

    Ser_MST_PartGroup_SearchHQ: async (
      param: Partial<Search_Ser_MST_PartGroup>
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_PartGroup>,
        ApiResponse<Ser_MST_PartGroup>
      >("/SerMSTPartGroup/SearchHQ", {
        ...param,
      });
    },
    Ser_MST_PartGroup_GetAllActive: async (): Promise<
      ApiResponse<Ser_MST_PartGroup>
    > => {
      return await apiBase.post<
        Partial<Search_Ser_MST_PartGroup>,
        ApiResponse<Ser_MST_PartGroup>
      >("/SerMSTPartGroup/GetAllActive", {});
    },
    Ser_MST_PartGroup_GetAllParentID: async (
      param: Partial<Search_Ser_MST_PartGroup>,
      isHQ: boolean
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      const resp = await apiBase.post<
        Partial<any>,
        ApiResponse<Ser_MST_PartGroup>
      >(isHQ ? "/SerMSTPartGroup/SearchHQ" : "/SerMSTPartGroup/SearchDL", {
        ...param,
      });
      return new Promise((resolve, reject) => {
        try {
          const uniqueArray: Ser_MST_PartGroup[] = excludeDuplicateObjOfArr(
            resp?.DataList ?? [],
            "ParentID"
          );
          if (uniqueArray.length > 0) {
            resolve({
              DataList: uniqueArray,
              isSuccess: true,
              _strErrCode: "0",
              _dicDebug: {},
              _dicExcs: {
                Lst_c_K_DT_SysInfo: [],
                Lst_c_K_DT_SysError: [],
                Lst_c_K_DT_SysWarning: [],
              },
            });
          } else {
            resolve({
              DataList: [],
              isSuccess: true,
              _strErrCode: "0",
              _dicDebug: {},
              _dicExcs: {
                Lst_c_K_DT_SysInfo: [],
                Lst_c_K_DT_SysError: [],
                Lst_c_K_DT_SysWarning: [],
              },
            });
          }
        } catch (error) {
          reject(error);
        }
      });
    },

    Ser_MST_PartGroup_Delete: async (
      key: string
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/Delete",
        {
          PartGroupID: key,
        }
      );
    },

    Ser_MST_PartGroup_Create: async (param: Partial<Ser_MST_PartGroup>) => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/Create",
        {
          strJson: JSON.stringify({
            ...param,
          } as Ser_MST_PartGroup),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_MST_PartGroup_Update: async (
      param: Partial<Ser_MST_PartGroup>
    ): Promise<ApiResponse<Ser_MST_PartGroup>> => {
      return await apiBase.post("/SerMSTPartGroup/Update", {
        strJson: JSON.stringify({
          ...param,
        }),
      });
    },

    Ser_MST_PartGroup_ExportDL: async (
      param: Partial<Search_Ser_MST_PartGroup>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/ExportDL",
        {
          ...param,
        }
      );
    },

    Ser_MST_PartGroup_ExportHQ: async (
      param: Partial<Search_Ser_MST_PartGroup>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/ExportHQ",
        { ...param }
      );
    },

    Ser_MST_PartGroup_ExportByListPartGroupID: async (
      selectedCodes: {
        PartGroupID: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListPartGroupID.push(currentValue.PartGroupID);
          return accumulator;
        },
        {
          ListPartGroupID: [],
        }
      );

      data.ListPartGroupID = data.ListPartGroupID.join(",");
      return await apiBase.post<any, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/ExportByListPartGroupID",
        data
      );
    },

    Ser_MST_PartGroup_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Ser_MST_PartGroup>,
        ApiResponse<string>
      >("/SerMSTPartGroup/ExportTemplate");
    },

    Ser_MST_PartGroup_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_PartGroup>>(
        "/SerMSTPartGroup/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_MST_PartGroup_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTPartGroup/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
