import { CheckBox } from "devextreme-react";
import React from "react";
import "./StatusCheckBox.scss";
const StatusCheckBox = ({ data }: { data: string }) => {
  return (
    <CheckBox
      elementAttr={{
        class: data === "1" ? "customize-checkbox-readOnly" : "",
      }}
      disabled={true}
      defaultValue={data === "1" ? true : false}
    />
  );
};

export default StatusCheckBox;
