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
import { DataGrid, Form, LoadPanel, ScrollView } from "devextreme-react";
import React, { useReducer, useRef, useState } from "react";
import SearchForm from "./search-form/search-form";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { match } from "ts-pattern";
import { useClientgateApi } from "@/packages/api";
import { Alignment, ToolbarItemProps } from "@/types";
// import { Link } from "@/packages/components/link/link";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { usePermissions } from "@/packages/contexts/permission";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import usePrint from "@/components/print/usePrint";
import { nanoid } from "nanoid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { QuanLyBanTinKyThuat_Search } from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export const flagStoTranspReq = atom<boolean>(false);

const FAKE_DATA = {
  DataList: [
    {
      SoBanTin: "TEST1",
      FileDinhKem:
        "https://i.pinimg.com/originals/7e/24/65/7e2465be70c242661b66806f5baba862.jpg",
      NguoiBaoGia: "TEST1",
      TrangThai: "P",
      GhiChu: "TEST1",
    },
    {
      SoBanTin: "TEST2",
      FileDinhKem:
        "https://i.pinimg.com/originals/3c/58/ae/3c58aebbaf9be80bd1d2b1464c3bd1f5.jpg",
      NguoiBaoGia: "TEST2",
      TrangThai: "A",
      GhiChu: "TEST2",
    },
  ],
};

const DaiLyTraCuuTonKhoPhuTungManagementPage = () => {
  const { t } = useI18n("DaiLyTraCuuTonKhoPhuTung");
  const { isHQ } = usePermissions();
  const windowSize = useWindowSize();
  let gridRef: any = useRef(null);
  const { quickPrint, previewPrint } = usePrint();
  const showError = useSetAtom(showErrorAtom);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  // const selectionKeysAtom = useAtomValue(customizeGridSelectionKeysAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNetworkNavigate();
  const api = useClientgateApi();

  const searchCondition = useRef<Partial<QuanLyBanTinKyThuat_Search>>({
    SoBanTin: "",
    VIN: "",
    NgayTao: [validateMajorTimeStartDayOfMonth, new Date()],
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const handleExportExcel = async () => {
    // setIsProcessing(true);
    // const response = await api.Sto_TranspReq_ExportHQ(searchCondition.current);
    // // setIsProcessing(false);
    // if (response.isSuccess) {
    //   toast.success(t("ExportExcelSuccess"));
    //   window.location.href = response.Data!;
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
  };

  const toolbarItems: GridCustomerToolBarItem[] = [];

  const handleSearch = (condition: Partial<QuanLyBanTinKyThuat_Search>) => {
    if (condition.NgayTao && condition.NgayTao.length > 0) {
      condition.NgayTaoTu = condition.NgayTao[0]
        ? formatDate(condition.NgayTao[0])
        : undefined;
      condition.NgayTaoDen = condition.NgayTao[1]
        ? formatDate(condition.NgayTao[1])
        : undefined;
    }

    // onSaveState(condition);
    // setSearchCondition({
    //   ...condition,
    // });
    searchCondition.current = {
      ...searchCondition.current,
      ...condition,
    };
    gridRef?.current?.refetchData();
    // reloading();
  };

  const fetchData = async () => {
    return FAKE_DATA;
    // const resp = await match(isHQ())
    //   .with(true, async () => {
    //     const response = await api.Sto_TranspReq_SearchHQ({
    //       ...searchCondition.current,
    //       Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
    //       Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
    //     });
    //     return response;
    //   })
    //   .otherwise(async () => {
    //     return null;
    //   });
    // if (resp?.isSuccess) {
    //   // setSelectedRowKeys([]);
    //   return resp;
    // } else {
    //   showError({
    //     message: t(resp!._strErrCode),
    //     _strErrCode: resp!._strErrCode,
    //     _strTId: resp!._strTId,
    //     _strAppTId: resp!._strAppTId,
    //     _objTTime: resp!._objTTime,
    //     _strType: resp!._strType,
    //     _dicDebug: resp!._dicDebug,
    //     _dicExcs: resp!._dicExcs,
    //   });
    // }
  };

  // const handleShowImage = (e: any) => {
  //   console.log("e", e);
  //   window.location.href = e;
  // };

  const columns = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "MaDaiLy",
      visible: true,
      caption: t("SoBanTin"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },

    {
      dataField: "TenDaiLy",
      visible: true,
      caption: t("TenDaiLy"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "DiaChi",
      visible: true,
      caption: t("DiaChi"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "DienThoai",
      visible: true,
      caption: t("DienThoai"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
  ];

  const handleSelectionChanged = (e: any) => {
    // setSelectedRowKeys(e.selectedRowKeys);
  };

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("DaiLyTraCuuTonKhoPhuTung")}</div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <ScrollView
              height={windowSize.height - 130}
              className={"min-w-[300px]"}
            >
              {/* <SearchForm /> */}
              <SearchForm
                // listTransporterCode={
                //   // listTransporterCodeData as Mst_Transporter[]
                //   listTransporterCode as Mst_Transporter[]
                // }
                data={searchCondition.current}
                onSearch={handleSearch}
              />
            </ScrollView>
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
                autoFetchData={true}
                allowSelection={true}
                isLoading={false}
                dataSource={[]}
                fetchData={fetchData}
                columns={columns}
                toolbarItems={[]}
                customToolbarItems={toolbarItems}
                onSelectionChanged={handleSelectionChanged}
                keyExpr={"MaDaiLy"}
                storeKey={"DaiLyTraCuuTonKhoPhuTung-manager-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default DaiLyTraCuuTonKhoPhuTungManagementPage;
