import { useQuery } from "@tanstack/react-query";
import { logger } from "@packages/logger";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { searchConditionAtom } from "./store";
import { useAtomValue } from "jotai";
import Chart, {
  ArgumentAxis,
  AxisLabel,
  ChartTitle,
  CommonAxisSettings,
  CommonSeriesSettings,
  Format,
  Grid,
  Label,
  LoadingIndicator,
  Point,
  Series,
  Size,
  Tooltip,
} from "devextreme-react/chart";
import { useReducer } from "react";
import { nanoid } from "nanoid";
import { convertDate } from "@/packages/common";
// import { Rpt_ThongKeTheoDaiLyParam } from "@/packages/api/clientgate/Rpt_ThongKeTheoDaiLyApi";
import { format } from "date-fns";

interface HRReportData {
  COLTUAN: string;
  COLTHANG: string;
  COLPHATSINHTRONGKY: number;
}

interface ResultReportProps {}

export const ResultReport = ({}: ResultReportProps) => {
  const { t } = useI18n("Rpt_ThongKeTheoDaiLy");
  const api = useClientgateApi();
  const searchCondition = useAtomValue(searchConditionAtom);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const {
    data,
    refetch,
    isLoading: isGettingData,
  } = useQuery(
    ["report", "Rpt_ThongKeTheoDaiLy", JSON.stringify(searchCondition)],
    async () => {
      logger.debug("search Condition before search:", searchCondition);
      console.log("searchCondition ", searchCondition);

      const param = {
        TypeReport: searchCondition.TypeReport ? 1 : 0,
        CreatedDateFrom: searchCondition.CreatedDateFrom
          ? format(searchCondition.CreatedDateFrom, "yyyy-MM-dd")
          : "",
        FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        MDDealerCodeConditionList:
          searchCondition.MDDealerCodeConditionList ?? "",
        MAAreaCodeConditonList: searchCondition.MAAreaCodeConditonList ?? "",
        DateBegin: searchCondition.DateBegin
          ? format(searchCondition.DateBegin, "yyyy")
          : "",
        CountTuan: searchCondition.CountTuan ?? "",
      };

      const resp = await api.Rpt_ThongKeTheoDaiLy_Search(param);

      if (
        resp.isSuccess &&
        resp.Data?.Lst_Rpt_DlrContract &&
        resp.Data?.Lst_Rpt_DlrContract.length > 0
      ) {
        const dataResp = resp.Data?.Lst_Rpt_DlrContract!;
        // console.log("dataResp ", dataResp);
        const data = dataResp.reduce<HRReportData[]>(
          (acc: HRReportData[], curr: any) => {
            const existingDataIndex = acc.findIndex((d: any) =>
              searchCondition.TypeReport === 0
                ? d.COLTUAN === curr.COLTUAN
                : d.COLTHANG === curr.COLTHANG
            );
            if (existingDataIndex !== -1) {
              acc[existingDataIndex].COLPHATSINHTRONGKY = parseInt(
                curr.COLPHATSINHTRONGKY,
                10
              );
              acc[existingDataIndex].COLTUAN = curr.COLTUAN;
              acc[existingDataIndex].COLTHANG = curr.COLTHANG;
            } else {
              acc.push({
                COLPHATSINHTRONGKY: parseInt(curr.COLPHATSINHTRONGKY, 10),
                COLTUAN: curr.COLTUAN,
                COLTHANG: curr.COLTHANG,
              });
            }

            // console.log("acc ", acc);

            return acc;
          },
          [] as HRReportData[]
        );
        // console.log("data ", data);
        return data;
      }
      return [];
    }
  );

  return (
    <div>
      <LoadingIndicator enabled={true} show={isGettingData} />
      {!!data && (
        <Chart className="ml-5" dataSource={data ?? []} width="90%">
          <Size width="90%" height={500} />
          <Tooltip enabled={true}>
            <Format type="fixedPoint" precision={2} />
          </Tooltip>
          <CommonAxisSettings color="#000" />
          <ChartTitle
            horizontalAlignment="center"
            text={t("Rpt_ThongKeTheoDaiLy Chart")}
          />
          <CommonSeriesSettings
            argumentField={
              searchCondition.TypeReport === 0 ? "COLTUAN" : "COLTHANG"
            }
            type="line"
          />
          <Series
            key="TongTienBaoCaoBaoHanh"
            color="orange"
            width={0.5}
            name={t("TongTienBaoCaoBaoHanh")}
            valueField="TongTienBaoCaoBaoHanh"
          >
            <Point visible={true} />
          </Series>
          <ArgumentAxis allowDecimals={false} argumentType="string">
            <AxisLabel format="##" />
            <Grid visible={true} />
          </ArgumentAxis>
        </Chart>
      )}
    </div>
  );
};
