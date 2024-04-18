import { atom } from "jotai";
import { FlagActiveEnum } from "@packages/types";
import {
  Search_Ser_Mst_Supplier,
  Ser_Mst_Supplier,
} from "@/packages/types/master/Ser_Mst_Supplier";
export const selectedItemsAtom = atom<string[]>([]);
export const showButtonDeleteAtom = atom<boolean>(false);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Ser_Mst_Supplier | undefined>(undefined);

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

// export const searchConditionAtom = atom<Search_Ser_Mst_Supplier>({
//   FlagActive: FlagActiveEnum.All,
//   Ft_PageIndex: 0,
//   Ft_PageSize: 9999,
//   KeyWord: "",
//   DealerCode: "",
//   SupplierID: "",
//   SupplierCode: "",
//   SupplierName: "",
//   IsActive: "",
//   FlagAutoLXX: FlagActiveEnum.All,
//   FlagAutoMapVIN: FlagActiveEnum.All,
//   FlagAutoSOAppr: FlagActiveEnum.All,
// });
