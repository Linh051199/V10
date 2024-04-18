import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  keywordAtom,
  selectedItemsAtom,
} from "src/pages/master/Mst_Province/components/screen-atom";
import { match } from "ts-pattern";

interface HeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
  setCondition: (keyword: string) => void;
  searchCondition: Partial<any>;
}

export const HeaderPart = ({
  onUploadFile,
  searchCondition,
  onDownloadTemplate,
  onAddNew,
  setCondition,
}: HeaderPartProps) => {
  const { t } = useI18n("Common");

  const selectedItems = useAtomValue(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);
  const setKeyword = useSetAtom(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const { pathname: currentPath } = useLocation();

  const handleSearch = (keyword: string) => {
    setCondition(keyword);
  };

  useEffect(() => {
    setKeyword("");
  }, [currentPath]);

  const handleExportExcel = async () => {
    const respone = await api.TST_Mst_Exchange_Unit_Export({
      TSTPartCode: searchCondition.current?.TSTPartCode ?? "",
    });
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

  return (
    <HeaderForm
      permissionCreate={""}
      permissionExportExecl={""}
      permissionImportExecl={""}
      permissionSearch={""}
      permissionMore={""}
      onSearch={handleSearch}
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
      placeholder={t("TSTPartCode")}
    />
  );
};
