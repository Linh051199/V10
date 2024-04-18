import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { Button } from "devextreme-react";

interface UseColumnsProps {
  // onOpenPopup?: any
}

export const useColumnsDanhSachPhuTung = (onOpenPopup: any) => {
  const { t } = useI18n("DanhSachPhuTung");

  const columns: ColumnOptions[] = [
    {
      dataField: "MyIdxSeq",
      caption: t("STT"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "MaPhuTung",
      caption: t("MaPhuTung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "TenPhuTung",
      caption: t("TenPhuTung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "DonViTinh",
      caption: t("DonViTinh"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "SoYeuCauXuat",
      caption: t("SoYeuCauXuat"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "SoLuongYeuCau",
      caption: t("SoLuongYeuCau"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "SoLuongXuat",
      caption: t("SoLuongXuat"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxNumberBox",
      width: 200,
      editorOptions: {
        readOnly: false,
        max: 100000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Gia",
      caption: t("Gia"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxNumberBox",
      width: 200,
      editorOptions: {
        readOnly: false,
        max: 100000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "VAT",
      caption: t("VAT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxNumberBox",
      width: 200,
      editorOptions: {
        readOnly: false,
        max: 100000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "TongGia",
      caption: t("TongGia"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true
      }

    },
    {
      dataField: "TonKho",
      caption: t("TonKho"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ViTriDuKien",
      caption: t("ViTriDuKien"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ViTriThucTe",
      caption: t("ViTriThucTe"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "",
      caption: t(""),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: (() => {
        return <Button
          style={{
            background: "#00703c",
            color: "!#000000",
            margin: 0,
          }}
          onClick={() => {
            onOpenPopup()
          }}
          text="..."
        ></Button>
      })
    }
  ];
  // return array of the first item only

  return columns;
};
