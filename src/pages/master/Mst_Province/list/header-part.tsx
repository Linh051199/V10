import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { HeaderForm } from "@packages/ui/header-form/header-form";
import { useAtomValue, useSetAtom } from "jotai";
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
  searchCondition: any;
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
  const handleSearch = (keyword: string) => {
    setCondition(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    // const respone = await api.Mst_Province_ExportByListProvinceCode(
    //   selectedItems,
    //   keyword || ""
    // );
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
    let respone = await match(selectedOnly)
      .with(true, async () => {
        return await api.Mst_Province_ExportByListProvinceCode(
          selectedItems,
          searchCondition?.current?.keyword || ""
        );
      })
      .otherwise(async () => {
        return await api.Mst_Province_ExportByListProvinceCode(
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
      permissionCreate={"BTN_QUANTRI_QLTINHTP_CREATE"}
      permissionExportExecl={"BTN_QUANTRI_QLTINHTP_EXPORTEXCEL"}
      permissionImportExecl={"BTN_QUANTRI_QLTINHTP_IMPORTEXCEL"}
      permissionSearch={""}
      permissionMore={""}
      onSearch={handleSearch}
      onAddNew={onAddNew}
      onUploadFile={onUploadFile}
      onExportExcel={handleExportExcel}
      onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
      placeholder={t("SearchByProvinceName")}
    />
  );
};
