import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import DataGrid, {
  FilterRow,
  Paging,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import DropDownBox from "devextreme-react/drop-down-box";
import dxForm from "devextreme/ui/form";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import { useSetAtom } from "jotai";
import { useState } from "react";
import "whatwg-fetch";
import "./SelectDrop.scss";

// const gridColumns = ["DriverFullName", "DriverLicenseNo", "DriverPhoneNo"];

interface SelectGrid {
  data: any;
  formInstance: dxForm;
  valueExpr: string;
  dataField: string;
  gridColumns: string[];
  width?: any;
  showClearButton?: boolean;
  onValueChanged?: (e: ValueChangedEvent) => void;
}

export const SelectGrid = ({
  data,
  valueExpr,
  formInstance,
  dataField,
  onValueChanged,
  gridColumns,
  showClearButton = true,
  width = 270,
}: SelectGrid) => {
  const [gridBoxValue, setGridBoxValue] = useState([""]);
  const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const { t } = useI18n("SelectDrop");

  // const { data: DriverNameList, isLoading: isGettingDriverNameList } = useQuery(
  //   {
  //     queryKey: [
  //       QueryNames.DELIVERY_ORDER,
  //       QueryNames.GET_DELIVERY_ORDER,
  //       "listTesstt",
  //     ],
  //     queryFn: async () => {
  //       const respone = await api.Mst_TransporterDriver_GetByTransporterCode(
  //         "VJS"
  //       );
  //       if (respone.isSuccess) {
  //         return respone.DataList;
  //       }
  //       showError({
  //         message: t(respone._strErrCode),
  //         _strErrCode: respone._strErrCode,
  //         _strTId: respone._strTId,
  //         _strAppTId: respone._strAppTId,
  //         _objTTime: respone._objTTime,
  //         _strType: respone._strType,
  //         _dicDebug: respone._dicDebug,
  //         _dicExcs: respone._dicExcs,
  //       });
  //       return null;
  //     },
  //   }
  // );

  const handleValueChanged = (e: ValueChangedEvent) => {
    if (onValueChanged) {
      onValueChanged(e);
    } else {
      formInstance.updateData(dataField, e.value);
    }
  };

  const syncDataGridSelection = (e: any) => {
    if (!e.value) {
      setGridBoxValue([e.value]);
    }
  };

  function dataGridOnSelectionChanged(e: any) {
    if (e.selectedRowKeys.length) {
      setGridBoxValue([e.selectedRowKeys[0][valueExpr]]);
      setIsGridBoxOpened(false);
    }
  }

  const gridBoxDisplayExpr = (item: any) => {
    return item && gridColumns.map((column) => item[column]).join(" - ");
  };

  const dataGridRender = () => {
    return (
      <DataGrid
        dataSource={data}
        columns={gridColumns}
        hoverStateEnabled={true}
        selectedRowKeys={gridBoxValue}
        onSelectionChanged={dataGridOnSelectionChanged}
        height="100%"
        width="100%"
        className="select-drop-grid__popup"
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />
        <Paging enabled={true} pageSize={10} />
        <FilterRow visible={true} />
      </DataGrid>
    );
  };

  function onGridBoxOpened(e: any) {
    if (e.name === "opened") {
      setIsGridBoxOpened(e.value);
    }
  }

  return (
    <div className="select-drop-datagrid">
      <div className="dx-fieldset">
        <div className="dx-field">
          <DropDownBox
            value={gridBoxValue}
            opened={isGridBoxOpened}
            valueExpr={valueExpr}
            deferRendering={false}
            displayExpr={gridBoxDisplayExpr}
            placeholder={t("Input")}
            showClearButton={showClearButton}
            dataSource={data}
            onValueChanged={handleValueChanged}
            onOptionChanged={onGridBoxOpened}
            contentRender={dataGridRender}
            width={width}
            className="select-drop-grid"
          />
        </div>
      </div>
    </div>
  );
};
