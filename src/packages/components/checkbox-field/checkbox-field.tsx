import dxForm from "devextreme/ui/form";
import { CheckBox } from "devextreme-react";

interface CheckboxFieldProps {
  formInstance: dxForm;
  dataField: string;
  onValueChanged: (e: any) => void;
  width?: number;
  label?: string;
  defaultValue?: boolean;
  readOnly?: boolean;
  checkBoxRef?: any;
}

export const CheckboxField = ({
  label,
  formInstance,
  dataField,
  width = 250,
  onValueChanged,
  defaultValue,
  readOnly,
  checkBoxRef,
}: CheckboxFieldProps) => {
  return (
    <div className={"checkbox-field flex items-start"}>
      <CheckBox
        ref={checkBoxRef}
        width={width}
        className={"ml-2"}
        onValueChanged={onValueChanged}
        text={label}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </div>
  );
};
