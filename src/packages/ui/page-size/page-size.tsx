import { SelectBox } from "devextreme-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useSSR } from "react-i18next";

interface Props {
  title: string;
  onChangePageSize: (pageSize: number) => void;
  defaultPageSize?: number;
  showAllOption?: boolean;
  showAllOptionText?: string;
  allowdPageSizes: number[];
}
export const PageSize = forwardRef(({
  title,
  allowdPageSizes,
  showAllOption,
  showAllOptionText = "Show All",
  onChangePageSize,
  defaultPageSize,
}: Props, ref: any) => {
  let options = allowdPageSizes.map((item) => ({
    value: item,
    text: item + "",
  }));
  if (showAllOption) {
    options.push({ value: 9999999, text: showAllOptionText });
  }

  const [value, setValue] = useState(defaultPageSize ?? allowdPageSizes[0]);

  useImperativeHandle(ref, () => ({
    setPageSize(val: any) {
      
      setValue(val);
    }
  }));
  return (
    <div className={"min-w-fit flex items-center PageSize"}>
      <label className={"mr-2"}>{title}</label>
      <SelectBox
        items={options}
        displayExpr={"text"}
        valueExpr={"value"}
        className={"flex w-[80px] mx-1"}
        placeholder={""}
        // defaultValue={value}
        value={value}
        onValueChanged={(e) => {
          onChangePageSize?.(e.value);
          setValue(e.value);
        }}
      />
    </div>
  );
});
