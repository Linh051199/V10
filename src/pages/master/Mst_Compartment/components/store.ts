import { atom } from "jotai";
import { FlagActiveEnum } from "@packages/types";
import {
  SearchTST_Mst_PartParam,
  TST_Mst_Part,
} from "@/packages/types/master/TST_Mst_Part";
export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<TST_Mst_Part | undefined>(undefined);

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

export const searchConditionAtom = atom<SearchTST_Mst_PartParam>({
  FlagActive: FlagActiveEnum.All,
  Ft_PageIndex: 0,
  Ft_PageSize: 9999,
  KeyWord: "",

  MaPhuTung: "",
  TenPhuTungTV: "",
  MaNhomVatTu: "",
  MaPhanNhomVatTu: "",
});
