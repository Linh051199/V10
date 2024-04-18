import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import { Button } from "devextreme-react";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { selectedItemsAtom } from "./store";
interface HeaderPartProps {
  onAddNew: () => void;
  searchCondition: Partial<any>;
  handleRefetch: () => void;
}
export const HeaderPart = ({
  onAddNew,
  searchCondition,
  handleRefetch,
}: HeaderPartProps) => {
  const { t } = useI18n("Mst_Compartment");
  const { t: common } = useI18n("Common");

  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);

  const onDownloadTemplate = async () => {};
  const handleUploadFiles = async (files: File[]) => {};

  const handleExportExcel = async (selectedOnly: boolean) => {
    const respone = await api.Mst_Compartment_ExportExcel(searchCondition);
    if (respone.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = respone.Data;
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
        <div className="font-bold dx-font-m">{t("Mst_Compartment")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <div className="flex items-center gap-[5px]">
          <Button
            stylingMode={"contained"}
            type="default"
            text={common("ExportExcel")}
            onClick={handleExportExcel}
          />
        </div>
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
