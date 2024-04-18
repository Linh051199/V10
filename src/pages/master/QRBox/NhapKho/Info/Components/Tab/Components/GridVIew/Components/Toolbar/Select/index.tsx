import { Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { useAtomValue } from "jotai";
import React, { forwardRef } from "react";
import { dataSourceAtom } from "../../../../store";

const SelectToolbar = forwardRef(
  ({ formData, change, handleSelectChange }: any, ref: any) => {
    const dataSource = useAtomValue(dataSourceAtom);

    return (
      <Form labelMode="hidden" ref={ref} formData={formData}>
        <SimpleItem
          dataField="SearchPrdCodeOrPrdName"
          editorType="dxSelectBox"
          visible={change}
          editorOptions={{
            dataSource: dataSource,
            onValueChanged: handleSelectChange,
            // width: 250,
            displayExpr: "TenHangHoaTV",
            valueExpr: "MaHangHoa",
            searchEnabled: true,
            placeholder: "Nhập tên hàng hoặc mã hàng để tìm kiếm",
          }}
        />
        <SimpleItem
          visible={!change}
          dataField="quetmavach"
          editorOptions={{
            width: 250,
            placeholder: "Quét mã vạch",
          }}
        />
      </Form>
    );
  }
);

export default SelectToolbar;
