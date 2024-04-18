import { ApiResponse, FlagActiveEnum, SearchParam } from "@/packages/types";
import {
  Search_Ser_MST_PartGroup,
  Ser_MST_PartGroup,
} from "@/packages/types/master/Ser_MST_PartGroup";
import { Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";
import {
  Search_Ser_MST_Service,
  Ser_MST_Service,
} from "@/packages/types/master/Ser_MST_Service";
import {
  SearchSer_ServicePackageParam,
  Ser_ServicePackage,
} from "@/packages/types/master/Ser_ServicePackage";
import { AxiosInstance } from "axios";

export const useSer_ServicePackageApi = (apiBase: AxiosInstance) => {
  return {
    //SearchDL
    Ser_ServicePackage_SearchDL: async (
      params: Partial<SearchSer_ServicePackageParam>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/SearchDL", {
        ...params,
      });
    },
    //SearchHQ
    Ser_ServicePackage_SearchHQ: async (
      params: Partial<SearchSer_ServicePackageParam>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/SearchHQ", {
        ...params,
      });
    },

    //Delete
    Ser_ServicePackage_Delete: async (
      params: Partial<SearchSer_ServicePackageParam>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/Delete", {
        ...params,
      });
    },

    //Create
    Ser_ServicePackage_Create: async (
      params: Partial<any>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/Create", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Update
    Ser_ServicePackage_Update: async (
      params: Partial<any>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/Update", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //ViewDetailDL
    Ser_ServicePackage_GetByServicePackageIDDL: async (
      params: Partial<SearchSer_ServicePackageParam>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/GetByServicePackageIDDL", {
        ...params,
      });
    },

    //ViewDetailHQ
    Ser_ServicePackage_GetByServicePackageIDHQ: async (
      params: Partial<SearchSer_ServicePackageParam>
    ): Promise<ApiResponse<Ser_ServicePackage>> => {
      return await apiBase.post<
        Partial<SearchSer_ServicePackageParam>,
        ApiResponse<Ser_ServicePackage>
      >("/SerServicePackage/GetByServicePackageIDHQ", {
        ...params,
      });
    },

    SerMSTService_GetAllActive: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMSTService/GetAllActive",
        {}
      );
    },

    Ser_MST_Service_SearchDL_Ser_ServicePackage: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/SearchDL",
        {
          ...param,
        }
      );
    },

    Ser_MST_Service_Ser_ServiceItems_Add: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Create",
        {
          strJson: JSON.stringify({ ...param }),
        }
      );
    },
    Ser_MST_Service_Ser_ServiceItems_Edit: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Update",
        {
          strJson: JSON.stringify({ ...param }),
        }
      );
    },
    Ser_MST_Service_Ser_ServiceItems_Delete: async (
      param: any
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Delete",
        {
          SerID: param,
        }
      );
    },

    SerMSTPart_SearchDL_Ser_PartItems: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTPart/SearchDL",
        {
          ...param,
        }
      );
    },

    SerMSTPart_Ser_PartItems_Add: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTPart/Create",
        {
          strJson: JSON.stringify({ ...param }),
        }
      );
    },
    SerMSTPart_Ser_PartItems_Edit: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<Partial<any>, ApiResponse<Ser_MST_Service>>(
        "/SerMSTPart/Update",
        {
          strJson: JSON.stringify({ ...param }),
        }
      );
    },

    //listPartTypeID
    Ser_ServicePackage_Ser_MST_PartType: async (
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

    //listPartGroupID
    Ser_ServicePackage_Ser_MST_PartGroup_GetAllActive: async (): Promise<
      ApiResponse<Ser_MST_PartGroup>
    > => {
      return await apiBase.post<
        Partial<Search_Ser_MST_PartGroup>,
        ApiResponse<Ser_MST_PartGroup>
      >("/SerMSTPartGroup/GetAllActive", {});
    },

    //     //Delete
    //     Ser_ServicePackage_Delete: async (
    //       params: Partial<SearchSer_ServicePackageParam>
    //     ): Promise<ApiResponse<Ser_ServicePackage>> => {
    //       return await apiBase.post<
    //         Partial<SearchSer_ServicePackageParam>,
    //         ApiResponse<Ser_ServicePackage>
    //       >("/SerServicePackage/Delete", {
    //         ...params,
    //       });
    //     },
    //Update
    // Ser_ServicePackage_Update: async (
    //   params: Partial<Ser_ServicePackage>
    // ): Promise<ApiResponse<Ser_ServicePackage>> => {
    //   const dataSave = { Lst_Ser_ServicePackage: [params] };
    //   return await apiBase.post<
    //     Partial<SearchSer_ServicePackageParam>,
    //     ApiResponse<Ser_ServicePackage>
    //   >("/SerServicePackage/Update", {
    //     strJson: JSON.stringify(dataSave),
    //   });
    // },
    // //Export template
    // Ser_ServicePackage_ExportTemplate: async (): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<any, ApiResponse<string>>(
    //     "/SerServicePackage/ExportTemplate",
    //     {}
    //   );
    // },
    // //Import excel
    // Ser_ServicePackage_Import: async (file: File): Promise<ApiResponse<any>> => {
    //   const form = new FormData();
    //   form.append("file", file); // file is the file you want to upload
    //   return await apiBase.post<File, ApiResponse<any>>(
    //     "/SerServicePackage/Import",
    //     form,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    // },
    // //ExportHQ
    // Ser_ServicePackage_ExportHQ: async (
    //   params?: Partial<SearchSer_ServicePackageParam>
    // ): Promise<ApiResponse<any>> => {
    //   return await apiBase.post<Partial<any>, ApiResponse<any>>(
    //     "/SerServicePackage/ExportHQ",
    //     {
    //       ...params,
    //     }
    //   );
    // },
    // //ExportDL
    // Ser_ServicePackage_ExportDL: async (
    //   params?: Partial<SearchSer_ServicePackageParam>
    // ): Promise<ApiResponse<any>> => {
    //   return await apiBase.post<Partial<any>, ApiResponse<any>>(
    //     "/SerServicePackage/ExportDL",
    //     {
    //       ...params,
    //     }
    //   );
    // },
    // //     //getAllActive
    //     Ser_ServicePackage_GetAllActive: async () => {
    //       return await apiBase.post<
    //         Partial<Ser_ServicePackage>,
    //         ApiResponse<Ser_ServicePackage>
    //       >("/SerServicePackage/GetAllActive");
    //     },
  };
};
