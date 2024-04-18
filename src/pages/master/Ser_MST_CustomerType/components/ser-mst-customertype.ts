import { atom } from "jotai";
import { FlagActiveEnum } from "@packages/types";
import { Ser_MST_CustomerType } from "@/packages/types/master/Ser_MST_CustomerType";

export const selectedItemsAtom = atom<string[]>([]);

export const searchParam = atom<any>({
  KeyWord: "",
  FlagActive: FlagActiveEnum.All,
});

export enum ViewMode {
  Readonly = "readonly",
  Edit = "edit",
}

export const viewingRowAtom = atom<number | undefined>(undefined); // lấy ra cái index của row khi click vào
export const viewingItemAtom = atom<Ser_MST_CustomerType | undefined>(
  undefined
); // lấy ra toàn bộ dữ liệu của hàng khi click vào
// lấy ra thông tin data của hàng khi click vào
export const viewingDataAtom = atom(
  // mục đích của hàm get này là định nghĩa giá trị ban đầu của viewingDataAtom
  // và chỉ định cách tính toán dựa trên viewingRowAtom và viewingItemAtom
  // phụ thuộc vào atom khác
  (get) => {
    return {
      rowIndex: get(viewingRowAtom), //  truy xuất để lấy ra cái viewingRowAtom
      item: get(viewingItemAtom), // truy xuất để lấy ra viewingItemAtom
    };
  },
  // null,
  (get, set, data) => {
    // data chính là cái viewingDataAtom
    // data là cái {item: ..., rowIndex: ...}
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
