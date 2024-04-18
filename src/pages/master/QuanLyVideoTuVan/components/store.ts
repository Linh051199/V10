import {
  QuanLyVideoTuVan,
  Search_QuanLyVideoTuVan_Param,
} from "@/packages/types/master/QuanLyVideoTuVan";
import { FlagActiveEnum } from "@packages/types";
import { atom } from "jotai";
export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<QuanLyVideoTuVan | undefined>(undefined);

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

export const searchConditionAtom = atom<Search_QuanLyVideoTuVan_Param>({
  FlagActive: FlagActiveEnum.All,
  Ft_PageIndex: 0,
  Ft_PageSize: 9999,
  KeyWord: "",

  MaVideo: "",
  TenVideo: "",
});
