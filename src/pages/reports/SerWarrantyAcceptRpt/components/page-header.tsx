import { useI18n } from "@/i18n/useI18n";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import { Button } from "devextreme-react";

interface IPageHeader {
  onExportExcel: () => void;
  onExportExcelDetail: () => void;
  toggleSearchPanel: () => void;
  onPrint: () => void;
  onPrintDetail: () => void;
}

export const PageHeader = ({
  onExportExcel,
  toggleSearchPanel,
  onExportExcelDetail,
  onPrint,
  onPrintDetail
}: IPageHeader) => {
  const { t } = useI18n("SerWarrantyAcceptRpt");

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("SerWarrantyAcceptRpt")}</div>
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
          text={t("Print")}
          onClick={onPrint}
          className={"mx-1"}
        />
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("PrintDetail")}
          onClick={onPrintDetail}
          className={"mx-1"}
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
