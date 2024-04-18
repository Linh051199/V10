import { ColumnOptions } from "@packages/ui/base-gridview";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
  requiredExcludeSpecialCharactersOnlyNumbers2,
  requiredType,
} from "@packages/common/Validation_Rules";
import { filterByFlagActive, uniqueFilterByDataField } from "@packages/common";
import { StatusButton } from "@packages/ui/status-button";
import { useI18n } from "@/i18n/useI18n";

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@packages/ui/link-cell";
import { viewingDataAtom } from "./dealer-store";
import { Alignment } from "@/types";
import { Ser_Mst_Supplier } from "@/packages/types/master/Ser_Mst_Supplier";

const flagEditorOptions = {
  searchEnabled: true,
  valueExpr: "value",
  displayExpr: "text",
  items: [
    {
      value: "1",
      text: "1",
    },
    {
      value: "0",
      text: "0",
    },
  ],
};

interface UseGridColumnsProps {}

export const useGridColumns = ({}: UseGridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Ser_Mst_Supplier) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const { t } = useI18n("Dealer");
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
      dataField: "SupplierCode",
      caption: t("SupplierCode"),
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
      setCellValue: (newData: any, value: any) => {
        newData.SupplierCode = value;
      },
      validationRules: [
        RequiredField(t("SupplierCodeIsRequired")),
        // ExcludeSpecialCharactersType,
      ],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },

    {
      dataField: "SupplierName",
      caption: t("SupplierName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
      validationRules: [RequiredField(t("SupplierNameIsRequired"))],
    },
    {
      dataField: "ContactName",
      caption: t("ContactName"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Phone",
      editorOptions: {
        placeholder: t("Input"),
      },
      caption: t("Phone"),
      columnIndex: 1,
      // validationRules: [requiredExcludeSpecialCharactersOnlyNumbers2],
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },

    {
      dataField: "Address",
      caption: t("Address"),
      validationRules: [requiredType],

      editorOptions: {
        validationMessageMode: "always",
        placeholder: t("Input"),
      },
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
    },

    {
      dataField: "SupplierFax",
      editorOptions: {
        placeholder: t("Input"),
      },
      caption: t("SupplierFax"),
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
    {
      dataField: "ContactPhone",
      editorOptions: {
        placeholder: t("Input"),
      },
      caption: t("ContactPhone"),
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      visible: true,
    },
  ];
  // return array of the first item only

  return columns;
};
