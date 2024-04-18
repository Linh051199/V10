import { Form } from "devextreme-react";
import { SimpleItem, Tab, TabbedItem } from "devextreme-react/form";
import React, { forwardRef } from "react";
import GridView from "./Components/GridVIew";
import GridViewSecond from "./Components/GridVIew/GridVIewSecond";
import { sumBy } from "lodash-es";
import { useSetAtom } from "jotai";
import { dataSourceAtom, quantity } from "./Components/store";

const TabImportStore = forwardRef(
  ({ handleGetData, handleCheckValidate }: any, ref: any) => {
    const gridRef = React.useRef<any>(null);
    const setDataSource = useSetAtom(dataSourceAtom);
    const gridRefTabTwo = React.useRef<any>(null);
    const setQuantity = useSetAtom(quantity);
    const updateFieldGrid = async () => {
      const gridRefOption = gridRef?.current?.getRef();
      const dataGrid = gridRefOption
        .getDxInstance()
        .getVisibleRows()
        .map((item: any) => {
          return item.data;
        });
      let map = dataGrid
        .map((item: any) => {
          const TienHang = item.SoLuong * item.GiaNhap;
          const GiamGia = item.SoLuong * item.GiamGia;

          return {
            ...item,
            TienHang: TienHang,
            GiamGia: GiamGia,
            ThanhTien: TienHang - GiamGia,
          };
        })
        .reduce(
          (acc: any, item: any) => {
            let TongTienHang = acc.TongTienHang + item.TienHang;
            let TongGiamGia = acc.TongGiamGia + item.GiamGia;
            let TongTienTraNCC = acc.TongTienTraNCC + item.ThanhTien;

            return {
              TongTienHang,
              TongGiamGia,
              TongTienTraNCC,
            };
          },
          {
            TongTienHang: 0,
            TongGiamGia: 0,
            TongTienTraNCC: 0,
          }
        );

      handleGetData(map);
      const getQuantity = sumBy(dataGrid, "SoLuong");
      setQuantity(getQuantity);
    };

    return (
      <Form>
        <TabbedItem>
          <Tab
            tabRender={(a: any) => {
              return (
                <div className="tab-customize">
                  <span style={{ textTransform: "capitalize" }}>
                    Danh mục hàng hóa
                  </span>
                </div>
              );
            }}
            // title="Thông tin đơn hàng"
          >
            <Form validationGroup="DonHangDaiLy">
              <SimpleItem
                dataField="GridView"
                label={{
                  visible: false,
                }}
                render={() => {
                  return (
                    <GridView
                      ref={gridRef}
                      updateFieldGrid={updateFieldGrid}
                      handleCheckValidate={handleCheckValidate}
                    />
                  );
                }}
              />
            </Form>
          </Tab>
          <Tab
            tabRender={(a: any) => {
              return (
                <div className="tab-customize">
                  <span style={{ textTransform: "capitalize" }}>
                    Thông tin xác thực
                  </span>
                </div>
              );
            }}
            // title="Thông tin đơn hàng"
          >
            <Form validationGroup="DonHangDaiLy">
              <SimpleItem
                dataField="GridView"
                label={{
                  visible: false,
                }}
                render={() => {
                  return (
                    <GridViewSecond
                      ref={gridRefTabTwo}
                      data={[]}
                      updateFieldGrid={updateFieldGrid}
                    />
                  );
                }}
              />
            </Form>
          </Tab>
        </TabbedItem>
      </Form>
    );
  }
);

export default TabImportStore;
