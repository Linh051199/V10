import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { BaseGridView, ColumnOptions } from "@/packages/ui/base-gridview";
import { useSetAtom } from "jotai";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useConvertNumber } from "@/packages/common";
import { StatusButton } from "@/packages/ui/status-button";
export const Ser_MST_CustomerTypePageMST3 = () => {
  const { t } = useI18n("Mst_SalesManType");
  const config = useConfiguration();
  const { convertMoneyVND, convertPercent } = useConvertNumber();
  const api = useClientgateApi(); // lấy danh sách api
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ } = usePermissions();
  let gridRef: any = useRef(null);
  const searchCondition = useRef<any>({
    keyword: "",
  });

  const columns: ColumnOptions[] = [
    // {
    //   dataField: "Idx",
    //   caption: t("Idx"),
    //   visible: true,
    //   columnIndex: 1,
    //   // groupKey: "INFORMATION_SERMSTCUSTOMERTYPE",
    //   cellRender: (data: any) => {
    //     return (
    //       <p>
    //         {+(data.component.pageIndex() * data.component.pageSize()) +
    //           (data.rowIndex + 1)}
    //       </p>
    //     );
    //   },
    // },

    // {
    //   dataField: "CusTypeName",
    //   caption: t("CusTypeName"),
    //   editorType: "dxTextBox",
    //   visible: true,
    // },
    {
      dataField: "CusTypeID",
      caption: t("CusTypeID"),
      editorType: "dxTextBox",
      visible: true,
      alignment: "left",
    },
    // {
    //   dataField: "CusFactor",
    //   caption: t("CusFactor"),
    //   editorType: "dxNumberBox",
    //   editorOptions: {
    //     min: 0,
    //     format: ",##0.###",
    //     placeholder: t("Input"),
    //     validationMessageMode: "always",
    //   },
    //   columnIndex: 1,
    //   groupKey: "INFORMATION_SERMSTCUSTOMERTYPE",
    //   visible: true,
    //   cellRender: (e) => {
    //     return convertMoneyVND(e.value);
    //   },
    // },
    {
      dataField: "CusPersonType",
      caption: t("CusPersonType"),
      editorType: "dxSelectBox",
      cellRender: ({ data, rowIndex, value }: any) => {
        let name;
        switch (data.CusPersonType) {
          case "1":
            name = "Cá nhân";
            break;
          case "2":
            name = "Tổ chức";
            break;
          default:
            name = "Khác";
            break;
        }
        return <p>{name}</p>;
      },
    },
    {
      dataField: "IsActive",
      caption: t("IsActive"),
      editorType: "dxSelectBox",
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.IsActive === "1"} />;
      },
    },
  ];

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Ser_MST_CustomerType_SearchHQ({
          CusTypeID: searchCondition.current?.CusTypeID ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          CusTypeName: searchCondition.current?.CusTypeName ?? "",
          IsActive: searchCondition.current?.IsActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize:
            gridRef?.current?.getDxInstance().pageSize() ?? 999999999,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_MST_CustomerType_SearchDL({
          CusTypeID: searchCondition.current?.CusTypeID ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          CusTypeName: searchCondition.current?.CusTypeName ?? "",
          IsActive: searchCondition.current?.IsActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize:
            gridRef?.current?.getDxInstance().pageSize() ?? 999999999,
        });
        return response;
      });
    if (resp?.isSuccess) {
      return resp;
    } else {
      showError({
        message: t(resp!._strErrCode),
        _strErrCode: resp!._strErrCode,
        _strTId: resp!._strTId,
        _strAppTId: resp!._strAppTId,
        _objTTime: resp!._objTTime,
        _strType: resp!._strType,
        _dicDebug: resp!._dicDebug,
        _dicExcs: resp!._dicExcs,
      });
    }
  };

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData();
  };

  const onPageChanged = async (number: number) => {
    await onRefetchData(number ?? 0);
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              {t("Ser_MST_CustomerType")}
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            <div className="h-[50px]"></div>
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
          isHidenHeaderFilter={true}
          defaultPageSize={999999999}
          dataSource={[]} // cars
          columns={columns}
          fetchData={fetchData}
          keyExpr={"CusTypeID"}
          autoFetchData={true}
          allowSelection={false}
          isLoading={false}
          customToolbarItems={[]}
          storeKey={"ser-mst-customertype-management-columns"}
          onPageChanged={onPageChanged}
          editMode={false}
          isHiddenCheckBox={true}
          editingOptions={{
            mode: "row",
          }}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
