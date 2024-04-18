import { atom } from "jotai";

export const dataSelectAtom = atom<any>([]);
// export const dataCheckBoxAtom = atom<any>([]);
export const dataCheckBoxAtom = atom<any>([
  {
    id: 1,
    label: "Lấy Model InActive",
    value: false,
    caption: "Model",
  },
  { id: 2, label: "Lấy màu InActive", value: false, caption: "mau" },
  {
    id: 3,
    label: "Lấy đặc tả InActive",
    value: false,
    caption: "dacta",
  },
]);
