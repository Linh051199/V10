import { ApiResponse, Mst_Province, SearchParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface ProvinceDto extends Omit<Mst_Province, "FlagActive"> {
  FlagActive: boolean | string;
}

export const useMst_Province_api = (apiBase: AxiosInstance) => {
  return {
    Mst_Province_Search: async (
      params: any
    ): Promise<ApiResponse<Mst_Province>> => {
      return await apiBase.post<any, ApiResponse<Mst_Province>>(
        "/MstProvince/Search",
        {
          ...params,
        }
      );
    },
    Mst_Province_Create: async (
      province: Partial<ProvinceDto>
    ): Promise<ApiResponse<Mst_Province>> => {
      const data = {
        ProvinceCode: province.ProvinceCode,
        AreaCode: province.AreaCode,
        ProvinceName: province.ProvinceName,
      };
      return await apiBase.post<
        Partial<Mst_Province>,
        ApiResponse<Mst_Province>
      >("/MstProvince/Create", {
        strJson: JSON.stringify(data),
      });
    },

    Mst_Province_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Mst_Province>,
        ApiResponse<Mst_Province>
      >("/MstProvince/GetAllActive");
    },

    Mst_Province_Delete: async (provinceCode: string) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Province>>(
        "/MstProvince/Delete",
        {
          ProvinceCode: provinceCode,
        }
      );
    },
    Mst_Province_DeleteMultiple: async (provinceCodes: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_Province>>(
        "/MstProvince/DeleteMultiple",
        {
          strJson: JSON.stringify(provinceCodes),
        }
      );
    },

    Mst_Province_Update: async (
      key: string,
      province: Partial<ProvinceDto>
    ): Promise<ApiResponse<Mst_Province>> => {
      return await apiBase.post<
        Partial<Mst_Province>,
        ApiResponse<Mst_Province>
      >("/MstProvince/Update", {
        strJson: JSON.stringify({
          ProvinceCode: key,
          ...province,
        }),
        ColsUpd: Object.keys(province),
      });
    },

    Mst_Province_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/MstProvince/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Mst_Province_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_Province>, ApiResponse<string>>(
        "/MstProvince/ExportTemplate",
        {}
      );
    },
    Mst_Province_ExportByListProvinceCode: async (
      keys: string[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        return await apiBase.post<Partial<Mst_Province>, ApiResponse<string>>(
          "/MstProvince/ExportByListProvinceCode",
          {
            ListProvinceCode: [
              keys.map((item: any) => [item.ProvinceCode]),
            ].join(","),
          }
        );
      } else {
        return await apiBase.post<Partial<Mst_Province>, ApiResponse<string>>(
          "/MstProvince/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },
  };
};
