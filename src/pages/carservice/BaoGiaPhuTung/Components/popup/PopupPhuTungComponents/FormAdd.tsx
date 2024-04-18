import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { FormOptions } from "@/types";
import { Button, Form } from "devextreme-react";
import { FormTypes, GroupItem, SimpleItem } from "devextreme-react/form";
import React, { useRef } from "react";
import "./style.scss";
const FormAdd = () => {
  const fields = [
    "LoaiVatTu",
    "TenPT",
    "MaPT",
    "TenTA",
    "GiaNhap",
    "GiaBan",
    "SLToiThieu",
    "DonVi",
    "LoaiHang",
    "VAT",
    "HaySuDung",
    "GhiChu",
  ];

  const formRef: any = useRef();

  return (
    <>
      <Form colCount={2} ref={formRef} formData={{}}>
        <GroupItem colCount={2} colSpan={1} caption="Thông tin sửa">
          {fields.map((item) => {
            if (item === "LoaiVatTu") {
              return (
                <SimpleItem
                  colSpan={2}
                  cssClass="w-[45%]"
                  key={item}
                  dataField={item}
                />
              );
            }

            if (item === "GhiChu") {
              return (
                <SimpleItem
                  colSpan={2}
                  key={item}
                  dataField={item}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <div className="w-full position-relative ">
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          width={"100%"}
                          className=""
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                        />
                        <BButton
                          className="position-absolute-form-add"
                          label="Lưu"
                        ></BButton>
                      </div>
                    );
                  }}
                />
              );
            }

            return <SimpleItem colSpan={1} key={item} dataField={item} />;
          })}
        </GroupItem>
      </Form>
    </>
  );
};

export default FormAdd;
