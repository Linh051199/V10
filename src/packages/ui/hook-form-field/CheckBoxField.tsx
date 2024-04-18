import { CheckBox } from "devextreme-react";
interface CheckBoxFieldProps {
  field: any;
  label: string;
  readonly?: boolean;
  className?: string;
}
export const CheckBoxField = ({
  label,
  field,
  readonly,
  className,
}: CheckBoxFieldProps) => {
  const { onChange, ref, ...rest } = field;

  return (
    <div className={"my-2 flex items-center"}>
      <CheckBox
        {...rest}
        value={rest.value == "1"}
        className={className}
        readOnly={readonly}
        onValueChanged={async (e: any) => {
          await onChange({
            target: {
              name: rest.name,
              value: e.value,
            },
          });
        }}
      />
      <label className={"ml-2"}>{label}</label>
    </div>
  );
};
