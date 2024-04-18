import { RequiredField } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Form, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { SimpleItem } from "devextreme-react/form";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface Props {
  ref: any;
  onSave: Function;
}

const PopupInfoCustomer = forwardRef(({ onSave }: Props, ref: any) => {
  const [visible, setVisible] = React.useState(false);
  const popupRef: any = useRef();
  const searchCondition = useRef("");
  const gridRef = useRef();
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
    "BienSo",
    "TenKhach",
    "DongXe",
    "DienThoai",
    "DiaChi",
    "SoKhung",
    "Mau",
  ].map((item) => {
    return {
      dataField: item,
      caption: item,
      editorType: "dxTextBox",
      visible: true,
    };
  });

  const handleSave = () => {};

  return (
    <Popup
      ref={popupRef}
      showTitle={true}
      title="Tìm kiếm thông tin khách hàng"
      width={900}
      height={600}
      visible={visible}
    >
      <ScrollView>
        <GridViewOne
          ref={gridRef}
          allowSelection={false}
          isHiddenCheckBox={true}
          columns={coluon}
          dataSource={[]}
          storeKey=""
        />
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

export default PopupInfoCustomer;
