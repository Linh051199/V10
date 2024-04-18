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
import { QueryNames } from "./QuanLyKyKhaoSat-common";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QuanLyKyKhaoSat_Search_Params } from "@/packages/types/carservice/QuanLyKyKhaoSat";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

export const flagStoTranspReq = atom<boolean>(false);

const QuanLyKyKhaoSatManagementPage = () => {
  const { t } = useI18n("QuanLyKyKhaoSat");
  const windowSize = useWindowSize();
  let gridRef: any = useRef(null);
  const showError = useSetAtom(showErrorAtom);
  // const selectionKeysAtom = useAtomValue(customizeGridSelectionKeysAtom);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const queryClient = useQueryClient()
  const searchCondition = useRef<Partial<QuanLyKyKhaoSat_Search_Params>>({
    MaDotKhaoSat: "",
    TrangThaiActive: "",
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const { isHQ } = usePermissions();
  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: t(`ExportExcel`),
      onClick: async (ref: any) => {
        // const response = await api.FrmMngDlr_PDIRequest_ApproveDL(ref.instance.getSelectedRowsData())
        // if (response.isSuccess) {
        //   toast.success(t("ApproveDLSuccessfully"))
        //   queryClient.removeQueries([QueryNames.DLR_CONTRACT_CANCEL])
        //   navigate(-1)
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
      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref.current.instance.getSelectedRowsData().length > 0) {
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

  const handleSearch = (condition: Partial<QuanLyKyKhaoSat_Search_Params>) => {
    // if (condition.CreatedDateFromTo && condition.CreatedDateFromTo.length > 0) {
    //   condition.CreatedDateFrom = condition.CreatedDateFromTo[0]
    //     ? formatDate(condition.CreatedDateFromTo[0])
    //     : undefined;
    //   condition.CreatedDateTo = condition.CreatedDateFromTo[1]
    //     ? formatDate(condition.CreatedDateFromTo[1])
    //     : undefined;
    // }
    searchCondition.current = condition;
    gridRef?.current?.refetchData();
  };

  const handleAddNew = () => {
    navigate("/service/QuanLyKyKhaoSat/new");
  };
  const fetchData = async () => {
    // const resp = await match(isHQ())
    //   .with(true, async () => {
    //     const response = await api.FrmMngDlr_PDIRequest_SearchHQ({
    //       ...searchCondition.current,
    //       Ft_PageIndex: gridRef.current?.instance.pageIndex() ?? 0,
    //       Ft_PageSize: gridRef.current?.instance.pageSize() === 0 ? 100 : gridRef.current?.instance.pageSize(),
    //     },
    //       isHQ());
    //     const condition = {
    //       ...response,
    //       ...response.Data
    //     }
    //     delete condition.Data;
    //     return condition;
    //   })
    //   .otherwise(async () => {
    //     const response = await api.FrmMngDlr_PDIRequest_SearchHQ({
    //       ...searchCondition.current,
    //       Ft_PageIndex: gridRef.current?.instance.pageIndex() ?? 0,
    //       Ft_PageSize: gridRef.current?.instance.pageSize() === 0 ? 100 : gridRef.current?.instance.pageSize(),
    //     },
    //       isHQ());
    //     const condition = {
    //       ...response,
    //       ...response.Data
    //     }
    //     console.log(212, condition)
    //     delete condition.Data;
    //     return condition;
    //   });
    // if (resp?.isSuccess) {
    //   // setSelectedRowKeys([]);
    //   return resp;
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
      dataField: "MaKyKhaoSat",
      visible: true,
      caption: t("MaKyKhaoSat"),
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
      dataField: "NoiDung",
      visible: true,
      caption: t("NoiDung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "ThoiGianBatDau",
      visible: true,
      caption: t("ThoiGianBatDau"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,

    },
    {
      dataField: "ThoiGianKetThuc",
      visible: true,
      caption: t("ThoiGianKetThuc"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "TrangThaiKhaoSat",
      visible: true,
      caption: t("TrangThaiKhaoSat"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    }
  ];

  const handleSelectionChanged = (e: any) => {
    // setSelectedRowKeys(e.selectedRowKeys);
  };

  const { data: dealerList, isLoading: isGettingDealerList } = useQuery({
    queryKey: [
      QueryNames.DLR_CONTRACT_CANCEL,
      QueryNames.GET_DLR_CONTRACT_CANCEL,
      "dealer-list",
    ],
    queryFn: async () => {
      const response = await api.Mst_Dealer_GetAllActive();
      if (response.isSuccess) {
        return response.DataList;
      }
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
      return null;
    },
  });

  const render = useCallback(() => {
    return <></>;
  }, [fetchData]);

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("QuanLyKyKhaoSat")}</div>
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
                dealerList={dealerList || []}
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
                dataSource={[{
                  MaKyKhaoSat: "abc"
                }]}
                // fetchData={fetchData}
                columns={columns}
                customToolbarItems={toolbarItems}
                // onSelectionChanged={handleSelectionChanged}
                keyExpr={"MaKyKhaoSat"}
                storeKey={"QuanLyKyKhaoSat-order-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default QuanLyKyKhaoSatManagementPage;
