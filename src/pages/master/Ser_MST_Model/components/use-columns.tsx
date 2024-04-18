import {
  ExcludeSpecialCharactersAllowSpaceType,
  requiredExcludeSpecialCharactersOnlyNumbers,
  requiredType,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@/packages/ui/link-cell";
import { ColumnOptions } from "@/types";
import { Ser_MST_Model } from "@/packages/types/master/Ser_MST_Model";
import { viewingDataAtom } from "./ser-mst-model";
import { Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";
import { Mst_CarModelStd } from "@/packages/types/master/Mst_CarModelStd";
import DataSource from "devextreme/data/data_source";

interface GridColumnsProps {
  data: Ser_MST_Model[];
  listModelCode: Mst_CarModelStd[] | undefined | any;
  listTradeMarkCode: Ser_Mst_TradeMark[] | undefined;
}
export const useColumn = ({
  data,
  listModelCode,
  listTradeMarkCode,
}: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);

  const { t } = useI18n("Ser_MST_Model");
  const viewRow = (rowIndex: number, data: { item: Ser_MST_Model }) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "Idx",
      caption: t("Idx"),
      visible: true,
      columnIndex: 1,
      // groupKey: "INFORMATION_SERMSTMODEL",
      cellRender: (data: any) => {
        return (
          <p>
            {+(data.component.pageIndex() * data.component.pageSize()) +
              (data.rowIndex + 1)}
          </p>
        );
      },
    },

    {
      dataField: "TradeMarkCode", // Ser_MstTradeMark Quản lý hiệu xe
      caption: t("TradeMarkCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTMODEL",
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        dataSource: listTradeMarkCode ?? [],
        displayExpr: "TradeMarkCode",
        valueExpr: "TradeMarkCode",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      setCellValue(rowData: any, value: any, currentRowData: any) {
        if (value.toUpperCase() !== "HYUNDAI") {
          rowData.ModelCode = "OTHER";
        }
      },
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      validationRules: [requiredType],
    },
    {
      dataField: "ModelCode", // Lấy trong model tiêu chuẩn của Khánh
      caption: t("ModelCode"),
      validationRules: [requiredType],
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTMODEL",
      editorType: "dxSelectBox",

      editorOptions: {
        searchEnabled: true,
        dataSource: listModelCode ?? [],
        displayExpr: "ModelCode",
        // displayExpr: (item: any) =>
        //   item ? `${item.ModelCode} (${item.ModelName})` : "",
        valueExpr: "ModelCode",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "ProductionCode",
      caption: t("ProductionCode"),
      editorType: "dxTextBox",
      editorOptions: { validationMessageMode: "always" },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTMODEL",
      visible: true,
    },
    {
      dataField: "ModelName", // SpecDesc // Tên mô tả xe
      caption: t("ModelName"),
      editorType: "dxTextBox",
      editorOptions: { validationMessageMode: "always" },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTMODEL",
      visible: true,
      validationRules: [requiredType],
    },
  ];

  return columns;
};
