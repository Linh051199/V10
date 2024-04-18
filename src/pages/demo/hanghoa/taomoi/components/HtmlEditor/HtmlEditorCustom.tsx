import { HtmlEditor } from "devextreme-react";
import { Item, Toolbar } from "devextreme-react/html-editor";
import { forwardRef } from "react";

const HtmlEditorCustom = forwardRef(({ backupRefTab }: any, ref: any) => {
  return (
    <HtmlEditor
      ref={ref}
      height={600}
      onValueChanged={(e: any) => {
        backupRefTab.current = e.value;
      }}
    >
      <Toolbar multiline={true}>
        <Item name="alignLeft" />
        <Item name="alignCenter" />
        <Item name="alignRight" />
        <Item name="alignJustify" />
        <Item name="separator" />
        <Item name="orderedList" />
        <Item name="bulletList" />
        <Item name="separator" />
        <Item name="header" acceptedValues={[false, 1, 2, 3, 4, 5]} />
        <Item name="separator" />
        <Item name="color" />
        <Item name="background" />
        <Item name="separator" />
        <Item name="link" />
        <Item name="image" />
        <Item name="separator" />
        <Item name="clear" />
        <Item name="codeBlock" />
        <Item name="blockquote" />
        <Item name="separator" />
        <Item name="insertTable" />
        <Item name="deleteTable" />
        <Item name="insertRowAbove" />
        <Item name="insertRowBelow" />
        <Item name="deleteRow" />
        <Item name="insertColumnLeft" />
        <Item name="insertColumnRight" />
        <Item name="deleteColumn" />
      </Toolbar>
    </HtmlEditor>
  );
});

export default HtmlEditorCustom;
