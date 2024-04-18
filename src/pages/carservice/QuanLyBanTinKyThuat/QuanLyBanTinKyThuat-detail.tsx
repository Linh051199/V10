import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { QuanLyBanTinKyThuatCreateNew } from "./create-new/create-new";
import { QuanLyBanTinKyThuatDetailView } from "./view/view";

export const QuanLyBanTinKyThuatDetailPage = () => {
  const { t } = useI18n("QuanLyBanTinKyThuat");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? (
    <QuanLyBanTinKyThuatCreateNew />
  ) : (
    <QuanLyBanTinKyThuatDetailView />
  );
};
