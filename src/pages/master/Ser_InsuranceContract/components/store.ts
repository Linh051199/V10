import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import {
  Search_Ser_InsuranceContract_Param,
  Ser_InsuranceContract,
} from "@/packages/types/master/Ser_InsuranceContract";
import { FlagActiveEnum } from "@packages/types";
import { atom } from "jotai";
export const selectedItemsAtom = atom<string[]>([]);

export const viewingRowAtom = atom<number | undefined>(undefined);
export const viewingItemAtom = atom<Ser_InsuranceContract | undefined>(
  undefined
);

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

export const searchConditionAtom = atom<Search_Ser_InsuranceContract_Param>({
  FlagActive: FlagActiveEnum.All,
  Ft_PageIndex: 0,
  Ft_PageSize: 9999,
  KeyWord: "",

  SoHopDongBaoHiem: "",
  HangBaoHiem: "",
  HieuLucTu: [validateTimeStartDayOfMonth, new Date()],
});
