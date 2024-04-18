import { faker } from "@faker-js/faker";
import { ApiResponse } from "@packages/types";
import { AxiosInstance } from "axios";
export const listKhachHang = Array.from({ length: 10 }, (x, y) => {
  return [
    {
      Idx: faker.random.numeric(),
      Code: faker.random.alphaNumeric(6).toUpperCase(),
      Name: faker.name.fullName(),
    },
  ];
});

export const useXuat_Kho = (apiBase: AxiosInstance) => {
  return {
    Xuat_Kho_Create: async (param: any): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<string>>(
        "/RptCpnCampaignResultCall/Export",
        {
          ...param,
        }
      );
    },
    Xuat_Kho_Search: async (param: any): Promise<ApiResponse<any>> => {
      return await new Promise((r, j) => {
        try {
          const data: any = Array.from({ length: 100 }, (x, y) => {
            return {
              MaHangHoa: faker.random.alpha(10),
              TenHangHoa: faker.database.engine(),
              DonVi: faker.database.engine(),
              Desc: faker.address.streetAddress(),
              Img: faker.image.avatar(),
            };
          });

          const result = data.filter((item: any) => {
            return item.TenHangHoa.trim()
              .toLowerCase()
              .includes(param.key.trim().toLowerCase());
          });
          console.log("result", param.key.trim().toLowerCase(), result);
          return r(result);

          // return r(data);
        } catch (e) {
          j(e);
          console.error(e);
        }
      });
    },
  };
};
