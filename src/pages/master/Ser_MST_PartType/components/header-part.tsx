import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { keywordAtom, selectedItemsAtom } from "./Ser_MST_PartType";
import { usePermissions } from "@/packages/contexts/permission";
import { HeaderForm } from "./header-form";

interface HeaderPartProps {
  setCondition: (keyword: string) => void;
  searchCondition: any;
}

export const HeaderPart = ({
  setCondition,
  searchCondition,
}: HeaderPartProps) => {
  const { t } = useI18n("Ser_MST_PartType");
  const { isHQ } = usePermissions();
  const selectedItems = useAtomValue(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const handleSearch = (keyword: string) => {
    setCondition(keyword);
  };

  const handleExportExcel = async (selectedOnly: boolean) => {
    let respone = await match(selectedOnly)
      .with(true, async () => {
        return await api.Ser_MST_PartType_ExportByListCode(selectedItems);
      })
      .otherwise(async () => {
        if (isHQ()) {
          return await api.Ser_MST_PartType_ExportExcelHQ(
            searchCondition.current.keyword
          );
        } else {
          return await api.Ser_MST_PartType_ExportExcelDL(
            searchCondition.current.keyword
          );
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

  return (
    <HeaderForm
      permissionSearch={""}
      onSearch={handleSearch}
      selectedItems={selectedItems}
    />
  );
};
