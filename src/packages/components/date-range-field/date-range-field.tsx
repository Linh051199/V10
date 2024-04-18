import dxForm from "devextreme/ui/form";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { DateBox, Validator } from "devextreme-react";
import { isAfter, isBefore } from "date-fns";
import "src/packages/components/date-range-field/date-range-field.scss";
import { ValidationRule } from "devextreme-react/common";
import { CustomRule } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";

interface DateRangeFieldProps {
  formInstance: dxForm;
  onValueChanged: (files: any) => void;
  dataField?: string;
  className?: string;
  defaultValue?: Date[];
  allowEmpty?: boolean;
  validationRules?: ValidationRule[];
  validationGroup?: string;
  readOnly?: boolean;
  widthTo?: number;
  widthFrom?: number;
}

export const DateRangeField = forwardRef(
  (
    {
      widthTo = 130,
      widthFrom = 130,
      formInstance,
      dataField,
      allowEmpty = false,
      onValueChanged,
      className = "",
      defaultValue,
      validationRules,
      validationGroup,
      readOnly = false,
    }: DateRangeFieldProps,
    ref: ForwardedRef<any>
  ) => {
    const { t } = useI18n("Common");
    const fromRef = useRef<DateBox>(null);
    const toRef = useRef<DateBox>(null);
    useEffect(() => {
      // parse default value
      if (defaultValue && defaultValue.length) {
        const fromValue = defaultValue[0]
          ? new Date(defaultValue[0])
          : undefined;
        const toValue = defaultValue[1] ? new Date(defaultValue[1]) : undefined;
        fromRef.current?.instance.option("value", fromValue);
        toRef.current?.instance.option("value", toValue);
      }
    }, [defaultValue]);
    const handleValueFromChanged = (e: any) => {
      const { value } = e;
      const toValue = toRef.current?.instance.option("value") as Date;
      onValueChanged({ value: [value, toValue] });
    };
    const [error, setError] = useState("");
    const handleValueToChanged = (e: any) => {
      const { value } = e;
      const fromValue = fromRef.current?.instance.option("value") as Date;
      onValueChanged({ value: [fromValue, value] });
    };
    const handleValidateFromDate = (data: any) => {
      const toValue = toRef.current?.instance.option("value") as Date;
      const { value } = data;
      if (toValue && isAfter(value, toValue)) {
        setError("DateFromIsInvalid");
        return false;
      } else {
        setError("");
        return true;
      }
    };
    const handleValidateToDate = (data: any) => {
      const { value } = data;
      const fromValue = fromRef.current?.instance.option("value") as Date;
      if (fromValue && isBefore(value, fromValue)) {
        setError("DateToIsInvalid");
        return false;
      } else {
        setError("");
        return true;
      }
    };
    return (
      <div className={`date-range-field ${className} ml-2`}>
        <div className={"flex items-center"}>
          <div className={""}>
            <DateBox
              width={widthTo}
              ref={fromRef}
              isValid={!error}
              openOnFieldClick={true}
              displayFormat={"yyyy-MM-dd"}
              showClearButton={allowEmpty}
              onValueChanged={handleValueFromChanged}
              validationMessageMode={"always"}
              readOnly={readOnly}
            >
              <Validator validationGroup={validationGroup}>
                <CustomRule validationCallback={handleValidateFromDate} />
              </Validator>
            </DateBox>
          </div>
          <div className={"mx-[2px]"}>-</div>
          <div className={""}>
            <DateBox
              ref={toRef}
              width={widthFrom}
              isValid={!error}
              openOnFieldClick={true}
              displayFormat={"yyyy-MM-dd"}
              showClearButton={allowEmpty}
              onValueChanged={handleValueToChanged}
              readOnly={readOnly}
            >
              <Validator validationGroup={validationGroup}>
                <CustomRule validationCallback={handleValidateToDate} />
              </Validator>
            </DateBox>
          </div>
        </div>
        {/*{!!error && (*/}
        {/*  <div className={"mt-1"}>*/}
        {/*    <span className={"text-red-600 text-xs"}>*/}
        {/*      {error}*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    );
  }
);
