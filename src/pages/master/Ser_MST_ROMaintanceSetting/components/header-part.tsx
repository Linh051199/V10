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
import { selectedItemsAtom } from "./store";
import { HeaderForm } from "@/packages/ui/header-form/header-form";
interface HeaderPartProps {
  onAddNew: () => void;
  searchCondition: Partial<any>;
  setCondition: any
  handleRefetch: () => void;
  onExportExcel: () => void
}
export const HeaderPart = ({
  onAddNew,
  searchCondition,
  handleRefetch,
  setCondition,
  onExportExcel
}: HeaderPartProps) => {
  const { t } = useI18n("Ser_MST_ROMaintanceSetting");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const selectedItems = useAtomValue(selectedItemsAtom);

  const handleSearch = (keyword: string) => {
    setCondition(keyword);
  };

  return (
    <HeaderForm
      permissionCreate={""}
      permissionExportExecl={""}
      permissionImportExecl={"none"}
      permissionSearch={""}
      permissionMore={""}
      cssClass={''}
      onSearch={handleSearch}
      onAddNew={onAddNew}
      // onUploadFile={onUploadFile}
      onExportExcel={onExportExcel}
      // onDownloadTemplate={onDownloadTemplate}
      selectedItems={selectedItems}
      placeholder={t("Km")}
    />
  );
};
