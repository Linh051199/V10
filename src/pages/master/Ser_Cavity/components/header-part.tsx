import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { checkPermision } from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { selectedItemsAtom } from "./dealer-store";
interface HeaderPartProps {
  onAddNew: () => void;
  searchCondition: Partial<any>;
  handleRefetch: () => void;
  gridRef: any;
}
export const HeaderPart = ({
  onAddNew,
  searchCondition,
  handleRefetch,
  gridRef,
}: HeaderPartProps) => {
  const { t } = useI18n("Ser_Cavity");
  const { t: common } = useI18n("Common");

  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);
  const { isHQ } = usePermissions();

  const onDownloadTemplate = async () => {
    const respone = await api.Ser_Mst_Supplier_ExportTemplate();
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
    const respone = await api.Ser_Mst_Supplier_Import(files[0]);
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
        const response = await api.Ser_Mst_Supplier_ExportHQ({
          IsActive: searchCondition.current?.IsActive ?? "",
          SupplierID: searchCondition.current?.SupplierID ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          SupplierCode: searchCondition.current?.SupplierCode ?? "",
          SupplierName: searchCondition.current?.SupplierName ?? "",
          Address: searchCondition.current?.Address ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Mst_Supplier_ExportDL({
          IsActive: searchCondition.current?.IsActive ?? "",
          SupplierID: searchCondition.current?.SupplierID ?? "",
          SupplierCode: searchCondition.current?.SupplierCode ?? "",
          SupplierName: searchCondition.current?.SupplierName ?? "",
          Address: searchCondition.current?.Address ?? "",
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
        <div className="font-bold dx-font-m">{t("Ser_Cavity")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          visible={checkPermision("")}
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={common("AddNew")}
          onClick={onAddNew}
        />

        {/* <Button
          //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
          stylingMode={"contained"}
          type="default"
          text={common("ExportExcel")}
          onClick={handleExportExcel}
        />

        {uploadDialog}
        {exportDialog} */}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
