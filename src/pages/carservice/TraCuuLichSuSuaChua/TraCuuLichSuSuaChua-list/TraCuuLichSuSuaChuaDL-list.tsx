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
import {
  Button,
  DropDownButton,
  List,
  LoadPanel,
  ScrollView,
} from "devextreme-react";
import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Item } from "devextreme-react/drop-down-button";
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
import SearchForm from "../search-form/search-form";

interface TraCuuLichSuSuaChuaDL_Search {}

const DUMMY_DATA: any = {
  DataList: [
    {
      Dealer: "Test1",
      BienSoXe: "Test1",
      VIN: "Test1",
      RO: "Test1",
      CVDV: "Test1",
      HieuXe: "Test1",
      Model: "Test1",
      Mau: "Test1",
      NgayVaoXuong: "Test1",
      NgayGiao: "Test1",
      NoiDungCongViec: "Test1",
    },
    {
      Dealer: "Test2",
      BienSoXe: "Test2",
      VIN: "Test2",
      RO: "Test2",
      CVDV: "Test2",
      HieuXe: "Test2",
      Model: "Test2",
      Mau: "Test2",
      NgayVaoXuong: "Test2",
      NgayGiao: "Test2",
      NoiDungCongViec: "Test2",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};
const TraCuuLichSuSuaChuaDLPage = () => {
  const { t } = useI18n("TraCuuLichSuSuaChuaDL");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<TraCuuLichSuSuaChuaDL_Search>>({
    BienSo: "",
    VIN: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 1000,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    navigate(
      `/service/TraCuuLichSuSuaChuaDL/manageTraCuuLichSuSuaChuaDL/${code}?${searchCondition.current.FlagDataWH}`
    );
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<TraCuuLichSuSuaChuaDL_Search>
  >("search-sto-cb-req-v2", {});
  const { data: listStorageCodeTo } = useQuery(
    ["listStorageCodeTo", "Sto_CBReq"],
    async () => {
      return [];
      // const resp = await api.Sto_CBReq_GetByStorageType();
      // if (resp.isSuccess) {
      //   // return [
      //   //   { StorageCode: "", StorageName: "All" },
      //   //   ...(resp?.Data?.Lst_Mst_Storage as Sto_CBReq_StorageType[]),
      //   // ];
      //   return resp?.Data?.Lst_Mst_Storage;
      // } else {
      //   return [];
      // }
    }
  );

  const handleSearch = (condition: Partial<TraCuuLichSuSuaChuaDL_Search>) => {
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
    navigate("/sales/StoCBReq/manageStoCBReq/new");
  };

  const fetchData = async () => {
    // const resp =   await api.TraCuuLichSuSuaChuaDL_SearchHQ({
    //       ...searchCondition.current,
    //       Ft_PageIndex: gridRef.current.getDxInstance().pageIndex() ?? 0,
    //       Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 1000,
    //     });
    let resp: any = {
      isSuccess: true,
    };

    if (resp?.isSuccess) {
      // setSelectedRowKeys([]);
      // return resp;
      return DUMMY_DATA;
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

  const columns = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },

    {
      dataField: "Dealer",
      visible: true,
      caption: t("Dealer"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "BienSoXe",
      visible: true,
      caption: t("BienSoXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "VIN",
      visible: true,
      caption: t("VIN"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "RO",
      visible: true,
      caption: t("RO"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "CVDV",
      visible: true,
      caption: t("CVDV"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "HieuXe",
      visible: true,
      caption: t("HieuXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Model",
      visible: true,
      caption: t("Model"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Mau",
      visible: true,
      caption: t("Mau"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NgayVaoXuong",
      visible: true,
      caption: t("NgayVaoXuong"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },

    {
      dataField: "NgayGiao",
      visible: true,
      caption: t("NgayGiao"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NoiDungCongViec",
      visible: true,
      caption: t("NoiDungCongViec"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
  ];
  const handleSelectionChanged = () => {};

  const handleExportExcel = async () => {
    toast.info("ExportExcel");
    gridRef?.current?.getDxInstance().saveEditData();
    let params: any = gridRef?.current?.getDxInstance().option("dataSource");
    // setIsProcessing(true);
    // const response = await api.TraCuuLichSuSuaChuaDL_PrintCBReqNo(
    //   searchCondition.current,
    //   key
    // );
    // if (response?.isSuccess) {
    //   quickPrint({
    //     url: response.Data!,
    //   });
    // } else {
    //   showError({
    //     message: t(response._strErrCode),
    //     _strErrCode: response._strErrCode,
    //     _strTId: response._strTId,
    //     _strAppTId: response._strAppTId,
    //     _objTTime: response._objTTime,
    //     _strType: response._strType,
    //     _dicDebug: response._dicDebug,
    //     _dicExcs: response._dicExcs,
    //   });
    // }
    // const resp = await api.PrintTranspReqNo(transpReqNo, isHQ());
    // setIsProcessing(false);
  };
  const toolbarItems: GridCustomToolBarItem[] = [
    {
      text: t(`ExportExcel`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleExportExcel();
        }
      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref?.current?.instance.getSelectedRowsData().length >= 1) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
  ];

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TraCuuLichSuaSuaChua")}</div>
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
                keyExpr={"Dealer"}
                storeKey={"TraCuuLichSuSuaChuaDL-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default TraCuuLichSuSuaChuaDLPage;
