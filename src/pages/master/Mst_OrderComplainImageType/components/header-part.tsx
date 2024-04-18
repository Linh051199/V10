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
import { usePermissions } from "@/packages/contexts/permission";
interface HeaderPartProps {
  searchCondition: Partial<any>;
  gridRef: any;
}
export const HeaderPart = ({ searchCondition, gridRef }: HeaderPartProps) => {
  const { t } = useI18n("Ser_Inv_Stock");
  const api = useClientgateApi();
  const { isHQ, isHTC, DealerCode } = usePermissions();

  const showError = useSetAtom(showErrorAtom);

  const handleExportExcel = async () => {
    const response = await api.Mst_OrderComplainImageType_Export({
      TSTPartCode: searchCondition.current?.TSTPartCode ?? "",

      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = response.Data;
    } else {
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">
          {t("Mst_OrderComplainImageType")}
        </div>
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
              {/* <DropDownButtonItem
                // visible={checkPermision("BTN_QUANTRI_QLDAILY_IMPORTEXCEL")}
                render={(item: any) => {
                  return <div>{uploadButton}</div>;
                }}
              /> */}
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
        {/* 
        {uploadDialog}
        {exportDialog} */}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
