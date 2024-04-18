import DateBox from "devextreme-react/date-box";
import dxForm from "devextreme/ui/form";

import {useState} from "react";
import {format, parse, set, setDay, startOfDay} from "date-fns";

import "src/packages/components/week-select-field/week-select-field.scss"

interface DateFieldProps {
  formInstance: dxForm
  dataField: string
  onValueChanged?: (e: any) => void
  placeholder?: string;
  width?: number;
  readOnly?: boolean;
  defaultValue?: string ;
}

export const WeekSelectField = ({formInstance, dataField, placeholder, onValueChanged, readOnly=false, defaultValue}: DateFieldProps) => {
  const handleChanged = (e: any) => {
    const date = new Date(e.value);
    const val = setDay(date, 1)
    setInnerValue(val)

    if(!onValueChanged) {
      formInstance.updateData(dataField, e.value)
    } else {
      onValueChanged({...e, value: val})
    }
  }
  const current=format(startOfDay(new Date()),'yyyy-MM-dd');
  const [innerValue, setInnerValue] = useState(parse(defaultValue?? current, "yyyy-MM-dd", new Date()))
  return (
    <div className={"date-field flex flex-row"}>
      <DateBox
        openOnFieldClick={true}
        width={284}
        inputAttr={{
          class: "rounded border-[0.5]"
        }}
        placeholder={placeholder}
        onValueChanged={handleChanged}
        readOnly={readOnly}
        defaultValue={defaultValue}
        value={innerValue}
        displayFormat={"yyyy-MM-dd"}
      />
    </div>
  )
}
