import { useRef } from "react";

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { SearchMst_DeliveryFormParam } from "@/packages/types/master/Mst_DeliveryForm";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";

export const Mst_DeliveryFormPage = () => {
  const { t } = useI18n("Mst_DeliveryForm");
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  let gridRef: any = useRef(null);
  const searchCondition = useRef<Partial<SearchMst_DeliveryFormParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    DeliveryFormCode: "",
    DeliveryFormName: "",
    FlagActive: "",
  });
  //================================CallAPI================================================
  const fetchData = async () => {
    const response = await api.Mst_DeliveryForm_Search({
      DeliveryFormCode: searchCondition.current?.DeliveryFormCode ?? "",
      DeliveryFormName: searchCondition.current?.DeliveryFormName ?? "",
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
      dataField: "DeliveryFormCode",
      caption: t("DeliveryFormCode"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "DeliveryFormName",
      caption: t("DeliveryFormName"),
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
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m my-2">
              {t("Mst_DeliveryForm")}
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center"></PageHeaderLayout.Slot>
        </PageHeaderLayout>
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
          storeKey={"Mst_DeliveryForm"}
          onPageChanged={onPageChanged}
          editMode={false}
          hidenTick={true}
          customHeight={windowSize.height - 80}
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
