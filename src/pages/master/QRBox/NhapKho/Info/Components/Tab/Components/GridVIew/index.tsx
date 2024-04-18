import React, { forwardRef, useImperativeHandle, useRef } from "react";
import useColumn from "./Components/useColumn";
import customToolbar from "./Components/Toolbar";
import PositionInputPopup from "./Components/Popup/InputPosition";
import { sumBy } from "lodash-es";
import FindCustomerPopup from "../../../Popup/FindProduce";
import { useSetAtom } from "jotai";
import { dataSourceAtom } from "../store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

const GridView = forwardRef(
  ({ updateFieldGrid, handleCheckValidate }: any, ref: any) => {
    const gridRef = useRef();
    const positionPopupRef = useRef();
    const findCustomerPopupRef = useRef();
    const setdataSource = useSetAtom(dataSourceAtom);
    const handleOpenPopup = (data: any) => {
      const rowIndex = data.rowIndex;
      const dataRow = data.data;
      dataRow.Idx = rowIndex;
      positionPopupRef.current.setVisibleValue(true);
      positionPopupRef.current.setDataForGrid(dataRow);
      console.log("data ", data, "dataRow ", dataRow);
    };

    const column = useColumn({
      handleOpenPopup: handleOpenPopup,
      updateFieldGrid: updateFieldGrid,
    });

    useImperativeHandle(
      ref,
      () => ({
        getRef: () => {
          return gridRef.current;
        },
      }),
      []
    );

    const handleOpen = () => {
      findCustomerPopupRef.current.setVisibleValue(true);
    };

    const handleSelectChange = (e: any) => {
      // get data of grid
      const data = gridRef.current.getVisibleData();
      console.log("e ", e);
      // check condition to open popup
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
        setdataSource([...data, ...dataRender])
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
        setdataSource(dataRender)
        gridRef.current.setData(dataRender);
      }

      // setTimeout(() => {
      //   updateFieldGrid();
      // }, 200);
      // return;
      // add data to grid
    };

    const handleSettingExcel = (e: any) => {
      console.log(e);
    };

    const handlePopupChoosen = async (d: any, e: any) => {
      const totalQuantity = sumBy(d, "SoLuong");

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
        setdataSource(result)
        gridRef.current.setData(result);
      }, 200);

      setTimeout(() => {
        updateFieldGrid();
      }, 400);
      // }, 200);
    };

    const toolbar = customToolbar({
      handleSettingExcel: handleSettingExcel,
      handleSelectChange: handleSelectChange,
      handleCheckValidate: handleCheckValidate,
      handleOpen: handleOpen,
    });

    const onChoose = (b: any[]) => {
      const result = b.map((item: any) => {
        return {
          ...item,
          SoLuong: 0,
          VitriNhap: [],
          GiaNhap: 0,
          GiamGia: 0,
          ThanhTien: 0,
          GhiChu: "",
        };
      });
      setdataSource(result)
      gridRef.current.setData(result);
      setTimeout(() => {
        updateFieldGrid();
      }, 400);
    };

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
          storeKey="DonHangBanLe1"
          isHiddenCheckBox={true}
          allowSelection={true}
          allowMultiRowEdit={false}
          allowInlineEdit={true}
          // showSetting={false}
          allowMultiRowDelete={false}
          customToolbarItems={toolbar}
          // isHiddenCheckBox={true}
          onRowDeleteBtnClick={(e: any) => {
            let list = gridRef.current.getData();
            list?.splice(e.row.rowIndex, 1);
            gridRef.current.setData([]);

            setTimeout(() => {
              setdataSource(list)
              gridRef.current.setData(list);
            }, 200);

            setTimeout(() => {
              updateFieldGrid();
            }, 500);
          }}
          editMode={true}
          editingOptions={{
            mode: "row",
            allowUpdating: false,
          }}
        ></GridViewOne>

        <PositionInputPopup
          ref={positionPopupRef}
          handlePopupChoosen={handlePopupChoosen}
        />

        <FindCustomerPopup ref={findCustomerPopupRef} onChoose={onChoose} />
      </div>
    );
  }
);

export default GridView;
