import { atom } from "jotai";
import { FlagActiveEnum } from "@packages/types";
import {
  SearchSer_Inv_PartPriceParam,
  Ser_Inv_PartPrice,
} from "@/packages/types/master/Ser_Inv_PartPrice";
export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Ser_Inv_PartPrice | undefined>(undefined);

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

export const searchConditionAtom = atom<SearchSer_Inv_PartPriceParam>({
  FlagActive: FlagActiveEnum.All,
  Ft_PageIndex: 0,
  Ft_PageSize: 9999,
  KeyWord: "",

  MaPhuTung: "",
  TenPhuTung: "",
  BatDauHieuLucFrom: "",
  BatDauHieuLucTo: "",
  BatDauHieuLucFromTo: [],
});
