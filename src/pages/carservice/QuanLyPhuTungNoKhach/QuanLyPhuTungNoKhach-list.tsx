import { useI18n } from "@/i18n/useI18n";
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import {
  useNetworkNavigate,
  useStateRestore,
  useVisibilityControl,
} from "@/packages/hooks";
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
import { Link } from "@/packages/components/link/link";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { usePermissions } from "@/packages/contexts/permission";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import usePrint from "@/components/print/usePrint";
import { nanoid } from "nanoid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { QuanLyBanTinKyThuat_Search } from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { IToolbarItemProps } from "devextreme-react/data-grid";

import { useForm } from "react-hook-form";
import { openPopupAtom } from "./store";
import { PopupCreateNew } from "./create-new/create-new";

export const flagStoTranspReq = atom<boolean>(false);

const FAKE_DATA = {
  DataList: [
    {
      MaPhuTung: "TEST1",
      TenPhuTung: "TEST1",
      SoLuongNoKhach: "TEST1",
      SoLuongDaTra: "TEST1",
      CoVanDichVu: "TEST1",
    },
  ],
};

const QuanLyPhuTungNoKhachManagementPage = () => {
  const { t } = useI18n("QuanLyPhuTungNoKhach");
  const { isHQ } = usePermissions();
  const windowSize = useWindowSize();
  let gridRef: any = useRef(null);
  const showError = useSetAtom(showErrorAtom);

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNetworkNavigate();
  const api = useClientgateApi();

  const {
    register,
    reset,
    unregister,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<any>({
    values: {
      KhachHangCungLaNguoiLienLac: true,
      KhachHang: "CANHAN",
    },
  });

  const searchCondition = useRef<Partial<QuanLyBanTinKyThuat_Search>>({
    SoBanTin: "",
    VIN: "",
    NgayTao: [validateMajorTimeStartDayOfMonth, new Date()],
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const PopupCreateNewRef = useRef<any>(null);

  const handleOpen = () => {
    PopupCreateNewRef.current.showPopup();

    // setValue("visible", true);
    // showPopupCreateNew.open();
    // setOpenPopup(true);
  };

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

  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: t(`ImportExcel`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleExportExcel();
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },

    {
      text: t(`ExportExcel`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleExportExcel();
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },

    {
      text: t(`Update`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleExportExcel();
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];

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

  const handleAddNew = () => {
    // navigate("/service/QuanLyBanTinKyThuat/manageQuanLyBanTinKyThuat/new");
    toast.warning("Chưa màn thiết kế màn tạo!!!");
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
      dataField: "MaPhuTung",
      visible: true,
      caption: t("MaPhuTung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      // cellRender: (e: any) => {
      //   return (
      //     <Link
      //       label={e.value}
      //       onClick={() => {
      //         handleViewDetail(e.value);
      //       }}
      //     />
      //   );
      // },
    },
    {
      dataField: "TenPhuTung",
      visible: true,
      caption: t("TenPhuTung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "SoLuongNoKhach",
      visible: true,
      caption: t("SoLuongNoKhach"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "SoLuongDaTra",
      visible: true,
      caption: t("SoLuongDaTra"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "CoVanDichVu",
      visible: true,
      caption: t("CoVanDichVu"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "BienSoXe",
      visible: true,
      caption: t("BienSoXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "LoaiXe",
      visible: true,
      caption: t("LoaiXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayDatHang",
      visible: true,
      caption: t("NgayDatHang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayVeDuKien",
      visible: true,
      caption: t("NgayVeDuKien"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayHenTra",
      visible: true,
      caption: t("NgayHenTra"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "GhiChu",
      visible: true,
      caption: t("GhiChu"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    // {
    //   dataField: "TranspReqStatus",
    //   caption: t("TranspReqStatus"),
    //   visible: true,
    //   width: 200,
    //   alignment: "center" as Alignment,
    //   cellRender: (e: any) => {
    //     return <StatusValue status={e.value} />;
    //   },
    // },
  ];

  const handleSelectionChanged = (e: any) => {
    // setSelectedRowKeys(e.selectedRowKeys);
  };

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("QuanLyPhuTungNoKhach")}</div>
          <div className="ml-auto">
            <BButton iconName="plus" label={t("AddNew")} onClick={handleOpen} />
          </div>
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
                data={searchCondition.current}
                onSearch={handleSearch}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <ScrollView height={windowSize.height - 120}>
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
                toolbarItems={
                  [
                    // {
                    //   location: "before",
                    //   render: (gridRef: any) => (
                    //     <ExportExcelButton onClick={handleExportExcel} />
                    //   ),
                    // },
                  ]
                }
                customToolbarItems={toolbarItems}
                onSelectionChanged={handleSelectionChanged}
                keyExpr={"MaPhuTung"}
                storeKey={"QuanLyPhuTungNoKhach-manager-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
        <PopupCreateNew onSave={() => {}} ref={PopupCreateNewRef} />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default QuanLyPhuTungNoKhachManagementPage;
