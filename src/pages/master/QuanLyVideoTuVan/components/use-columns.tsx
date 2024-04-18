import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface UseColumnsProps {
  showPopup: () => void;
}

export const useColumns = ({ showPopup }: UseColumnsProps) => {
  const { t } = useI18n("QuanLyVideoTuVan");

  const setViewingItem = useSetAtom(viewingDataAtom);

  const handleDetail = () => {
    showPopup();
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "FilePathVideoCode",
      caption: t("FilePathVideoCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return <LinkCell key={nanoid()} onClick={handleDetail} value={value} />;
      },
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "FilePathVideoName",
      caption: t("FilePathVideoName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FilePathVideo",
      caption: t("FilePathVideo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "IdxView",
      caption: t("IdxView"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FilePathAvatar",
      caption: t("FilePathAvatar"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
