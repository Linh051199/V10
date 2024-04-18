import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

import { ColumnOptions } from "@/types";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { DateRangeField } from "@packages/components/date-range-field";
import { SelectField } from "@packages/components/select-field";
import { TextField } from "@packages/components/text-field";
import { useVisibilityControl } from "@packages/hooks";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Header } from "@packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button, CheckBox, DateRangeBox, Validator } from "devextreme-react";
import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import ScrollView from "devextreme-react/scroll-view";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useReducer, useRef } from "react";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({ data, onSearch }: SearchFormProps) => {
  const { t } = useI18n("InventoryCusReturn_form");
  const checkBoxRef = useRef(null);
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "InventoryCusReturn_Form",
  });
  const { data: dealerList }: any = useQuery({
    queryKey: ["Dlr_ContractHQPage_Form", "dealerList"],
    queryFn: async () => {
      const resp: any = await api.Mst_Dealer_GetAllActive();
      if (resp?.isSuccess) {
        return [{ DealerName: "", DealerCode: "" }, ...resp?.DataList];
      }
      return [];
    },
  });
  const { data: listSaleMan, isLoading: isGettingGetTVBHActiveDL } = useQuery({
    queryKey: ["Dlr_ContractHQPage_Form", "ListGetTVBHActiveDL"],
    queryFn: async () => {
      // const response = await api.DlrContract_GetTVBHActiveDL();
      // if (response.isSuccess) {
      //   return response.Data?.Lst_Mst_SalesMan;
      // }

      return [];
    },
  });
  const { data: listModelCode } = useQuery({
    queryKey: ["Dlr_ContractHQPage_Form", "listModelCode"],
    queryFn: async () => {
      // const response = await api.DlrContract_GetAllStatusAndExistSpec("");
      // if (response.isSuccess) {
      //   return response.Data?.DataList;
      // }

      return [];
    },
  });

  const api = useClientgateApi();

  const searchFields = [
    {
      visible: true,
      dataField: "DealerCode",
      label: {
        text: t("DealerCode"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={270}
            items={dealerList?.map((item: any) => {
              return {
                text: `${item.DealerCode} - ${item.DealerName}`,
                value: item.DealerCode,
              };
            })}
            defaultValue={value}
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
        );
      },
    },
    {
      dataField: "DlrContractNo",
      label: {
        text: t("DlrContractNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <TextField
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            defaultValue={value}
            placeholder={t("Input")}
          />
        );
      },
    },
    {
      dataField: "DlrContractNoUser",
      label: {
        text: t("DlrContractNoUser"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <TextField
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            defaultValue={value}
            placeholder={t("Input")}
          />
        );
      },
    },
    {
      dataField: "CreatedDate",
      label: {
        text: t("CreatedDate"),
      },
      isRequired: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <DateRangeBox
            width={"95%"}
            className="dateRange"
            displayFormat="yyyy-MM-dd"
            showClearButton={true}
            defaultStartDate={
              Object.keys(formData).length !== 0
                ? formData?.CreatedDate[0] !== ""
                  ? formData?.CreatedDate[0]
                  : ""
                : ""
            }
            defaultEndDate={
              Object.keys(formData).length !== 0
                ? formData?.CreatedDate[1] !== ""
                  ? formData?.CreatedDate[1]
                  : ""
                : ""
            }
            useMaskBehavior={true}
            openOnFieldClick={true}
            labelMode="hidden"
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          >
            {/* <Validator
              validationGroup={formComponent.option("validationGroup")}
              validationRules={[RequiredField(t("CreatedDate is required"))]}
            ></Validator> */}
          </DateRangeBox>
        );
      },
    },
    {
      dataField: "FullName",
      label: {
        text: t("FullName"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <TextField
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            defaultValue={value}
            placeholder={t("Input")}
          />
        );
      },
    },
    {
      visible: true,
      dataField: "FlagDealFinish",
      label: {
        text: t("FlagDealFinish"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={270}
            items={[
              {
                text: "",
                value: "",
              },
              {
                text: t("Đã hoàn thành"),
                value: "1",
              },
              {
                text: t("Chưa hoàn thành"),
                value: "0",
              },
            ]}
            placeholder={t("Select")}
            defaultValue={value}
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
        );
      },
    },
    {
      visible: true,
      dataField: "Status",
      label: {
        text: t("Status"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckBox />
              <label>Mới tạo</label>
            </div>
            <div className="flex items-center gap-2">
              <CheckBox />
              <label>Đã Duyệt</label>
            </div>
            <div className="flex items-center gap-2">
              <CheckBox />
              <label>Đã hủy</label>
            </div>
          </div>
        );
      },
    },
  ];
  const columns: ColumnVisible[] = searchFields.map(
    (field) =>
      ({
        dataField: field.dataField,
        caption: field.label.text,
        visible: true,
      } as ColumnVisible)
  );

  const [visibleColumns, setVisibleColumns] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        const columnSettings = searchFields.find(
          (c) => c.dataField === column.dataField
        );

        column.visible = filterResult ? filterResult.visible : false;
        return {
          ...columnSettings,
          ...column,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      const hasVisibleTrue = outputColumns.some((item) => item.visible);
      if (hasVisibleTrue) {
        formRef.current?.instance.option("visible", true);
      } else {
        formRef.current?.instance.option("visible", false);
      }
      setVisibleColumns(outputColumns);
    }
  }, []);
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const formRef = useRef<Form>(null);
  const formData = { ...data };

  const handleSearch = (e: any) => {
    const validate = formRef.current?.instance.validate() as any;
    if (validate.isValid) {
      if (formData.FlagDataWH) {
      } else {
        onSearch(formData);
      }
    }
  };

  const onHiding = () => {
    chooserVisible.close();
  };

  const onApply = useCallback(
    (changes: any) => {
      // we need check the order of column from changes set
      const latest = [...changes];
      visibleColumns.forEach((column: ColumnOptions) => {
        const found = changes.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        if (!found) {
          column.visible = false;
          latest.push(column);
        }
      });
      const hasVisibleTrue = latest.some((item) => item.visible);
      if (hasVisibleTrue) {
        formRef.current?.instance.option("visible", true);
      } else {
        formRef.current?.instance.option("visible", false);
      }
      setVisibleColumns(latest);
      chooserVisible.close();
    },
    [setVisibleColumns]
  );

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const windowSize = useWindowSize();
  return (
    <>
      <div id={"searchForm"} className="w-[300px]">
        <Header
          enableColumnToggler={true}
          onToggleSettings={() => {
            chooserVisible.toggle();
          }}
          onCollapse={onClose}
        />
        <ScrollView showScrollbar="onScroll">
          <form
            className={"h-full ml-[15px] mb-1 w-[300px]"}
            onSubmit={handleSearch}
          >
            <Form
              ref={formRef}
              formData={formData}
              labelLocation={"top"}
              colCount={1}
              className={"h-full w-[300px]"}
              scrollingEnabled={true}
              height={windowSize.height - 235}
              validationGroup={"form"}
            >
              {visibleColumns
                .filter((f) => f.visible)
                .map((field, index) => {
                  const found = searchFields.find(
                    (f) => f.dataField == field.dataField
                  );
                  return <SimpleItem key={index} {...found} />;
                })}
            </Form>
          </form>
          <FieldToggler
            title={t("ChangeSearchCondition")}
            applyText={t("Apply")}
            cancelText={t("Cancel")}
            selectAllText={t("SelectAll")}
            container={"#root"}
            button={"#toggle-search-settings"}
            visible={chooserVisible.visible}
            columns={columns}
            onHiding={onHiding}
            onApply={onApply}
            actualColumns={visibleColumns}
          />
        </ScrollView>
        <div className={"w-full p-2"}>
          <Button
            text={"Search"}
            onClick={handleSearch}
            type={"default"}
            stylingMode={"contained"}
            width={"98%"}
            validationGroup={"form"}
          ></Button>
        </div>
      </div>
    </>
  );
};
