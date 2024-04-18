import { SelectField } from "@/packages/components/select-field";
import { Popup, TextBox } from "devextreme-react";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BButton } from "@/packages/components/buttons";

const PrintComponent = forwardRef(({}, ref: any) => {
  const popupRef: any = useRef();
  const formRef: any = useRef();
  const [visible, setVisible] = useState(false);
  const onclose = () => {
    ref.current.setClose();
  };

  const onPrint = () => {
    console.log("helu");
    const customKeyEventFirst = new KeyboardEvent("keydown", { key: "Ctrl" });

    const customKeyEvent = new KeyboardEvent("keydown", { key: "P" });
    document.activeElement?.dispatchEvent(customKeyEventFirst);
    // document.dispatchEvent(firstKey);
    document.activeElement?.dispatchEvent(customKeyEvent);
    // document.dispatchEvent(secondKey);
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
  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="Print Report"
      height={"auto"}
      width={500}
      visible={visible}
    >
      <div>
        <Form ref={formRef} validationGroup="lenhsuachuaForm">
          <GroupItem caption="" colCount={1}>
            <SimpleItem
              colSpan={1}
              dataField={"ChonMauXe"}
              editorType="dxTextBox"
              label={{
                location: "left",
              }}
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={300}
                        items={[
                          {
                            label: "In RO",
                            value: "In RO",
                          },
                          {
                            label: "In Phiếu PDI",
                            value: "In Phiếu PDI",
                          },
                        ]}
                        displayExpr={"label"}
                        valueExpr="value"
                        defaultValue={value}
                        dataField={dataField}
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
          </GroupItem>
        </Form>
        <div className="flex justify-center">
          <BButton onClick={onPrint} label="Print(Ctrl+P)"></BButton>
          <BButton label="Preview"></BButton>
        </div>
        <div className="mt-1 flex justify-center">
          <BButton onClick={onclose} label="Thoát"></BButton>
        </div>
      </div>
    </Popup>
  );
});

export default PrintComponent;
