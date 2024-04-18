import { GridCustomToolBarItem } from "@/packages/ui/gridview-one/grid-custom-toolbar";
import { Button, Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import React, { useRef, useState } from "react";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { toast } from "react-toastify";
import { useClientgateApi } from "@/packages/api";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { quantity } from "../../../store";
import QuantityComponent from "./quantity";
import SelectToolbar from "./Select";
type Props = {
  handleSelectChange: any;
};

const customToolbarSecond = ({ handleSelectChange }: Props) => {
  const forCustomerRef: any = useRef();
  const formData = {};
  const [change, setChange] = useState(true);

  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();

  const ToolBarList: GridCustomToolBarItem[] = [
    {
      text: "",
      onClick: (ref: any) => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => {
        // <Form labelMode="hidden" ref={forCustomerRef} formData={formData}>
        //     <SimpleItem
        //       dataField="SearchPrdCodeOrPrdName"
        //       editorType="dxSelectBox"
        //       visible={change}
        //       editorOptions={{
        //         dataSource: [],
        //         onValueChanged: handleSelectChange,
        //         // width: 250,
        //         displayExpr: "TenHangHoa",
        //         valueExpr: "MaHangHoa",
        //         searchEnabled: true,
        //         placeholder: "Nhập tên hàng hoặc mã hàng để tìm kiếm",
        //       }}
        //     />
        //     <SimpleItem
        //       visible={!change}
        //       dataField="quetmavach"
        //       editorOptions={{
        //         width: 250,
        //         placeholder: "Quét mã vạch",
        //       }}
        //     />
        //   </Form>
        return (
          <SelectToolbar
            change={change}
            formData={formData}
            handleSelectChange={handleSelectChange}
            ref={forCustomerRef}
          />
        );
      },
    },
    {
      text: "Quét mã vạch",
      onClick: (ref: any) => {
        console.log("Quét mã vạch");
        setChange((prev) => !prev);
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];

  return ToolBarList;
};

export default customToolbarSecond;
