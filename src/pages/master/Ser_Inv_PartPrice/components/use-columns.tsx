import { ColumnOptions } from "@packages/ui/base-gridview";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@packages/ui/link-cell"; 
import { viewingDataAtom } from "./store";
import { Ser_Inv_PartPrice } from "@/packages/types/master/Ser_Inv_PartPrice";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("Ser_Inv_PartPrice");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Ser_Inv_PartPrice) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "MaPhuTung",
      caption: t("MaPhuTung"),
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
      dataField: "TenPhuTungTVHTV",
      caption: t("TenPhuTungTVHTV"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
      //   headerFilter: {
      //     dataSource: uniqueFilterByDataField(data, "DealerType"),
      //   },
    },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
    // {
    //   dataField: "TenPhuTungTVHTV",
    //   caption: t("TenPhuTungTVHTV"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   //   validationRules: [RequiredField(t("DealerTypeIsRequired"))],
    //   //   headerFilter: {
    //   //     dataSource: uniqueFilterByDataField(data, "DealerType"),
    //   //   },
    // },
  ];
  // return array of the first item only

  return columns;
};
