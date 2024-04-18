import { TreeList } from "devextreme-react";
import { Column } from "devextreme-react/tree-list";
import { forwardRef } from "react";

const TreeB = forwardRef(({ dataSource }, ref: any) => {
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
        mode: "standard",
      }}
    >
      <Column dataField="Title" caption="" />
      <Column dataField="Value_1" caption={"Tháng 1"} />
      <Column dataField="Value_2" caption={"Tháng 2"} />
      <Column dataField="Value_3" caption={"Tháng 3"} />
      <Column dataField="Value_4" caption={"Tháng 4"} />
      <Column dataField="Value_5" caption={"Tháng 5"} />
      <Column dataField="Value_6" caption={"Tháng 6"} />
      <Column dataField="Value_7" caption={"Tháng 7"} />
      <Column dataField="Value_8" caption={"Tháng 8"} />
      <Column dataField="Value_9" caption={"Tháng 9"} />
      <Column dataField="Value_10" caption={"Tháng 10"} />
      <Column dataField="Value_11" caption={"Tháng 11"} />
      <Column dataField="Value_12" caption={"Tháng 12"} />
    </TreeList>
  );
});

export default TreeB;
