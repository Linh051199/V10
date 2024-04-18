import { useI18n } from "@/i18n/useI18n";
import { usePermissions } from "@/packages/contexts/permission";
import { useParams } from "react-router-dom";
import QuanLyYeuCauPDICreate from "./create-new/create-new";
import QuanLyYeuCauPDIDetail from "./detail/QuanLyYeuCauPDIDetail";

export const QuanLyYeuCauPDIDetailPage = () => {
  const { t } = useI18n("QuanLyYeuCauPDI");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? <QuanLyYeuCauPDICreate /> : <QuanLyYeuCauPDIDetail />;
};
