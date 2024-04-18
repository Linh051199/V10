import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { SearchMst_OrderComplainImageTypeParam } from "@/packages/types/master/Mst_OrderComplainImageType";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useRef } from "react";
import { HeaderPart } from "./components/header-part";

export const Mst_OrderComplainImageTypePage = () => {
  const { t } = useI18n("Mst_OrderComplainImageType");
  const api = useClientgateApi();

  let gridRef: any = useRef(null);
  const searchCondition = useRef<
    Partial<SearchMst_OrderComplainImageTypeParam>
  >({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    TSTPartCode: "",
  });
  //================================CallAPI================================================
  const fetchData = async () => {
    const response = await api.Mst_OrderComplainImageType_Search({
      TSTPartCode: searchCondition.current?.TSTPartCode ?? "",

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
      dataField: "OrderComplainImageType",
      caption: t("OrderComplainImageType"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "OrderComplainImageName",
      caption: t("OrderComplainImageName"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      allowFiltering: false,
      editorType: "dxSwitch",
      dataType: "string",
      visible: true,
      alignment: "center",
      width: 135,
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
          storeKey={"Mst_OrderComplainImageType"}
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
