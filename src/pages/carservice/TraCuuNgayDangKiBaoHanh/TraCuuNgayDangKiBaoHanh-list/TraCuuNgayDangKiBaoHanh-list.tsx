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
import { HeaderFormView } from "./header-form";

export const flagStoTranspReq = atom<boolean>(false);
interface TraCuuNgayDangKiBaoHanh_Search {}

const DUMMY_DATA: any = {
  mst: {
    KhachHangSoHuu: `${Math.random()}`,
    BienSo: `${Math.random()}`,
    MaBinhAcquy: `${Math.random()}`,
  },
  table: {
    DataList: [
      {
        NoiDungGiaHanBaoHanh: `${Math.random()} - Test1`,
        NgayGiaHanBaoHanh: "Test1",
        GhiChu: "Test1",
        NgayCapNhatCuoiCung: "Test1",
      },
      {
        NoiDungGiaHanBaoHanh: `${Math.random()} - Test1`,
        NgayGiaHanBaoHanh: "Test2",
        GhiChu: "Test2",
        NgayCapNhatCuoiCung: "Test2",
      },
      {
        NoiDungGiaHanBaoHanh: `${Math.random()} - Test1`,
        NgayGiaHanBaoHanh: "Test3",
        GhiChu: "Test3",
        NgayCapNhatCuoiCung: "Test3",
      },
    ],
    ItemCount: 2,
    PageCount: 2,
    PageIndex: 2,
    PageSize: 2,
  },
};
const TraCuuNgayDangKiBaoHanhPage = () => {
  const { t } = useI18n("TraCuuNgayDangKiBaoHanh");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const formRef = useRef<any>();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<TraCuuNgayDangKiBaoHanh_Search>>({
    BienSo: "",
    VIN: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 1000,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();

  const { data, onSave: onSaveState } = useStateRestore<
    Partial<TraCuuNgayDangKiBaoHanh_Search>
  >("search-sto-cb-req-v2", {});

  const handleSearch = (condition: Partial<TraCuuNgayDangKiBaoHanh_Search>) => {
    if (condition.CreatedDateFromTo && condition.CreatedDateFromTo.length > 0) {
      condition.CreatedDateFrom = condition.CreatedDateFromTo[0]
        ? formatDate(condition.CreatedDateFromTo[0])
        : undefined;
      condition.CreatedDateTo = condition.CreatedDateFromTo[1]
        ? formatDate(condition.CreatedDateFromTo[1])
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
    // const resp =   await api.TraCuuNgayDangKiBaoHanh_SearchHQ({
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
      // return DUMMY_DATA.table;
      formRef.current.instance.option("formData", {
        KhachHangSoHuu: `${Math.random()}`,
        BienSo: `${Math.random()}`,
        MaBinhAcquy: `${Math.random()}`,
        DienThoai: `${Math.random()}`,
        GiayToTuyThan: `${Math.random()}`,
        TinhTP: `${Math.random()}`,
        QHuyen: `${Math.random()}`,
        DiaChi: `${Math.random()}`,
        SoKhung: `${Math.random()}`,
        SoMay: `${Math.random()}`,
        HieuXe: `${Math.random()}`,
        Model: `${Math.random()}`,
        MauXe: `${Math.random()}`,
        MaAVN: `${Math.random()}`,
        NgayBaoHanh: `${Math.random()}`,
        NgayHetHanBaoHanh: `${Math.random()}`,
        NgayKHXNBaoHanh: `${Math.random()}`,
        KMGioiHanBH: `${Math.random()}`,
      });
      formRef.current.instance.repaint();
      return {
        DataList: [
          {
            NoiDungGiaHanBaoHanh: `${Math.random()} - Test1`,
            NgayGiaHanBaoHanh: "Test1",
            GhiChu: "Test1",
            NgayCapNhatCuoiCung: "Test1",
          },
          {
            NoiDungGiaHanBaoHanh: `${Math.random()} - Test2`,
            NgayGiaHanBaoHanh: "Test2",
            GhiChu: "Test2",
            NgayCapNhatCuoiCung: "Test2",
          },
          {
            NoiDungGiaHanBaoHanh: `${Math.random()} - Test3`,
            NgayGiaHanBaoHanh: "Test3",
            GhiChu: "Test3",
            NgayCapNhatCuoiCung: "Test3",
          },
          {
            NoiDungGiaHanBaoHanh: `${Math.random()} - Test4`,
            NgayGiaHanBaoHanh: "Test4",
            GhiChu: "Test4",
            NgayCapNhatCuoiCung: "Test4",
          },
          {
            NoiDungGiaHanBaoHanh: `${Math.random()} - Test5`,
            NgayGiaHanBaoHanh: "Test5",
            GhiChu: "Test5",
            NgayCapNhatCuoiCung: "Test5",
          },
          {
            NoiDungGiaHanBaoHanh: `${Math.random()} - Test6`,
            NgayGiaHanBaoHanh: "Test6",
            GhiChu: "Test6",
            NgayCapNhatCuoiCung: "Test6",
          },
        ],
      };
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
      dataField: "NoiDungGiaHanBaoHanh",
      visible: true,
      caption: t("NoiDungGiaHanBaoHanh"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NgayGiaHanBaoHanh",
      visible: true,
      caption: t("NgayGiaHanBaoHanh"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "GhiChu",
      visible: true,
      caption: t("GhiChu"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NgayCapNhatCuoiCung",
      visible: true,
      caption: t("NgayCapNhatCuoiCung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
  ];
  const handleSelectionChanged = () => {};

  const toolbarItems: GridCustomToolBarItem[] = [];

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TraCuuNgayDangKiBaoHanh")}</div>
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
              <div>
                <p className="font-black text-[14px] pl-[10px] mt-[10px]">
                  {t("ThongTinKhachHang")}
                </p>
                <HeaderFormView ref={formRef} data={DUMMY_DATA.mst} />
              </div>
              <div className={"separator"} />
              <div>
                <p className="font-black text-[14px] pl-[10px] mt-[10px]">
                  {t("NoiDungGiaHanBaoHanh")}
                </p>
                <GridViewOne
                  ref={gridRef}
                  customHeight={window.innerHeight - 520}
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
                  keyExpr={"NoiDungGiaHanBaoHanh"}
                  storeKey={"TraCuuNgayDangKiBaoHanh-list"}
                />
              </div>
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default TraCuuNgayDangKiBaoHanhPage;
