import React, { forwardRef, useImperativeHandle, useRef } from "react";
import customToolbar from "./Components/Toolbar";
import PositionInputPopup from "./Components/Popup/InputPosition";
import { sumBy } from "lodash-es";
import useColumn from "./Components/useColumn/ColumnGridSecond";
import customToolbarSecond from "./Components/Toolbar/indexSecond";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

const GridViewSecond = forwardRef(({ updateFieldGrid }: any, ref: any) => {
  const gridRef = useRef();
  const positionPopupRef = useRef();
  const handleOpenPopup = (data: any) => {
    const rowIndex = data.rowIndex;
    const dataRow = data.data;
    dataRow.Idx = rowIndex;
    positionPopupRef.current.setVisibleValue(true);
    positionPopupRef.current.setDataForGrid(dataRow);
    console.log("data ", data, "dataRow ", dataRow);
  };

  const column = useColumn();

  const fake = [
    {
      MaHangHoa: "Testing",
      TenHangHoaTV: "Testing",
      DonVi: "Cái",
      SoLuong: 0,
      VitriNhap: [],
      GiaNhap: 0,
      GiamGia: 0,
      ThanhTien: 0,
      GhiChu: "",
    },
    {
      MaHangHoa: "Testing2",
      TenHangHoaTV: "Testing2",
      DonVi: "Cái",
      SoLuong: 0,
      VitriNhap: [],
      GiaNhap: 0,
      GiamGia: 0,
      ThanhTien: 0,
      GhiChu: "",
    },
  ];

  console.log("column ", column);

  useImperativeHandle(
    ref,
    () => ({
      getRef: () => {
        return gridRef.current;
      },
    }),
    []
  );

  const handleSelectChange = (e: any) => {
    // get data of grid
    const data = gridRef.current.getVisibleData();

    // check exist data

    if (data.length) {
      const dataRender = [
        {
          MaHangHoa: e.value,
          TenHangHoaTV: e.value,
          DonVi: "Cái",
          SoLuong: 0,
          VitriNhap: [],
          GiaNhap: 0,
          GiamGia: 0,
          ThanhTien: 0,
          GhiChu: "",
        },
      ];
      gridRef.current.setData([...data, ...dataRender]);
    } else {
      const dataRender = [
        {
          MaHangHoa: e.value,
          TenHangHoaTV: e.value,
          DonVi: "Cái",
          SoLuong: 0,
          VitriNhap: [],
          GiaNhap: 0,
          GiamGia: 0,
          ThanhTien: 0,
          GhiChu: "",
        },
      ];
      gridRef.current.setData(dataRender);
    }

    setTimeout(() => {
      updateFieldGrid();
    }, 200);
    // return;
    // add data to grid
  };

  const handleSettingExcel = (e: any) => {
    console.log(e);
  };

  const handlePopupChoosen = async (d: any, e: any) => {
    console.log("d", d, "e ", e);

    const totalQuantity = sumBy(d, "SoLuong");
    console.log("totalQuantity", totalQuantity);

    // getDataOfGrid
    // const data = gridRef.current.getData();
    const data = gridRef.current
      .getDxInstance()
      .getVisibleRows()
      .map((item: any) => {
        return item.data;
      });
    const result = data.map((item: any, index: number) => {
      if (index === e.Idx) {
        return {
          ...e,
          SoLuong: totalQuantity,
          ThanhTien: totalQuantity * (e.GiaNhap - e.GiamGia),
          VitriNhap: d,
        };
      } else {
        return item;
      }
    });
    // gridRef.current.setData([]);
    // setTimeout(() => {
    gridRef.current.setData([]);
    setTimeout(() => {
      gridRef.current.setData(result);
    }, 200);

    setTimeout(() => {
      updateFieldGrid();
    }, 400);
    // }, 200);
  };

  const toolbar = customToolbarSecond({
    handleSelectChange: handleSelectChange,
  });

  return (
    <div>
      <GridViewOne
        columns={column}
        cssClass="grid-pay_"
        keyExpr={"MaHangHoa"}
        ref={gridRef}
        isHidenHeaderFilter={true}
        customHeight={400}
        dataSource={[]}
        storeKey="DonHangBanLe2"
        isHiddenCheckBox={true}
        showSetting={false}
        allowSelection={true}
        allowMultiRowEdit={false}
        allowInlineEdit={true}
        allowMultiRowDelete={false}
        customToolbarItems={toolbar}
        // isHiddenCheckBox={true}
        onRowDeleteBtnClick={(e: any) => {
          let list = gridRef.current.getData();
          list?.splice(e.row.rowIndex, 1);
          gridRef.current.setData([]);

          setTimeout(() => {
            gridRef.current.setData(list);
          }, 200);

          // setTimeout(() => {
          //   updateFieldGrid();
          // }, 500);
        }}
        editMode={true}
        editingOptions={{
          mode: "batch",
        }}
      ></GridViewOne>

      <PositionInputPopup
        ref={positionPopupRef}
        handlePopupChoosen={handlePopupChoosen}
      />
    </div>
  );
});

export default GridViewSecond;
