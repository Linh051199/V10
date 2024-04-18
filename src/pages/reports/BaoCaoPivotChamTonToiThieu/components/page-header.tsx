import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { useI18n } from "@/i18n/useI18n";
interface HeaderPartProps {}
export const PageHeader = ({}: HeaderPartProps) => {
  const { t } = useI18n("BaoCaoPivotChamTonToiThieu");

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">
          {t("BaoCaoPivotChamTonToiThieu")}
        </div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot
        name={"After"}
      ></PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
