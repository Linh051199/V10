import { CheckBox } from "devextreme-react";
import { nanoid } from "nanoid";
import React, { memo, useEffect, useState } from "react";

export default memo(function CustomDataRow({
  data,
  onCheckboxChange,
  selectedRows,
  customRowRender,
}: any) {
  return (
    <>
      <div className="flex items-center">
        <div className="w-[38px] flex justify-center">
          <CheckBox
            data-key={data.rowIndex}
            value={selectedRows.includes(data.rowIndex)}
            onValueChanged={(e: any) => {
              onCheckboxChange(data.rowIndex, e);
            }}
          />
        </div>
        <div className="p-[6px] w-full pr-3">{customRowRender(data.data)}</div>
      </div>
    </>
  );
});
