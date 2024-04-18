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
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { atom, useSetAtom } from "jotai";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@/packages/api";
import { Alignment, ToolbarItemProps } from "@/types";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import usePrint from "@/components/print/usePrint";
import { Link } from "@/packages/components/link/link";
import { nanoid } from "nanoid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { format, getHours, getMinutes } from "date-fns";
import { useDropzone } from "react-dropzone";

export const flagStoTranspReq = atom<boolean>(false);
interface HTCCapNhatNgayBaoHanh_Search {}

const ImportExcel = ({ onDrop }: { onDrop: any }) => {
  const { t } = useI18n("HTCCapNhatNgayBaoHanh");
  const { getRootProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <BButton className={"btn-browse-file"} label={t("ImportExcel")} />
      </div>
    </div>
  );
};

const HTCCapNhatNgayBaoHanhPage = () => {
  const { t } = useI18n("HTCCapNhatNgayBaoHanh");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const { quickPrint, previewPrint } = usePrint();
  const navigate = useNetworkNavigate();
  const onDrop = useCallback(async (acceptedFiles: any) => {
    // setIsLoading(true);
    // const responsive = await api.Car_VIN_ActualSpec_Upd_ImportCarHQ(
    //   acceptedFiles[0] ?? []
    // );
    // if (responsive.isSuccess) {
    //   toast.success(t("Upload successfully!"));
    //   handleSelectedCars(responsive.Data.Lst_Car_VIN);
    //   setIsLoading(false);
    // } else {
    //   showError({
    //     message: t(responsive._strErrCode),
    //     _strErrCode: responsive._strErrCode,
    //     _strTId: responsive._strTId,
    //     _strAppTId: responsive._strAppTId,
    //     _objTTime: responsive._objTTime,
    //     _strType: responsive._strType,
    //     _dicDebug: responsive._dicDebug,
    //     _dicExcs: responsive._dicExcs,
    //   });
    // }
    // setIsLoading(false);
  }, []);
  const handleImportExcel = async () => {
    toast.info("Export excel");
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
      dataField: "SoKhung",
      visible: true,
      caption: t("SoKhung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayBaoHanh",
      visible: true,
      caption: t("NgayBaoHanh"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
  ];
  const handleSelectionChanged = () => {};

  const toolbarItems: GridCustomToolBarItem[] = [
    {
      text: t(`Save`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          // handleDelete(ref.current.instance.getSelectedRowsData());
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
    {
      text: t(`Delete`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          // handleDelete(ref.current.instance.getSelectedRowsData());
        }
      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref?.current?.instance?.getSelectedRowsData().length > 0) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
  ];
  const subGridToolbars: ToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <ImportExcel onDrop={onDrop} />;
      },
    },
    {
      location: "before",
      render: () => {
        return <BButton label={t("ExportTemplate")} onClick={() => {}} />;
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
  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("HTCCapNhatNgayBaoHanh")}</div>
          <div className="pr-[20px]">
            <Button icon="refresh" onClick={() => toast.info("Refetch")} />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ScrollView height={"100%"}>
          {/* <OrderList /> */}
          <LoadPanel
            visible={isProcessing}
            showIndicator={true}
            showPane={true}
          />
          <GridViewOne
            ref={gridRef}
            editMode={false}
            autoFetchData={true}
            allowSelection={true}
            isLoading={false}
            dataSource={[
              {
                SoKhung: "Abc",
              },
            ]}
            // fetchData={fetchData}
            columns={columns}
            // toolbarItems={toolbarItems}
            toolbarItems={subGridToolbars}
            customToolbarItems={toolbarItems}
            onSelectionChanged={handleSelectionChanged}
            keyExpr={"Model"}
            storeKey={"HTCCapNhatNgayBaoHanh-list"}
          />
        </ScrollView>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default HTCCapNhatNgayBaoHanhPage;
