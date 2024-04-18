import { atom } from "jotai";
import { FlagActiveEnum } from "@packages/types";
import {
  SearchSer_CustomerCarParam,
  Ser_CustomerCar,
} from "@/packages/types/master/Ser_CustomerCar";

export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Ser_CustomerCar | undefined>(undefined);

export const viewingDataAtom = atom(
  (get) => {
    return {
      rowIndex: get(viewingRowAtom),
      item: get(viewingItemAtom),
    };
  },
  (get, set, data) => {
    if (!data) {
      set(viewingRowAtom, undefined);
      set(viewingItemAtom, undefined);
    } else {
      const { rowIndex, item } = data as any;
      set(viewingRowAtom, rowIndex);
      set(viewingItemAtom, item);
    }
  }
);

export const isUpdateAtom = atom<boolean>(false);

export const dataViewAtom = atom<any>({
  CustomerInfo: {
    CusID: "",
    KhanhHang: "1",
    CusName: "",
    Sex: "",
    Mobile: "",
    Tel: "",

    ProvinceCode: "",
    DistrictCode: "",
    Address: "",
    DOB: "",
    IDCardNo: "",

    Email: "",
    TaxCode: "",
    Fax: "",
    Website: "",
  },
  CarInfo: {
    ContName: "",
    ContTel: "",
    ContMobile: "",

    ContAddress: "",
    ContSex: "",

    ContFax: "",
    ContEmail: "",
  },
});

export const flagAtom = atom<string>("");
