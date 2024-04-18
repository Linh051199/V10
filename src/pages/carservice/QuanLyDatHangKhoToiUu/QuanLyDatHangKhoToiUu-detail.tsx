import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { QuanLyDatHangTonKhoToiUuCreateNew } from "./create-new/create-new";



export const QuanLyDatHangTonKhoToiUuDetailPage = () => {
  const { t } = useI18n("QuanLyDatHangTonKhoToiUu");
  const { isHQ } = usePermissions();
  const params = useParams();
  return <QuanLyDatHangTonKhoToiUuCreateNew />;
};
