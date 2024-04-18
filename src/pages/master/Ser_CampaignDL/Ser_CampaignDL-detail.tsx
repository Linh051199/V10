import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";
import { QuanLyKyKhaoSatViewDetail } from "./Ser_CampaignDL/QuanLyKyKhaoSatViewDetail";
import { } from "./create-new/create-new";
export const Ser_CampaignDLDetailPage = () => {
  const { t } = useI18n("Ser_CampaignDL");
  const { isHQ } = usePermissions();
  const params = useParams();
  const isAddingNew = "new" === params.code;
  return isAddingNew ? (
    isHQ() ? (
      // <QuanLyKyKhaoSatCreateNew />
      <></>
    ) : (
      <></>
    )
  ) :
    <QuanLyKyKhaoSatViewDetail />
};
