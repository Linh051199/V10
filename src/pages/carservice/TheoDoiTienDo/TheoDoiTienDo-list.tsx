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
import { List, LoadPanel, ScrollView } from "devextreme-react";
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

export const flagStoTranspReq = atom<boolean>(false);
interface TheoDoiTienDo_Search {}

const DUMMY_DATA: any = {
  DataList: [
    {
      Model: "Test1",
      BienSo: "Test1",
      SoBaoGia: "Test1",
      BDauSC: "Test1",
      KThucSC: "Test1",
      TrangThai: 1,
      GioHenGiaoXe: "Test1",
      CVDV: "Test1",
      KTV: "Test1",
      Khoang: "Test1",
      CapNhat: "https://github.com",
      GhiChu: "Test1",
    },
    {
      Model: "Test2",
      BienSo: "Test2",
      SoBaoGia: "Test2",
      BDauSC: "Test2",
      KThucSC: "Test2",
      TrangThai: 0,
      GioHenGiaoXe: "Test2",
      CVDV: "Test2",
      KTV: "Test2",
      Khoang: "Test2",
      CapNhat: "https://github.com",
      GhiChu: "Test2",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};
const TheoDoiTienDoPage = () => {
  const { t } = useI18n("TheoDoiTienDo");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<TheoDoiTienDo_Search>>({
    NgayVaoXuong: [validateMajorTimeStartDayOfMonth, new Date()],
    ChoSua: false,
    DangSua: false,
    SuaXong: false,
    Ft_PageIndex: 0,
    Ft_PageSize: 1000,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    navigate(`/XemLenhSC/${code}? `);
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<TheoDoiTienDo_Search>
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

  const handleSearch = (condition: Partial<TheoDoiTienDo_Search>) => {
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
    // const resp =   await api.TheoDoiTienDo_SearchHQ({
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
      dataField: "Model",
      visible: true,
      caption: t("Model"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "BienSo",
      visible: true,
      caption: t("BienSo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "SoBaoGia",
      visible: true,
      caption: t("SoBaoGia"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      visible: true,
      caption: t("TienTrinh"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      columns: [
        {
          dataField: "BDauSC",
          visible: true,
          caption: t("BDauSC"),
          width: 200,
          minWidth: 200,
          alignment: "center" as Alignment,
          editorOptions: { readOnly: true },
          multiRowEditorOptions: {},
        },
        {
          dataField: "",
          visible: true,
          caption: t(""),
          width: 200,
          minWidth: 200,
          alignment: "center" as Alignment,
          editorOptions: { readOnly: true },
          cellRender: (e: any) => {
            return (
              <div>
                pppp
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                >
                  <rect width="4" height="16" x="4" y="2" rx="2" ry="2" />
                  <rect width="4" height="16" x="12" y="2" rx="2" ry="2" />
                  <rect width="20" height="4" x="0" y="8" rx="2" ry="2" />
                </svg>
              </div>
            );
          },
        },
        {
          dataField: "KThucSC",
          visible: true,
          caption: t("KThucSC"),
          width: 200,
          minWidth: 200,
          alignment: "center" as Alignment,
          editorOptions: { readOnly: true },
        },
      ],
    },
    {
      dataField: "TrangThai",
      visible: true,
      caption: t("TrangThai"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return (
          <span
            className={`px-[10px] rounded-[2px] ml-[30px] py-[4px] text-white font-[400] text-[11px]`}
            style={{
              backgroundColor: `${e.value === 1 ? "#0FBC2B" : "#A7A7A7"}`,
            }}
          >
            {e.value === 1 ? "SuaXong" : "ChoSua"}
          </span>
        );
      },
    },
    {
      dataField: "GioHenGiaoXe",
      visible: true,
      caption: t("GioHenGiaoXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "CVDV",
      visible: true,
      caption: t("CVDV"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: false },
      editorType: "dxSelectBox",

      lookup: {
        dataSource:
          [
            { StorageCode: "ST1" },
            { StorageCode: "ST2" },
            { StorageCode: "ST3" },
          ] ?? [],
        displayExpr: "StorageCode",
        valueExpr: "StorageCode",
      },

      multiRowEditorOptions: {
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: listStorageCodeTo ?? [],
          displayExpr: "StorageCode",
          valueExpr: "StorageCode",
        },
      },
    },
    {
      dataField: "KTV",
      visible: true,
      caption: t("KTV"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: false },
      multiRowEditorOptions: {},
    },
    {
      dataField: "Khoang",
      visible: true,
      caption: t("Khoang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: false },
      multiRowEditorOptions: {},
    },
    {
      dataField: "CapNhat",
      visible: true,
      caption: t("CapNhat"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return (
          <Link
            label={"XemLenhSC"}
            onClick={() => {
              onViewDetail(e.value);
            }}
          ></Link>
        );
      },
    },
    {
      dataField: "GhiChu",
      visible: true,
      caption: t("GhiChu"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: false },
      multiRowEditorOptions: {},
    },
  ];
  const handleSelectionChanged = () => {};

  const handleSave = async () => {
    toast.info("save");
    gridRef?.current?.getDxInstance().saveEditData();
    let params: any = gridRef?.current?.getDxInstance().option("dataSource");
    console.log("🟡 ~ params:", params);

    // setIsProcessing(true);
    // const response = await api.TheoDoiTienDo_PrintCBReqNo(
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
      text: t(`Save`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleSave();
        }
      },

      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TheoDoiTienDo")}</div>
          <div className="flex justify-between py-[20px] ">
            <div className="pr-[20px]">
              <p className="font-black text-[14px]">
                {`${t("CurrentTime")}`}: &#160;
                {getHours(new Date())}:
                {`${
                  getMinutes(new Date()) < 10
                    ? `0${getMinutes(new Date())}`
                    : getMinutes(new Date())
                }`}
              </p>
            </div>
          </div>
          <div className="mx-2">
            <BButton
              // iconName="plus"
              label={t("Save")}
              onClick={() => handleSave()}
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
                ref={gridRef}
                customHeight={windowSize.height - 180}
                editMode={true} // fix selection
                autoFetchData={true}
                allowSelection={true}
                isLoading={false}
                dataSource={[]}
                fetchData={fetchData}
                columns={columns}
                editingOptions={{
                  mode: "batch",
                }}
                // toolbarItems={toolbarItems}
                customToolbarItems={toolbarItems}
                onSelectionChanged={handleSelectionChanged}
                keyExpr={"Model"}
                storeKey={"TheoDoiTienDo-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default TheoDoiTienDoPage;
