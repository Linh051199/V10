import { useI18n } from "@/i18n/useI18n";
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { Button } from "devextreme-react/button";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { List, LoadPanel, ScrollView } from "devextreme-react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { atom, useSetAtom } from "jotai";
import { match } from "ts-pattern";
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
import { format, getHours, getMinutes } from "date-fns";

export const flagStoTranspReq = atom<boolean>(false);
interface TrangThaiDichVuChoKH_Search {}

const DUMMY_DATA: any = {
  DataList: [
    {
      Model: "Test1",
      BienSo: "Test1",
      TinhTrang: "Test1",
      HenGioGiaoXe: "Test1",
    },
    {
      Model: "Test2",
      BienSo: "Test2",
      TinhTrang: "Test2",
      HenGioGiaoXe: "Test2",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};

const TrangThaiDichVuChoKHPage = () => {
  const { t } = useI18n("TrangThaiDichVuChoKH");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const { quickPrint, previewPrint } = usePrint();
  const searchCondition = useRef<Partial<TrangThaiDichVuChoKH_Search>>({
    CBReqNo: "", //		Số lệnh điều chuyển
    VIN: "", //		VIN
    CBReqStatus: "", //		Trạng thái
    CreatedDateFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
    // CreatedDateFrom: "", // Ngày tạo từ
    // CreatedDateTo: "", // Ngày tạo đến
    StorageCodeTo: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 1000,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    navigate(
      `/sales/StoCBReq/manageStoCBReq/${code}?${searchCondition.current.FlagDataWH}`
    );
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<TrangThaiDichVuChoKH_Search>
  >("search-sto-cb-req-v2", {});

  const handleSearch = (condition: Partial<TrangThaiDichVuChoKH_Search>) => {
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
    // const resp = await api.TrangThaiDichVuChoKH_SearchHQ({
    //   ...searchCondition.current,
    //   Ft_PageIndex: gridRef.current.getDxInstance().pageIndex() ?? 0,
    //   Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 1000,
    // });
    let resp: any = {
      isSuccess: true,
    };

    if (resp?.isSuccess) {
      // setSelectedRowKeys([]);
      //   return resp;
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
    },
    {
      dataField: "BienSo",
      visible: true,
      caption: t("BienSo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "TinhTrang",
      visible: true,
      caption: t("TinhTrang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: false },
      multiRowEditorOptions: {},
    },

    {
      dataField: "HenGioGiaoXe",
      caption: t("HenGioGiaoXe"),
      visible: true,
      width: 200,
      alignment: "center" as Alignment,
    },
  ];
  const handleSelectionChanged = () => {};

  const toolbarItems: GridCustomToolBarItem[] = [
    // {
    //   location: "before",
    //   render: (gridRef: any) => (
    //     <ExportExcelButton onClick={handleExportExcel} />
    //   ),
    // },
  ];

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TrangThaiDichVuChoKH")}</div>
          <div className="pr-[20px]">
            <Button icon="refresh" onClick={() => toast.info("Refetch")} />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <div className="flex justify-between py-[20px]">
          <div>
            <p className="font-black text-3xl">{`${format(
              new Date(),
              "yyyy-MM-dd"
            )}`}</p>
          </div>
          <div>
            <div>
              <p className="font-black text-4xl text-sky-500">
                {t(`${"TrangThaiDichVu"}`)}
              </p>
              <p className="text-center text-[16px] ">{t(`${"Page"}`)}: 1/0</p>
            </div>
          </div>
          <div>
            <p className="font-black text-3xl">
              {getHours(new Date())}:
              {`${
                getMinutes(new Date()) < 10
                  ? `0${getMinutes(new Date())}`
                  : getMinutes(new Date())
              }`}
            </p>
          </div>
        </div>
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
            keyExpr={"Model"}
            storeKey={"TrangThaiDichVuChoKH-list"}
          />
        </ScrollView>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default TrangThaiDichVuChoKHPage;
