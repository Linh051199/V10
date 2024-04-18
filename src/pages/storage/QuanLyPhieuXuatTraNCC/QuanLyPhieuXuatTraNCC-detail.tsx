import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { QuanLyPhieuXuatTraNCCCreateNew } from "./create-new/create-new";
import { QuanLyPhieuXuatTraNCCView } from "./view/view";


export const QuanLyPhieuXuatTraNCCDetailPage = () => {
  const { t } = useI18n("QuanLyPhieuXuatTraNCC");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? <QuanLyPhieuXuatTraNCCCreateNew /> : <QuanLyPhieuXuatTraNCCView />;
};
