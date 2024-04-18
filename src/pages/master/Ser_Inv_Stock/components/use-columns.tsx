import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";

import {
  RequiredField,
  requiredExcludeSpecialCharactersOnlyNumbers2,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { LinkCell } from "@packages/ui/link-cell";
import { viewingDataAtom } from "./store";
import { Ser_Inv_Stock } from "@/packages/types/master/Ser_Inv_Stock";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("Ser_Inv_Stock");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Ser_Inv_Stock) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: any[] = [
    {
      dataField: "StockNo",
      caption: t("StockNo"),
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
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [
        RequiredField(t("StockNoIsRequired")),
        // ExcludeSpecialCharactersType,
      ],
    },
    {
      dataField: "StockName",
      caption: t("StockName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },

      validationRules: [RequiredField(t("StockNameIsRequired"))],
    },
    {
      dataField: "Contact",
      caption: t("Contact"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },

      validationRules: [RequiredField(t("AddressIsRequired"))],
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Telephone",
      caption: t("Telephone"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [requiredExcludeSpecialCharactersOnlyNumbers2],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Fax",
      caption: t("Fax"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [requiredExcludeSpecialCharactersOnlyNumbers2],
    },
    {
      dataField: "Mobi",
      caption: t("Mobi"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      validationRules: [requiredExcludeSpecialCharactersOnlyNumbers2],
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Manager",
      caption: t("Manager"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Description",
      caption: t("Description"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
  ];

  return columns;
};
