import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { useI18n } from "@/i18n/useI18n";
import { toast } from "react-toastify";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import notify from "devextreme/ui/notify";
import { useClientgateApi } from "@packages/api";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { match } from "ts-pattern";
import PermissionContainer, {
  checkPermision,
} from "@/components/PermissionContainer";
import { Search_Ser_MST_CustomerType } from "@/packages/types/master/Ser_MST_CustomerType";
import { usePermissions } from "@/packages/contexts/permission";
import { selectedItemsAtom } from "./ser-mst-customertype";

interface HeaderPartProps {
  onAddNew: () => void;
  searchCondition: Partial<Search_Ser_MST_CustomerType>;
  handleRefetch: () => void;
}
export const HeaderPart = ({
  onAddNew,
  searchCondition,
  handleRefetch,
}: HeaderPartProps) => {
  const { t } = useI18n("Ser_MST_CustomerType");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems: any = useAtomValue(selectedItemsAtom);
  const { isHQ } = usePermissions();
  // ==============
  const onDownloadTemplate = async () => {
    const respone = await api.Ser_MST_CustomerType_Export_Template();
    if (respone.isSuccess) {
      closeButton();
      handleRefetch();
      toast.success(t("Download Successfully"));
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

  const handleUploadFiles = async (files: File[]) => {
    const respone = await api.Ser_MST_CustomerType_Upload(files[0]);
    if (respone.isSuccess) {
      closeButton();
      handleRefetch();
      notify(t("Upload Successfully"), "success");
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
    // debugger;
    let respone = await match(selectedOnly)
      // mặc định đang ra false mặc dù đã tick check
      .with(true, async () => {
        return await api.Ser_MST_CustomerType_ExportByListCusTypeID(
          selectedItems
        );
      })
      .otherwise(async () => {
        if (isHQ()) {
          return await api.Ser_MST_CustomerType_ExportHQ({
            ...searchCondition,
          });
        } else {
          return await api.Ser_MST_CustomerType_ExportDL({
            ...searchCondition,
          });
        }
      });
    if (respone.isSuccess) {
      toast.success(t("Download Successfully"));
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

  // ==============

  const { uploadButton, uploadDialog, closeButton } = useUploadFile({
    handleUploadFiles, // type [], sửa hàm upload files nhiều thay vì chỉ 1
    onDownloadTemplate,
    buttonClassName: "w-full",
  });

  const { exportButton, exportDialog } = useExportExcel({
    buttonClassName: "w-full",
    selectedItems, // lấy ra giá trị khi check box columns
    onExportExcel: handleExportExcel,
  });

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">
          {t("Ser_MST_CustomerType Management")}
        </div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          visible={checkPermision("")} // BTN_QUANTRI_QLTAIKHOANNGANHANG_CREATE
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={t("Add New")}
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
                visible={checkPermision("")} // BTN_QUANTRI_QLTAIKHOANNGANHANG_IMPORTEXCEL
                render={(item: any) => {
                  return <div>{uploadButton}</div>;
                }}
              />
              <DropDownButtonItem
                visible={checkPermision("")} // BTN_QUANTRI_QLTAIKHOANNGANHANG_EXPORTEXCEL
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
