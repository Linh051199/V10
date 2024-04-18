import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { formatDate } from "@/packages/common/date_utils";
import { BButton } from "@/packages/components/buttons";
import { usePermissions } from "@/packages/contexts/permission";
import { useNetworkNavigate } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { Search_DanhSachCuocHen_Param } from "@/packages/types/carservice/DanhSachCuocHen";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ToolbarItemProps } from "@/types";
import { LoadPanel, ScrollView } from "devextreme-react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useReducer, useRef, useState } from "react";
import SearchForm from "./search-form/search-form";

export const DanhSachCuocHenPage = () => {
  const { t } = useI18n("DanhSachCuocHen");
  const { isHQ } = usePermissions();
  const windowSize = useWindowSize();
  let gridRef: any = useRef(null);
  const showError = useSetAtom(showErrorAtom);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  // const selectionKeysAtom = useAtomValue(customizeGridSelectionKeysAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNetworkNavigate();
  const api = useClientgateApi();

  const searchCondition = useRef<Partial<Search_DanhSachCuocHen_Param>>({
    NgayHen: [undefined, undefined],
    BienSo: "",
    DaiLy: [],
    TenKH: "",
    NguoiTao: "",
    TrangThai: "",
    FlagWH: "0",
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

  const subGridToolbars: ToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <BButton label={t("TaoPhieuNhap")} onClick={() => {}} />;
      },
    },
    {
      location: "after",
      render: () => {
        return (
          <div className={""}>
            {t("TotalRow")}: {["1"].length}
          </div>
        );
      },
    },
  ];

  const handleSearch = (condition: Partial<Search_DanhSachCuocHen_Param>) => {
    if (condition.NgayHen && condition.NgayHen.length > 0) {
      condition.NgayHenTu = condition.NgayHen[0]
        ? formatDate(condition.NgayHen[0])
        : undefined;
      condition.NgayHenDen = condition.NgayHen[1]
        ? formatDate(condition.NgayHen[1])
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
    return {
      DataList: [
        {
          SoCuocHen: "",
          SoPhieuKiemTra: "",
          BienSo: "",
          TenKH: "",
          SoDT: "",
          Hang: "",
          NguoiTao: "",
          Nguon: "",
          CVDV: "",
          KhoangSC: "",
          NgayHen: "",
          GioHen: "",
          TrangThai: "",
        },
      ],
    };
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
      dataField: "STT",
      visible: true,
      caption: t("STT"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "SoCuocHen",
      visible: true,
      caption: t("SoCuocHen"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "SoPhieuKiemTra",
      visible: true,
      caption: t("SoPhieuKiemTra"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "BienSo",
      visible: true,
      caption: t("BienSo"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "TenKH",
      visible: true,
      caption: t("TenKH"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "SoDT",
      visible: true,
      caption: t("SoDT"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "Hang",
      visible: true,
      caption: t("Hang"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "NguoiTao",
      visible: true,
      caption: t("NguoiTao"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "Nguon",
      visible: true,
      caption: t("Nguon"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "CVDV",
      visible: true,
      caption: t("CVDV"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "KhoangSC",
      visible: true,
      caption: t("KhoangSC"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "NgayHen",
      visible: true,
      caption: t("NgayHen"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "GioHen",
      visible: true,
      caption: t("GioHen"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "TrangThai",
      visible: true,
      caption: t("TrangThai"),
      width: 200,
      minWidth: 200,
    },
  ];

  const handleSelectionChanged = (e: any) => {
    // setSelectedRowKeys(e.selectedRowKeys);
  };

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("DanhSachCuocHen")}</div>
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
                toolbarItems={subGridToolbars}
                onSelectionChanged={handleSelectionChanged}
                keyExpr={"SoCuocHen"}
                storeKey={"DanhSachCuocHen-manager-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
