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

export const flagStoTranspReq = atom<boolean>(false);

const FAKE_DATA = {
  DataList: [
    {
      SoBanTin: "TEST1",
      SoBanTinHMC: "TEST1",
      NgayTao: "TEST1",
      FileDinhKem: "TEST1",
      MoTa: "TEST1",
      NgayHetHanBanTin: "TEST1",
    },
    {
      SoBanTin: "TEST2",
      SoBanTinHMC: "TEST2",
      NgayTao: "TEST2",
      FileDinhKem: "TEST2",
      MoTa: "TEST2",
      NgayHetHanBanTin: "TEST2",
    },
  ],
};

const QuanLyBanTinKyThuatManagementPage = () => {
  const { t } = useI18n("QuanLyBanTinKyThuat");
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

  // const handlePrint = async (param: any) => {
  //   /*
  //   FlagDataWH = 1 => "/StoTranspReq/PrintWHHQByTranspReqNo"
  //   FlagDataWH = 0 or others => "/StoTranspReq/PrintHQByTranspReqNo"
  //   */
  //   // setIsProcessing(true);
  //   const resp = await api.Sto_TranspReq_PrintTranspReqNo(param[0]);
  //   if (resp.Data) {
  //     quickPrint({
  //       url: resp.Data!,
  //     });
  //   }
  //   // const resp = await api.PrintTranspReqNo(transpReqNo, isHQ());
  //   // setIsProcessing(false);
  // };

  const toolbarItems: GridCustomerToolBarItem[] = [
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
  ];

  const vinToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold mr-2"}>{t("VINList")}</div>;
      },
    },

    // {
    //   location: "after",
    //   render: () => {
    //     return (
    //       <div className={""}>
    //         {t("TotalRow")}: {cars.length}
    //       </div>
    //     );
    //   },
    // },
  ];

  const jobToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold mr-2"}>{t("JobList")}</div>;
      },
    },

    // {
    //   location: "after",
    //   render: () => {
    //     return (
    //       <div className={""}>
    //         {t("TotalRow")}: {cars.length}
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleViewDetail = (code: string) => {
    navigate(`/service/QuanLyBanTinKyThuat/manageQuanLyBanTinKyThuat/${code}`);
  };

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
    navigate("/service/QuanLyBanTinKyThuat/manageQuanLyBanTinKyThuat/new");
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
      dataField: "SoBanTin",
      visible: true,
      caption: t("SoBanTin"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              handleViewDetail(e.value);
            }}
          />
        );
      },
    },
    {
      dataField: "SoBanTinHMC",
      visible: true,
      caption: t("SoBanTinHMC"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayTao",
      visible: true,
      caption: t("NgayTao"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "FileDinhKem",
      visible: true,
      caption: t("FileDinhKem"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayHetHanBanTin",
      visible: true,
      caption: t("NgayHetHanBanTin"),
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

  const columnsVIN = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "VIN",
      visible: true,
      caption: t("VIN"),
    },
    {
      dataField: "TrangThai ",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("TrangThai "),
    },
    {
      dataField: "DaiLy ",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("DaiLy "),
    },
  ];

  const columnsJob = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "MaCongViec ",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("MaCongViec "),
    },
    {
      dataField: "TenCongViec ",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("TenCongViec "),
    },
    {
      dataField: "MaPhuTung ",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("MaPhuTung "),
    },
    {
      dataField: "TenPhuTung ",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("TenPhuTung "),
    },
  ];

  const handleSelectionChanged = (e: any) => {
    // setSelectedRowKeys(e.selectedRowKeys);
  };

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("QuanLyBanTinKyThuat")}</div>
          <div className="ml-auto">
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
                keyExpr={"SoBanTin"}
                storeKey={"QuanLyBanTinKyThuat-manager-list"}
              />
              <GridViewOne
                autoFetchData={true}
                editMode={false}
                ref={gridRef}
                dataSource={[]}
                columns={columnsVIN}
                allowSelection={true}
                onSelectionChanged={handleSelectionChanged}
                toolbarItems={vinToolbars}
                keyExpr={"VIN"}
                storeKey={"QuanLyBanTinKyThuat-vin-list"}
              />

              <GridViewOne
                autoFetchData={true}
                editMode={false}
                ref={gridRef}
                dataSource={[]}
                columns={columnsJob}
                allowSelection={true}
                onSelectionChanged={handleSelectionChanged}
                toolbarItems={jobToolbars}
                keyExpr={"MaCongViec"}
                storeKey={"QuanLyBanTinKyThuat-job-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default QuanLyBanTinKyThuatManagementPage;
