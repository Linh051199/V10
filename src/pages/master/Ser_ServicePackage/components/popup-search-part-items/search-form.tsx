import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import Form, {
  ButtonItem,
  ButtonOptions,
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
import { Button, DateRangeBox } from "devextreme-react";

interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  onClose: () => void;
  data: any;
  formRef?: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({
  onClose,
  data,
  formRef,
  onSearch,
}: SearchFormProps) => {
  const { t } = useI18n("Ser_ServicePackagePartItems_Search");
  // const formRef = useRef<Form>(null);
  const formData = data;
  const chooserVisible = useVisibilityControl({ defaultVisible: false });

  const handleSearch = (e: any) => {
    if (formRef.current?.instance.validate().isValid) {
      onSearch(formData);
    } else {
      return;
    }
  };

  const searchFields = [
    {
      visible: true,
      dataField: "PartCode",
      label: {
        text: t("PartCode"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");

        return (
          <div className={"flex flex-row dms-form-field"}>
            <TextField
              width={270}
              dataField={dataField}
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
      dataField: "VieName",
      label: {
        text: t("VieName"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");

        return (
          <div className={"flex flex-row dms-form-field"}>
            <TextField
              width={270}
              dataField={dataField}
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
    storeKey: "Ser_ServicePackagePartItems_Search-search-form",
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
            className={" mb-[65px]"}
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
