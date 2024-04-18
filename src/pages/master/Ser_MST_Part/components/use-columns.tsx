import {
  ExcludeSpecialCharactersAllowSpaceType,
  ExcludeSpecialCharactersTypeAllowDash,
  RequiredOnlyPositiveInteger,
  RequiredVietNameeseExcludeSpecialCharacters3,
  requiredType,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@/packages/ui/link-cell";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { ColumnOptions } from "@/types";
import { viewingDataAtom } from "./ser-mst-part";
import { Ser_MST_Part } from "@/packages/types/master/Ser_MST_Part";
import { useConvertNumber } from "@/packages/common";
import StatusCheckBox from "./StatusCheckBox";

interface GridColumnsProps {
  data: Ser_MST_Part[];
  listPartTypeID: any;
  listPartGroupID: any;
}
export const useColumn = ({
  data,
  listPartTypeID,
  listPartGroupID,
}: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_MST_Part");
  const { convertMoneyVND, convertPercent } = useConvertNumber();

  const viewRow = (rowIndex: number, data: Ser_MST_Part) => {
    setViewingItem({
      rowIndex,
      item: {
        ...data,
        FreqUsed: data.FreqUsed === "1" ? true : false,
      },
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "Idx",
      caption: t("Idx"),
      visible: true,
      columnIndex: 1,
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
      dataField: "PartTypeID", // Loại hàng
      caption: t("PartTypeID"),
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
      editorType: "dxSelectBox",
      editorOptions: {
        dropDownOptions: { resizeEnabled: true },
        searchEnabled: true,
        defaultValue: "1",
        dataSource: listPartTypeID ?? [],
        displayExpr: (e: any) => {
          let displayExpr = `${e?.PartTypeID} - ${e?.TypeName}`.trim();
          if (e?.PartTypeID === "") {
            displayExpr = displayExpr.substring(1).trim();
          } else if (e?.PartTypeID === undefined) {
            displayExpr = "All";
          }
          return displayExpr;
        },
        valueExpr: "PartTypeID",
        validationMessageMode: "always",
      },
    },
    {
      dataField: "PartGroupID", // Loại vật tự
      caption: t("PartGroupID"),
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
      editorType: "dxSelectBox",
      editorOptions: {
        dropDownOptions: { resizeEnabled: true },
        searchEnabled: true,
        defaultValue: "1",
        dataSource: listPartGroupID ?? [],
        displayExpr: (e: any) => {
          let displayExpr =
            `${e?.PartGroupID} - ${e?.GroupCode} - ${e?.GroupName}`.trim();
          if (e?.PartGroupID === "") {
            displayExpr = displayExpr.substring(1).trim();
          } else if (e?.PartGroupID === undefined) {
            displayExpr = "All";
          }
          return displayExpr;
        },
        valueExpr: "PartGroupID",
        validationMessageMode: "always",
      },
    },
    {
      dataField: "PartCode", // Mã phụ tùng
      caption: t("PartCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      validationRules: [
        requiredType,
        ExcludeSpecialCharactersTypeAllowDash as any,
      ],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "VieName", // Tên phụ tùng
      caption: t("VieName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [
        requiredType,
        RequiredVietNameeseExcludeSpecialCharacters3 as any,
      ],
    },
    {
      dataField: "EngName", // Tên TA
      caption: t("EngName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      validationRules: [ExcludeSpecialCharactersAllowSpaceType as any],
      visible: true,
    },

    {
      dataField: "Price", // Giá bán
      caption: t("Price"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType, RequiredOnlyPositiveInteger as any],
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },
    {
      dataField: "Cost", // Giá nhập
      caption: t("Cost"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType, RequiredOnlyPositiveInteger as any],
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },

    {
      dataField: "VAT", // VAT
      caption: t("VAT"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        max: 100,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType, RequiredOnlyPositiveInteger as any],
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },

    {
      dataField: "Unit", // Đơn vị tính
      caption: t("Unit"),
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Location", // Vị trí
      caption: t("Location"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "MinQuantity", // Số lượng tồn tối thiểu
      caption: t("MinQuantity"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      // validationRules: [requiredType],
    },
    {
      dataField: "Model", // Model
      caption: t("Model"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },

    {
      dataField: "Note", // Ghi chú
      caption: t("Note"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "FreqUsed", // Hay sử dụng
      caption: t("FreqUsed"),
      editorType: "dxSwitch",
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      width: 100,
      alignment: "center",
      cellRender: ({ data }: any) => {
        return <StatusCheckBox data={data?.FreqUsed} />;
      },
    },
    {
      dataField: "Quantity",
      caption: t("Quantity"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      // groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "FlagInTST",
      caption: t("FlagInTST"),
      // groupKey: "INFORMATION_SERMSTPART",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      visible: true,
    },
  ];
  return columns;
};

// {
//   dataField: "GiaBanNiemYetTuHangGanNhat",
//   caption: t("GiaBanNiemYetTuHangGanNhat"),
//   editorOptions: {
//     placeholder: t("Input"),
//     validationMessageMode: "always",
//   },
//   columnIndex: 3,
//   groupKey: "INFORMATION_SERMSTPART",
//   visible: true,
// },
// {
//   dataField: "GiaBanNiemYetTuHangHienTai",
//   caption: t("GiaBanNiemYetTuHangHienTai"),
//   editorOptions: {
//     placeholder: t("Input"),
//     validationMessageMode: "always",
//   },
//   columnIndex: 3,
//   groupKey: "INFORMATION_SERMSTPART",
//   visible: true,
// },
// {
//   dataField: "FlagInTST",
//   caption: t("FlagInTST"),
//   editorOptions: {
//     placeholder: t("Input"),
//     validationMessageMode: "always",
//   },
//   columnIndex: 3,
//   groupKey: "INFORMATION_SERMSTPART",
//   visible: true,
// },
