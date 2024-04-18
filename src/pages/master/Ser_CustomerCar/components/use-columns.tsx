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
import { Ser_CustomerCar } from "@/packages/types/master/Ser_CustomerCar";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("Ser_CustomerCar");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Ser_CustomerCar) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: any[] = [
    {
      dataField: "CusID",
      caption: t("CusID"),
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
        newData.MaKH = value;
      },
      //   validationRules: [
      //     RequiredField(t("DealerCodeIsRequired")),
      //     ExcludeSpecialCharactersType,
      //   ],
    },
    {
      dataField: "CusName",
      caption: t("CusName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "DOB",
      caption: t("DOB"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },
    {
      dataField: "Sex",
      caption: t("Sex"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: ({ data, rowIndex, value }: any) => {
        if (value) {
          return <span>Nam</span>;
        } else if (value === null) {
          return <span></span>;
        } else {
          return <span>Nữ</span>;
        }
      },
    },
    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TradeMarkCode",
      caption: t("TradeMarkCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ProductYear",
      caption: t("ProductYear"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ColorCode",
      caption: t("ColorCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "InsVieName",
      caption: t("InsVieName"),
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
    },
    {
      dataField: "Mobile",
      caption: t("Mobile"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Tel",
      caption: t("Tel"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ContName",
      caption: t("ContName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "LogLUDateTime",
      caption: t("LogLUDateTime"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },
    {
      dataField: "MemberCarID",
      caption: t("MemberCarID"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
