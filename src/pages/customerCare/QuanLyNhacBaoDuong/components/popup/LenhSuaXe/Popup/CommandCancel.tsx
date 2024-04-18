import { BButton } from "@/packages/components/buttons";
import { DateField } from "@/packages/components/date-field";
import { TextField } from "@/packages/components/text-field";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import Form, { SimpleItem } from "devextreme-react/form";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const PopupCommandCancel = forwardRef(({}, ref: any) => {
  const popupRef: any = useRef();
  const formRef: any = useRef();

  const [visible, setVisible] = useState(false);
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

  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="Command Cancel"
      height={"auto"}
      width={600}
      visible={visible}
    >
      <div>
        <Form ref={formRef} validationGroup="lenhsuachuaForm">
          <SimpleItem
            label={{
              location: "left",
            }}
            dataField={"SoLenh"}
            editorType="dxTextBox"
            editorOptions={{ onValueChanged: () => {} }}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="flex item-center gap-2 justify-between">
                  <div className="w-full flex item-center gap-2 justify-between">
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={200}
                      validationRules={[]}
                      validationGroup={formInstance.option("validationGroup")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          />
          <SimpleItem
            label={{
              location: "left",
            }}
            dataField={"KhachHang"}
            editorType="dxTextBox"
            editorOptions={{ onValueChanged: () => {} }}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="flex item-center gap-2 justify-between">
                  <div className="w-full flex item-center gap-2 justify-between">
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={400}
                      validationRules={[]}
                      validationGroup={formInstance.option("validationGroup")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          />
          <SimpleItem
            label={{
              location: "left",
            }}
            dataField={"BienSoXe"}
            editorType="dxTextBox"
            editorOptions={{ onValueChanged: () => {} }}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="flex item-center gap-2 justify-between">
                  <div className="w-full flex item-center gap-2 justify-between">
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={200}
                      validationRules={[]}
                      validationGroup={formInstance.option("validationGroup")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          />
          <SimpleItem
            label={{
              location: "left",
            }}
            dataField={"NgayHuyLenh"}
            editorType="dxTextBox"
            editorOptions={{ onValueChanged: () => {} }}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className="flex item-center gap-2 justify-between">
                  <div className="w-full flex item-center gap-2 justify-between">
                    <DateField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={150}
                      validationRules={[]}
                      validationGroup={formInstance.option("validationGroup")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                </div>
              );
            }}
          />
          <SimpleItem
            dataField="LyDoHuyLenh"
            editorType="dxTextArea"
          ></SimpleItem>
        </Form>
      </div>
      <ToolbarItem toolbar={"bottom"} location="after">
        <BButton onClick={() => {}} label="Lưu"></BButton>
        <BButton onClick={onclose} label="Thoát"></BButton>
      </ToolbarItem>
    </Popup>
  );
});

export default PopupCommandCancel;
