import dxForm from "devextreme/ui/form";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { DateRangeBox } from "devextreme-react";
import "src/packages/components/date-range-field-v2/date-range-field.scss";

interface DateRangeFieldProps {
  formInstance: dxForm;
  onValueChanged: (files: any) => void;
  dataField?: string;
  className?: string;
  defaultValue?: Date[];
  readOnly?: boolean;
}

export const DateRangeField = forwardRef(({ formInstance, readOnly=false, dataField, onValueChanged, className, defaultValue=[] }: DateRangeFieldProps, ref: ForwardedRef<any>) => {
  const inputRef = useRef<DateRangeBox>(null);
  const [error, setError] = useState("");
  const handleValueChanged = (e: any) => {
    console.log('value:', e.value);
    onValueChanged(e);
  };
  return (
    <div className={`date-range-field-v2  ${className} ml-2`}>
      <div className={'flex items-center'}>
        <DateRangeBox
          width={250}
          labelMode={'hidden'}
          ref={inputRef}
          defaultValue={defaultValue}
          displayFormat={"yyyy-MM-dd"}
          readOnly={readOnly}
          onValueChanged={handleValueChanged} />
      </div>
      {!!error && (
        <div className={"mt-1"}>
          <span className={"text-red-600 text-xs"}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
});
