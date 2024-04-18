import { useI18n } from "@/i18n/useI18n";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { ColumnOptions } from "@/types";
import { DataGrid } from "devextreme-react";
import {
  Column,
  ColumnFixing,
  HeaderFilter,
  Item,
  Paging,
  Scrolling,
  Search,
  Sorting,
  Summary,
  Toolbar,
  TotalItem,
} from "devextreme-react/data-grid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

interface IDataGrid {
  data: any;
  isLoading: any;
}

export const Data_Grid = ({ data, isLoading }: IDataGrid) => {
  const { t } = useI18n("Rpt_SMCertificate");
  const windowSize: any = useWindowSize();


  const columns: ColumnOptions[] = useMemo(() => {
    return [
        {
          caption: t("STT"),
          dataField: "STT",
          cellRender: ({ rowIndex }) => {
            return <span>{rowIndex + 1}</span>;
          },
          visible: true,
          alignment: "center",
          allowSorting: false,
          allowFiltering: false,
        },
        {
          dataField: "MODELCODE",
          caption: t("MODELCODE"),
          visible: true,
        },
        {
          dataField: "MCSSPECDESCRIPTION",
          caption: t("MCSSPECDESCRIPTION"),
          visible: true,
        },
        {
          dataField: "VIN",
          caption: t("VIN"),
          visible: true,
        },
        {
          dataField: "ENGINENO",
          caption: t("ENGINENO"),
          visible: true,
        },
        {
          dataField: "STATUSMORTAGEEND",
          caption: t("STATUSMORTAGEEND"),
          visible: true,
        },
        {
          dataField: "DRFULLDOCDATE",
          caption: t("DRFULLDOCDATE"),
          visible: true,
        },
        {
          dataField: "DREXPECTEDDATE",
          caption: t("DREXPECTEDDATE"),
          visible: true,
        },
        {
          dataField: "CDRDDRDTLSTATUS",
          caption: t("CDRDDRDTLSTATUS"),
          visible: true,
        },
        {
          dataField: "CDRLCREATEDDATE",
          caption: t("CDRLCREATEDDATE"),
          visible: true,
        },
        {
          dataField: "PGDGUARANTEENO",
          caption: t("PGDGUARANTEENO"),
          visible: true,
        },
        {
          dataField: "MBBANKNAME",
          caption: t("MBBANKNAME"),
          visible: true,
        },
        {
          dataField: "PGDDATESTART",
          caption: t("PGDDATESTART"),
          visible: true,
        },
        {
          dataField: "MORTAGEENDDATE",
          caption: t("MORTAGEENDDATE"),
          visible: true,
        },
        {
          dataField: "BILLNO",
          caption: t("BILLNO"),
          visible: true,
        },
      ];
  }, [isLoading]);

  // =================================================================
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_ReportCarDocReq-columns",
  });

  const [visible, setVisible] = useState(false);

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );
  // I want to restore columns from localStorage if it exists
  useEffect(() => {
    const savedState = loadState() === undefined ? columns : loadState();
    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        return {
          ...column,
          visible: filterResult ? filterResult.visible ?? true : false,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
  }, []);

  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback(
    (changes: any) => {
      const latest = [...changes];
      realColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      setColumnsState(latest);
      setVisible(false);
    },
    [setColumnsState, setVisible]
  );
  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => setVisible(!visible),
      },
    });
  }, []);
  return (
    <DataGrid
      id="gridContainer"
      dataSource={data ?? []}
      showBorders={true}
      showRowLines={true}
      showColumnLines={true}
      // columns={realColumns}
      columnAutoWidth={true}
      allowColumnResizing={true}
      columnResizingMode="widget"
      onToolbarPreparing={onToolbarPreparing}
      allowColumnReordering={false}
      className={"mx-auto"}
      width={"100%"}
      height={windowSize.height - 110} // fix toggle column height
      >
      <ColumnFixing enabled={true} />
      <Sorting mode="multiple" />
      <HeaderFilter visible={true}>
        <Search enabled={true} />
      </HeaderFilter>
      <Paging enabled={true}  />
      <Scrolling showScrollbar={"always"} />
      {realColumns.map((col: any) => (
        <Column key={col.dataField} {...col} />
      ))}
      <Toolbar>
        <Item>
          <CustomColumnChooser
            title={t("ToggleColumn")}
            applyText={t("Apply")}
            cancelText={t("Cancel")}
            selectAllText={t("SelectAll")}
            container={"#Rpt_ReportCarDocReq"}
            button={"#myColumnChooser"}
            visible={visible}
            columns={columns}
            actualColumns={realColumns}
            onHiding={onHiding}
            onApply={onApply}
          />
        </Item>
      </Toolbar>
    </DataGrid>
  );
};
