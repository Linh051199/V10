import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { FormOptions } from "@/types";
import { zip } from "@packages/common";
import { useColumnsDetail } from "./use-columns-detail";
import { useRef } from "react";
import { DataGrid } from "devextreme-react";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: UseFormSettingsProps) => {
  const { t } = useI18n("BOM");

  const columnsDetail = useColumnsDetail({});
  let gridRef: any = useRef<DataGrid | null>(null);
  const newColumns = [
    ...inputColumns,
    {
      dataField: "GridView",
      caption: t("GridView"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: ({ data }: any) => {
        return <>
          <GridViewOne
            ref={gridRef}
            dataSource={[]} // cars
            columns={columnsDetail}
            // fetchData={fetchData}
            // onSelectionChanged={handleSelectionChanged}
            autoFetchData={false}
            allowSelection={false}
            isLoading={false}
            customToolbarItems={[]}
            editMode={true}
            editingOptions={{
              mode: "popup",
              // form: formSettings,
              // popup: popupSettings,
            }}
            // onPageChanged={(number) => onRefetchData(number ?? 0)}
            // onSaving={handleSavingRow}
            // onEditorPreparing={handleEditorPreparing}
            // onRowDeleteBtnClick={handleDelete}
            // onDeleteMultiBtnClick={handleDeleteMulti}
            keyExpr={"MaVatTu"}
            storeKey={"BOM-detail"}
          />
        </>
      },
    },
  ]
  const columns = newColumns.map((c) => {
    return {
      ...c,
      visible: true,
    };
  });

  const basicInformationFirstColumn = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 1
  );
  const basicInformationSecondColumn = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 2
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "top",
    items: [
      {
        itemType: "group",
        caption: t("BASIC_INFORMATION"),
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(basicInformationFirstColumn, basicInformationSecondColumn),
      },
    ],
  };
  return formSettings;
};
