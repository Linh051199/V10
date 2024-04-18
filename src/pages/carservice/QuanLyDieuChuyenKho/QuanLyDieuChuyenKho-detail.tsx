import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { SoPhieuDieuChuyenCreateNew } from "./create-new/create-new";


export const QuanLyBanTinKyThuatDetailPage = () => {
  const { t } = useI18n("QuanLyBanTinKyThuat");
  const { isHQ } = usePermissions();
  const params = useParams();
  return <SoPhieuDieuChuyenCreateNew />;
};
