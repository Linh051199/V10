import usePrint from "@/components/print/usePrint";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { BButton } from "@/packages/components/buttons";
import { usePermissions } from "@/packages/contexts/permission";
import { useNetworkNavigate } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { Search_QuanLyYeuCauPDI_Param } from "@/packages/types/carservice/QuanLyYeuCauPDI";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { LinkCell } from "@/packages/ui/link-cell";
import { ToolbarItemProps } from "@/types";
import { faker } from "@faker-js/faker";
import { LoadPanel, ScrollView } from "devextreme-react";
import { atom, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useReducer, useRef, useState } from "react";
import SearchForm from "./search-form/search-form";

export const flagStoTranspReq = atom<boolean>(false);

const FAKE_DATA = {
  DataList: [
    {
      STT: faker.internet.userName(),
      MaDaiLy: faker.internet.userName(),
      SoYCPDI: faker.random.numeric(),
      NgayTao: faker.internet.userName(),
      NgayDuyet: faker.internet.userName(),
      NoiDung: faker.internet.userName(),
      TrangThai: faker.internet.userName(),
      NguoiTao: faker.internet.userName(),
      PhuKien: faker.internet.userName(),
      SoLuongXe: faker.internet.userName(),
      SoXeHoanThanh: faker.internet.userName(),
    },
  ],
};

const QuanLyYeuCauPDIPage = () => {
  const { t } = useI18n("QuanLyYeuCauPDI");
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

  const searchCondition = useRef<Partial<Search_QuanLyYeuCauPDI_Param>>({
    SoYCPDI: "",

    NgayTao: [validateMajorTimeStartDayOfMonth, new Date()],
    VIN: "",
    SoHD: "",
    DaiLy: "",
    TrangThai: "",
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
        return <BButton label={t("XuatExcel")} onClick={() => {}} />;
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

  const handleSearch = (condition: Partial<Search_QuanLyYeuCauPDI_Param>) => {
    if (condition.NgayTao && condition.NgayTao.length > 0) {
      condition.NgayTaoFrom = condition.NgayTao[0]
        ? formatDate(condition.NgayTao[0])
        : undefined;
      condition.NgayTaoTo = condition.NgayTao[1]
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

  const handleNavigateDetail = (code: any) => {
    navigate(`/service/QuanLyYeuCauPDI/${code}`);
  };

  const columns = [
    {
      dataField: "STT",
      visible: true,
      caption: t("STT"),
      width: 50,
      cellRender: ({ rowIndex }) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "MaDaiLy",
      visible: true,
      caption: t("MaDaiLy"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "SoYCPDI",
      visible: true,
      caption: t("SoYCPDI"),
      width: 200,
      minWidth: 200,
      cellRender: ({ data }) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => handleNavigateDetail(data.SoYCPDI)}
            value={data.SoYCPDI}
          />
        );
      },
    },
    {
      dataField: "NgayTao",
      visible: true,
      caption: t("NgayTao"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "NgayDuyet",
      visible: true,
      caption: t("NgayDuyet"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "NoiDung",
      visible: true,
      caption: t("NoiDung"),
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
    {
      dataField: "NguoiTao",
      visible: true,
      caption: t("NguoiTao"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "PhuKien",
      visible: true,
      caption: t("PhuKien"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "SoLuongXe",
      visible: true,
      caption: t("SoLuongXe"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "SoXeHoanThanh",
      visible: true,
      caption: t("SoXeHoanThanh"),
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
          <div className="page-title">{t("QuanLyYeuCauPDI")}</div>
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
                keyExpr={"SoYCPDI"}
                storeKey={"QuanLyYeuCauPDI-manager-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default QuanLyYeuCauPDIPage;
