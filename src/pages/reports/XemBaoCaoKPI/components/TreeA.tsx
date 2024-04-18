import { TreeList } from "devextreme-react";
import { Column } from "devextreme-react/tree-list";
import { forwardRef } from "react";

const TreeA = forwardRef(({ dataSource, dealerCode }, ref: any) => {
  return (
    <TreeList
      ref={ref}
      id="ID"
      dataSource={dataSource}
      rootValue={-1}
      // defaultExpandedRowKeys={expandedRowKeys}
      autoExpandAll
      showRowLines={true}
      showBorders={true}
      columnAutoWidth={true}
      keyExpr="ID"
      parentIdExpr="Head_ID"
      scrolling={{
        preloadEnabled: true,
        useNative: "auto",
        mode: "standard",
      }}
    >
      <Column dataField="Title" caption="" />
      <Column dataField="Value" caption={dealerCode} />
    </TreeList>
  );
});

export default TreeA;
