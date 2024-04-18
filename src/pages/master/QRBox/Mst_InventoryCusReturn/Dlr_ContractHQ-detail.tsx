import { useI18n } from "@/i18n/useI18n";
import { useParams } from "react-router-dom";
import { usePermissions } from "@/packages/contexts/permission";

export const Dlr_ContractDetailHQPage = () => {
  const params = useParams();
  const isAddingNew = "new" === params.status;
  return isAddingNew ? <></> : <></>;
};
