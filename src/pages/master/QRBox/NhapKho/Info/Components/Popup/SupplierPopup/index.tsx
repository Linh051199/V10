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

const SupplierCustomerPopup = forwardRef(
  ({ setData: setValue }: any, ref: any) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [data, setData] = useState<any[]>([]);
    const api = useClientgateApi();

    const column: ColumnOptions[] = [
      {
        dataField: "MaKhachHang",
        caption: "MaKhachHang",
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
      },
      {
        dataField: "TenKhachHang",
        // allowEditing: false,
        caption: "TenKhachHang",
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
      },
      {
        dataField: "DiaChi",
        // allowEditing: false,
        caption: "DiaChi",
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
      },
      {
        dataField: "NguoiLienHe",
        // allowEditing: false,
        caption: "NguoiLienHe",
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
      },
      {
        dataField: "DienThoai",
        // allowEditing: false,
        caption: "DienThoai",
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
          MaKhachHang: "KH000 - MMS ĐangThiHoa",
          TenKhachHang: "KH000 - MMS ĐangThiHoa",
          DiaChi: "HN",
          NguoiLienHe: "Chu Tiến Anh",
          DienThoai: "03123",
        },
        {
          MaKhachHang: "Điều chỉnh",
          TenKhachHang: "Điều chỉnh",
          DiaChi: "HN",
          NguoiLienHe: "Tạ Hồng Khang",
          DienThoai: "03123",
        },
        {
          MaKhachHang: "Tra Hang",
          TenKhachHang: "Tra Hang",
          DiaChi: "HN",
          NguoiLienHe: "Nguyễn Bá Khanhs",
          DienThoai: "03123",
        },
        {
          MaKhachHang: "TheoDonHang",
          TenKhachHang: "TheoDonHang",
          DiaChi: "HN",
          NguoiLienHe: "Nguyễn Bá Khanhs",
          DienThoai: "03123",
        },
      ]);
    };

    const handleClick = (d: any) => {
      const rowData = d.cells[0].data;
      console.log("d ", d.cells[0].data);
      setValue(rowData, "NhaCungCap");
      handleSetVisible(false);
    };

    return (
      <Popup
        showTitle={true}
        title="Tìm kiếm khách hàng là nhà cung cấp"
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
                keyExpr={"MaKhachHang"}
                onRowClick={handleClick}
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
  }
);

export default SupplierCustomerPopup;
