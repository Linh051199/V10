import { ColumnOptions } from "@/types";
import { Button, NumberBox } from "devextreme-react";

const useColumn = ({ handleOpenPopup, updateFieldGrid }: any) => {
  const format = (n: number) => {
    let number = n ?? 0;
    if (!!number.toLocaleString("en-US")) {
      return (
        <span style={{ color: "#000" }}>
          {new Intl.NumberFormat("en-US").format(number) ?? 0}
        </span>
      );
    }
    return 0;
  };

  const field = [
    "MaHangHoa",
    "TenHangHoaTV",
    "DonVi",
    "SoLuong", //
    "VitriNhap", ///
    "GiaNhap", //
    "GiamGia", //
    "ThanhTien",
    "GhiChu",
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

    if (item === "SoLuong" || item === "GiaNhap" || item === "GiamGia") {
      resultItem = {
        dataField: item,
        caption: item,
        visible: true,
        alignment: "right",
        width: 200,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxNumberBox",
        format: "fixedPoint",
        editorOptions: {
          readOnly: false,
          placeholder: "Nhập mã hàng hóa",
          format: "fixedPoint",
          showClearButton: true,
        },
        // setCellValue: (newValue: any, value: number, current: any) => {
        //   if (item === "SoLuong") {
        //     newValue.SoLuong = value;
        //     newValue.ThanhTien = value * (current.GiaNhap - current.GiamGia);
        //   }
        //   if (item === "GiaNhap") {
        //     newValue.GiaNhap = value;
        //     newValue.ThanhTien = current.SoLuong * (value - current.GiamGia);
        //   }
        //   if (item === "GiamGia") {
        //     newValue.GiamGia = value;
        //     newValue.ThanhTien = current.SoLuong * (current.GiaNhap - value);
        //   }

        //   setTimeout(() => {
        //     updateFieldGrid();
        //   }, 200);
        // },
        cellRender: (data: any) => {
          console.log("e ", data);

          return (
            // <div>
            //   <strong className="mb-1 text-right">
            //     {format(data?.displayValue)}
            //   </strong>
            // </div>
            <NumberBox
              // format={"#,###"}
              onValueChanged={(e: any) => {
                console.log("e ", e, "data ", data);
                const index = data.rowIndex;
                const current = data.row.data;

                if (item === "SoLuong") {
                  data.component.cellValue(index, "SoLuong", e.value);
                  data.component.cellValue(
                    index,
                    "ThanhTien",
                    e.value * (current.GiaNhap - current.GiamGia)
                  );
                  // newValue.SoLuong = value;
                  // newValue.ThanhTien =
                  // value * (current.GiaNhap - current.GiamGia);
                }
                if (item === "GiaNhap") {
                  data.component.cellValue(index, "GiaNhap", e.value);
                  data.component.cellValue(
                    index,
                    "ThanhTien",
                    current.SoLuong * (e.value - current.GiamGia)
                  );

                  // newValue.GiaNhap = value;
                  // newValue.ThanhTien =
                  // current.SoLuong * (value - current.GiamGia);
                }
                if (item === "GiamGia") {
                  data.component.cellValue(index, "GiamGia", e.value);
                  data.component.cellValue(
                    index,
                    "ThanhTien",
                    current.SoLuong * (current.GiaNhap - e.value)
                  );
                  // newValue.GiamGia = value;
                  // newValue.ThanhTien =
                  //   current.SoLuong * (current.GiaNhap - value);
                }

                // tạo phiếu nhập kho
                // data.component.setEditData();
                updateFieldGrid();
              }}
              defaultValue={data.value}
            />
          );
        },
      };
    }

    if (item === "VitriNhap") {
      resultItem = {
        dataField: item,
        caption: item,
        visible: true,
        alignment: "right",
        width: 200,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxNumberBox",
        editorOptions: {
          readOnly: true,
          placeholder: "Nhập mã hàng hóa",
        },
        cellRender: (data) => {
          return (
            <div
              className="flex justify-between"
              style={{ alignItems: "center" }}
            >
              <span className="pr-2">
                {data?.data?.VitriNhap.map((item, index) => {
                  if (index) {
                    return ", " + item.TenViTri;
                  }
                  return item.TenViTri;
                })}
              </span>
              <Button
                icon="plus"
                onClick={() => handleOpenPopup(data)}
              ></Button>
            </div>
          );
        },
      };
    }

    if (item === "ThanhTien") {
      resultItem = {
        dataField: item,
        caption: item,
        visible: true,
        alignment: "right",
        width: 200,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxNumberBox",
        editorOptions: {
          readOnly: true,
          placeholder: "Nhập mã hàng hóa",
        },
        cellRender: (data: any) => {
          console.log("dataa", data);
          return (
            <div>
              <strong className="mb-1 text-right">
                {format(data?.displayValue)}
              </strong>
            </div>
          );
        },
      };
    }

    return resultItem;
  });

  return field;
};

export default useColumn;
