import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Button, Popup, Toolbar } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const PositionInputPopup = forwardRef(
  ({ handlePopupChoosen }: any, ref: any) => {
    const [visible, setVisible] = useState(false);
    const gridRef = useRef();
    const [data, setData] = useState({});
    const handleSetVisible = (v: boolean) => {
      setVisible(v);
    };
    useImperativeHandle(
      ref,
      () => ({
        setVisibleValue: (v: boolean) => {
          handleSetVisible(v);
        },
        setDataForGrid: (v: any) => {
          console.log("v ", v);
          setData(v);
          const vitrinhap = v.VitriNhap;
          if (vitrinhap.length) {
            gridRef?.current.setData([]);
            gridRef?.current.setData(vitrinhap);
          } else {
            gridRef?.current.setData([
              {
                MaViTri: "",
                SoLuong: 0,
              },
            ]);
          }

          // if (v.length) {
          //   gridRef.current.setData(v);
          // } else {
          // }
        },
      }),
      []
    );

    const fakeVitri = [
      {
        MaViTri: "MaViTriA",
        TenViTri: "TenViTriA",
      },
      {
        MaViTri: "MaViTriB",
        TenViTri: "TenViTriB",
      },
      {
        MaViTri: "MaViTriC",
        TenViTri: "TenViTriC",
      },
      {
        MaViTri: "MaViTriD",
        TenViTri: "TenViTriD",
      },
    ];

    const field = [
      "MaViTri",
      "SoLuong", //
    ].map((item: string): ColumnOptions => {
      let resultItem: ColumnOptions = {
        dataField: item,
        // allowEditing: false,
        caption: item,
        visible: true,
        columnIndex: 1,
        alignment: "left",
        width: 200,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        editorOptions: { readOnly: false, placeholder: "Nhập số luong" },
      };

      if (item === "SoLuong") {
        resultItem = {
          dataField: item,
          caption: item,
          visible: true,
          alignment: "left",
          width: 200,
          columnIndex: 1,
          groupKey: "BASIC_INFORMATION",
          editorType: "dxNumberBox",
          editorOptions: {
            readOnly: false,
            placeholder: "Nhập mã hàng hóa",
          },
          setCellValue: (newValue: any, value: number, current: any) => {
            newValue.SoLuong = value;
          },
        };
      }

      if (item === "MaViTri") {
        resultItem = {
          dataField: item,
          caption: item,
          visible: true,
          alignment: "left",
          width: 200,
          columnIndex: 1,
          groupKey: "BASIC_INFORMATION",
          editorType: "dxSelectBox",
          editorOptions: {
            dataSource: fakeVitri,
            displayExpr: "TenViTri",
            // valueExpr: "MaViTri",
            readOnly: false,
            placeholder: "Nhập mã hàng hóa",
          },
          setCellValue: (newValue: any, value: any, currentValue: any) => {
            newValue.MaViTri = value.MaViTri;
            newValue.TenViTri = value.TenViTri;
          },
          cellRender: (data) => {
            return <span>{data.displayValue}</span>;
          },
        };
      }

      return resultItem;
    });

    const handleAddRowForGrid = () => {
      gridRef?.current.addRow();
    };

    const onChoose = () => {
      handlePopupChoosen(gridRef.current.getVisibleData(), data);
      setVisible(false);
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
        <>
          <GridViewOne
            isHidenHeaderFilter={true}
            ref={gridRef}
            customHeight={400}
            key={"MaViTri"}
            allowSelection={false}
            dataSource={[]}
            storeKey="NhapHangGrid_Popup"
            columns={field}
            allowMultiRowEdit={false}
            allowInlineEdit={true}
            editMode={true}
            editingOptions={{
              mode: "batch",
            }}
            toolbarItems={[
              {
                visible: true,
                widget: "dxButton",
                toolbar: "bottom",
                location: "before",
                options: {
                  text: "Thêm mới",
                  type: "primary",
                  style: {
                    padding: "10px",
                    marginRight: 5,
                    background: "green",
                    color: "white",
                  },
                  onClick: () => handleAddRowForGrid(),
                },
              },
            ]}
          />
        </>
        <ToolbarItem location="after" toolbar={"bottom"}>
          <Button
            className="w-[100px]"
            onClick={onChoose}
            text={"Xong"}
            stylingMode="contained"
          />
        </ToolbarItem>
      </Popup>
    );
  }
);

export default PositionInputPopup;
