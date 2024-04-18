import {ValueChangedEvent} from "devextreme/ui/tag_box";
import dxForm from "devextreme/ui/form";
import {TagBox} from "devextreme-react";
import "src/packages/components/tag-field/tag-field.scss"

interface TagFieldProps {
  formInstance: dxForm
  dataField: string
  items: any[]
  defaultValue?: any
  valueExpr?: string;
  displayExpr?: string;
  width?: number
  onValueChanged?: (e: ValueChangedEvent) => void;
}

export const TagField = (
  {
    items,
    defaultValue,
    valueExpr="value",
    displayExpr="text",
    width=280,
    onValueChanged,
    formInstance,
    dataField
  }: TagFieldProps) => {
  const formData = formInstance?.option("formData");
  const value = formData?.[dataField];
  return (
    <div className={"select-field flex items-center"}>
      <TagBox
        className={"ml-2"}
        width={width}
        height={'auto'}
        searchEnabled={true}
        dataSource={items}
        displayExpr={displayExpr}
        valueExpr={valueExpr}
        defaultValue={defaultValue || value}
        showClearButton
        showSelectionControls={true}
        selectAllMode={'allPages'}
        onValueChanged={onValueChanged}
      />
    </div>
  )
}
