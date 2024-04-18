import { RequiredField } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { ColumnOptions } from "@/types";
import { Form, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { SimpleItem } from "devextreme-react/form";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface Props {
  ref: any;
  onSave: Function;
}

const UpdateInfoCustomer = forwardRef(({ onSave }: Props, ref: any) => {
  const [visible, setVisible] = React.useState(false);
  const formRef: any = useRef();

  useImperativeHandle(
    ref,
    () => ({
      setOpen: () => {
        setVisible(true);
      },
      setClose: () => {
        setVisible(false);
      },
    }),
    []
  );

  const fields: string[] = [
    "HoTen",
    "DiaChi",
    "GioiTinh",
    "DiDong",
    "Fax",
    "DienThoai",
    "Email",
    "MST",
  ];

  const handleSave = () => {};

  return (
    <Popup
      showTitle={true}
      title="Thông tin khác hàng"
      width={750}
      height={600}
      visible={visible}
    >
      <ScrollView>
        <Form
          validationGroup="UpdateInfoCustomer"
          colCount={2}
          ref={formRef}
          formData={{}}
        >
          {fields.map((field) => {
            if (["GioiTinh", "DiDong", "Fax", "DienThoai"].includes(field)) {
              if (field === "GioiTinh") {
                return (
                  <SimpleItem
                    key={field}
                    colSpan={1}
                    dataField={field}
                    editorType="dxSelectBox"
                    editorOptions={{ onValueChanged: onSave }}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="flex item-center gap-2 justify-between">
                          <div className="w-full">
                            <SelectField
                              items={[
                                {
                                  label: "Nam",
                                  value: "Nam",
                                },
                                {
                                  label: "Nữ",
                                  value: "Nữ",
                                },
                              ]}
                              defaultValue={value}
                              displayExpr={"label"}
                              valueExpr={"value"}
                              formInstance={formInstance}
                              dataField={dataField}
                              width={"100%"}
                              validationGroup={formInstance.option(
                                "validationGroup"
                              )}
                              validationRules={[
                                RequiredField(`${field} is Required`),
                              ]}
                              onValueChanged={(e: any) => {
                                formInstance.updateData(dataField, e.value);
                              }}
                            />
                          </div>
                        </div>
                      );
                    }}
                  />
                );
              }

              return (
                <SimpleItem
                  key={field}
                  colSpan={1}
                  dataField={field}
                  editorType="dxTextBox"
                  editorOptions={{ onValueChanged: onSave }}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <div className="flex item-center gap-2 justify-between">
                        <div className="w-full">
                          <TextField
                            formInstance={formInstance}
                            dataField={dataField}
                            defaultValue={value}
                            width={"100%"}
                            validationRules={[
                              RequiredField(`${field} is Required`),
                            ]}
                            validationGroup={formInstance.option(
                              "validationGroup"
                            )}
                            onValueChanged={(e: any) => {
                              formInstance.updateData(dataField, e.value);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }}
                />
              );
            }
            return (
              <SimpleItem
                colSpan={2}
                key={field}
                dataField={field}
                editorType="dxTextBox"
                editorOptions={{ onValueChanged: onSave }}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className="flex item-center gap-2 justify-between">
                      <div className="w-full">
                        <TextField
                          formInstance={formInstance}
                          defaultValue={value}
                          dataField={dataField}
                          width={"100%"}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            );
          })}
        </Form>
      </ScrollView>

      <ToolbarItem toolbar={"bottom"} location={"after"}>
        <BButton
          label={"Lưu"}
          onClick={handleSave}
          className={"mx-2 w-[100px]"}
        />
      </ToolbarItem>
      <ToolbarItem toolbar={"bottom"} location={"after"}>
        <BButton
          label={"Thoát"}
          onClick={() => {
            ref.current.setClose();
          }}
          className={"mx-2 w-[100px]"}
        />
      </ToolbarItem>
    </Popup>
  );
});

export default UpdateInfoCustomer;
