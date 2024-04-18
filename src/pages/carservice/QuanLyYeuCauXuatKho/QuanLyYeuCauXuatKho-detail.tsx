import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import QuanLyYeuCauXuatKhoCreate from "./create-new/create-new";

export const QuanLyYeuCauXuatKhoDetailPage = () => {
  const { t } = useI18n("QuanLyYeuCauXuatKho");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? (
    <QuanLyYeuCauXuatKhoCreate />
  ) : (
    <div></div>
  )
};
