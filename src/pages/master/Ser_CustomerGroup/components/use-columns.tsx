import { ColumnOptions } from "@packages/ui/base-gridview";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@packages/ui/link-cell";
import { TST_Mst_Part } from "@/packages/types/master/TST_Mst_Part";
import { viewingDataAtom } from "./store";
import { Ser_CustomerGroup } from "@/packages/types/master/Ser_CustomerGroup";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("Ser_CustomerGroup");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Ser_CustomerGroup) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "GroupNo",
      caption: t("GroupNo"),
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
      setCellValue: (newData: any, value: any) => {
        newData.DealerCode = value;
      },
      //   validationRules: [
      //     RequiredField(t("DealerCodeIsRequired")),
      //     ExcludeSpecialCharactersType,
      //   ],
    },
    {
      dataField: "GroupName",
      caption: t("GroupName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    {
      dataField: "TelePhone",
      caption: t("TelePhone"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    {
      dataField: "Fax",
      caption: t("Fax"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    {
      dataField: "TaxCode",
      caption: t("TaxCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    {
      dataField: "Description",
      caption: t("Description"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    
  ];
  // return array of the first item only

  return columns;
};
