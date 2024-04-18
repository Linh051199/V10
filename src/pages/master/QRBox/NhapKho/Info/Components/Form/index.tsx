import { requiredType } from "@/packages/common/Validation_Rules";
import { ColumnOptions } from "@/types";
import { Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { nanoid } from "nanoid";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import SupplierCustomerPopup from "../Popup/SupplierPopup";
import WareHoursePopup from "../Popup/WareHoursePopup";
import WareHourseTypePopup from "../Popup/WareHourseTypePopup";

const FormInputStore = forwardRef(({}: any, ref: any) => {
  const formRef: any = useRef();
  const supplierPopupRef = useRef();
  const WareHourseTypePopupRef = useRef();
  const WareHoursePopupRef = useRef();
  useImperativeHandle(
    ref,
    () => ({
      setData: (d) => {
        const getData = formRef?.current?.instance.option("formData");
        formRef?.current?.instance.option("formData", {
          ...getData,
          ...d,
        });
      },

      checkValidate: () => {
        return formRef.current.instance.validate();
      },
    }),
    []
  );

  const handleDropdownShowing = (e: any, s: string) => {
    const popup = e.component; // Access the popup instance

    popup.option("toolbarItems", [
      {
        widget: "dxButton",
        options: {
          text: "Tìm kiếm thêm",
          icon: "plus", // Optional icon
          onClick: () => {
            switch (s) {
              case "NhaCungCap":
                supplierPopupRef.current?.setVisibleValue(true);
                break;
              case "LoaiNhapKho":
                WareHourseTypePopupRef.current?.setVisibleValue(true);
                break;
              case "KhoNhap":
                WareHoursePopupRef.current?.setVisibleValue(true);
                break;
              default:
                break;
            }
          },
        },
      },
    ]);
  };

  const fields = ["SoPhieuNhap", "LoaiNhapKho", "KhoNhap", "NhaCungCap"].map(
    (item: string): ColumnOptions => {
      let newResult: ColumnOptions = {
        dataField: item,
        editorType: "dxTextBox",
      };

      // Select
      if (["KhoNhap", "LoaiNhapKho", "NhaCungCap"].includes(item)) {
        newResult = {
          ...newResult,
          validationRules: [requiredType],
          editorType: "dxSelectBox",
        };

        if (item === "LoaiNhapKho") {
          newResult = {
            ...newResult,
            editorOptions: {
              width: "100%",
              placeholder: "-- Chọn loại nhập kho --",
              showClearButton: true,
              dataSource: [
                { value: "Thông thường", label: "Thông thường" },
                { value: "Điều chỉnh", label: "Điều chỉnh" },
                { value: "Tra Hang", label: "Tra Hang" },
                { value: "TheoDonHang", label: "TheoDonHang" },
              ],

              valueExpr: "value",
              displayExpr: "label",
              dropDownOptions: {
                onShowing: (e: any) => handleDropdownShowing(e, "LoaiNhapKho"),
                height: "auto",
                wrapperAttr: {
                  class: "demo-dropdown",
                },
              },
            },
          };
        }

        if (item === "KhoNhap") {
          newResult = {
            ...newResult,
            editorOptions: {
              width: "100%",
              placeholder: "-- Chọn kho nhập --",
              dataSource: [
                { value: "01-kh01", label: "01-kh01" },
                { value: "1-12", label: "1-12" },
              ],
              valueExpr: "value",
              showClearButton: true,
              displayExpr: "label",
              dropDownOptions: {
                onShowing: (e: any) => handleDropdownShowing(e, "KhoNhap"),
                height: "auto",
                wrapperAttr: {
                  class: "demo-dropdown",
                },
              },
            },
          };
        }

        if (item === "NhaCungCap") {
          newResult = {
            ...newResult,
            editorOptions: {
              showClearButton: true,
              width: "100%",
              placeholder: "-- Chọn nhà cung câp --",
              dataSource: [
                {
                  value: "KH000 - MMS ĐangThiHoa",
                  label: "KH000 - MMS ĐangThiHoa",
                },
                { value: "Điều chỉnh", label: "Điều chỉnh" },
                { value: "Tra Hang", label: "Tra Hang" },
                { value: "TheoDonHang", label: "TheoDonHang" },
              ],
              valueExpr: "value",
              displayExpr: "label",
              dropDownOptions: {
                onShowing: (e: any) => handleDropdownShowing(e, "NhaCungCap"),
                height: "auto",
                wrapperAttr: {
                  class: "demo-dropdown",
                },
              },
            },
          };
        }
      }
      return {
        ...newResult,
        editorOptions: {
          ...(newResult.editorOptions ?? {}),
          width: "100%",
        },
      };
    }
  );

  const fieldsSecond = [
    "NhapTheoYeuCauNghiepVu",
    "RefType",
    "SoRefNo",
    "SoContainer",
  ].map((item: string): ColumnOptions => {
    let newResult: ColumnOptions = {
      dataField: item,
      editorType: "dxTextBox",
    };

    if (item === "NhapTheoYeuCauNghiepVu") {
      newResult = {
        ...newResult,
        editorType: "dxCheckBox",
        label: {
          // visible: false,
          text: " ",
        },
        editorOptions: {
          width: "100%",
          text: "Nhập theo đơn hàng",
        },
      };
    }
    return {
      ...newResult,
      editorOptions: {
        ...(newResult.editorOptions ?? {}),
        width: "100%",
      },
    };
  });
  const fieldsThirst = [
    "SoHopDong",
    "SoHoaDon",
    "BienSoXe",
    "NoiDungNhap",
    "TongTienHang",
    "TongGiamGia",
    "TongTienTraNCC",
  ].map((item: string): ColumnOptions => {
    let newResult: ColumnOptions = {
      dataField: item,
      editorType: "dxTextBox",
    };

    if (item === "SoHopDong") {
      newResult = {
        ...newResult,
        editorOptions: {
          width: "100%",
        },
      };
    }

    if (item === "NoiDungNhap") {
      newResult = {
        ...newResult,
        editorType: "dxTextArea",
        editorOptions: {
          width: "100%",
        },
      };
    }

    if (
      item === "TongTienHang" ||
      item === "TongGiamGia" ||
      item === "TongTienTraNCC"
    ) {
      newResult = {
        ...newResult,
        editorType: "dxNumberBox",
        editorOptions: {
          width: "100%",
          format: ".",
          readOnly: true,
        },
      };

      if (item === "TongTienHang") {
        newResult = {
          ...newResult,
          label: {
            text: "Tổng Tiền Hàng (VNĐ)",
          },
        };
      }
      if (item === "TongGiamGia") {
        newResult = {
          ...newResult,
          label: {
            text: "Tổng Giảm Giá (VNĐ)",
          },
        };
      }
      if (item === "TongTienTraNCC") {
        newResult = {
          ...newResult,
          label: {
            text: "Tổng Tiền Tra NCC (VNĐ)",
          },
        };
      }
    }

    return {
      ...newResult,
      editorOptions: {
        width: "100%",
        ...(newResult.editorOptions ?? {}),
      },
    };
  });

  const setData = (data: any, field: string) => {
    console.log("data ", data, "field ", field);
    debugger;
    if (field === "NhaCungCap") {
      formRef.current.instance.updateData(field, data.MaKhachHang);
    }
    if (field === "LoaiNhapKho") {
      formRef.current.instance.updateData(field, data.MaLoaiNhapKho);
    }
    if (field === "KhoNhap") {
      formRef.current.instance.updateData(field, data.MaKho);
    }

    formRef.current.instance.repaint();

    console.log(
      'formRef.current.instance.option("formData")',
      formRef.current.instance.option("formData")
    );
  };

  return (
    <div className="w-[100%] form-store flex justify-center ">
      <div className="w-[80%]">
        <Form width={"100%"} labelLocation="left" colCount={3} ref={formRef}>
          <GroupItem colSpan={1}>
            {fields.map((item: any) => {
              return <SimpleItem width={500} key={nanoid()} {...item} />;
            })}
          </GroupItem>
          <GroupItem colSpan={1}>
            {fieldsSecond.map((item: any) => {
              return <SimpleItem width={500} key={nanoid()} {...item} />;
            })}
          </GroupItem>
          <GroupItem colSpan={1}>
            {fieldsThirst.map((item: any) => {
              return <SimpleItem width={500} key={nanoid()} {...item} />;
            })}
          </GroupItem>
        </Form>
      </div>

      <SupplierCustomerPopup ref={supplierPopupRef} setData={setData} />
      <WareHoursePopup ref={WareHoursePopupRef} setData={setData} />
      <WareHourseTypePopup ref={WareHourseTypePopupRef} setData={setData} />
    </div>
  );
});

export default FormInputStore;
