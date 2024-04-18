import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedItemsAtom } from "./../components/screen-atom";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { showErrorAtom } from "@packages/store";
import { useClientgateApi } from "@packages/api";
import { match } from "ts-pattern";

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
    <HeaderForm
      //   permissionCreate={"BTN_QUANTRI_QLTILEDATHANGKEHOACH_CREATE"}
      //   permissionExportExecl={"BTN_QUANTRI_QLTILEDATHANGKEHOACH_EXPORTEXCEL"}
      //   permissionImportExecl={"BTN_QUANTRI_QLTILEDATHANGKEHOACH_IMPORTEXCEL"}
      //   permissionSearch={""}
      //   permissionMore={""}
      onSearch={handleSearch}
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
    />
  );
};
