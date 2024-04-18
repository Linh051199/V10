import { CheckboxField } from "@/packages/components/checkbox-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { Form, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { nanoid } from "nanoid";
import {
  useLenhSuaXeColumnGridSecond,
  useLenhSuaXeColumnGridFirst,
} from "./LenhSuaXeColumn";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IToolbarItemProps, ToolbarItem } from "devextreme-react/data-grid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { BButton } from "@/packages/components/buttons";
import PopupCommandCancel from "./Popup/CommandCancel";
import PopupAssignment from "./Popup/Assignment";
import PrintComponent from "./Popup/Print";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useAtomValue } from "jotai";
import { selectedItemsAtom, viewingDataAtom } from "../../store";

interface Props {
  index: number;
  ref: any;
}

const LenhSuaXe = forwardRef(({ index }: Props, ref: any) => {
  const popupRef: any = useRef();
  const formpRef: any = useRef();
  const [visible, setVisible] = useState(true);
  const gridViewOneRef: any = useRef();
  const gridViewSecondRef: any = useRef();
  const popupAssignMentRef: any = useRef();
  const popupCommandCancelRef: any = useRef();
  const popupPrintRef: any = useRef();
  const itemCheck = useAtomValue(selectedItemsAtom);
  console.log("item ", itemCheck);
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

  const arrayField1 = ["ChuXe", "DienThoai", "HoTen", "MST", "DiaChi"];
  const arrayField2 = ["BienSo", "VIN", "Hang", "Model", "MaMau/NT", "SoMay"];

  const handleSave = () => {
    return ConfirmComponent({
      title: "ConfirmSave",
      contentConfirm: "confirmSave",
      asyncFunction: async () => {},
    });
  };

  const handleCheck = () => {
    return ConfirmComponent({
      title: "ConfirmSave",
      contentConfirm: "confirmSave",
      asyncFunction: async () => {},
    });
  };

  console.log(
    `index === ${index} , ${index === 0} && item:, itemCheck: ${
      itemCheck.length
    } , ${itemCheck.length === 1} && visible: ${visible}`,
    itemCheck
  );

  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="Lệnh sửa chưa"
      height={500}
      visible={index === 0 && itemCheck.length === 1 && visible}
    >
      <div className="popup-content-lenhsuachua">
        <Form ref={formpRef} colCount={2} validationGroup="lenhsuachuaForm">
          <GroupItem colCount={4} colSpan={2}>
            <GroupItem colSpan={2}>
              <SimpleItem
                colSpan={2}
                dataField={"BienSo"}
                editorType="dxTextBox"
                editorOptions={{ onValueChanged: () => {} }}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className="flex item-center gap-2 justify-between">
                      <div className="w-full flex item-center gap-2">
                        <SelectField
                          width={200}
                          items={[]}
                          displayExpr={"DealerName"}
                          valueExpr={"DealerCode"}
                          defaultValue={value}
                          dataField={""}
                          formInstance={formInstance}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                        />
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"100%"}
                          validationRules={[]}
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
            </GroupItem>
            <GroupItem>
              <SimpleItem
                colSpan={1}
                dataField={"LenhSo"}
                editorType="dxTextBox"
                editorOptions={{ onValueChanged: () => {} }}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className="flex item-center gap-2 justify-between">
                      <div className="w-full flex item-center gap-2">
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={100}
                          validationRules={[]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                        />
                        <SelectField
                          width={200}
                          items={[
                            { label: 1, value: 1 },
                            { label: 2, value: 2 },
                            { label: 3, value: 3 },
                          ]}
                          displayExpr={"label"}
                          valueExpr={"value"}
                          defaultValue={value}
                          dataField={""}
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
          </GroupItem>
          <GroupItem caption="Thông tin khách hàng" colSpan={1} colCount={2}>
            {arrayField1.map((item) => {
              return <SimpleItem dataField={item} key={nanoid()} colSpan={1} />;
            })}
          </GroupItem>
          <GroupItem caption="Thông tin xe" colSpan={1} colCount={3}>
            <GroupItem colSpan={2} colCount={2}>
              {arrayField2.map((item) => {
                return (
                  <SimpleItem dataField={item} key={nanoid()} colSpan={1} />
                );
              })}
            </GroupItem>
            <GroupItem colSpan={1}>
              <SimpleItem dataField="Km" />
            </GroupItem>
          </GroupItem>
          <GroupItem colCount={1} colSpan={1} caption="Yêu cầu khách hàng">
            <SimpleItem editorType="dxTextArea" dataField="YeuCau"></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1} colSpan={1} caption="Tình trạng tiếp nhận xe">
            <SimpleItem
              editorType="dxTextArea"
              dataField="Tình trạng tiếp nhận xe"
            ></SimpleItem>
          </GroupItem>
        </Form>

        <div className="my-2">
          <FirstGrid ref={gridViewOneRef} />
          <SecondGrid ref={gridViewSecondRef} />
        </div>

        <Form colCount={2} validationGroup="lenhsuachuaForm">
          <GroupItem colCount={3} colSpan={1} caption="Kế hoạch công việc">
            <SimpleItem
              colSpan={1}
              dataField={"KHToi"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={150}
                        items={[]}
                        displayExpr={"KHToi"}
                        valueExpr={"KHToi"}
                        defaultValue={value}
                        dataField={""}
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
              dataField={"BDAUSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={150}
                        items={[]}
                        displayExpr={"KHToi"}
                        valueExpr={"KHToi"}
                        defaultValue={value}
                        dataField={"BDAUSC"}
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
              dataField={"ThoiGianSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={150}
                        items={[]}
                        displayExpr={"KHToi"}
                        valueExpr={"KHToi"}
                        defaultValue={value}
                        dataField={""}
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
              dataField={"DKienGX"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={150}
                        items={[]}
                        displayExpr={"DKienGX"}
                        valueExpr={"DKienGX"}
                        defaultValue={value}
                        dataField={"DKienGX"}
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
              dataField={"KThucSC"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <SelectField
                        width={150}
                        items={[]}
                        displayExpr={"KThucSC"}
                        valueExpr={"KThucSC"}
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

          <GroupItem colCount={5} caption="Thông tin khác">
            <SimpleItem
              colSpan={1}
              label={{
                visible: false,
              }}
              dataField={"KHCho"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <CheckboxField
                        width={100}
                        dataField={dataField}
                        label={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              label={{
                visible: false,
              }}
              dataField={"YeuCauRuaXe"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <CheckboxField
                        width={100}
                        label={dataField}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              label={{
                visible: false,
              }}
              dataField={"ThanhToanBangThe"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <CheckboxField
                        width={100}
                        label={dataField}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              label={{
                visible: false,
              }}
              dataField={"KhachLayPTCu"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <CheckboxField
                        width={100}
                        dataField={dataField}
                        label={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
            <SimpleItem
              colSpan={1}
              label={{
                visible: false,
              }}
              dataField={"PhanTu"}
              editorType="dxTextBox"
              editorOptions={{ onValueChanged: () => {} }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="flex item-center gap-2 justify-between">
                    <div className="w-full flex item-center gap-2 justify-between">
                      <CheckboxField
                        width={100}
                        dataField={dataField}
                        label={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
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

      {/* ---------------------PopUp---------------------- */}
      <PopupAssignment ref={popupAssignMentRef} />
      <PopupCommandCancel ref={popupCommandCancelRef} />
      <PrintComponent ref={popupPrintRef} />
      {/* ---------------------Toolbar-------------------- */}
      <ToolbarItem toolbar={"bottom"} location="after">
        <BButton
          onClick={() => {
            popupAssignMentRef.current.setOpen();
          }}
          label="Phân công"
        ></BButton>
        <BButton onClick={handleSave} label="Lưu"></BButton>
        <BButton onClick={handleCheck} label="K.Tra C.Cùng"></BButton>
        <BButton
          onClick={() => {
            popupCommandCancelRef.current.setOpen();
          }}
          label="Hủy lệnh S.C"
        ></BButton>
        <BButton
          onClick={() => {
            popupPrintRef.current.setOpen();
          }}
          label="In lệnh"
        ></BButton>
        <BButton onClick={onclose} label="Thoát"></BButton>
      </ToolbarItem>
    </Popup>
  );
});

export const FirstGrid = forwardRef(({}: any, ref: any) => {
  const columns = useLenhSuaXeColumnGridFirst();

  const subGridToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold"}>{"Phân công lao động"}</div>;
      },
    },
  ];
  return (
    <GridViewOne
      ref={ref}
      toolbarItems={subGridToolbars}
      dataSource={[]}
      columns={columns}
      allowSelection={true}
      allowInlineEdit={true}
      allowMultiRowEdit={true}
      editMode={false}
      editingOptions={{
        mode: "batch",
      }}
      defaultPageSize={9999999}
      onSelectionChanged={() => {}}
      onEditorPreparing={() => {}}
      customHeight={"auto"}
      storeKey={"FirstGrid"}
    />
  );
});

export const SecondGrid = forwardRef(({}: any, ref: any) => {
  const columns = useLenhSuaXeColumnGridSecond();

  const subGridToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold"}>{"Phụ tùng/dầu mỡ vật tư"}</div>;
      },
    },
  ];
  return (
    <GridViewOne
      ref={ref}
      toolbarItems={subGridToolbars}
      dataSource={[]}
      columns={columns}
      allowSelection={true}
      allowInlineEdit={true}
      allowMultiRowEdit={true}
      editMode={false}
      editingOptions={{
        mode: "batch",
      }}
      defaultPageSize={9999999}
      onSelectionChanged={() => {}}
      onEditorPreparing={() => {}}
      customHeight={"auto"}
      storeKey={"SecondtGrid"}
    />
  );
});

export default LenhSuaXe;
