import { useI18n } from "@/i18n/useI18n";
import { uniqueFilterByDataField } from "@packages/common";
import { requiredType } from "@packages/common/Validation_Rules";

import { Ser_Cavity } from "@/packages/types/master/Ser_Cavity";
import { Alignment } from "@/types";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./dealer-store";

interface UseGridColumnsProps {
  data: Ser_Cavity[];
}

export const useGridColumns = ({ data }: UseGridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Ser_Cavity) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const { t } = useI18n("Ser_Cavity");
  const columns: any[] = [
    {
      dataField: "Id",
      caption: t("STT"),
      visible: true,
      dataType: "string",
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },

    {
      dataField: "CavityNo",
      caption: t("CavityNo"),
      validationRules: [requiredType],
      headerFilter: {
        dataSource: uniqueFilterByDataField(data ?? [], "CavityNo"),
      },
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
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
    },
    {
      dataField: "CavityName",
      caption: t("CavityName"),

      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      // dataField: "NewCavityType",
      dataField: "CavityType",
      caption: t("CavityType"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
      headerFilter: {
        dataSource: uniqueFilterByDataField(data, "CavityType"),
      },
    },
    {
      dataField: "Note",
      caption: t("Note"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "StartUseDate",
      caption: t("StartUseDate"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "FinishUseDate",
      caption: t("FinishUseDate"),
      editorOptions: {
        placeholder: t("Input"),
      },
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];
  // return array of the first item only

  return columns;
};
