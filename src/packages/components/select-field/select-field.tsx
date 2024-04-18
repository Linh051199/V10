import SelectBox, { ISelectBoxOptions } from "devextreme-react/select-box";
import "src/packages/components/select-field/select-field.scss";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import dxForm from "devextreme/ui/form";
import { Validator } from "devextreme-react";
import { ValidationRule } from "devextreme-react/common";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface SelectFieldProps extends ISelectBoxOptions {
  formInstance: dxForm;
  dataField: string;
  items: any;
  defaultValue?: any;
  valueExpr?: string;
  // displayExpr?: string;
  dropDownOptions?: any;
  width?: any;
  onValueChanged?: (e: ValueChangedEvent) => void;
  validationRules?: ValidationRule[];
  validationGroup?: string;
  readOnly?: boolean;
  showClearButton?: boolean;
  className?: string;
  placeholder?: string;
  ref?: any;
}

export const SelectField = forwardRef(
  (
    {
      items,
      defaultValue,
      valueExpr = "value",
      displayExpr = "text",
      width = 270,
      onValueChanged,
      formInstance,
      dataField,
      validationRules,
      validationGroup,
      showClearButton = true,
      readOnly = false,
      placeholder,
      dropDownOptions,
      className = "ml-2",
    }: SelectFieldProps,
    ref: any
  ) => {
    const selectBoxRef = useRef<any>(null);
    const formData = formInstance?.option("formData");
    const [readOnlyReal, setReadOnlyReal] = useState(readOnly);
    const value = formData?.[dataField];
    const handleValueChanged = (e: ValueChangedEvent) => {
      if (onValueChanged) {
        onValueChanged(e);
      } else {
        formInstance.updateData(dataField, e.value);
      }
    };
    useImperativeHandle(ref, () => ({
      getDxInstance() {
        return selectBoxRef.current;
      },
      setReadOnly(mode: any) {
        setReadOnlyReal(mode);
      },
    }));
    return (
      <div className={"select-field flex items-center"}>
        <SelectBox
          ref={selectBoxRef}
          className={className}
          width={width}
          searchEnabled={true}
          dataSource={items}
          displayExpr={displayExpr}
          valueExpr={valueExpr}
          defaultValue={defaultValue || value}
          validationMessagePosition={"bottom"}
          validationMessageMode={"always"}
          showClearButton={showClearButton}
          onValueChanged={handleValueChanged}
          readOnly={readOnlyReal}
          placeholder={placeholder}
          dropDownOptions={{ ...dropDownOptions, resizeEnabled: true }} // Update
        >
          <Validator
            validationGroup={validationGroup}
            validationRules={validationRules}
          ></Validator>
        </SelectBox>
      </div>
    );
  }
);
