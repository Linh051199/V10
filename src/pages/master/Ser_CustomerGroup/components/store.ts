import { atom } from "jotai";
import { FlagActiveEnum } from "@packages/types";
import {
  SearchSer_CustomerGroupParam,
  Ser_CustomerGroup,
} from "@/packages/types/master/Ser_CustomerGroup";
export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Ser_CustomerGroup | undefined>(undefined);

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
export const isUpdateAtom = atom<any>(false);

export const dataViewAtom = atom<any>({
  CustomerGroupInfo: {},
  CustomerInfo: {},
});
