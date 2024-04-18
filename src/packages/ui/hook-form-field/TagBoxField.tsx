import { useI18n } from "@/i18n/useI18n";
import { TagBox } from "devextreme-react";
import "./TagBox.scss";
interface SelectboxFieldProps {
  field: any;
  label: string;
  dataSource: any;
  valueExpr: string;
  displayExpr: string;
  required?: boolean;
  error?: any;
  defaultValue?: string;
  onValueChanged?: (dataType: string) => void;
  disabled?: boolean;
  showClearButton?: boolean;
  direction?: string;
  props?: any;
  showPlaceholder?: boolean;
  value: any;
}
export const TagBoxField = ({
  field,
  error,
  label,
  dataSource,
  valueExpr = "value",
  displayExpr = "text",
  required = false,
  defaultValue,
  onValueChanged,
  disabled,
  showClearButton,
  direction,
  props,
  showPlaceholder = true,
  value,
}: SelectboxFieldProps) => {
  const { onChange, ref, ...rest } = field;
  const { t } = useI18n("Placeholder");

  return (
    <div
      className={`flex ${
        direction == "vertical" ? "flex-col" : "items-center my-[6px] "
      }  ${required ? "required" : ""} ${!!error ? "mb-4" : ""}`}
    >
      <label
        htmlFor={rest.name}
        className={`${
          direction == "vertical"
            ? "w-full"
            : "w-[160px] min-w-[160px] pr-[10px]"
        } break-all`}
      >
        {label}
      </label>
      <TagBox
        // {...rest}
        {...props}
        defaultValue={rest.value}
        value={value}
        name={rest.name}
        readOnly={disabled}
        // deferRendering={true}
        id={rest.name}
        className={"w-full"}
        dataSource={dataSource}
        valueExpr={valueExpr}
        displayExpr={displayExpr}
        isValid={!error}
        validationError={error}
        onValueChanged={async (e: any) => {
          if (e.value == e.previousValue) {
            return;
          } else {
            await onChange({
              target: {
                name: rest.name,
                value: e.value,
              },
            });
          }

          // onValueChanged?.(e.value);
          // setValue(rest.name, e.value);
        }}
        validationMessagePosition={"bottom"}
        validationMessageMode={"always"}
        searchEnabled
        searchExpr={displayExpr}
        showClearButton={showClearButton}
        placeholder={showPlaceholder ? t("Input") : ""}
      ></TagBox>
    </div>
  );
};
