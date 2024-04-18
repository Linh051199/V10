import { useQuery } from "@tanstack/react-query";
import { logger } from "@packages/logger";
import { match } from "ts-pattern";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { searchConditionAtom } from "./store";
import { useAtomValue } from "jotai";
import { Chart } from "devextreme-react";
import {
  ArgumentAxis,
  AxisLabel,
  ChartTitle,
  CommonAxisSettings,
  Format,
  Grid,
  Label,
  LoadingIndicator,
  Point,
  Series,
  Size,
  Tooltip,
} from "devextreme-react/chart";
import { format } from "date-fns";
interface HRReportData {
  YEAR: number;
  SMTYPE: string;
  TOTALQTYSMWORKING: number;
  TOTALQTYSMNOWORKING: number;
  Percent: number;
  Count: number;
  Value: number;
}

interface ResultReportProps {}
export const ResultReport = ({}: ResultReportProps) => {
  const { t } = useI18n("RptHRSalesMan");
  const api = useClientgateApi();
  const searchCondition = useAtomValue(searchConditionAtom);

  const { data, isLoading: isGettingData } = useQuery({
    queryFn: async () => {
      logger.debug("search Condition before search:", searchCondition);
      if (
        !searchCondition.ReportBy ||
        !searchCondition.SMType ||
        !searchCondition.HRMonthFromTo[0] ||
        !searchCondition.HRMonthFromTo[1]
      ) {
        return [];
      }
      const resp = await match(searchCondition.ReportBy)
        .with("D", async () => {
          return await api.RptHRSalesMan_SearchTypeDealerHQ({
            DealerCodeInput: searchCondition.DealerCodeInput,
            SMType: searchCondition.SMType,
            FlagDataWH: searchCondition.FlagDataWH,
            HRMonthFrom: format(searchCondition.HRMonthFromTo[0], "yyyy-MM-dd"),
            HRMonthTo: format(searchCondition.HRMonthFromTo[1], "yyyy-MM-dd"),
          });
        })
        .otherwise(async () => {
          return await api.RptHRSalesMan_SearchTypeAreaHQ({
            SMType: searchCondition.SMType,
            FlagDataWH: searchCondition.FlagDataWH,
            HRMonthFrom: searchCondition.HRMonthFromTo[0],
            HRMonthTo: searchCondition.HRMonthFromTo[1],
            AreaCode: searchCondition.AreaCode,
          });
        });
      if (
        resp.isSuccess &&
        resp.Data?.Lst_Rpt_HRSalesMan &&
        resp.Data?.Lst_Rpt_HRSalesMan.length > 0
      ) {
        return resp.Data?.Lst_Rpt_HRSalesMan!.reduce<HRReportData[]>(
          (acc: HRReportData[], curr: any) => {
            const existingDataIndex = acc.findIndex(
              (d: any) => d.YEAR === curr.YEAR
            );
            if (existingDataIndex !== -1) {
              acc[existingDataIndex].TOTALQTYSMWORKING +=
                curr.TOTALQTYSMWORKING;
              acc[existingDataIndex].TOTALQTYSMNOWORKING +=
                curr.TOTALQTYSMNOWORKING;
              acc[existingDataIndex].Percent =
                (acc[existingDataIndex].TOTALQTYSMNOWORKING /
                  acc[existingDataIndex].TOTALQTYSMWORKING) *
                100;
              acc[existingDataIndex].Count = acc[existingDataIndex].Count + 1;
              acc[existingDataIndex].Value =
                acc[existingDataIndex].Percent / acc[existingDataIndex].Count;
            } else {
              acc.push({
                YEAR: curr.YEAR,
                SMTYPE: curr.SMTYPE,
                TOTALQTYSMWORKING: curr.TOTALQTYSMWORKING,
                TOTALQTYSMNOWORKING: curr.TOTALQTYSMNOWORKING,
                Count: 1,
                Percent:
                  (curr.TOTALQTYSMNOWORKING / curr.TOTALQTYSMWORKING) * 100,
                Value:
                  (curr.TOTALQTYSMNOWORKING / curr.TOTALQTYSMWORKING) * 100,
              });
            }
            return acc;
          },
          [] as HRReportData[]
        );
      }
      return [];
    },
    queryKey: ["report", "hrsalesman", JSON.stringify(searchCondition)],
  });

  return (
    <div>
      <LoadingIndicator enabled={true} show={isGettingData} />
      {!!data && (
        <Chart className={"ml-5"} dataSource={data ?? []} width={"90%"}>
          <Size height={500} />
          <Tooltip enabled={true}>
            <Format type="fixedPoint" precision={2} />
          </Tooltip>
          <CommonAxisSettings
            aggregatedPointsPosition="betweenTicks"
            color={"#000"}
          />
          <ChartTitle
            horizontalAlignment={"center"}
            text={t("Rpt_ThongKeTheoKhuVuc")}
          />
          <Series
            key="series"
            color={"#F21917"}
            width={0.5}
            name={t("TongTienBaoCaoBaoHanh")}
            type="line"
            argumentField={"YEAR"}
            valueField={"Value"}
          >
            <Point visible={true} />
          </Series>
          <ArgumentAxis allowDecimals={false} argumentType={"numeric"}>
            <AxisLabel format={"##"} />
            <Grid visible={true} />
          </ArgumentAxis>
        </Chart>
      )}
    </div>
  );
};
