import { RequiredField } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Form, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { ButtonItem, SimpleItem } from "devextreme-react/form";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import FormAdd from "./PopupPhuTungComponents/FormAdd";

interface Props {
  ref: any;
  onSave: Function;
}

const PopupPhuTung = forwardRef(({ onSave }: Props, ref: any) => {
  const [visible, setVisible] = React.useState(false);
  const popupRef: any = useRef();
  const searchCondition = useRef("");
  const gridRef: any = useRef();
  const formRef: any = useRef();
  const fetchData = async () => {};

  useImperativeHandle(
    ref,
    () => ({
      setOpen: () => {
        setVisible(true);
      },
      setClose: () => {
        setVisible(false);
      },

      setCondition: (param: any) => {
        searchCondition.current = param;
        // refetchData
      },
    }),
    []
  );

  const coluon: ColumnOptions[] = [
    "Idx",
    "MaPT",
    "TenPT",
    "TenTA",
    "DVT",
    "GiaBan",
    "VAT",
    "Model",
    "SLCon",
  ].map((item) => {
    if (item === "Idx") {
      return {
        dataField: "Idx",
        caption: "",
        visible: true,
        columnIndex: 1,
        allowFiltering: false,
        allowSorting: false,
        // groupKey: "INFORMATION_BANKACCOUNT",
        cellRender: (data: any) => {
          return (
            <p>{+(data.component.pageIndex() * 100) + (data.rowIndex + 1)}</p>
          );
        },
      };
    }
    return {
      dataField: item,
      caption: item,
      editorType: "dxTextBox",
      visible: true,
    };
  });

  const handleSave = () => {};

  const handleCreate = () => {};
  const handleUpdate = () => {};

  return (
    <Popup
      ref={popupRef}
      showTitle={true}
      title="Tìm kiếm thông tin khách hàng"
      width={900}
      height={"auto"}
      maxHeight={850}
      visible={visible}
    >
      <ScrollView>
        <GridViewOne
          ref={gridRef}
          allowSelection={false}
          isHiddenCheckBox={true}
          columns={coluon}
          dataSource={[]}
          customHeight={"auto"}
          storeKey=""
        />

        <div className="flex align-items-center condition">
          <Form ref={formRef} colCount={2} formData={{}}>
            <SimpleItem
              label={{
                location: "left",
              }}
              cssClass="mr-1"
              dataField="MaPT"
            />
            <SimpleItem
              label={{
                location: "left",
              }}
              dataField="TenPT"
            />
          </Form>

          <div className="flex align-items-center">
            <BButton label="Tìm kiếm"></BButton>
            <BButton label="Tạo" onClick={handleCreate}></BButton>
            <BButton label="Sửa" onClick={handleUpdate}></BButton>
          </div>
        </div>

        <FormAdd />
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

export default PopupPhuTung;
