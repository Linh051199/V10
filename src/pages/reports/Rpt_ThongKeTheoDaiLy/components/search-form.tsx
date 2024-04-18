import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { SelectBox } from "devextreme-react";
import {
  RequiredField,
  requiredExcludeSpecialCharactersOnlyNumbers,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { Mst_Area, Mst_Dealer, Mst_SalesManType } from "@packages/types";
import { format, getYear, set } from "date-fns";
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
import { nanoid } from "nanoid";
import { WeekSelectField } from "@/packages/components/week-select-field";
import { DateField } from "@/packages/components/date-field";

const currentYear = getYear(new Date());
const yearDataSource = Array.from(new Array(100), (x, i) => i).map((x) => ({
  value: currentYear - x,
  text: (currentYear - x).toString(),
}));

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};

function generateMonthData(): Date[] {
  const startYear = 1990;
  const startMonth = 0; // January (0-based index)
  const currentYear = new Date().getFullYear();
  const monthData: Date[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    const start = year === startYear ? startMonth : 11;
    for (let month = start; month >= 0; month--) {
      const date = set(new Date(), {
        year: year,
        month: month,
        date: 1,
      });
      if (date <= new Date()) {
        monthData.push(date);
      }
    }
  }
  return monthData;
}

const monthYearDs = generateMonthData();

export interface SearchFormProps {
  formData?: Partial<any>;
  dealerDs: any;
  areaDs: any;
  isGettingDealerDs: any;
  isGettingAreaDs: any;
}

export const SearchForm = React.memo(
  function SearchFormRaw({
    formData,
    dealerDs,
    areaDs,
    isGettingAreaDs,
    isGettingDealerDs,
  }: SearchFormProps) {
    const { t } = useI18n("Rpt_PivotRetailContract");
    const api = useClientgateApi();

    const now = new Date();

    const firstDayOfMonth = set(now, { date: 1 });
    //
    const [searchCondition] = useState<Partial<any>>({
      Thang: null,
      FlagDataWH: 0,
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
          visible={isGettingAreaDs || isGettingDealerDs}
        />
        <div id={"search-form-content"}>
          {!!areaDs && !!dealerDs && (
            <SearchFormContent
              areaDs={areaDs}
              dealerDs={dealerDs}
              data={searchCondition}
            />
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // console.log("check");
    return true;
  }
);

const useSearchFields = ({ data, dealerDs, areaDs }: any) => {
  const { t } = useI18n("Rpt_PivotRetailContract");
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const [listDealer, setListDealer] = useState<any>([]);
  const [listArea, setListArea] = useState<any>([]);

  // useEffect(() => {
  //   if (dealerDs) {
  //     setListDealer([{ DealerCode: "", DealerName: "Tất Cả" }, ...dealerDs]);
  //   }
  //   if (areaDs) {
  //     setListArea([{ AreaCode: "", AreaName: "Tất Cả" }, ...areaDs]);
  //   }
  // }, [dealerDs, areaDs]);

  return useMemo(() => {
    // console.log("dealerDs in memo", dealerDs);
    return [
      {
        dataField: "DateBegin",
        caption: t("DateBegin"),
        label: {
          text: t("DateBegin"),
        },
        render: (param: any) => {
          const { dataField, component: formComponent } = param;
          const formData = formComponent.option("formData");
          const value = formData[dataField];
          return (
            <div className={"flex flex-row "}>
              <DateField
                formInstance={formComponent}
                showClearButton={true}
                dataField={dataField}
                width={270}
                defaultValue={new Date() ?? null}
                onValueChanged={(e: any) => {
                  formComponent.updateData(
                    dataField,
                    e.value ? format(e.value, "yyyy-MM") : null
                  );
                }}
                displayFormat={"yyyy-MM"}
                calendarOptions={{
                  maxZoomLevel: "year",
                }}
              ></DateField>
            </div>
          );
        },
      },

    ];
  }, [dealerDs, areaDs, data.TypeReport]);
};

interface SearchFormContentProps {
  areaDs: Mst_Area[];
  dealerDs: Mst_Dealer[];
  data: Partial<any>;
}
const SearchFormContent = React.memo(
  ({ areaDs, dealerDs, data }: SearchFormContentProps) => {
    const { t } = useI18n("Rpt_PivotRetailContract");
    const searchFields = useSearchFields({ areaDs, dealerDs, data });

    // console.log("searchFields", searchFields);

    const formRef = useRef<Form>(null);
    const setSearchCondition = useSetAtom(searchConditionAtom);
    const handleSearch = (e: any) => {
      const formData = formRef.current?.instance?.option("formData");
      // validate
      if (!formData.CreatedDateFrom) {
        alert(t("YearIsRequired"));
      } else {
        // if (formData.HRMonthFrom > formData.HRMonthTo) {
        //   alert(t("YearIsGreaterThan"));
        //  else {
        if (formData.FlagDataWH) {
          confirmBoxVisible.open();
        } else {
          setSearchCondition({ ...formData });
        }
        // }
      }
      e.preventDefault();
    };
    const searchWithFlagDataWH = useCallback(() => {
      const formData = formRef.current?.instance?.option("formData");
      setSearchCondition({ ...formData });
    }, []);
    const confirmBoxVisible = useVisibilityControl({ defaultVisible: false });

    return (
      <ScrollView>
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
    // console.log("check");
    return true;
  }
);
