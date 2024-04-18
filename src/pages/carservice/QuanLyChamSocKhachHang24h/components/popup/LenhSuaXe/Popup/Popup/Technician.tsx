import { BButton } from "@/packages/components/buttons";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
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

interface Props {
  onSave: Function;
}

const PopupTechnician = forwardRef(({ onSave }: Props, ref: any) => {
  const popupRef: any = useRef();
  const formRef: any = useRef();
  const [field, setField] = useState("");
  const [visible, setVisible] = useState(false);
  const firstGridRef: any = useRef();
  const secondGridRef: any = useRef();

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
      setFieldValue: (f: string) => {
        setField(f);
      },
    }),
    []
  );

  const fakeData = [
    {
      MaNV: "Nguyễn Văn A",
      TenNV: "Nguyễn Văn A",
      ToKyThuat: "Nguyễn Văn A",
    },
    {
      MaNV: "Nguyễn Văn B",
      TenNV: "Nguyễn Văn B",
      ToKyThuat: "Nguyễn Văn B",
    },
    {
      MaNV: "Nguyễn Văn C",
      TenNV: "Nguyễn Văn C",
      ToKyThuat: "Nguyễn Văn C",
    },
    {
      MaNV: "Nguyễn Văn D",
      TenNV: "Nguyễn Văn D",
      ToKyThuat: "Nguyễn Văn D",
    },
    {
      MaNV: "Nguyễn Văn E",
      TenNV: "Nguyễn Văn E",
      ToKyThuat: "Nguyễn Văn E",
    },
  ];

  const arr = ["MaNV", "TenNV", "ToKyThuat"].map((i) => {
    return {
      dataField: i,
      caption: i,
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    };
  });

  const handleSwitchRightOne = () => {
    const ref1 = firstGridRef.current;
    const ref2 = secondGridRef.current;

    const getDataGridOne = ref1.getData();
    const getDataGridTwo = ref2.getData();
    const rowSelect = ref1.getSelectedRowsData();
    const filter = getDataGridOne.filter((i: any) => {
      return !rowSelect.find((itemSelect: any) => itemSelect.MaNV === i.MaNV);
    });
    ref2.setData([...getDataGridTwo, ...rowSelect]);
    ref1.setData(filter);
  };

  const handleSwitchRightAll = () => {
    const ref1 = firstGridRef.current;
    const ref2 = secondGridRef.current;
    const getDataGridOne = ref1.getData();
    const getDataGridTwo = ref2.getData();
    ref2.setData([...getDataGridTwo, ...getDataGridOne]);
    ref1.setData([]);
  };

  const handleSwitchLeftOne = () => {
    const ref1 = secondGridRef.current;
    const ref2 = firstGridRef.current;

    const getDataGridOne = ref1.getData();
    const getDataGridTwo = ref2.getData();
    const rowSelect = ref1.getSelectedRowsData();
    const filter = getDataGridOne.filter((i: any) => {
      return !rowSelect.find((itemSelect: any) => itemSelect.MaNV === i.MaNV);
    });
    ref2.setData([...getDataGridTwo, ...rowSelect]);
    ref1.setData(filter);
  };

  const handleSwitchleftAll = () => {
    const ref1 = secondGridRef.current;
    const ref2 = firstGridRef.current;
    const getDataGridOne = ref1.getData();
    const getDataGridTwo = ref2.getData();
    ref2.setData([...getDataGridTwo, ...getDataGridOne]);
    ref1.setData([]);
  };

  const handleSave = () => {
    const data = secondGridRef.current.getData();

    onSave(field, data , "MaNV");
    onclose();
    console.log("gridViewSecond ", data);
  };

  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="Update Technicans List"
      height={"auto"}
      width={1000}
      visible={visible}
    >
      <div className="flex align-center">
        <div className="list w-[450px]">
          <GridViewOne
            ref={firstGridRef}
            columns={arr}
            dataSource={fakeData}
            keyExpr={["MaNV"]}
            storeKey="Technician_list"
            customHeight={400}
            isHidenHeaderFilter={true}
            allowSelection={false}
            defaultPageSize={999999999999}
          />
        </div>
        <div
          className="w-[70px] flex "
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="my-1">
            <BButton
              label=">"
              className="mb-1"
              onClick={handleSwitchRightOne}
            ></BButton>
          </div>
          <div className="my-1">
            <BButton
              label=">>"
              className="my-1"
              onClick={handleSwitchRightAll}
            ></BButton>
          </div>
          <div className="my-1">
            <BButton
              label="<"
              className="my-1"
              onClick={handleSwitchLeftOne}
            ></BButton>
          </div>
          <div className="my-1">
            <BButton
              label="<<"
              className="my-1"
              onClick={handleSwitchleftAll}
            ></BButton>
          </div>
        </div>
        <div className="list w-[450px]">
          <GridViewOne
            ref={secondGridRef}
            columns={arr}
            isHidenHeaderFilter={true}
            keyExpr={["MaNV"]}
            dataSource={[]}
            customHeight={400}
            storeKey="Technician_list"
            autoFetchData={false}
            allowSelection={false}
            defaultPageSize={999999999999}
          />
        </div>
      </div>
      <ToolbarItem toolbar={"bottom"} location="after">
        <BButton onClick={handleSave} label="Lưu"></BButton>
        <BButton onClick={onclose} label="Thoát"></BButton>
      </ToolbarItem>
    </Popup>
  );
});

export default PopupTechnician;
