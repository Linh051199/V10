import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { SearchMst_OrderComplainTypeParam } from "@/packages/types/master/Mst_OrderComplainType";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useRef } from "react";
import { HeaderPart } from "./components/header-part";

export const Mst_OrderComplainTypePage = () => {
  const { t } = useI18n("Mst_OrderComplainType");
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  let gridRef: any = useRef(null);
  const searchCondition = useRef<Partial<SearchMst_OrderComplainTypeParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    OrderComplainTypeCode: "",
    OrderComplainTypeName: "",
    FlagActive: "",
  });
  //================================CallAPI================================================
  const fetchData = async () => {
    const response = await api.Mst_OrderComplainType_Search({
      OrderComplainTypeCode:
        searchCondition.current?.OrderComplainTypeCode ?? "",
      OrderComplainTypeName:
        searchCondition.current?.OrderComplainTypeName ?? "",
      FlagActive: searchCondition.current?.FlagActive ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    return response;
  };
  //================================CallAPI-end================================================

  //================================Handle================================================
  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData();
  };

  const onPageChanged = async (number: number) => {
    await onRefetchData(number ?? 0);
  };

  const handleSelectionChanged = (rowKeys: string[]) => {};

  //================================Handle-end================================================

  //================================Columns================================================
  const columns: ColumnOptions[] = [
    {
      dataField: "OrderComplainType",
      caption: t("OrderComplainType"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
      // width: 500,
      width: "33%",
    },
    {
      dataField: "OrderComplainTypeName",
      caption: t("OrderComplainTypeName"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
      // width: 500,
      width: "33%",
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      allowFiltering: false,
      editorType: "dxSwitch",
      dataType: "string",
      visible: true,
      alignment: "center",
      width: "33%",
      // width: 500,

      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];
  //================================Columns-end================================================

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <HeaderPart
          searchCondition={searchCondition}
          gridRef={gridRef}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
          dataSource={[]}
          columns={columns}
          fetchData={fetchData}
          onSelectionChanged={handleSelectionChanged}
          keyExpr={["CostType"]}
          autoFetchData={true}
          allowSelection={false}
          isLoading={false}
          customToolbarItems={[]}
          storeKey={"Mst_OrderComplainType"}
          onPageChanged={onPageChanged}
          editMode={false}
          hidenTick={true}
          isHidenHeaderFilter={true}
          isHiddenCheckBox={true}
          editingOptions={{
            mode: "row",
            allowDeleting: false,
          }}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
