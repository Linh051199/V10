import "./tree-gridview.scss";

import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import Popup, { ToolbarItem } from "devextreme-react/popup";

import { SelectField } from "@/packages/components/select-field";
import { useEffect, useState } from "react";
import { ColumnOptions } from ".";

export const GridViewMultiEditPopup = ({
  columns,
  onClose,
  onSubmit,
}: {
  columns: ColumnOptions[];
  onClose: any;
  onSubmit: any;
}) => {
  const [colList, setColist] = useState<ColumnOptions[]>([]);
  const [currentCol, setCurrentCol] = useState<ColumnOptions | null>(null);

  //const [visible, show] = useState(false);
  const [formData, setFormData] = useState({ ColName: "", Value: "" });

  useEffect(() => {
    let list = columns.filter((c) => c.multiRowEditorOptions);

    setColist(list);
  }, []);

  // useImperativeHandle(ref, () => ({
  //   showPopup(s: boolean) {
  //     show(s);

  //   },

  // }));

  return (
    <Popup
      visible={true}
      width={450}
      height={400}
      showTitle={true}
      title="Edit multi rows"
    >
      <Form
        formData={formData}
        colCount={3}
        labelLocation={"left"}
        validationGroup={"main"}
      >
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: "Column",
            }}
            dataField={"ColName"}
            isRequired={true}
            validationRules={[
              {
                type: "required",
              },
            ]}
            editorOptions={{
              validationMessageMode: "always",
            }}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <SelectField
                  dataField={dataField}
                  defaultValue={formData?.[dataField]}
                  formInstance={formInstance}
                  items={colList}
                  displayExpr={"caption"}
                  valueExpr={"dataField"}
                  onValueChanged={(e: any) => {
                    let cols = colList.filter((c) => c.dataField == e.value);

                    if (cols && cols.length > 0) setCurrentCol(cols[0]);
                    else setCurrentCol(null);
                    formInstance.updateData(dataField, e.value);
                    formInstance.updateData("Value", null);
                  }}
                />
              );
            }}
          ></SimpleItem>
          {currentCol != null && (
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: "ValueField",
                }}
                dataField={"Value"}
                {...currentCol.multiRowEditorOptions}
              ></SimpleItem>
            </GroupItem>
          )}
        </GroupItem>
      </Form>

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          type: "default",
          text: "Submit",

          onClick: () => {
            onSubmit(formData);
          },
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          text: "Cancel",
          onClick: onClose,
        }}
      />
    </Popup>
  );
};
