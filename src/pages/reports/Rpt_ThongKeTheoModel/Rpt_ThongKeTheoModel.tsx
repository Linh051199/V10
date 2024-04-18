import { useI18n } from "@/i18n/useI18n";
import { SearchForm } from "./components/search-form";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";
import { ReportPageHeader } from "@packages/ui/report-page-header";
import { LoadPanel } from "devextreme-react";
import Toolbar from "devextreme-react/toolbar";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
// import { ResultReport } from "@/pages/reports/Rpt_ThongKeTheoModel/components/result";
import { searchConditionAtom } from "./components/store";
import { ResultReport } from "./components/result";

export const Rpt_ThongKeTheoModelPage = () => {
  const { t } = useI18n("Rpt_ThongKeTheoModel");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const [isLoading, setLoading] = useState(false);
  const searchCondition = useAtomValue(searchConditionAtom);

  const handleExportExcel = useCallback(async () => {
    // const respone = await match(searchCondition.ReportBy)
    //   .with("A", async () => {
    //     return await api.Rpt_ThongKeTheoModel_ExportSearchTypeAreaHQ({
    //       SMType: searchCondition.SMType,
    //       FlagDataWH: searchCondition.FlagDataWH,
    //       HRMonthFrom: searchCondition.HRMonthFromTo[0],
    //       HRMonthTo: searchCondition.HRMonthFromTo[1],
    //       AreaCode: searchCondition.AreaCode,
    //     });
    //   })
    //   .otherwise(async () => {
    //     return await api.Rpt_ThongKeTheoModel_ExportSearchTypeDealerDL({
    //       SMType: searchCondition.SMType,
    //       FlagDataWH: searchCondition.FlagDataWH,
    //       HRMonthFrom: searchCondition.HRMonthFromTo[0],
    //       HRMonthTo: searchCondition.HRMonthFromTo[1],
    //       DealerCodeInput: searchCondition.DealerCodeInput,
    //     });
    //   });
    // if (respone.isSuccess) {
    //   toast.success(t("Download successfully!"));
    //   window.location.href = respone.Data;
    // } else {
    //   showError({
    //     message: t(respone._strErrCode),
    //     _strErrCode: respone._strErrCode,
    //     _strTId: respone._strTId,
    //     _strAppTId: respone._strAppTId,
    //     _objTTime: respone._objTTime,
    //     _strType: respone._strType,
    //     _dicDebug: respone._dicDebug,
    //     _dicExcs: respone._dicExcs,
    //   });
    // }
  }, [searchCondition]);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const toolbarItems = useMemo(() => {
    return [
      {
        widget: "dxButton",
        location: "before",
        options: {
          icon: "search",
          onClick: handleToggleSearchPanel,
        },
      },
      {
        widget: "dxButton",
        location: "before",
        options: {
          text: t("ExportExcel"),
          type: "default",
          stylingMode: "contained",
          onClick: handleExportExcel,
        },
      },
    ];
  }, [handleExportExcel, handleToggleSearchPanel]);
  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <ReportPageHeader title={t("Rpt_ThongKeTheoModel")} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchForm formData={searchCondition} />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <Toolbar items={toolbarItems} />
            <LoadPanel visible={isLoading} />
            <ResultReport />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
