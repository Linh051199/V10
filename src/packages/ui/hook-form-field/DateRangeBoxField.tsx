import { useI18n } from "@/i18n/useI18n";
import { DateRangeBox } from "devextreme-react";
import { Properties } from "devextreme/ui/date_range_box";

interface DateRangeBoxFieldProps extends Properties {
  field: any;
  label: string;
  error?: any;
  required?: boolean;
  direction?: string;
  showClearButton?: boolean;
  type?: "date" | "datetime" | "time";
  disabled?: boolean;
  pickerType?: "calendar" | "list" | "native" | "rollers";
  multiView?: boolean;
}

export const DateRangeBoxField = ({
  field,
  label,
  required = false,
  error,
  direction,
  showClearButton = false,
  type = "datetime",
  pickerType = "calendar",
  disabled = false,
  multiView = false,
  labelMode = "hidden",
}: DateRangeBoxFieldProps) => {
  const { t } = useI18n("Placeholder");

  const { onChange, ref, ...rest } = field;

  return (
    <div
      className={`relative flex ${
        direction == "vertical" ? "flex-col" : "items-center my-[6px] "
      }  ${required ? "required" : ""} ${!!error ? "mb-2" : ""}`}
    >
      <label
        className={
          direction == "vertical"
            ? "w-full"
            : "w-[160px] min-w-[160px] pr-[10px]"
        }
      >
        {label}
        {required && <span className="ml-[0.5px] text-red-500">*</span>}
      </label>
      <DateRangeBox
        {...rest}
        // className="w-full"
        // defaultValue={rest.value}
        onValueChanged={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e.value,
            },
          });
        }}
        value={!rest.value ? [undefined, undefined] : rest.value}
        isValid={!error}
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        // displayFormat={displayFormat}
        // openOnFieldClick
        showClearButton={showClearButton}
        readOnly={disabled}
        multiView={multiView}
        labelMode={labelMode}
      />
    </div>
  );
};
