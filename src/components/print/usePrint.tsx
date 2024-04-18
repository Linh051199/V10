import { atom, useSetAtom } from "jotai";

import print from "print-js";

export const printPopupAtom = atom<boolean>(false);

export const printUrlAtom = atom<string | undefined>(undefined);

const usePrint = () => {
  const setPrintPopup = useSetAtom(printPopupAtom);
  const setPrintUrl = useSetAtom(printUrlAtom);

  return {
    quickPrint: async ({ url }: { url: string }) => {
      print({
        type: "pdf",
        printable: url,
      });
    },
    previewPrint: ({ url }: { url: string }) => {
      setPrintPopup(true);
      setPrintUrl(url);
    },
  };
};

export default usePrint;
