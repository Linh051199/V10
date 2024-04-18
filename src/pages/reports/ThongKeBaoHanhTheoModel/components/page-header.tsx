import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { useI18n } from "@/i18n/useI18n";
interface HeaderPartProps {
  onExportExcel: () => void;
  toggleSearchPanel: () => void;
  onExportExcelDetail?: () => void
}
export const PageHeader = ({
  onExportExcel,
  toggleSearchPanel,
  onExportExcelDetail
}: HeaderPartProps) => {
  const { t } = useI18n("ThongKeBaoHanhTheoModel");

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("ThongKeBaoHanhTheoModel")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          stylingMode={"text"}
          icon={"/images/icons/search.svg"}
          type="default"
          hoverStateEnabled={false}
          focusStateEnabled={false}
          activeStateEnabled={false}
          text={t("Search")}
          onClick={toggleSearchPanel}
          className={"mx-1 search-pivot-btn"}
        />
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcel")}
          onClick={onExportExcel}
          className={"mx-1"}
        />
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcelDetail")}
          onClick={onExportExcelDetail}
          className={"mx-1"}
        />
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
