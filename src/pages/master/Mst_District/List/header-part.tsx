import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";
import { showErrorAtom } from "@packages/store";
import { useClientgateApi } from "@packages/api";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { match } from "ts-pattern";

interface HeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
  setCondition: (keyword: string) => void;
  searchCondition: any;
}

export const HeaderPart = ({
  onUploadFile,
  onDownloadTemplate,
  onAddNew,
  searchCondition,
  setCondition,
}: HeaderPartProps) => {
  const { t } = useI18n("Common");
  const selectedItems = useAtomValue(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);
  const setKeyword = useSetAtom(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const handleSearch = (keyword: string) => {
    setCondition(keyword);
  };

  // const handleExportExcel = async (selectedOnly: boolean) => {
  //   const respone = await api.Mst_District_ExportExcel(
  //     selectedItems,
  //     keyword || ""
  //   );
  //   if (respone.isSuccess) {
  //     toast.success(t("Download Successfully"));
  //     window.location.href = respone.Data;
  //   } else {
  //     showError({
  //       message: t(respone.errorCode),
  //       debugInfo: respone.debugInfo,
  //       errorInfo: respone.errorInfo,
  //     });
  //   }
  // };

  const handleExportExcel = async (selectedOnly: boolean) => {
    let respone = await match(selectedOnly)
      .with(true, async () => {
        return await api.Mst_District_ExportExcel(
          selectedItems,
          searchCondition?.current?.keyword || ""
        );
      })
      .otherwise(async () => {
        return await api.Mst_District_ExportExcel(
          [],
          searchCondition?.current?.keyword || ""
        );
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

  return (
    <HeaderForm
      permissionCreate={"BTN_QUANTRI_QLQUAN/HUYEN_CREATE"}
      permissionExportExecl={"BTN_QUANTRI_QLQUAN/HUYEN_EXPORTEXCEL"}
      permissionImportExecl={"BTN_QUANTRI_QLQUAN/HUYEN_IMPORTEXCEL"}
      permissionSearch={""}
      permissionMore={""}
      onSearch={handleSearch}
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
    />
  );
};
