import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import QuanLyPhieuTiepNhanGiaoXeHQManagementPage from "./orderList/QuanLyPhieuTiepNhanGiaoXe-HQ";
import QuanLyPhieuTiepNhanGiaoXeDLManagementPage from "./orderList/QuanLyPhieuTiepNhanGiaoXe-DL";
export const QuanLyPhieuTiepNhanGiaoXeManagerPage = () => {
  const { t } = useI18n("QuanLyPhieuTiepNhanGiaoXe");
  const { isHQ } = usePermissions();
  return isHQ() ? (
    <QuanLyPhieuTiepNhanGiaoXeDLManagementPage />
    ) : (
    <QuanLyPhieuTiepNhanGiaoXeHQManagementPage />
  )
};
