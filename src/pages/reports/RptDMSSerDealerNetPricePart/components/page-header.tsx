import { useI18n } from "@/i18n/useI18n";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import { Button } from "devextreme-react";

interface IPageHeader {
  onSign: () => void;
}

export const PageHeader = ({
  onSign,
}: IPageHeader) => {
  const { t } = useI18n("RptDMSSerRptDMSClaim");

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("RptDMSSerRptDMSClaim")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        <Button
          stylingMode={"contained"}
          type="default"
          text={t("Sinh file DNP gửi GWMS")}
          onClick={onSign}
          className={"mx-1"}
        />
        {/* <Button
          stylingMode={"contained"}
          type="default"
          text={t("ExportExcelDetail")}
          onClick={onExportExcelDetail}
          className={"mx-1"}
        /> */}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};
