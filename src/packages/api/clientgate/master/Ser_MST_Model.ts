import { excludeDuplicateObjOfArr } from "@/packages/common";
import { Mst_CarModelStd } from "@/packages/types/master/Mst_CarModelStd";
import {
  Search_Ser_MST_Model,
  Ser_MST_Model,
} from "@/packages/types/master/Ser_MST_Model";
import { Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_Model = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_Model_SearchDL: async (
      param: Partial<Search_Ser_MST_Model>
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Model>,
        ApiResponse<Ser_MST_Model>
      >("/SerMSTModel/SearchDL", {
        ...param,
      });
    },

    Ser_MST_Model_SearchHQ: async (
      param: Partial<Search_Ser_MST_Model>
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Model>,
        ApiResponse<Ser_MST_Model>
      >("/SerMSTModel/SearchHQ", {
        ...param,
      });
    },

    Ser_MST_Model_Search_MstCarModelStd: async (): Promise<
      ApiResponse<Mst_CarModelStd>
    > => {
      return await apiBase.post<Partial<any>, ApiResponse<Mst_CarModelStd>>(
        "/MstCarModelStd/Search",
        {
          ModelCode:"",
          ModelName:"",
          FlagActive:"",
          Ft_PageIndex:0,
          Ft_PageSize:999999
        }
      );
    },
    Ser_MST_Model_GetAllActive_Mst_CarModelStd: async (): Promise<
      ApiResponse<Mst_CarModelStd>
    > => {
      return await apiBase.post<Partial<any>, ApiResponse<Mst_CarModelStd>>(
        "/MstCarModelStd/GetAllActive",
        {}
      );
    },
    Ser_MST_Model_GetAllActive_Ser_MstTradeMark: async (
      isHQ: boolean
    ): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
      const resp = await apiBase.post<
        Partial<any>,
        ApiResponse<Ser_Mst_TradeMark>
      >(isHQ ? "/SerMstTradeMark/SearchHQ" : "/SerMstTradeMark/SearchDL", {
        TradeMarkCode: "",
        TradeMarkName: "",
        IsActive: "1",
      });
      // return resp;
      return new Promise((resolve, reject) => {
        try {
          const uniqueArray: Ser_Mst_TradeMark[] = excludeDuplicateObjOfArr(
            resp?.DataList ?? [],
            "TradeMarkCode"
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

    Ser_MST_Model_DeleteDL: async (
      key: string
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/DeleteDL",
        {
          ModelID: key,
        }
      );
    },

    Ser_MST_Model_CreateDL: async (param: Partial<Ser_MST_Model>) => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/CreateDL",
        {
          strJson: JSON.stringify({
            ...param,
          } as Ser_MST_Model),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_MST_Model_UpdateDL: async (
      param: Partial<Ser_MST_Model>
    ): Promise<ApiResponse<Ser_MST_Model>> => {
      return await apiBase.post("/SerMSTModel/UpdateDL", {
        strJson: JSON.stringify({
          ...param,
        }),
      });
    },

    Ser_MST_Model_ExportDL: async (
      param: Partial<Search_Ser_MST_Model>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/ExportDL",
        {
          ...param,
        }
      );
    },

    Ser_MST_Model_ExportHQ: async (
      param: Partial<Search_Ser_MST_Model>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/ExportHQ",
        { ...param }
      );
    },

    Ser_MST_Model_ExportByListModelID: async (
      selectedCodes: {
        ModelID: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListModelID.push(currentValue.ModelID);
          return accumulator;
        },
        {
          ListModelID: [],
        }
      );

      data.ListModelID = data.ListModelID.join(",");
      return await apiBase.post<any, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/ExportByListModelID",
        data
      );
    },

    Ser_MST_Model_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_MST_Model>, ApiResponse<string>>(
        "/SerMSTModel/ExportTemplate"
      );
    },

    Ser_MST_Model_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_Model>>(
        "/SerMSTModel/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_MST_Model_UploadDL: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTModel/ImportDL",
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
