import { Form, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { nanoid } from "nanoid";
import "./style.scss";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import { useAtomValue } from "jotai";
import { selectedItemsAtom } from "../store";
import { SelectField } from "@/packages/components/select-field";
import { DateField } from "@/packages/components/date-field";
import { TextField } from "@/packages/components/text-field";
import { RequiredField } from "@/packages/common/Validation_Rules";
interface Props {
  index: number;
  ref: any;
}

const KHSauDichVu24h = forwardRef(({ index }: Props, ref: any) => {
  const popupRef: any = useRef();
  const [visible, setVisible] = useState(false);
  const formRef: any = useRef();
  const item = useAtomValue(selectedItemsAtom);
  const [disable, setDisable] = useState<boolean>(true);

  const onclose = () => {
    ref.current.setClose();
  };

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

  const arrValueTinhTrang = [
    {
      title: "Chưa liên hệ",
      value: "Chưa liên hệ",
    },
    {
      title: "Đã liên hệ",
      value: "Đã liên hệ",
    },
    {
      title: "Không liên hệ",
      value: "Không liên hệ",
    },
  ];

  const array1 = ["TinhTrang", "NgayLienHe", "NgayHenDen", "GhiChu"];

  const handleSave = () => {
    const { isValid } = formRef.current.instance.validate();
    if (isValid) {
      const data = formRef.current.instance.option("formData");
      console.log("data ", data);
    }
  };

  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="Cập nhật tình trạng liên hệ"
      height={"auto"}
      width={600}
      visible={index === 1 && item.length === 1 && visible}
    >
      <div className="popup-content-KHDichVu">
        <Form ref={formRef} validationGroup="CapNhatTinhTrangLienHe">
          <GroupItem caption="Thông Tin liên hệ">
            {array1.map((item, index) => {
              if (item === "NgayLienHe" || item === "NgayHenDen") {
                return (
                  <SimpleItem
                    label={{
                      location: "left",
                    }}
                    dataField={item}
                    editorType="dxDateBox"
                    colSpan={1}
                    key={nanoid()}
                    editorOptions={{
                      displayFormat: "yyyy-MM-dd",
                      type: "date",
                    }}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="flex item-center gap-2 justify-between">
                          <div className="w-full flex item-center gap-2 justify-between">
                            <DateField
                              width={200}
                              defaultValue={value}
                              dataField={dataField}
                              readOnly={disable}
                              formInstance={formInstance}
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

              if (item === "TinhTrang") {
                return (
                  <SimpleItem
                    colSpan={2}
                    label={{
                      location: "left",
                    }}
                    dataField={item}
                    validationRules={[RequiredField(`TinhTrangIsRequired`)]}
                    editorType="dxSelectBox"
                    key={nanoid()}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="flex item-center gap-2 justify-between">
                          <div className="w-full flex item-center gap-2 justify-between">
                            <SelectField
                              width={200}
                              items={arrValueTinhTrang}
                              displayExpr={"title"}
                              valueExpr="value"
                              defaultValue={value}
                              validationGroup="CapNhatTinhTrangLienHe"
                              dataField={dataField}
                              formInstance={formInstance}
                              validationRules={[
                                RequiredField(`${dataField} IsRequired`),
                              ]}
                              onValueChanged={(e: any) => {
                                if (e.value === "Đã liên hệ") {
                                  setDisable(false);
                                } else {
                                  setDisable(true);
                                }
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
                  dataField={item}
                  label={{
                    location: "left",
                  }}
                  editorType="dxTextBox"
                  key={nanoid()}
                  editorOptions={{}}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <div className="flex item-center gap-2 justify-between">
                        <TextField
                          width={"100%"}
                          defaultValue={value}
                          dataField={dataField}
                          formInstance={formInstance}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                        />
                      </div>
                    );
                  }}
                />
              );
            })}
          </GroupItem>
        </Form>
      </div>

      <ToolbarItem toolbar={"bottom"} location="after">
        <BButton onClick={handleSave} label="OK"></BButton>
        <BButton onClick={onclose} label="Thoát"></BButton>
      </ToolbarItem>
    </Popup>
  );
});

export default KHSauDichVu24h;
