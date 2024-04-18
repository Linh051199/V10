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
  const { t } = useI18n("QuanLyChamSocKhachHang24h");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);

  const onDownloadTemplate = async () => {
    // const respone = await api.Mst_Dealer_ExportTemplate();
    // if (respone.isSuccess) {
    //   closeButton();
    //   handleRefetch();
    //   toast.success(t("Download successfully!"));
    //   window.location.href = respone.Data!;
    // } else {
    //   showError({
    //     message: t(respone._strErrCode),
    //     _strErrCode: respone._strErrCode,
    //     _strTId: respone._strTId,
    //     _strAppTId: respone._strAppTId,
    //     _objTTime: respone._objTTime,
    //     _strType: respone._strType,
    //     _dicDebug: respone._dicDebug,
    //     _dicExcs: respone._dicExcs,
    //   });
    // }
    toast.warning("Chưa có api nhé!");
  };
  const handleUploadFiles = async (files: File[]) => {
    // const respone = await api.Mst_Dealer_Import(files[0]);
    // if (respone.isSuccess) {
    //   closeButton();
    //   handleRefetch();
    //   toast.success(t("Upload successfully!"));
    // } else {
    //   showError({
    //     message: t(respone._strErrCode),
    //     _strErrCode: respone._strErrCode,
    //     _strTId: respone._strTId,
    //     _strAppTId: respone._strAppTId,
    //     _objTTime: respone._objTTime,
    //     _strType: respone._strType,
    //     _dicDebug: respone._dicDebug,
    //     _dicExcs: respone._dicExcs,
    //   });
    // }
    toast.warning("Chưa có api nhé!");
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    // let respone = await match(selectedOnly)
    //   .with(true, async () => {
    //     return await api.Mst_Dealer_Export(
    //       selectedItems,
    //       searchCondition?.current?.keyword || ""
    //     );
    //   })
    //   .otherwise(async () => {
    //     return await api.Mst_Dealer_Export(
    //       [],
    //       searchCondition?.current?.keyword || ""
    //     );
    //   });
    // if (respone.isSuccess) {
    //   toast.success(t("Download successfully!"));
    //   window.location.href = respone.Data;
    // } else {
    //   showError({
    //     message: t(respone._strErrCode),
    //     _strErrCode: respone._strErrCode,
    //     _strTId: respone._strTId,
    //     _strAppTId: respone._strAppTId,
    //     _objTTime: respone._objTTime,
    //     _strType: respone._strType,
    //     _dicDebug: respone._dicDebug,
    //     _dicExcs: respone._dicExcs,
    //   });
    // }
    toast.warning("Chưa có api nhé!");
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
        <div className="font-bold dx-font-m">
          {t("QuanLyChamSocKhachHang24h")}
        </div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={t("AddNew")}
          onClick={onAddNew}
        />

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
                // visible={checkPermision("BTN_QUANTRI_QLDAILY_IMPORTEXCEL")}
                render={(item: any) => {
                  return <div>{uploadButton}</div>;
                }}
              />
              <DropDownButtonItem
                // visible={checkPermision("BTN_QUANTRI_QLDAILY_EXPORTEXCEL")}
                render={(item: any) => {
                  return <div>{exportButton}</div>;
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
