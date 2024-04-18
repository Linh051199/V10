import { useI18n } from "@/i18n/useI18n";
import { usePermissions } from "@/packages/contexts/permission";
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
  // onUploadFile?: (file: File, progressCallback?: Function) => void;
  // onDownloadTemplate: () => void;
  setCondition: (keyword: string) => void;
  searchCondition: any;
}

export const HeaderPart = ({
  // onUploadFile,
  searchCondition,
  // onDownloadTemplate,
  onAddNew,
  setCondition,
}: HeaderPartProps) => {
  const { t } = useI18n("Common");

  const selectedItems = useAtomValue(selectedItemsAtom);
  const keyword = useAtomValue(keywordAtom);
  const setKeyword = useSetAtom(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const { isHQ } = usePermissions();

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
    let respone =
      // await match(isHQ)
      //   .with(true, async () => {
      //     console.log("vào HQ");
      //     return await api.Ser_MST_ServiceType_ExportHQ({
      //       TypeID: "",
      //       TypeName: searchCondition.current.TypeName ?? "",
      //       DealerCode: searchCondition.current.DealerCode ?? "",
      //     });
      //   })
      //   .otherwise(async () => {
      //     console.log("vào DL");
      //     return
      await api.Ser_MST_ServiceType_ExportDL({
        TypeID: "",
        TypeName: searchCondition.current.TypeName ?? "",
      });
    // });
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
      permissionCreate={""}
      // permissionExportExecl={"none"}
      // permissionImportExecl={"none"}
      permissionSearch={""}
      permissionMore={"none"}
      onSearch={handleSearch}
      onAddNew={onAddNew}
      rightButtonSearch
      // onUploadFile={onUploadFile}
      // onExportExcel={handleExportExcel}
      // onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
      placeholder={t("TypeName")}
    />
  );
};
