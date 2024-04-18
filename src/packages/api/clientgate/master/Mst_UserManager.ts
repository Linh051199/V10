import { ApiResponse } from "@/packages/types";
import {
  Mst_Staff,
  Search_Mst_Staff_Param,
} from "@/packages/types/master/Mst_Staff";
import { AxiosInstance } from "axios";

export const useMst_UserManagerApi = (apiBase: AxiosInstance) => {
  return {
    Mst_User_update: async (data: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/SysUser/Update", {
        strJson: JSON.stringify(data),
        ColsUpd: Object.keys(data).join(","),
      });
    },
    Mst_User_Create: async (data: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>("/SysUser/Create", {
        strJson: JSON.stringify(data),
      });
    },
    Mst_User_GetMapSysUserSysObjectByUserCodeDL: async (
      code: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SysUser/GetMapSysUserSysObjectByUserCodeDL",
        {
          UserCode: code,
        }
      );
    },
    Mst_User_GetMapSysGroupSysUserByUserCodeDL: async (
      code: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SysUser/GetMapSysGroupSysUserByUserCodeDL",
        {
          UserCode: code,
        }
      );
    },
    Mst_User_Search: async (params: any): Promise<ApiResponse<Mst_Staff>> => {
      return await apiBase.post<any, ApiResponse<any>>("/SysUser/SearchDL", {
        ...params,
      });
    },
    Mst_User_Delete: async (code: any): Promise<ApiResponse<Mst_Staff>> => {
      return await apiBase.post<any, ApiResponse<any>>("/SysUser/Delete", {
        UserCode: code,
      });
    },
  };
};
