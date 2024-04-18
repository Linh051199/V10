import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { useI18n } from "@/i18n/useI18n";
import { toast } from "react-toastify";
import { useUploadFile } from "@packages/ui/upload-file/use-upload-file";
import { useExportExcel } from "@packages/ui/export-excel/use-export-excel";
import notify from "devextreme/ui/notify";
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
import { selectedItemsAtom } from "./dealer-store";
import { usePermissions } from "@/packages/contexts/permission";
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
  const { t } = useI18n("Ser_Mst_SupplierManagement");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);
  const { isHQ } = usePermissions();

  // const onDownloadTemplate = async () => {
  //   const respone = await api.Ser_Mst_Supplier_ExportTemplate();
  //   if (respone.isSuccess) {
  //     closeButton();
  //     handleRefetch();
  //     toast.success(t("Download successfully!"));
  //     window.location.href = respone.Data!;
  //   } else {
  //     showError({
  //       message: t(respone._strErrCode),
  //       _strErrCode: respone._strErrCode,
  //       _strTId: respone._strTId,
  //       _strAppTId: respone._strAppTId,
  //       _objTTime: respone._objTTime,
  //       _strType: respone._strType,
  //       _dicDebug: respone._dicDebug,
  //       _dicExcs: respone._dicExcs,
  //     });
  //   }
  // };
  // const handleUploadFiles = async (files: File[]) => {
  //   const respone = await api.Ser_Mst_Supplier_Import(files[0]);
  //   if (respone.isSuccess) {
  //     closeButton();
  //     handleRefetch();
  //     toast.success(t("Upload successfully!"));
  //   } else {
  //     showError({
  //       message: t(respone._strErrCode),
  //       _strErrCode: respone._strErrCode,
  //       _strTId: respone._strTId,
  //       _strAppTId: respone._strAppTId,
  //       _objTTime: respone._objTTime,
  //       _strType: respone._strType,
  //       _dicDebug: respone._dicDebug,
  //       _dicExcs: respone._dicExcs,
  //     });
  //   }
  // };

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

  // const { uploadButton, uploadDialog, closeButton } = useUploadFile({
  //   // handleUploadFiles,
  //   // onDownloadTemplate,
  //   buttonClassName: "w-full",
  // });
  const { exportButton, exportDialog } = useExportExcel({
    buttonClassName: "w-full",
    selectedItems,
    onExportExcel: handleExportExcel,
  });

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">
          {t("Ser_Mst_SupplierManagement")}
        </div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          visible={checkPermision("")}
          icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={t("AddNew")}
          onClick={onAddNew}
        />

        <Button
          visible={checkPermision("")}
          // icon="/images/icons/plus-circle.svg"
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcel")}
          onClick={handleExportExcel}
        />

        {/* <PermissionContainer
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
                visible={checkPermision("")}
                render={(item: any) => {
                  return <div>{exportButton}</div>;
                }}
              />
            </DropDownButton>
          }
        /> */}

        {/* {uploadDialog} */}
        {exportDialog}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
