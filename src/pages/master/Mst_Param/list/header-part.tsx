import { useI18n } from "@/i18n/useI18n";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";

interface HeaderPartProps {
  onAddNew?: () => void;
  onUploadFile?: (file: File, progressCallback?: Function) => void;
  onDownloadTemplate: () => void;
  setCondition: (keyword: string) => void;
  searchCondition: Partial<any>;
  onExportExcel: any;
}

export const HeaderPart = ({
  onUploadFile,
  searchCondition,
  onDownloadTemplate,
  onAddNew,
  setCondition,
  onExportExcel,
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

  const { isHQ } = usePermissions();

  useEffect(() => {
    setKeyword("");
  }, [currentPath]);

  return <> </>;
};
