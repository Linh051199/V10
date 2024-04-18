import { useI18n } from "@/i18n/useI18n";
import TextBox from "devextreme-react/text-box";
import "./TextBox.scss";

interface TextBoxFieldProps {
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

export const TextBoxField = ({
  field,
  label,
  required = false,
  error,
  disabled,
  direction,
  props,
  showPlaceholder = true,
  cssClass,
}: TextBoxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  const { t } = useI18n("Placeholder");

  return (
    <div
      className={`hook-form-textbox flex ${cssClass} ${
        direction == "vertical" ? "flex-col" : "items-center my-[6px] "
      }  ${required ? "required" : ""} ${!!error ? "mb-4" : ""}`}
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

      <TextBox
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
        {...props}
      />
    </div>
  );
};
