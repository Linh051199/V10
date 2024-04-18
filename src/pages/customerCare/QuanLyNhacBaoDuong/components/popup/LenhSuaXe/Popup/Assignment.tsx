import { BButton } from "@/packages/components/buttons";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup, TextBox } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PopupTechnician from "./Popup/Technician";

const PopupAssignment = forwardRef(({}, ref: any) => {
  const popupRef: any = useRef();
  const formRef: any = useRef();
  const technicanRef: any = useRef();
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

  const handleOpenTechnician = (s: string) => {
    technicanRef.current.setFieldValue(s);
    technicanRef.current.setOpen();
  };

  const onSave = (field: string, value: any[], key: string) => {
    formRef.current.instance.updateData(
      field,
      value.map((i) => i[key]).join(",")
    );
    formRef.current.instance.repaint();
  };

  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="Assign Work"
      height={600}
      width={900}
      visible={visible}
    >
      <div>
        <Form ref={formRef} validationGroup="lenhsuachuaForm">
          <GroupItem caption="Sửa chữa chung" colCount={3}>
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianBatDauDK"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <DateField
                        readOnly={true}
                        width={200}
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
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucDK"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <DateField
                        width={200}
                        defaultValue={value}
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"KiThuatVienA"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <TextField
                        readOnly={true}
                        width={170}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                      <BButton
                        width={55}
                        onClick={() => handleOpenTechnician(dataField)}
                        label="..."
                      ></BButton>
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
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
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
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
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"Khoang"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={200}
                        items={[]}
                        displayExpr={""}
                        valueExpr=""
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
          <GroupItem caption="Sửa chữa Dồng" colCount={3}>
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianBatDauDK"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <DateField
                        readOnly={true}
                        width={200}
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
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucDK"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <DateField
                        width={200}
                        defaultValue={value}
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"KiThuatVienB"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <TextField
                        readOnly={true}
                        width={170}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                      <BButton
                        width={55}
                        onClick={() => handleOpenTechnician(dataField)}
                        label="..."
                      ></BButton>
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
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
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
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
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"Khoang"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={200}
                        items={[]}
                        displayExpr={""}
                        valueExpr=""
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
          <GroupItem caption="Sửa chữa Sơn" colCount={3}>
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianBatDauDK"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <DateField
                        readOnly={true}
                        width={200}
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
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucDK"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <DateField
                        width={200}
                        defaultValue={value}
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"KiThuatVienC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <TextField
                        readOnly={true}
                        width={170}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                      <BButton
                        width={55}
                        onClick={() => handleOpenTechnician(dataField)}
                        label="..."
                      ></BButton>
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
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
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"ThoiGianKetThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
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
                        readOnly={true}
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
            <SimpleItem
              colSpan={1}
              dataField={"Khoang"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={200}
                        items={[]}
                        displayExpr={""}
                        valueExpr=""
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
      </div>
      <PopupTechnician onSave={onSave} ref={technicanRef} />
      <ToolbarItem toolbar={"bottom"} location="after">
        <BButton label="Lưu"></BButton>
        <BButton onClick={onclose} label="Thoát"></BButton>
      </ToolbarItem>
    </Popup>
  );
});

export default PopupAssignment;
