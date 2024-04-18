import { useI18n } from "@/i18n/useI18n";
import {
  formatDate,
  validateTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { DataGrid, Form, LoadPanel, ScrollView } from "devextreme-react";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchForm from "./search-form/search-form";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { GridViewStandard } from "@/packages/components/gridview-standard/gridview-standard";
import { match } from "ts-pattern";
import { useClientgateApi } from "@/packages/api";
import { Alignment, ToolbarItemProps } from "@/types";
import { Link } from "@/packages/components/link/link";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { usePermissions } from "@/packages/contexts/permission";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import { customizeGridSelectionKeysAtom } from "@/packages/components/gridview-standard/store/normal-grid-store";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { QueryNames } from "./Ser_CampaignDL-common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Ser_CampaignDL_Search_Params } from "@/packages/types/carservice/Ser_CampaignDL";

export const flagStoTranspReq = atom<boolean>(false);

const Ser_CampaignDLPage = () => {
  const { t } = useI18n("Ser_CampaignDL");
  const windowSize = useWindowSize();
  let gridRef: any = useRef(null);
  const showError = useSetAtom(showErrorAtom);
  // const selectionKeysAtom = useAtomValue(customizeGridSelectionKeysAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const queryClient = useQueryClient()
  const searchCondition = useRef<Partial<Ser_CampaignDL_Search_Params>>({
    CamNo: "",
    CamName: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const { isHQ } = usePermissions();
  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: t(`ExportExcel`),
      onClick: async (ref: any) => {
        const response = await api.Ser_CampaignDL_ExportExcelDL(ref.instance.getSelectedRowsData())
        if (response.isSuccess) {
          toast.success(t("ExportExcelSuccessfully"))
          window.location.href = response?.Data!;
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
      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref.current.instance.getSelectedRowsData().length >= 0) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
  ];

  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNetworkNavigate();
  const handleViewDetail = (code: string) => {
    navigate(`/service/QuanLyKyKhaoSat/${code}`);
  };

  const api = useClientgateApi();
  // const { data, onSave: onSaveState } = useStateR  estore<
  //   Partial<Sto_TranspReq_Search>
  // >("search-sto-transp-req", {});

  const handleSearch = (condition: Partial<Ser_CampaignDL_Search_Params>) => {
    searchCondition.current = condition;
    gridRef?.current?.refetchData();
  };

  const handleAddNew = () => {
    navigate("/admin/Ser_CampaignDL/new");
  };
  const fetchData = async () => {
    const response = await api.Ser_CampaignDL_SearchDL({
      ...searchCondition.current,
      Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef.current?.getDxInstance().pageSize() === 0 ? 100 : gridRef.current?.getDxInstance().pageSize(),
    })
    if (response?.isSuccess) {
      // setSelectedRowKeys([]);
      return response;
    }
  };

  const columns = [
    {
      dataField: "STT",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
    },
    {
      dataField: "CamNo",
      visible: true,
      caption: t("CamNo"),
      width: 200,
      minWidth: 200,
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
      dataField: "CamName",
      visible: true,
      caption: t("CamName"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "StartDate",
      visible: true,
      caption: t("StartDate"),
      width: 200,
      minWidth: 200,

    },
    {
      dataField: "FinishedDate",
      visible: true,
      caption: t("FinishedDate"),
      width: 200,
      minWidth: 200,
    },
    {
      dataField: "Note",
      visible: true,
      caption: t("Note"),
      width: 200,
      minWidth: 200,
    }
  ];

  const handleSelectionChanged = (e: any) => {
    // setSelectedRowKeys(e.selectedRowKeys);
  };

  // const { data: dealerList, isLoading: isGettingDealerList } = useQuery({
  //   queryKey: [
  //     QueryNames.DLR_CONTRACT_CANCEL,
  //     QueryNames.GET_DLR_CONTRACT_CANCEL,
  //     "dealer-list",
  //   ],
  //   queryFn: async () => {
  //     const response = await api.Mst_Dealer_GetAllActive();
  //     if (response.isSuccess) {
  //       return response.DataList;
  //     }
  //     showError({
  //       message: t(response._strErrCode),
  //       _strErrCode: response._strErrCode,
  //       _strTId: response._strTId,
  //       _strAppTId: response._strAppTId,
  //       _objTTime: response._objTTime,
  //       _strType: response._strType,
  //       _dicDebug: response._dicDebug,
  //       _dicExcs: response._dicExcs,
  //     });
  //     return null;
  //   },
  // });

  const render = useCallback(() => {
    return <></>;
  }, [fetchData]);

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("QuanLyChienDich")}</div>
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
                data={searchCondition.current}
                onSearch={handleSearch}
                // dealerList={dealerList || []}
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
                autoFetchData={false}
                allowSelection={true}
                isLoading={false}
                // onReady={(refValue: any) => {
                //   gridRef = refValue;
                // }}
                ref={gridRef}
                dataSource={[]}
                fetchData={fetchData}
                columns={columns}
                customToolbarItems={toolbarItems}
                // onSelectionChanged={handleSelectionChanged}
                keyExpr={"CamNo"}
                storeKey={"Ser_CampaignDL-order-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default Ser_CampaignDLPage;
