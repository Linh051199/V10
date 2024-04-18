import { useClientgateApi } from "@/packages/api"; 
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Button, Popup } from "devextreme-react";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const FindCustomerPopup = forwardRef(({ onChoose }: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState<any[]>([]);
  const api = useClientgateApi();

  const column: ColumnOptions[] = [
    {
      dataField: "MaHangHoa",
      // allowEditing: false,
      caption: "MaHangHoa",
      visible: true,
      columnIndex: 1,
      alignment: "left",
      width: 200,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TenHangHoa",
      // allowEditing: false,
      caption: "TenHangHoa",
      visible: true,
      columnIndex: 1,
      alignment: "left",
      width: 200,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "DonVi",
      // allowEditing: false,
      caption: "DonVi",
      visible: true,
      columnIndex: 1,
      alignment: "left",
      width: 200,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];

  const gridRef = useRef();

  const handleSetVisible = (v: boolean) => {
    setVisible(v);
  };
  useImperativeHandle(
    ref,
    () => ({
      setVisibleValue: (v: boolean) => {
        handleSetVisible(v);
      },
      setFormDataValue: (v: any) => {
        setFormData(v);
      },
    }),
    []
  );

  console.log("formData ", formData);

  const handleSearch = async () => {
    // const response = await api.
    setData([
      {
        MaHangHoa: "HangHoa1",
        TenHangHoa: "Hàng Hóa 1",
        DonVi: "Cai",
      },
      {
        MaHangHoa: "HangHoa2",
        TenHangHoa: "Hàng Hóa 2",
        DonVi: "Cai",
      },
      {
        MaHangHoa: "HangHoa3",
        TenHangHoa: "Hàng Hóa 3",
        DonVi: "Cai",
      },
    ]);
  };

  const handleSelect = () => {
    const b = gridRef.current.getSelectedRowsData();
    // console.log("b ", b);
    onChoose(b);
    handleSetVisible(false);
  };

  return (
    <Popup
      showTitle={true}
      title="Thanh toán"
      width={750}
      height={"auto"}
      visible={visible}
      showCloseButton={true}
      onHidden={() => handleSetVisible(false)}
    >
      <div>
        <div className="form-container flex align-items-center">
          <Form
            className="w-full flex-1"
            labelLocation="left"
            colCount={2}
            formData={formData}
          >
            <SimpleItem dataField="SoDonHang"></SimpleItem>
          </Form>
          <Button stylingMode="contained" onClick={handleSearch}>
            Search
          </Button>
        </div>
        {data.length ? (
          <div className="grid-container">
            <GridViewOne
              columns={column}
              cssClass="grid-pay_"
              keyExpr={"MaHangHoa"}
              ref={gridRef}
              isHidenHeaderFilter={true}
              customHeight={400}
              dataSource={data}
              storeKey="DonHangBanLe2"
              isHiddenCheckBox={false}
              allowSelection={true}
              allowMultiRowEdit={false}
              allowInlineEdit={true}
              allowMultiRowDelete={false}
              // isHiddenCheckBox={true}
              editMode={false}
            ></GridViewOne>
          </div>
        ) : (
          <></>
        )}
      </div>

      <ToolbarItem location="after" toolbar={"bottom"}>
        <Button
          className="w-[100px]"
          text={"Chọn"}
          onClick={handleSelect}
          stylingMode="contained"
        />
      </ToolbarItem>
    </Popup>
  );
});

export default FindCustomerPopup;
