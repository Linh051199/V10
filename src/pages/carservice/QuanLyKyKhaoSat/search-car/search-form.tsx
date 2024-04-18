import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import Form, {
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  SimpleItem,
} from "devextreme-react/form";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import ScrollView from "devextreme-react/scroll-view";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { Header } from "@packages/ui/search-panel";
import { SelectField } from "@/packages/components/select-field";
import { Mst_Dealer } from "@packages/types";
import { DateField } from "@/packages/components/date-field";
import { NumberRangeField } from "@/packages/components/number-range-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { parse } from "date-fns";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Button, DateRangeBox, Validator } from "devextreme-react";
import { RequiredField } from "@/packages/common/Validation_Rules";

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
  const { t } = useI18n("Dlr_ContractCancel");

  const formRef = useRef<Form>(null);
  const formData = data;
  const handleSearch = (e: any) => {
    console.log("search:", formData);
    onSearch(formData);
  };
  const yearDs = useCallback(() => {
    const yearList = [];

    // Set the start and end dates
    const startDate = new Date("2019-01-01");
    const endDate = new Date();

    // Loop through the months from end to start in descending order
    for (
      let date = endDate;
      date >= startDate;
      date.setMonth(date.getMonth() - 1)
    ) {
      const year = date.getFullYear(); // Get the year
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month and pad with leading zero if needed
      const yearMonth = `${year}-${month}`; // Concatenate the year and month
      yearList.push({ value: yearMonth, text: yearMonth });
    }

    return yearList; // Return the generated yearList
  }, [data]);

  const searchFields = [


    {
      visible: true,
      dataField: "DCDDlrContractNo",
      label: {
        text: t("DCDDlrContractNo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={"VIN"}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },

    {
      visible: true,
      dataField: "CCVIN",
      label: {
        text: t("CCVIN"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <TextField
              dataField={"VIN"}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              placeholder={t("Input")}
            />
          </div>
        );
      },
    },

    {
      dataField: "CCModelCode",
      label: {
        text: t("CCModelCode"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              items={[{ DealerName: "All", DealerCode: "" }, ...dealerList]}
              displayExpr={"DealerName"}
              valueExpr={"DealerCode"}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
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

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "FrmMngDlr-PDIRequest-edit-car-search-form",
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
            ref={formRef}
            formData={formData}
            labelLocation={"top"}
            colCount={1}
            validationGroup={"form"}
            className={"p-2 mb-[65px]"}
            scrollingEnabled={true}
            height={"100%"}
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
