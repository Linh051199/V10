import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { Form } from "devextreme-react";
import { GroupItem, IFormOptions, SimpleItem } from "devextreme-react/form";
import React, { ForwardedRef, forwardRef, useRef } from "react";
import UpdateInfoCustomer from "./popup/UpdateInfoCustomer";
import { RequiredField } from "@/packages/common/Validation_Rules";
import PopupInfoCustomer from "./popup/PopupInfoCustomer";

interface Props {
  ref: ForwardedRef<IFormOptions>;
}

const FormPT = forwardRef(({}: Props, ref: ForwardedRef<IFormOptions>) => {
  const updateInfoCustomRef: any = useRef();
  const popupInfoCustomRef: any = useRef();

  const onSave = () => {};

  const onOpenUpdateCustomer = () => {
    console.log("updateInfoCustomRef ", updateInfoCustomRef);
    updateInfoCustomRef?.current?.setOpen?.();
    // ref.setOpen();
  };

  const formItem = ["TenKH", "DiaChi", "DienThoai", "So", "DiDong"];
  const formItem2 = ["NguoiNhan", "HinhThucThanhToan", "NgayBaoGiao"];
  return (
    <>
      <Form formData={{}} ref={ref} colCount={4}>
        <SimpleItem
          dataField="BaoGiaSo"
          colSpan={4}
          label={{}}
          cssClass="w-[200px]"
          render={({ component: formInstance, dataField }: any) => {
            const formData = formInstance.option("formData");
            const value = formData[dataField];
            return (
              <div className="flex item-center gap-2 justify-between">
                <div className="w-full">
                  <TextField
                    formInstance={formInstance}
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
        />{" "}
        <GroupItem caption="Thong tin khach hang" colSpan={4} colCount={4}>
          <GroupItem colCount={2} colSpan={2}>
            {formItem.map((item) => {
              if (item === "DienThoai" || item === "So") {
                return (
                  <SimpleItem
                    colSpan={1}
                    cssClass={`${item} item-field`}
                    label={{}}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="w-full flex-1 item-center justify-between">
                          <TextField
                            formInstance={formInstance}
                            dataField={dataField}
                            width={"100%"}
                            onValueChanged={(e: any) => {
                              formInstance.updateData(dataField, e.value);
                            }}
                          />
                        </div>
                      );
                    }}
                    key={item}
                    dataField={item}
                  />
                );
              }

              if (item === "DiDong") {
                return (
                  <SimpleItem
                    colSpan={2}
                    key={item}
                    label={{}}
                    dataField={item}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="flex item-center gap-2 justify-between">
                          <div className="flex-1">
                            <TextField
                              formInstance={formInstance}
                              dataField={dataField}
                              width={"100%"}
                              onValueChanged={(e: any) => {
                                formInstance.updateData(dataField, e.value);
                              }}
                            />
                          </div>
                          <BButton
                            className="flex-1"
                            onClick={onOpenUpdateCustomer}
                            label="Cập nhật thông tin khách hàng"
                          ></BButton>
                        </div>
                      );
                    }}
                  />
                );
              }

              if (item === "TenKH") {
                return (
                  <SimpleItem
                    colSpan={2}
                    key={item}
                    label={{}}
                    dataField={item}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="flex item-center gap-3 justify-between">
                          <div className="w-full">
                            <TextField
                              onEnterKey={(e) => {
                                const formData =
                                  ref.current.instance.option("formData");
                                popupInfoCustomRef?.current?.setOpen?.();
                                popupInfoCustomRef?.current?.setCondition?.(
                                  formData
                                );
                              }}
                              formInstance={formInstance}
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
              }

              return (
                <SimpleItem
                  colSpan={2}
                  key={item}
                  label={{}}
                  dataField={item}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <div className="flex item-center gap-2 justify-between">
                        <div className="w-full">
                          <TextField
                            formInstance={formInstance}
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
          </GroupItem>
          <GroupItem colSpan={2}>
            {formItem2.map((item) => {
              return (
                <SimpleItem
                  key={item}
                  dataField={item}
                  label={{}}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <div className="flex item-center gap-2 justify-between">
                        <div className="w-full">
                          <TextField
                            formInstance={formInstance}
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
          </GroupItem>
        </GroupItem>
      </Form>

      <PopupInfoCustomer ref={popupInfoCustomRef} onSave={() => {}} />
      <UpdateInfoCustomer ref={updateInfoCustomRef} onSave={() => {}} />
    </>
  );
});

export default FormPT;
