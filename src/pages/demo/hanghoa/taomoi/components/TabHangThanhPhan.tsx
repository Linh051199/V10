import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { error } from "pdf-lib";
import { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import FindProduct from "./FindProduct/FindProduct";

const TabHangThanhPhan = ({ control, t, watch, setValue }) => {
  const gridRef = useRef();

  const columns = [
    {
      caption: t("STT"),
      dataField: "STT",
      cellRender: ({ rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
      },
      visible: true,
      alignment: "center",
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "ProductCode",
      visible: true,
      caption: t("Mã hàng hóa"),
    },

    {
      dataField: "mp_ProductName",
      visible: true,
      caption: t("Tên hàng"),
    },
    {
      dataField: "Qty",
      visible: true,
      caption: t("Số lượng"),
    },
    {
      dataField: "mp_UPBuy",
      visible: true,
      caption: t("Giá mua"),
    },
    {
      dataField: "mp_UPBuy",
      visible: true,
      caption: t("Tổng tiền mua"),
    },
    {
      dataField: "mp_UPSell",
      visible: true,
      caption: t("Giá bán"),
    },
    {
      dataField: "mp_UPSell",
      visible: true,
      caption: t("Tổng tiền bán"),
    },
  ];

  const listSanPham = watch("ListSanPham");

  useEffect(() => {
    gridRef.current.setData(listSanPham);
  }, [listSanPham]);

  return (
    <div className="flex flex-col p-[10px]">
      <div className="w-[500px]">
        <Controller
          name={"SanPham"}
          control={control}
          render={({ field }) => {
            return (
              <FindProduct
                setValue={setValue}
                watch={watch}
                errors={error}
                field={field}
                options={{
                  direction: "horizontal",
                }}
              />
            );
          }}
        />
      </div>

      <div>
        <GridViewOne
          columns={columns}
          ref={gridRef}
          dataSource={listSanPham}
          allowSelection
          storeKey="hanghoa-grid"
          customHeight={400}
          keyExpr={"ProductCode"}
        />
      </div>
    </div>
  );
};

export default TabHangThanhPhan;
