import { useRef } from "react";
import { match } from "ts-pattern";

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { usePermissions } from "@/packages/contexts/permission";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout"; 
import { SearchMst_DeliveryLocationParam } from "@/packages/types/master/Mst_DeliveryLocation";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";

export const Mst_DeliveryLocationPage = () => {
  const { t } = useI18n("Mst_DeliveryLocation");
  const { isHQ } = usePermissions();
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  let gridRef: any = useRef(null);
  const searchCondition = useRef<Partial<SearchMst_DeliveryLocationParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    DeliveryLocationCode: "",
    DealerCode: "",
    DeliveryLocationName: "",
    FlagActive: "",
  });
  //================================CallAPI================================================
  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Mst_DeliveryLocation_SearchHQ({
          DeliveryLocationCode:
            searchCondition.current?.DeliveryLocationCode ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          DeliveryLocationName:
            searchCondition.current?.DeliveryLocationName ?? "",
          FlagActive: searchCondition.current?.FlagActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Mst_DeliveryLocation_SearchDL({
          DeliveryLocationCode:
            searchCondition.current?.DeliveryLocationCode ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          DeliveryLocationName:
            searchCondition.current?.DeliveryLocationName ?? "",
          FlagActive: searchCondition.current?.FlagActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      return resp;
    }
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
      dataField: "DeliveryLocationCode",
      caption: t("DeliveryLocationCode"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "DeliveryLocationName",
      caption: t("DeliveryLocationName"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "DealerName",
      caption: t("DealerName"),
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
            <div className="font-bold dx-font-m">
              {t("Mst_DeliveryLocation")}
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
          storeKey={"Mst_DeliveryLocation"}
          customHeight={windowSize.height - 90}
          onPageChanged={onPageChanged}
          editMode={false}
          hidenTick={true}
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
