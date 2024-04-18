import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { QuanLyKyKhaoSatViewDetail } from "./QuanLyKyKhaoSat/QuanLyKyKhaoSatViewDetail";
import { QuanLyKyKhaoSatCreateNew } from "./create-new/create-new";
export const QuanLyKyKhaoSatDetailPage = () => {
  const { t } = useI18n("QuanLyKyKhaoSat");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? (
    isHQ() ? (
      <QuanLyKyKhaoSatCreateNew />
    ) : (
      <></>
    )
  ) :
    <QuanLyKyKhaoSatViewDetail />
};
