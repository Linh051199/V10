import { useClientgateApi } from "@/packages/api";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
 
import { Button, Popup } from "devextreme-react";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const WareHourseTypePopup = forwardRef(
  ({ setData: setValue }: any, ref: any) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [data, setData] = useState<any[]>([]);
    const api = useClientgateApi();

    const column: ColumnOptions[] = [
      {
        dataField: "MaLoaiNhapKho",
        caption: "MaLoaiNhapKho",
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
      },
      {
        dataField: "TenLoaiNhapKho",
        // allowEditing: false,
        caption: "TenLoaiNhapKho",
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
      },
    ];

    useEffect(() => {
      if (!visible) {
        setData([]);
      }
    }, [visible]);

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

    const handleClick = (d: any) => {
      const rowData = d.cells[0].data;
      console.log("d ", d.cells[0].data);
      setValue(rowData, "LoaiNhapKho");
      handleSetVisible(false);
    };

    const handleSearch = async () => {
      // const response = await api.
      setData([
        {
          MaLoaiNhapKho: "Thông thường",
          TenLoaiNhapKho: "Thông thường",
        },
        {
          MaLoaiNhapKho: "Điều chỉnh",
          TenLoaiNhapKho: "Điều chỉnh",
        },
        {
          MaLoaiNhapKho: "Tra Hang",
          TenLoaiNhapKho: "Tra Hang",
        },
        {
          MaLoaiNhapKho: "TheoDonHang",
          TenLoaiNhapKho: "TheoDonHang",
        },
      ]);
    };

    return (
      <Popup
        showTitle={true}
        title="Tìm kiếm loại nhập kho"
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
                keyExpr={"MaLoaiNhapKho"}
                onRowClick={handleClick}
                ref={gridRef}
                isHidenHeaderFilter={true}
                customHeight={400}
                dataSource={data}
                storeKey="DonHangBanLe2"
                isHiddenCheckBox={true}
                // showSetting={false}
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
  }
);

export default WareHourseTypePopup;
