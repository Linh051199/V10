import { useAtomValue } from "jotai";
import React from "react";
import { quantity } from "../../../store";

const QuantityComponent = () => {
  const format = (n: number) => {
    let number = n ?? 0;
    if (!!number.toLocaleString("en-US")) {
      return (
        <span style={{ color: "#000" }}>
          {new Intl.NumberFormat("en-US").format(number) ?? 0}
        </span>
      );
    }
    return 0;
  };

  const quantityValue = useAtomValue(quantity);

  return (
    <div className="flex" style={{ position: "fixed", right: "10px" }}>
      <span>Tổng:</span>
      <strong className="ml-3">{format(quantityValue)}</strong>
    </div>
  );
};

export default QuantityComponent;
