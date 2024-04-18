import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { useI18n } from "@/i18n/useI18n";
interface HeaderPartProps {
  onExport: any;
  onExportByYear: any;
}
export const PageHeader = ({ onExport, onExportByYear }: HeaderPartProps) => {
  const { t } = useI18n("XemBaoCaoKPI");

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("XemBaoCaoKPI")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          style={{
            padding: 10,
          }}
          type="default"
          onClick={onExport}
        >
          Xuất excel
        </Button>
        <Button
          style={{
            padding: 10,
            marginLeft: 10,
          }}
          type="default"
          onClick={onExportByYear}
        >
          Xuất excel theo năm
        </Button>
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
