import React, { forwardRef, useImperativeHandle, useState } from "react";

export const TotalProduct = forwardRef(({ gridRef }: any, ref: any) => {
  const [total, setTotal] = useState(0);
  useImperativeHandle(ref, () => ({
    setTotalProduct: () => {
      const dataGrid = gridRef.current.getData();
      const totalProduct = dataGrid.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator + currentValue.VinColorCode,
        0
      );
      setTotal(totalProduct);
    },
  }));
  return <div>tổng số lượng: {total}</div>;
});
