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
import { useQuery } from "@tanstack/react-query";
import { Button, Chart, LoadPanel } from "devextreme-react";
import {
  ArgumentAxis,
  AxisLabel,
  ChartTitle,
  CommonAxisSettings,
  Grid,
  LoadingIndicator,
  Point,
  Series,
  Size,
  Tooltip,
} from "devextreme-react/chart";
import Toolbar from "devextreme-react/toolbar";
import { Provider, useAtom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { logger } from "@packages/logger";
// import { ResultReport } from "@/pages/reports/Rpt_ThongKeTheoDaiLy/components/result";
import { searchConditionAtom } from "./components/store";
import { ResultReport } from "./components/result";

export const Rpt_ThongKeTheoDaiLyPage = () => {
  const { t } = useI18n("Rpt_ThongKeTheoDaiLy");
  const api = useClientgateApi();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const showError = useSetAtom(showErrorAtom);
  const [isLoading, setLoading] = useState(false);
  const searchCondition = useAtomValue(searchConditionAtom);
  const [listDealer, setListDealer] = useState<any>([]);
  const [listArea, setListArea] = useState<any>([]);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const { data: dealerDs, isLoading: isGettingDealerDs } = useQuery(
    ["MstDealer", "withAllOption"],
    async () => {
      // const resp = await api.Mst_Dealer_GetAllActive();
      // if (resp.isSuccess) {
      //   return [...(resp.DataList ?? [])];
      // }
    }
  );
  const { data: areaDs, isLoading: isGettingAreaDs } = useQuery(
    ["MstArea", "withAllOption"],
    async () => {
      const resp = await api.Mst_Area_GetAllActive();
      if (resp.isSuccess) {
        return [...(resp.DataList ?? [])];
      }
    },
    {}
  );

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
    ];
  }, [handleToggleSearchPanel]);

  useEffect(() => {
    if (dealerDs) {
      setListDealer([{ DealerCode: "", DealerName: "Tất Cả" }, ...dealerDs]);
    }
    if (areaDs) {
      setListArea([{ AreaCode: "", AreaName: "Tất Cả" }, ...areaDs]);
    }
  }, [dealerDs, areaDs]);

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <ReportPageHeader title={t("Rpt_ThongKeTheoDaiLy")} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <LoadPanel visible={isGettingAreaDs || isGettingDealerDs} />
            <SearchForm
              formData={searchCondition}
              dealerDs={listDealer}
              areaDs={listArea}
              isGettingAreaDs={isGettingAreaDs}
              isGettingDealerDs={isGettingDealerDs}
            />
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
