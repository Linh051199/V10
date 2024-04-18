import { useI18n } from "@/i18n/useI18n";
import {
  Search_Ser_Mst_TradeMark,
  Ser_Mst_TradeMark,
} from "@/packages/types/master/Ser_Mst_TradeMark";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_Mst_TradeMark = (apiBase: AxiosInstance) => {
  return {
    Ser_Mst_TradeMark_SearchHQ: async (
      params: Search_Ser_Mst_TradeMark
    ): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
      return await apiBase.post<
        Search_Ser_Mst_TradeMark,
        ApiResponse<Ser_Mst_TradeMark>
      >("/SerMstTradeMark/SearchHQ", {
        ...params,
      });
    },
    Ser_Mst_TradeMark_SearchDL: async (
      params: Search_Ser_Mst_TradeMark
    ): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
      return await apiBase.post<
        Search_Ser_Mst_TradeMark,
        ApiResponse<Ser_Mst_TradeMark>
      >("/SerMstTradeMark/SearchDL", {
        ...params,
      });
    },

    Ser_Mst_TradeMark_Create: async (
      params: Partial<Ser_Mst_TradeMark>
    ): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
      return await apiBase.post<
        Partial<Ser_Mst_TradeMark>,
        ApiResponse<Ser_Mst_TradeMark>
      >("/SerMstTradeMark/Create", {
        strJson: JSON.stringify(params),
      });
    },
    Ser_Mst_TradeMark_Update: async (
      key: string,
      data: Partial<Ser_Mst_TradeMark>
    ): Promise<ApiResponse<Ser_Mst_TradeMark>> => {
      return await apiBase.post<
        Partial<Ser_Mst_TradeMark>,
        ApiResponse<Ser_Mst_TradeMark>
      >("/SerMstTradeMark/Update", {
        strJson: JSON.stringify({
          TradeMarkCode: key,
          ...data,
        }),
      });
    },

    Ser_Mst_TradeMark_Delete: async (key: string) => {
      return await apiBase.post<
        Search_Ser_Mst_TradeMark,
        ApiResponse<Ser_Mst_TradeMark>
      >("/SerMstTradeMark/Delete", {
        TradeMarkCode: key,
      });
    },

    // Ser_Mst_TradeMark_DeleteMulti: async (keys: string[]) => {
    //   let error: any[] = [];
    //   Promise.all(
    //     keys.map(async (PartTypeID: string) => {
    //       const response = await apiBase.post<
    //         SearchParam,
    //         ApiResponse<Ser_MST_PartType>
    //       >("/SerMSTPartType/Delete", {
    //         PartTypeID,
    //       });
    //       if (!response.isSuccess) {
    //         error = [
    //           ...error,
    //           {
    //             message: t(response._strErrCode),
    //             _strErrCode: response._strErrCode,
    //             _strTId: response._strTId,
    //             _strAppTId: response._strAppTId,
    //             _objTTime: response._objTTime,
    //             _strType: response._strType,
    //             _dicDebug: response._dicDebug,
    //             _dicExcs: response._dicExcs,
    //           },
    //         ];
    //       }
    //     })
    //   );
    //   return error;
    // },

    Ser_Mst_TradeMark_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Ser_Mst_TradeMark>,
        ApiResponse<string>
      >("/SerMstTradeMark/ExportTemplate", {});
    },

    Ser_Mst_TradeMark_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMstTradeMark/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Ser_Mst_TradeMark_ExportExcel: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      {
        return await apiBase.post<
          Partial<Ser_Mst_TradeMark>,
          ApiResponse<Ser_Mst_TradeMark>
        >("/SerMstTradeMark/Export", {
          // KeyWord: keyword,
          // FlagActive: "",
          TradeMarkCode: "",
          TradeMarkName: params.TradeMarkName,
          DealerCode: "",
          IsActive: "",
        });
      }
    },

    // Ser_MST_PartType_ExportExcelHQ: async (
    //   params: string
    // ): Promise<ApiResponse<any>> => {
    //   console.log("🟡 ~ params:", params);
    //   {
    //     return await apiBase.post<
    //       Partial<Ser_MST_PartType>,
    //       ApiResponse<Ser_MST_PartType>
    //     >("/SerMSTPartType/ExportHQ", {
    //       // KeyWord: keyword,
    //       // FlagActive: "",
    //       PartTypeID: "",
    //       TypeName: params,
    //       IsActive: "",
    //     });
    //   }
    // },
    // Ser_MST_PartType_ExportByListCode: async (
    //   keys: string[]
    // ): Promise<ApiResponse<any>> => {
    //   const condition = keys.map((item: any) => {
    //     return item.SpecCode;
    //   });
    //   {
    //     return await apiBase.post<
    //       Partial<Ser_MST_PartType>,
    //       ApiResponse<string>
    //     >("/SerMSTPartType/ExportByListCode", {
    //       ListSpecCode: condition.join(","),
    //     });
    //   }
    // },
  };
};
