import { atom } from "jotai";

interface GridState {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  ref?: any;
}
export const popupGridStateAtom = atom<GridState>({
  pageIndex: 0,
  pageSize: 100,
  pageCount: 0,
  totalCount: 0,
  ref: null,
});
export const selectboxAtom = atom<any>([]);
export const openPopupAtom = atom<any>(false);
export const popupUpdateTimePortAtom = atom<any>(false);
