import { atom } from "jotai";

export const keywordAtom = atom<string>("");
export const selectedItemsAtom = atom<any[]>([]);

export const dataViewAtom = atom<any>({});

export const dataServiceItemsQuickEditAtom = atom<any>({});
export const dataPartItemsQuickEditAtom = atom<any>({});

export const isUpdateAtom = atom<any>(false);

export const formHourAtom = atom<any>({
  Hour: "",
});

export const formDataTotalServiceAtom = atom({
  Amount: 0,
  VAT: 0,
  Total: 0,
});

export const formDataTotalPartAtom = atom({
  Amount: 0,
  VAT: 0,
  Total: 0,
});
export const formDataTotalAddNewAtom = atom({
  Amount: 0,
  Total: 0,
});
