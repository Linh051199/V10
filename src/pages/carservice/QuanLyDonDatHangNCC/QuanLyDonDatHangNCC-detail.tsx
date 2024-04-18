import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { QuanLyDonDatHangNCCCreateNew } from "./create-new/create-new";
import { QuanLyDonDatHangNCCDetailView } from "./view/view";

export const QuanLyDonDatHangNCCDetailPage = () => {
  const { t } = useI18n("QuanLyDonDatHangNCC");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? (
    <QuanLyDonDatHangNCCCreateNew />
  ) : (
    <QuanLyDonDatHangNCCDetailView />
  );
};
