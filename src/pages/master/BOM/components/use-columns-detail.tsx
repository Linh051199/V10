import { useI18n } from "@/i18n/useI18n";
import { TST_Mst_Part } from "@/packages/types/master/TST_Mst_Part";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface UseColumnsProps { }

export const useColumnsDetail = ({ }: UseColumnsProps) => {
  const { t } = useI18n("BOM");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: TST_Mst_Part) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "PartCode",
      caption: t("PartCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      editorOptions: {
        readOnly: true
      },
    },
    {
      dataField: "PartName",
      caption: t("PartName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: false
      }
    },
    {
      dataField: "Unit",
      caption: t("Unit"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: false
      }
    },
    {
      dataField: "QtyMin",
      caption: t("QtyMin"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: false
      }
    },
  ];
  // return array of the first item only

  return columns;
};
