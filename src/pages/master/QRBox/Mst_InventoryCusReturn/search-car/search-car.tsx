import { useI18n } from "@/i18n/useI18n";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { useClientgateApi } from "@packages/api";
import { usePermissions } from "@packages/contexts/permission";
import { VisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";
import {
  CTContractOverseaSearchHQ,
  Car_CarForLXX,
  Car_CarForLXXSearch,
} from "@packages/types";
import { Icon } from "@packages/ui/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, DataGrid, LoadPanel } from "devextreme-react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useReducer, useRef, useState } from "react";
import { match } from "ts-pattern";
import { SearchForm } from "./search-form";
import { SearchResults } from "./search-result";
import { format } from "date-fns";
import { useGetTime } from "@/packages/hooks/useGetTime";

interface SearchCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  dataRef?: any;
  onHidding: () => void;
  onSelectedCars: (cars: Car_CarForLXX[]) => void;
}

export const SearchCar = ({
  visible,
  container,
  position,
  dataRef,
  onHidding,
  onSelectedCars,
}: SearchCarProps) => {
  const { t } = useI18n("SearchCar");

  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<any>(null);
  const api = useClientgateApi();

  const { data: dealerList } = useQuery({
    queryKey: ["QLCVSearchCar", "DealerList"],
    queryFn: async () => {
      const response = await api.Mst_Dealer_GetAllActive();
      if (response.isSuccess) {
        return response.DataList;
      }
      return [];
    },
  });

  const { endDate, firstDay } = useGetTime();

  const searchCondition = useRef<Partial<CTContractOverseaSearchHQ>>({
    RefNo: "",
    OrderMonth: [endDate, firstDay],
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const handleSearch = async (
    condition: Partial<CTContractOverseaSearchHQ>
  ) => {
    const currentCondition = {
      Ft_PageIndex: condition.Ft_PageIndex,
      Ft_PageSize: condition.Ft_PageSize,
      ContractNo: condition.ContractNo,
      RefNo: condition.RefNo,
      FlagDataWH: condition.FlagDataWH,
      OrderMonth: [
        condition?.OrderMonth && condition?.OrderMonth[0]
          ? condition?.OrderMonth[0]
          : "",
        condition?.OrderMonth && condition?.OrderMonth[1]
          ? condition?.OrderMonth[1]
          : "",
      ],
    };
    searchCondition.current = currentCondition;
    dataRef.current?.current?.refetchData();
  };

  const fetchData = async () => {
    const response = await api.SearchHQForCtrOversea_SearchHQ({
      ...searchCondition.current,
      OrderMonthFrom: searchCondition?.current?.OrderMonth[0]
        ? format(searchCondition.current?.OrderMonth[0], "yyyy-MM-dd")
        : "",
      OrderMonthTo: searchCondition?.current?.OrderMonth[1]
        ? format(searchCondition.current?.OrderMonth[1], "yyyy-MM-dd")
        : "",
      Ft_PageIndex: dataRef.current?.current?.instance.pageIndex() ?? 0,
      Ft_PageSize: dataRef.current?.current?.instance.pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return {
        ...response,
        DataList: response?.Data?.DataList?.map((item: any, index: any) => {
          return {
            ...item,
            LCTemp: item.LCTemp,
            SpecCode: item.SpecCode,
            ModelCode: item.ModelCode,
            ColorCode: item.ColorCode,
            WorkOrderNo: item.WorkOrderNo,
            PortCode: item.PortCode,
            PlantCode: item.PlantCode,
            Quantity: item.Quantity,
            RefNo: item.RefNo,
            OrderMonth: item.OrderMonth,
            ProductionMonth: item.ProductionMonth,
            ContractNo: item.ContractNo,
          };
        }),
      };
    }
  };

  const renderSearchForm = useCallback(
    (control: VisibilityControl) => {
      return (
        <SearchForm
          data={searchCondition.current}
          onClose={() => control.close()}
          onSearch={handleSearch}
          dealerList={dealerList ?? []}
        />
      );
    },
    [dealerList, searchCondition.current]
  );

  const handleSelect = async () => {
    const items =
      resultRef.current?.current?.instance.getSelectedRowsData() as any[];
    onSelectedCars(items);
    resultRef.current?.current.instance.clearSelection();
    onHidding();
  };

  return (
    <Popup
      visible={visible}
      title={t("SearchCar")}
      container={container}
      showCloseButton={true}
      onHiding={onHidding}
      wrapperAttr={{
        class: "search-car-popup",
      }}
    >
      <Position
        at={`${position} top`}
        my={`${position} top`}
        of={`${container}`}
        offset={{ x: 100, y: 100 }}
      />
      <WithSearchPanelLayout
        searchPanelRender={renderSearchForm}
        contentPanelRender={(control: VisibilityControl) => (
          <div className={"flex h-full justify-center"}>
            {/* <LoadPanel
              visible={isRefetching || carListLoading}
              showPane={true}
              showIndicator={true}
            /> */}
            <SearchResults
              isLoading={isLoading}
              toolbarItems={[
                {
                  location: "before",
                  render: () => (
                    <Button
                      visible={!control.visible}
                      stylingMode={"text"}
                      onClick={() => control.toggle()}
                    >
                      <Icon name={"search"} />
                    </Button>
                  ),
                },
              ]}
              ref={resultRef}
              fetchData={fetchData}
              dataRef={dataRef}
            />
          </div>
        )}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Select"),
          type: "default",
          stylingMode: "contained",
          onClick: handleSelect,
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Cancel"),
          onClick: onHidding,
          elementAttr: {
            class: "search-car-popup cancel-button",
          },
        }}
      />
    </Popup>
  );
};
