import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";
import { useAtomValue, useSetAtom } from "jotai";
import { match } from "ts-pattern";
import { toast } from "react-toastify";

import { useI18n } from "@/i18n/useI18n";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import PermissionContainer from "@/components/PermissionContainer";
import { selectedItemsAtom } from "./store";
import { usePermissions } from "@/packages/contexts/permission";
interface HeaderPartProps {
  onAddNew: () => void;
  searchCondition: Partial<any>;
  handleRefetch: () => void;
  gridRef: any;
}
export const HeaderPartDL = ({
  onAddNew,
  searchCondition,
  handleRefetch,
  gridRef,
}: HeaderPartProps) => {
  const { t } = useI18n("Mst_DeliveryLocation");
  const api = useClientgateApi();
  const { isHQ, isHTC, DealerCode } = usePermissions();

  const selectedItems = useAtomValue(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  const onDownloadTemplate = async () => {
    const respone = await api.Ser_Inv_Stock_ExportTemplate();
    if (respone.isSuccess) {
      closeButton();
      handleRefetch();
      toast.success(t("Download successfully!"));
      window.location.href = respone.Data!;
    } else {
      showError({
        message: t(respone._strErrCode),
        _strErrCode: respone._strErrCode,
        _strTId: respone._strTId,
        _strAppTId: respone._strAppTId,
        _objTTime: respone._objTTime,
        _strType: respone._strType,
        _dicDebug: respone._dicDebug,
        _dicExcs: respone._dicExcs,
      });
    }
  };
  const handleUploadFiles = async (files: File[]) => {
    const respone = await api.Ser_Inv_Stock_Import(files[0]);
    if (respone.isSuccess) {
      closeButton();
      handleRefetch();
      toast.success(t("Upload successfully!"));
    } else {
      showError({
        message: t(respone._strErrCode),
        _strErrCode: respone._strErrCode,
        _strTId: respone._strTId,
        _strAppTId: respone._strAppTId,
        _objTTime: respone._objTTime,
        _strType: respone._strType,
        _dicDebug: respone._dicDebug,
        _dicExcs: respone._dicExcs,
      });
    }
  };

  const handleExportExcel = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Mst_DeliveryLocation_ExportHQ({
          DeliveryLocationCode:
            searchCondition.current?.DeliveryLocationCode ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          DeliveryLocationName:
            searchCondition.current?.DeliveryLocationName ?? "",
          FlagActive: searchCondition.current?.FlagActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Mst_DeliveryLocation_ExportDL({
          DeliveryLocationCode:
            searchCondition.current?.DeliveryLocationCode ?? "",
          DeliveryLocationName:
            searchCondition.current?.DeliveryLocationName ?? "",
          FlagActive: searchCondition.current?.FlagActive ?? "",
          DealerCode: DealerCode ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = resp.Data;
    }
  };

  const { uploadButton, uploadDialog, closeButton } = useUploadFile({
    handleUploadFiles,
    onDownloadTemplate,
    buttonClassName: "w-full",
  });
  const { exportButton, exportDialog } = useExportExcel({
    buttonClassName: "w-full",
    selectedItems,
    onExportExcel: handleExportExcel,
  });

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("Mst_DeliveryLocation")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <PermissionContainer
          permission={""}
          children={
            <DropDownButton
              showArrowIcon={false}
              keyExpr={"id"}
              className="menu-items"
              displayExpr={"text"}
              wrapItemText={false}
              dropDownOptions={{
                width: 200,
                wrapperAttr: {
                  class: "headerform__menuitems",
                },
              }}
              icon="/images/icons/more.svg"
            >
              <DropDownButtonItem
                // visible={checkPermision("BTN_QUANTRI_QLDAILY_EXPORTEXCEL")}
                render={(item: any) => {
                  // return <div>{exportButton}</div>;
                  return (
                    <Button
                      stylingMode="text"
                      hoverStateEnabled={false}
                      // className={buttonClassName}
                      onClick={handleExportExcel}
                      text={t("ExportExcel")}
                    />
                  );
                }}
              />
            </DropDownButton>
          }
        />

        {uploadDialog}
        {exportDialog}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
