import { PageHeaderNoSearchLayout } from "@layouts/page-header-layout-2/page-header-nosearch-layout";
import Button from "devextreme-react/button";

import { useI18n } from "@/i18n/useI18n";
interface HeaderPartProps {
  onExportExcel: () => void;
  onExportExcelDetail: () => void;
  toggleSearchPanel: () => void;
}
export const PageHeader = ({
  onExportExcel,
  onExportExcelDetail,
  toggleSearchPanel,
}: HeaderPartProps) => {
  const { t } = useI18n("Rpt_ThongKePhuTungCoLoiNhuanCao");

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">
          {t("Rpt_ThongKePhuTungCoLoiNhuanCao")}
        </div>
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
        {/* <Button
          stylingMode={"contained"}
          type="default"
          text={t("Print")}
          onClick={onExportExcelDetail}
          className={"mx-1"}
        /> */}
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcel")}
          onClick={onExportExcel}
          className={"mx-1"}
        />
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
