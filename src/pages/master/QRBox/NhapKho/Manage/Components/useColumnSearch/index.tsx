import { ItemProps } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { CheckBox } from "devextreme-react";
import React from "react";

const useColumnSearch = () => {
  const fields = [
    "SoPhieuNhap",
    "NgayTaoTu",
    "NgayDuyetTu",
    "NgayHoaDonNhap",
    "TrangThai",
    "LoaiNhapKho",
    "NhaCungCap",
    "NhapKho",
    "SoHoaDonNhap",
    "HangHoa",
    "ChiNhanh",
    "RefNo",
  ];

  const result: ItemProps[] = fields.map((item: string): ItemProps => {
    let customItem: ItemProps = {
      dataField: item,
      caption: item,
      label: {
        text: item,
      },
      visible: true,
    };

    // DateRangeBox
    if (
      item === "NgayTaoTu" ||
      item === "NgayDuyetTu" ||
      item === "NgayHoaDonNhap"
    ) {
      customItem = {
        ...customItem,
        visible: false,
        editorType: "dxDateRangeBox",
        editorOptions: {
          type: "date",
          format: "yyyy-MM-dd",
          displayFormat: "yyyy-MM-dd",
        },
      };
    }

    if (
      ["LoaiNhapKho", "HangHoa", "NhaCungCap", "KhoNhap", "ChiNhanh"].includes(
        item
      )
    ) {
      customItem = {
        ...customItem,
        editorType: "dxSelectBox",
      };

      if (item === "LoaiNhapKho") {
        customItem = {
          ...customItem,
          editorOptions: {
            dataSource: [],
            displayExpr: "",
            valueExpr: "",
          },
        };
      }
      if (item === "HangHoa") {
        customItem = {
          ...customItem,
          editorOptions: {
            dataSource: [],
            displayExpr: "",
            valueExpr: "",
          },
        };
      }
      if (item === "NhaCungCap") {
        customItem = {
          ...customItem,
          editorOptions: {
            dataSource: [],
            displayExpr: "",
            valueExpr: "",
          },
        };
      }
      if (item === "KhoNhap") {
        customItem = {
          ...customItem,
          editorOptions: {
            dataSource: [],
            displayExpr: "",
            valueExpr: "",
          },
        };
      }
      if (item === "ChiNhanh") {
        customItem = {
          ...customItem,
          editorOptions: {
            dataSource: [],
            displayExpr: "",
            valueExpr: "",
          },
        };
      }
    }

    if (item === "TrangThai") {
      customItem = {
        ...customItem,
        cellRender: ({ editorOptions, component: formRef }: any) => {
          return (
            <>
              <CheckBox
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("MoiTao", e.value);
                }}
                text="MoiTao"
              />
              <CheckBox
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("DaDuyet", e.value);
                }}
                text="DaDuyet"
              />
              <CheckBox
                onValueChanged={(e: any) => {
                  formRef.instance().updateData("DaHuy", e.value);
                }}
                text="DaHuy"
              />
            </>
          );
        },
      };
    }

    return customItem;
  });

  return result;
};

export default useColumnSearch;
