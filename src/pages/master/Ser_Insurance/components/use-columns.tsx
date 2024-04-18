import { useI18n } from "@/i18n/useI18n";
import { TST_Mst_Part } from "@/packages/types/master/TST_Mst_Part";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";
import {
  requiredExcludeSpecialCharactersOnlyNumbers,
  RequiredField,
} from "@/packages/common/Validation_Rules";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("Ser_Insurance");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: TST_Mst_Part) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "InsNo",
      caption: t("InsNo"),
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
      validationRules: [RequiredField(t("InsNoIsRequired"))],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "InsVieName",
      caption: t("InsVieName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("InsVieNameIsRequired"))],
    },
    {
      dataField: "InsEngName",
      caption: t("InsEngName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [RequiredField(t("AddressIsRequired"))],
    },
    {
      dataField: "TelePhone",
      caption: t("TelePhone"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [
        // RequiredField(t("AddressIsRequired")),
        requiredExcludeSpecialCharactersOnlyNumbers,
      ],
    },
    {
      dataField: "Fax",
      caption: t("Fax"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [
        // RequiredField(t("AddressIsRequired")),
        requiredExcludeSpecialCharactersOnlyNumbers,
      ],
    },
    // {
    //   dataField: "TelePhone",
    //   caption: t("TelePhone"),
    //   visible: true,
    //   columnIndex: 2,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxNumberBox",
    // },
    // {
    //   dataField: "TelePhone",
    //   caption: t("TelePhone"),
    //   editorType: "dxNumberBox",
    //   editorOptions: {
    //     min: 0,
    //     format: ",##0.###",
    //     placeholder: t("Input"),
    //     validationMessageMode: "always",
    //   },
    //   columnIndex: 2,
    //   groupKey: "BASIC_INFORMATION",
    //   visible: true,
    //   validationRules: [requiredExcludeSpecialCharactersOnlyNumbers as any],
    // },
    // {
    //   dataField: "Fax",
    //   caption: t("Fax"),
    //   visible: true,
    //   columnIndex: 2,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxNumberBox",
    // },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Website",
      caption: t("Website"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TaxCode",
      caption: t("TaxCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Description",
      caption: t("Description"),
      visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
