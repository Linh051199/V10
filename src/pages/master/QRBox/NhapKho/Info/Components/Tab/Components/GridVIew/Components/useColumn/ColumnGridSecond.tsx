import { ColumnOptions } from "@/types";
import { Button } from "devextreme-react";

const useColumn = () => {
  const field = [
    "MaHangHoa",
    "TenHangHoaTV",
    "MaXacThuc",
    "MaHop",
    "MaThung",
    "LoSanXuat",
    "CaSanXuat",
    "KCS",
  ].map((item: string): ColumnOptions => {
    let resultItem: ColumnOptions = {
      dataField: item,
      // allowEditing: false,
      caption: item,
      visible: true,
      columnIndex: 1,
      alignment: "left",
      width: 200,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: { readOnly: true, placeholder: "Nhập số luong" },
    };
    if (
      [
        "MaXacThuc",
        "MaHop",
        "MaThung",
        "LoSanXuat",
        "CaSanXuat",
        "KCS",
      ].includes(item)
    ) {
      resultItem = {
        ...resultItem,
        editorOptions: { readOnly: false, placeholder: `Nhập số ${item}` },
      };
    }
    return resultItem;
  });

  return field;
};

export default useColumn;
