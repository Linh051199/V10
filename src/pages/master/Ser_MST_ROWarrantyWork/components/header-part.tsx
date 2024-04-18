import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { selectedItemsAtom } from "./store";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import './header-part.scss'
interface HeaderPartProps {
  onAddNew?: () => void;
  searchCondition: Partial<any>;
  handleRefetch: () => void;
  rightButtons?: BButtonProps[];
}
export const HeaderPart = ({
  onAddNew,
  searchCondition,
  handleRefetch,
  rightButtons
}: HeaderPartProps) => {
  const { t } = useI18n("Ser_MST_ROWarrantyWorkPage");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);

  const onDownloadTemplate = async () => {
    const respone = await api.Ser_MST_ROWarrantyWork_ExportExcelTpl();
    if (respone.isSuccess) {
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
    const respone = await api.Ser_MST_ROComplaintDiagnosticError_UploadFile(files[0]);
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

  const handleExportExcel = async (selectedOnly: boolean) => {
    const respone = await api.Ser_MST_ROComplaintDiagnosticError_ExportExcel(
      searchCondition
    );
    if (respone.isSuccess) {
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

  // return (
  //   <PageHeaderNoSearchLayout>
  //     <PageHeaderNoSearchLayout.Slot name={"Before"}>
  //       <div className="font-bold dx-font-m">
  //         {t("Ser_MST_ROComplaintDiagnosticError")}
  //       </div>
  //     </PageHeaderNoSearchLayout.Slot>
  //     <PageHeaderNoSearchLayout.Slot name={"After"}>
  //       <div>
  //         {uploadButtonV2}
  //       </div>
  //       <div>
  //         {exportButtonV2}
  //       </div>
  //       {uploadDialog}
  //       {exportDialog}
  //     </PageHeaderNoSearchLayout.Slot>
  //   </PageHeaderNoSearchLayout>
  // );

  const rightButtonV2: BButtonProps[] = [
    {
      label: t(`${""}`),
      className: "select-button",
      type: "normal",
      stylingMode: "outlined",
      render: () => {
        return <span> {uploadButton} </span>
      }
    },
    {
      // label: t(`${"ExportExcel"}`),
      className: "select-button",
      type: "normal",
      stylingMode: "outlined",
      render: () => {
        return <span> {exportButton} </span>
      }
    }
  ]

  return (
    <>
      <div className="w-full flex items-center justify-between h-[55px] p-2 ml-[16px] page-header">
        <div className={"flex items-center justify-center"}>
          <div className="font-bold dx-font-m">
            {t("Ser_MST_ROWarrantyWorkPage")}
          </div>
        </div>
        <div className="button-header__show-drop">
          {rightButtonV2.map((button, idx) => (
            <BButton key={idx} {...button} />
          ))}
        </div>

      </div>
      {uploadDialog}
      {exportDialog}
    </>
  );
};
