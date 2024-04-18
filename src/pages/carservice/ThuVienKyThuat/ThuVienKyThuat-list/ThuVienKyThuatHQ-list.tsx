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

interface ThuVienKyThuatHQ_Search {}

const DUMMY_DATA: any = {
  DataList: [
    {
      MaKyThuat: "Test1",
      MaDaiLy: "Test1",
      Dealer: "Test1",
      BienSoXe: "Test1",
      Model: "Test1",
      DongCo: "Test1",
      HopSo: "Test1",
      DoiXe: "Test1",
      LoaiHinhSuaChuaPhanTu: "Test1",
      NoiDung: "Test1",
      YKienKhachHangPhanTu_TrieuChung: "Test1",
      NguyenNhan: "Test1",
      GiaiPhapKhacPhuc: "Test1",
      KiemTraLoaiTru: "Test1",
      Loai: "Test1",
      TrangThai: "Test1",
      NgayTao: "Test1",
      NguoiTao: "Test1",
    },
    {
      MaKyThuat: "Test2",
      MaDaiLy: "Test2",
      Dealer: "Test2",
      BienSoXe: "Test2",
      Model: "Test2",
      DongCo: "Test2",
      HopSo: "Test2",
      DoiXe: "Test2",
      LoaiHinhSuaChuaPhanTu: "Test2",
      NoiDung: "Test2",
      YKienKhachHangPhanTu_TrieuChung: "Test2",
      NguyenNhan: "Test2",
      GiaiPhapKhacPhuc: "Test2",
      KiemTraLoaiTru: "Test2",
      Loai: "Test2",
      TrangThai: "Test2",
      NgayTao: "Test2",
      NguoiTao: "Test2",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};
const ThuVienKyThuatHQPage = () => {
  const { t } = useI18n("ThuVienKyThuatHQ");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<ThuVienKyThuatHQ_Search>>({
    Dealer: "",
    Model: "",
    DongCo: "",
    NoiDung: "",
    Loai: "",
    DoiXe: "",
    NgayTaoTu: [validateMajorTimeStartDayOfMonth, new Date()],
    TrangThai: "1",
    Ft_PageIndex: 0,
    Ft_PageSize: 1000,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    navigate(
      `/service/ThuVienKyThuatHQ/manageThuVienKyThuatHQ/${code}?${searchCondition.current.FlagDataWH}`
    );
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<ThuVienKyThuatHQ_Search>
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

  const handleSearch = (condition: Partial<ThuVienKyThuatHQ_Search>) => {
    if (condition.NgayTaoTu && condition.NgayTaoTu.length > 0) {
      condition.CreatedDateFrom = condition.NgayTaoTu[0]
        ? formatDate(condition.NgayTaoTu[0])
        : undefined;
      condition.CreatedDateTo = condition.NgayTaoTu[1]
        ? formatDate(condition.NgayTaoTu[1])
        : undefined;
    }
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
    // const resp =   await api.ThuVienKyThuatHQ_SearchHQ({
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
      dataField: "MaKyThuat",
      visible: true,
      caption: t("MaKyThuat"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              onViewDetail(e.value);
            }}
          />
        );
      },
    },
    {
      dataField: "MaDaiLy",
      visible: true,
      caption: t("MaDaiLy"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
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
      dataField: "Model",
      visible: true,
      caption: t("Model"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DongCo",
      visible: true,
      caption: t("DongCo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "HopSo",
      visible: true,
      caption: t("HopSo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DoiXe",
      visible: true,
      caption: t("DoiXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "LoaiHinhSuaChuaPhanTu",
      visible: true,
      caption: t("LoaiHinhSuaChuaPhanTu"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },

    {
      dataField: "NoiDung",
      visible: true,
      caption: t("NoiDung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "YKienKhachHangPhanTu_TrieuChung",
      visible: true,
      caption: t("YKienKhachHangPhanTu_TrieuChung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "NguyenNhan",
      visible: true,
      caption: t("NguyenNhan"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "GiaiPhapKhacPhuc",
      visible: true,
      caption: t("GiaiPhapKhacPhuc"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "KiemTraLoaiTru",
      visible: true,
      caption: t("KiemTraLoaiTru"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "Loai",
      visible: true,
      caption: t("Loai"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "TrangThai",
      visible: true,
      caption: t("TrangThai"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "NgayTao",
      visible: true,
      caption: t("NgayTao"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
    {
      dataField: "NguoiTao",
      visible: true,
      caption: t("NguoiTao"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
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
    // const response = await api.ThuVienKyThuatHQ_PrintCBReqNo(
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
  const handleXuatFileTemplatePhanTu = () => {};
  const handleXuatFileTemplate = () => {};
  const handleImportExcelPhanTu = () => {};
  const handleImportPanThuongGap = () => {};
  const handleDelete = () => {};
  const handleExportExcel = () => {};
  const toolbarItems: GridCustomToolBarItem[] = [
    {
      text: t(`XuatFileTemplatePhanTu`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleXuatFileTemplatePhanTu();
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

    {
      text: "",
      onClick: () => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => {
        const selectedRowsData =
          ref?.current?.instance?.getSelectedRowsData?.();
        const selectedRowKeys = ref?.current?.instance?.getSelectedRowKeys?.();
        const listsButtonDropDown: { content: ReactNode }[] = [
          {
            content: (
              <BButton
                className="w-full text-center my-[2px] btn-center-text"
                visible={selectedRowsData && selectedRowsData.length >= 1}
                label={t("XuatFileTemplate")}
                onClick={() => handleXuatFileTemplate()}
              />
            ),
          },
          {
            content: (
              <BButton
                className="w-full text-center my-[2px] btn-center-text"
                visible={
                  selectedRowsData && selectedRowsData.length >= 1
                  // true
                }
                label={t("ImportExcelPhanTu")}
                onClick={() => handleImportExcelPhanTu()}
              />
            ),
          },
          {
            content: (
              <BButton
                className="w-full text-center my-[2px] btn-center-text"
                visible={
                  selectedRowsData && selectedRowsData.length >= 1
                  // true
                }
                label={t("ImportPanThuongGap")}
                onClick={() => handleImportPanThuongGap()}
              />
            ),
          },
          {
            content: (
              <BButton
                className="w-full text-center my-[2px] btn-center-text"
                visible={
                  selectedRowsData && selectedRowsData.length >= 1
                  // true
                }
                label={t("Delete")}
                onClick={() => handleDelete()}
              />
            ),
          },
          {
            content: (
              <BButton
                className="w-full text-center my-[2px] btn-center-text"
                visible={
                  selectedRowsData && selectedRowsData.length >= 1
                  // true
                }
                label={t("Save")}
                onClick={() => handleSave()}
              />
            ),
          },
          {
            content: (
              <BButton
                className="w-full text-center my-[2px] btn-center-text"
                visible={
                  selectedRowsData && selectedRowsData.length >= 1
                  // true
                }
                label={t("ExportExcel")}
                onClick={() => handleExportExcel()}
              />
            ),
          },
        ];
        return (
          <>
            <DropDownButton
              visible={selectedRowsData && selectedRowsData.length >= 1}
              icon="more"
              showArrowIcon={false}
              dropDownOptions={{
                width: 300,
              }}
            >
              {listsButtonDropDown.map(
                (btn: { content: ReactNode }, index: number) => {
                  return (
                    <Item
                      key={index}
                      render={() => {
                        return <>{btn.content}</>;
                      }}
                    ></Item>
                  );
                }
              )}
            </DropDownButton>
          </>
        );
      },
    },
  ];

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("ThuVienKyThuat")}</div>
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
                keyExpr={"MaKyThuat"}
                storeKey={"ThuVienKyThuatHQ-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default ThuVienKyThuatHQPage;
