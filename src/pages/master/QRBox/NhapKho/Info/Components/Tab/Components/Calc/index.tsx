import React, { forwardRef, useImperativeHandle, useState } from "react";

const Calc = forwardRef(({}, ref: any) => {
  const [state, setState] = useState({});

  useImperativeHandle(
    ref,
    () => ({
      setDaTa: (d) => {
        setState(d);
      },
    }),
    []
  );

  return (
    <div>
      <div className="flex align-items-center">
        <span>Thành Tiền:</span>
        <span className="cost">Thành Tiền</span>
      </div>
    </div>
  );
});

export default Calc;
