import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedItemsAtom } from "./../components/screen-atom";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { showErrorAtom } from "@packages/store";
import { useClientgateApi } from "@packages/api";
import { match } from "ts-pattern";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import { Button } from "devextreme-react";

interface HeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (
    file: File,
    progressCallback?: Function,
    onClose?: Function
  ) => void;
  onDownloadTemplate: () => void;
  searchCondition: any;
  setCondition: (keyword: string) => void;
}

export const HeaderPart = ({
  onUploadFile,
  onDownloadTemplate,
  onAddNew,
  searchCondition,
  setCondition,
}: HeaderPartProps) => {
  const { t } = useI18n("Ser_ServicePackage");

  const selectedItems = useAtomValue(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const handleSearch = (keyword: string) => {
    setCondition(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    // let respone = await match(selectedOnly)
    //   .with(true, async () => {
    //     return await api.Mst_AmplitudeApprOrd_ExportExcel(selectedItems);
    //   })
    //   .otherwise(async () => {
    //     return await api.Mst_AmplitudeApprOrd_ExportExcel(
    //       [],
    //       searchCondition?.current?.keyword || ""
    //     );
    //   });
    // if (respone.isSuccess) {
    //   toast.success(t("Download Successfully"));
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

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("Ser_ServicePackage")}</div>
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
        /> */}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
