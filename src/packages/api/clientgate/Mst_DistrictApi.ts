import { ApiResponse, SearchParam, Mst_District } from "@/packages/types";
import { AxiosInstance } from "axios";

export const useMst_District = (apiBase: AxiosInstance) => {
  return {
    Mst_District_Search: async (
      params: SearchParam
    ): Promise<ApiResponse<Mst_District>> => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_District>>(
        "/MstDistrict/Search",
        {
          ...params,
        }
      );
    },
    Mst_District_GetAllActive: async (): Promise<ApiResponse<Mst_District>> => {
      return await apiBase.post<any, ApiResponse<Mst_District>>(
        "/MstDistrict/GetAllActive"
      );
    },
    Mst_District_Create: async (
      DistrictCode: Partial<Mst_District>
    ): Promise<ApiResponse<Mst_District>> => {
      return await apiBase.post<
        Partial<Mst_District>,
        ApiResponse<Mst_District>
      >("/MstDistrict/Create", {
        strJson: JSON.stringify(DistrictCode),
      });
    },

    Mst_District_Delete: async (key: any) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_District>>(
        "/MstDistrict/Delete",
        {
          DistrictCode: key.DistrictCode,
          ProvinceCode: key.ProvinceCode,
        }
      );
    },
    Mst_District_Delete_Multiple: async (list: any[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Mst_District>>(
        "/MstDistrict/DeleteMultiple",
        {
          strJson: JSON.stringify(list),
        }
      );
    },
    Mst_District_Update: async (
      key: string | any,
      port: Partial<Mst_District>
    ): Promise<ApiResponse<Mst_District>> => {
      return await apiBase.post<
        Partial<Mst_District>,
        ApiResponse<Mst_District>
      >("/MstDistrict/Update", {
        strJson: JSON.stringify({
          DistrictCode: key.DistrictCode,
          ProvinceCode: key.ProvinceCode,
          ...port,
        }),
        ColsUpd: "DistrictName,FlagActive",
      });
    },
    Mst_District_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstDistrict/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Mst_District_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Mst_District>, ApiResponse<string>>(
        "/MstDistrict/ExportTemplate",
        {}
      );
    },
    Mst_District_ExportExcel: async (
      keys: any[],
      keyword?: string
    ): Promise<ApiResponse<any>> => {
      if (keys.length > 0) {
        let result = "";
        for (let i = 0; i < keys.length; i++) {
          const districtCode = keys[i].DistrictCode;
          const provinceCode = keys[i].ProvinceCode;
          result += `${districtCode},${provinceCode};`;
        }
        result = result.slice(0, -1);
        return await apiBase.post<Partial<Mst_District>, ApiResponse<string>>(
          "/MstDistrict/ExportByListDistrictCodeAndProvinceCode",
          {
            ListDistrictCodeAndProvincecode: result,
          }
        );
      } else {
        return await apiBase.post<Partial<Mst_District>, ApiResponse<string>>(
          "/MstDistrict/Export",
          {
            KeyWord: keyword,
            FlagActive: "",
          }
        );
      }
    },

    Mst_District_GetByProvinceCode: async (
      provinceCode: string
    ): Promise<ApiResponse<Mst_District>> => {
      return await apiBase.post<string, ApiResponse<Mst_District>>(
        "/MstDistrict/GetByProvinceCode",
        {
          ProvinceCode: provinceCode,
        }
      );
    },
  };
};
