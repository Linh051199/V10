import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { useI18n } from "@/i18n/useI18n";
import { toast } from "react-toastify";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import { useClientgateApi } from "@packages/api";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { logger } from "@packages/logger";
import { match } from "ts-pattern";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import PermissionContainer, {
  checkPermision,
} from "@/components/PermissionContainer";
import { selectedItemsAtom } from "./store";
import { usePermissions } from "@/packages/contexts/permission";
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
  const { t } = useI18n("TST_Mst_Part");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);
  const { isHQ } = usePermissions();

  const onDownloadTemplate = async () => {
    const respone = await api.TST_Mst_Part_ExportTemplate();
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
    const respone = await api.TST_Mst_Part_Import(files[0]);
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
        const response = await api.TST_Mst_Part_ExportHQ({
          TSTPartCode: searchCondition.current?.TSTPartCode ?? "",
          TSTPartName: searchCondition.current?.TSTPartName ?? "",
          GroupCode: searchCondition.current?.GroupCode ?? "",
          TypeCode: searchCondition.current?.TypeCode ?? "",
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.TST_Mst_Part_ExportDL({
          TSTPartCode: searchCondition.current?.TSTPartCode ?? "",
          TSTPartName: searchCondition.current?.TSTPartName ?? "",
          GroupCode: searchCondition.current?.GroupCode ?? "",
          TypeCode: searchCondition.current?.TypeCode ?? "",
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
        <div className="font-bold dx-font-m">{t("TST_Mst_Part")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        {/* <Button
        //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={t("AddNew")}
          onClick={onAddNew}
        /> */}

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
