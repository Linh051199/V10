import { useI18n } from "@/i18n/useI18n";
import { TextArea } from "devextreme-react";

interface TextAreaFieldProps {
  field: any;
  label?: string;
  error?: any;
  required?: boolean;
  disabled?: boolean;
  direction?: string;
  props?: any;
  showPlaceholder?: boolean;
  cssClass?: string;
}

export const TextAreaField = ({
  field,
  label,
  required = false,
  error,
  disabled,
  direction,
  props,
  showPlaceholder = true,
  cssClass,
}: TextAreaFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const { t } = useI18n("Placeholder");

  return (
    <div
      className={`hook-form-textarea flex ${cssClass} ${
        direction == "vertical" ? "flex-col" : "items-center my-[6px]"
      }  ${required ? "required" : ""} ${!!error ? "mb-4" : ""}`}
    >
      {label && (
        <label
          className={`${
            direction == "vertical"
              ? "w-full"
              : "w-[160px] min-w-[160px] pr-[10px]"
          } break-all flex self-start`}
        >
          <div className="h-[30px] w-full flex items-center break-all">
            {label}
            {required && <span className="ml-[0.5px] text-red-500">*</span>}
          </div>
        </label>
      )}
      <TextArea
        {...props}
        readOnly={disabled ? true : false}
        {...rest}
        className={"w-full"}
        defaultValue={rest.value}
        isValid={!error}
        validationError={error}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        placeholder={showPlaceholder ? t("Input") : ""}
        onValueChanged={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e.value,
            },
          });
        }}
      />
    </div>
  );
};
