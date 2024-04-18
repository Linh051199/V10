import { useI18n } from "@/i18n/useI18n";
import { DateBox } from "devextreme-react";

interface DateBoxFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  displayFormat: string;
  direction?: string;
  showClearButton?: boolean;
  type?: "date" | "datetime" | "time";
  readOnly?: boolean;
  pickerType?: "calendar" | "list" | "native" | "rollers";
}

export const DateBoxField = ({
  field,
  label,
  required = false,
  error,
  disabled = false,
  displayFormat,
  direction,
  showClearButton = false,
  type = "datetime",
  pickerType = "calendar",
  readOnly = false,
}: DateBoxFieldProps) => {
  const { t } = useI18n("Placeholder");

  const { onChange, ref, ...rest } = field;

  return (
    <div
      className={`hook-form-datebox relative flex ${
        direction == "vertical" ? "flex-col" : "items-center my-[6px] "
      }  ${required ? "required" : ""} ${!!error ? "mb-2" : ""}`}
    >
      {label && (
        <label
          className={`${
            direction == "vertical"
              ? "w-full"
              : "w-[160px] min-w-[160px] pr-[10px]"
          } break-all`}
        >
          {label}
          {required && <span className="ml-[0.5px] text-red-500">*</span>}
        </label>
      )}
      <DateBox
        {...rest}
        className="w-full"
        defaultValue={rest.value}
        type={type}
        onValueChanged={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e.value,
            },
          });
        }}
        isValid={!error}
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        displayFormat={displayFormat}
        // placeholder={t("Choose Time")}
        placeholder={
          type == "date"
            ? "yyyy-MM-dd"
            : type == "datetime"
            ? "yyyy-MM-dd HH:mm:ss"
            : "HH:mm:ss"
        }
        openOnFieldClick
        pickerType={pickerType}
        showClearButton={showClearButton}
        readOnly={disabled}
        useMaskBehavior={true}
      />
    </div>
  );
};
