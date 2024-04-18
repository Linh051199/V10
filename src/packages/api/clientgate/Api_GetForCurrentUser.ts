import { ApiResponse, Permission, User } from "@packages/types";
import { AxiosInstance } from "axios";

interface PermissionRecord {
  Sys_User: User;
  Lst_Sys_Access: Permission[];
}
export const useGetForCurrentUser = (apiBase: AxiosInstance) => {
  return {
    GetForCurrentUser: async () => {
      return await apiBase.post<{}, ApiResponse<PermissionRecord>>(
        "/api/GetForCurrentUser",
        {}
      );
    },
  };
};
