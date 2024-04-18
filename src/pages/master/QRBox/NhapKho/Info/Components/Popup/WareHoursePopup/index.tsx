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

const WareHoursePopup = forwardRef(({ setData: setValue }: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [data, setData] = useState<any[]>([]);
  const api = useClientgateApi();

  const column: ColumnOptions[] = [
    {
      dataField: "MaKho",
      caption: "MaKho",
      visible: true,
      columnIndex: 1,
      alignment: "left",
      width: 200,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TenKho",
      // allowEditing: false,
      caption: "TenKho",
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
        MaKho: "01-kh01",
        TenKho: "01-kh01",
      },
      {
        MaKho: "1-12",
        TenKho: "1-12",
      },
    ]);
  };

  const handleClick = (d: any) => {
    const rowData = d.cells[0].data;
    console.log("d ", d.cells[0].data);
    setValue(rowData, "KhoNhap");
    handleSetVisible(false);
  };

  return (
    <Popup
      showTitle={true}
      title="Tìm kiếm Kho"
      height={400}
      width={800}
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
            <SimpleItem
              label={{
                visible: false,
              }}
              dataField="SoDonHang"
            ></SimpleItem>
          </Form>
          <Button
            width={100}
            className="mr-2"
            type="default"
            stylingMode="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        {data.length ? (
          <div className="grid-container">
            <GridViewOne
              columns={column}
              cssClass="grid-pay_"
              keyExpr={"MaKho"}
              onRowClick={handleClick}
              // showSetting={false}
              ref={gridRef}
              isHidenHeaderFilter={true}
              customHeight={400}
              dataSource={data}
              storeKey="DonHangBanLe2"
              isHiddenCheckBox={true}
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

      {/* <ToolbarItem location="after" toolbar={"bottom"}>
        <Button
          className="w-[100px]"
          text={"Chọn"}
          onClick={handleSelect}
          stylingMode="contained"
        />
      </ToolbarItem> */}
    </Popup>
  );
});

export default WareHoursePopup;
