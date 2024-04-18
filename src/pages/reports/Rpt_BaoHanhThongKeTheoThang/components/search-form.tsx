import Form, {
  ButtonItem,
  ButtonOptions,
  ISimpleItemProps,
  SimpleItem,
} from "devextreme-react/form";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { SelectBox } from "devextreme-react";
import { RequiredField, requiredType } from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import {
  Mst_Area,
  Mst_Dealer,
  Mst_SalesManType,
  RptHRSalesManParamDto,
} from "@packages/types";
import { getYear } from "date-fns";
import { Header } from "@packages/ui/search-panel";
import { useSetAtom } from "jotai";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import LoadIndicator from "devextreme-react/load-indicator";
import { searchConditionAtom } from "./store";
import ScrollView from "devextreme-react/scroll-view";
import { ModalBox } from "@packages/ui/modal";
import { useVisibilityControl } from "@packages/hooks";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { TagField } from "@/packages/components/tag-field/tag-field";
import { useWindowSize } from "@packages/hooks/useWindowSize";

const currentYear = getYear(new Date());
const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
  value: currentYear - x,
  text: (currentYear - x).toString(),
}));

export interface SearchFormProps {
  formData?: Partial<RptHRSalesManParamDto>;
}

export const SearchForm = React.memo(
  function SearchFormRaw({ formData }: SearchFormProps) {
    const { t } = useI18n("RptHRSalesMan");
    const api = useClientgateApi();
    // const { data: salesManTypeDs, isLoading: isGettingSalesManTypeDs } =
    //   useQuery(
    //     ["mstSalesManTypes", "withAllOptions"],
    //     async () => {
    //       const resp = await api.Mst_SalesManType_GetAllActive();
    //       if (resp.isSuccess) {
    //         return [...(resp.DataList ?? [])];
    //       }
    //     },
    //     {}
    //   );
    // const { data: dealerDs, isLoading: isGettingDealerDs } = useQuery(
    //   ["MstDealer", "withAllOption"],
    //   async () => {
    //     const resp = await api.Mst_Dealer_GetAllActive();
    //     if (resp.isSuccess) {
    //       let items: Mst_Dealer[] = [];
    //       items = items.concat(resp.DataList ?? []);
    //       return items;
    //     }
    //   },
    //   {}
    // );
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
    //
    const [searchCondition] = useState<Partial<RptHRSalesManParamDto>>({
      ReportBy: "D",
      SMType: "",
      DealerCodeInput: [],
      FlagDataWH: false,
      ...formData,
    });

    const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
    const onClose = () => {
      setSearchPanelVisible(false);
    };
    return (
      <div key={"search-form"}>
        <Header enableColumnToggler={false} onCollapse={onClose} />
        <LoadIndicator
          className={"my-auto"}
          visible={
            isGettingAreaDs
          }
        />
        <div id={"search-form-content"}>
          {!!areaDs  && (
            <SearchFormContent
              areaDs={areaDs}
              data={searchCondition}
            />
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    console.log("check");
    return true;
  }
);

const useSearchFields = ({ data, dealerDs, areaDs, salesManTypeDs }: any) => {
  const { t } = useI18n("RptHRSalesMan");
  return useMemo<ISimpleItemProps[]>(() => {
    return [
      {
        dataField: "FlagDataWH",
        visible: true,
        caption: t("FlagDataWH"),
        editorType: "dxCheckBox",
        editorOptions: {},
        label: {
          location: "left",
          visible: false,
        },
        render: (param: any) => {
          const { component: formInstance, dataField } = param;
          const formData = formInstance.option("formData");
          return (
            <CheckboxField
              formInstance={formInstance}
              dataField={dataField}
              label={t("FlagDataWH")}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formInstance.updateData(dataField, e.value);
              }}
            />
          );
        },
        validationRules: [],
      },
    ];
  }, [dealerDs, areaDs, salesManTypeDs]);
};

interface SearchFormContentProps {
  areaDs: Mst_Area[];
  // dealerDs: Mst_Dealer[];
  // salesManTypeDs: Mst_SalesManType[];
  data: Partial<RptHRSalesManParamDto>;
}

const SearchFormContent = React.memo(
  ({ areaDs, data }: SearchFormContentProps) => {
    const { t } = useI18n("RptHRSalesMan");
    const searchFields = useSearchFields({
      areaDs,
      // dealerDs,
      // salesManTypeDs,
      data,
    });
    const formRef = useRef<Form>(null);
    const setSearchCondition = useSetAtom(searchConditionAtom);
    const handleSearch = (e: any) => {
      const formData = formRef.current?.instance?.option("formData");
      // validate
      if (!formData.HRMonthFromTo[0] || !formData.HRMonthFromTo[1]) {
        alert(t("YearIsRequired"));
      } else {
        if (formData.HRMonthFromTo[0] > formData.HRMonthFromTo[1]) {
          alert(t("YearIsGreaterThan"));
        } else {
          if (formData.FlagDataWH) {
            confirmBoxVisible.open();
          } else {
            setSearchCondition({ ...formData });
          }
        }
      }
      e.preventDefault();
    };
    const searchWithFlagDataWH = useCallback(() => {
      const formData = formRef.current?.instance?.option("formData");
      setSearchCondition({ ...formData });
    }, []);
    const confirmBoxVisible = useVisibilityControl({ defaultVisible: false });

    const windowSize = useWindowSize();
    return (
      <ScrollView height={windowSize.height - 200}>
        <form className={"h-full mb-auto"} onSubmit={handleSearch}>
          <Form
            ref={formRef}
            formData={data}
            labelLocation={"top"}
            colCount={1}
            className={"p-2 h-full"}
            scrollingEnabled
          >
            {searchFields.map((item, idx) => {
              return <SimpleItem key={idx} {...item} />;
            })}

            <ButtonItem horizontalAlignment={"center"} cssClass={"btn-search"}>
              <ButtonOptions
                text={"Search"}
                icon={"search"}
                stylingMode={"contained"}
                width={"90%"}
                type={"default"}
                useSubmitBehavior={true}
              />
            </ButtonItem>
          </Form>
        </form>
        <ModalBox
          title={t("Search")}
          onYesClick={searchWithFlagDataWH}
          control={confirmBoxVisible}
        >
          <ModalBox.Slot name={"Bottom"}></ModalBox.Slot>
          <ModalBox.Slot name={"Content"}>
            {t("ConfirmFlagDataWH")}
          </ModalBox.Slot>
        </ModalBox>
      </ScrollView>
    );
  },
  (prev, next) => {
    return true;
  }
);
