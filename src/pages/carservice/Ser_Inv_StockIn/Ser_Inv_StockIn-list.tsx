import { useI18n } from "@/i18n/useI18n";
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { Button, List, LoadPanel, ScrollView } from "devextreme-react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import SearchForm from "./search-form/search-form";
import { atom, useSetAtom } from "jotai";
import { P, match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@/packages/api";
import { Alignment } from "@/types";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import usePrint from "@/components/print/usePrint";
import { Link } from "@/packages/components/link/link";
import { nanoid } from "nanoid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { getHours, getMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Ser_Inv_StockIn_Search } from "@/packages/types/carservice/Ser_Inv_StockIn";

export const flagStoTranspReq = atom<boolean>(false);

const DUMMY_DATA: any = {
  DataList: [
    {
      StockInNo: "Test1",
      SupplierName: "Test1",
      StockInDate: "Test1",
      SoDonHang: "Test1",
      StatusText: "Test1",
      Description: "Test1",
    },
    {
      StockInNo: "Test2",
      SupplierName: "Test2",
      StockInDate: "Test2",
      SoDonHang: "Test2",
      StatusText: "Test2",
      Description: "Test2",
    },
    {
      StockInNo: "Test3",
      SupplierName: "Test3",
      StockInDate: "Test3",
      SoDonHang: "Test3",
      StatusText: "Test3",
      Description: "Test3",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};
const SerInvStockInPage = () => {
  const { t } = useI18n("Ser_Inv_StockIn");
  const windowSize = useWindowSize();
  const permission = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<Ser_Inv_StockIn_Search>>({
    DealerCode: permission.DealerCode,
    StockInNo: "",
    SupplierID: "",
    TruckNo: "",
    StockDateFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
    OrderNo: "",
    IsPending: false,
    IsExecuting: false,
    IsFinished: false,
    IsAdjustment: false,
    IsReject: false,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    navigate(`/storage/SerInvStockIn/manageSerInvStockIn/update/${code}?`);
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<Ser_Inv_StockIn_Search>
  >("Search-Ser_Inv_StockIn", {});

  const handleSearch = (condition: Partial<Ser_Inv_StockIn_Search>) => {
    // onSaveState(condition);
    searchCondition.current = {
      ...searchCondition.current,
      ...condition,
    };
    gridRef?.current?.refetchData();
  };

  // load lại form search đã lưu trong local để search
  // useEffect(() => {
  //   const newFormValue = {
  //     ...searchCondition,
  //     ...data,
  //   };
  // }, []);
  const handleAddNew = () => {
    navigate("/storage/SerInvStockIn/manageSerInvStockIn/create-normal");
  };

  const fetchData = async () => {
    const response = await api.Ser_Inv_StockIn_SearchDL({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return response;
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };

  const columns = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 100,
      minWidth: 100,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "StockInNo",
      visible: true,
      caption: t("StockInNo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return (
          <Link // custom thành Link để có thể navigate màn hình
            label={e.value} // text hiển thị dữ liệu của column
            onClick={() => {
              onViewDetail(e.data.StockInID); // call function mở màn hình detail
            }}
          />
        );
      },
    },
    {
      dataField: "SupplierName",
      visible: true,
      caption: t("SupplierName"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "StockInDate",
      visible: true,
      caption: t("StockInDate"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "OrderPartNo", // Số đơn hàng
      visible: true,
      caption: t("OrderPartNo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "StatusText",
      visible: true,
      caption: t("StatusText"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Description",
      visible: true,
      caption: t("Description"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
  ];
  const handleSelectionChanged = () => {};

  const handleDelete = () => {
    toast.info("Only delete status P");
  };
  const toolbarItems: GridCustomToolBarItem[] = [
    {
      text: t(`Delete`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleDelete();
        }
      },

      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];
  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };
  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("Ser_Inv_StockIn")}</div>
          <div className="mx-2">
            <BButton
              iconName="plus"
              label={t("AddNew")}
              onClick={handleAddNew}
            />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            {/* <SearchForm /> */}
            <SearchForm
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <ScrollView height={"100%"}>
              {/* <OrderList /> */}
              <LoadPanel
                visible={isProcessing}
                showIndicator={true}
                showPane={true}
              />

              <GridViewOne
                onPageChanged={(number) => onRefetchData(number ?? 0)}
                ref={gridRef}
                editMode={false} // fix selection
                autoFetchData={true}
                allowSelection={true}
                isLoading={false}
                dataSource={[]}
                fetchData={fetchData}
                columns={columns}
                // toolbarItems={toolbarItems}
                customToolbarItems={toolbarItems}
                onSelectionChanged={handleSelectionChanged}
                keyExpr={"StockInID"}
                storeKey={"Ser_Inv_StockIn-List"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default SerInvStockInPage;
