import { useI18n } from "@/i18n/useI18n";
import { DateField } from "@/packages/components/date-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { NumberRangeField } from "@/packages/components/number-range-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useGetTime } from "@/packages/hooks/useGetTime";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import { Mst_Dealer } from "@packages/types";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Header } from "@packages/ui/search-panel";
import { format, parse } from "date-fns";
import { Button, DateRangeBox } from "devextreme-react";
import Form, {
  ButtonItem,
  ButtonOptions,
  SimpleItem,
} from "devextreme-react/form";
import ScrollView from "devextreme-react/scroll-view";
import { useCallback, useEffect, useReducer, useRef } from "react";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  onSearch: (data: any) => void;
  dealerList: Mst_Dealer[];
}

export const SearchForm = ({
  onClose,
  data,
  onSearch,
  dealerList,
}: SearchFormProps) => {
  const { t } = useI18n("CT_ContractOversea_Form");
  const formRef = useRef<Form>(null);
  const formData = {
    ...data,
  };
  const handleSearch = (e: any) => {
    onSearch(formData);
  };

  const searchFields = [
    {
      dataField: "RefNo",
      label: {
        text: t("RefNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <TextField
            dataField={dataField}
            formInstance={formComponent}
            defaultValue={formData?.[dataField]}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            placeholder={t("Input")}
          />
        );
      },
    },

    {
      dataField: "OrderMonth",
      label: {
        text: t("OrderMonth"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <DateRangeBox
            width={"100%"}
            className="dateRange"
            displayFormat="yyyy-MM-dd"
            showClearButton={true}
            defaultStartDate={
              formData?.OrderMonth
                ? format(formData?.OrderMonth[0], "yyyy-MM-dd")
                : ""
            }
            defaultEndDate={
              formData?.OrderMonth
                ? format(formData?.OrderMonth[1], "yyyy-MM-dd")
                : ""
            }
            useMaskBehavior={true}
            openOnFieldClick={true}
            labelMode="hidden"
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
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

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "CT_ContractOversea-search-form",
  });
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
        column.visible = filterResult ? filterResult.visible : false;
        return column;
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setVisibleColumns(outputColumns);
    }
  }, []);

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
      setVisibleColumns(latest);
      chooserVisible.close();
    },
    [setVisibleColumns]
  );

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <div
      id={"searchForm"}
      className={"w-[300px] h-full border-r-[1px] border-[#cdcccc]"}
    >
      <Header
        className="headerSearch fixed z-[999999]"
        enableColumnToggler={true}
        onToggleSettings={() => {
          chooserVisible.toggle();
        }}
        onCollapse={onClose}
      />
      <ScrollView height={"100%"} showScrollbar="onScroll">
        <form
          className={"formSearch min-w-[300px] mt-6"}
          onSubmit={handleSearch}
        >
          <Form
            height={"100%"}
            ref={formRef}
            formData={formData}
            labelLocation={"top"}
            colCount={1}
            className={"p-2 mb-[65px] "}
            scrollingEnabled={true}
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
      </ScrollView>
      <FieldToggler
        title={t("ToggleColum")}
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
        position={"left"}
      />
      <div className={"w-[300px] flex btn-search-car p-2 "}>
        <Button
          width={"100%"}
          text={"Search"}
          onClick={handleSearch}
          type={"default"}
          stylingMode={"contained"}
        ></Button>
      </div>
    </div>
  );
};
