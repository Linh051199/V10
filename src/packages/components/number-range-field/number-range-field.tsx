import dxForm from "devextreme/ui/form";

import "src/packages/components/number-range-field/number-range-field.scss";
import { NumberBox } from "devextreme-react";
import { useRef, useState } from "react";

interface NumberRangeFieldProps {
  formInstance?: dxForm;
  dataField?: string;
  onValueChanged?: (e: any) => void;
  placeholder?: string;
  width?: number;
  readOnly?: boolean;
  defaultValue?: string;
  className?: string;
  min?: number;
  max?: number;
  widthFrom?: any;
  widthTo?: any;
}

export const NumberRangeField = ({
  formInstance,
  dataField,
  placeholder,
  width = 270,
  onValueChanged,
  widthFrom = 130,
  widthTo = 130,
  readOnly = false,
  defaultValue,
  className = "",
  min,
  max,
}: NumberRangeFieldProps) => {
  const fromRef = useRef<NumberBox>(null);
  const toRef = useRef<NumberBox>(null);
  const handleValueFromChanged = (e: any) => {
    const { value } = e;
    const toValue = toRef.current?.instance.option("value") as number;
    if (toValue && value > toValue) {
      e.cancel = true;
      setError("ValueFromIsInvalid");
    } else {
      setError("");
      const val = { from: value, to: toValue };
      onValueChanged?.({ value: val });
    }
  };
  const [error, setError] = useState("");
  const handleValueToChanged = (e: any) => {
    const { value } = e;
    const fromValue = fromRef.current?.instance.option("value");
    if (fromValue && value < fromValue) {
      e.cancel = true;
      setError("ValueToIsInvalid");
    } else {
      setError("");
      const val = { from: fromValue, to: value };
      onValueChanged?.({ value: val });
    }
  };
  return (
    <div className={`number-range-field ${className} ml-2`} style={{ width }}>
      <div className={"flex items-center w-full"}>
        <div className={"flex items-center justify-between w-full"}>
          <div className={""}>
            <NumberBox
              width={widthFrom}
              ref={fromRef}
              isValid={!error}
              min={min}
              max={max}
              onValueChanged={handleValueFromChanged}
            />
          </div>
          <div className={"mx-0.5"}>-</div>
          <div className={""}>
            <NumberBox
              ref={toRef}
              width={widthTo}
              isValid={!error}
              min={min}
              max={max}
              onValueChanged={handleValueToChanged}
            />
          </div>
        </div>
      </div>
      {!!error && (
        <div className={"mt-1"}>
          <span className={"text-red-600 text-xs"}>{error}</span>
        </div>
      )}
    </div>
  );
};
