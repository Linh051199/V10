import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateField } from "@/packages/components/date-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
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
import { Button, DateRangeBox } from "devextreme-react";
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
  const { t } = useI18n("Rpt_ThongKePhuTungLuanChuyenNhanhPage-search-form");
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_ThongKePhuTungLuanChuyenNhanhPage_Form",
  });

  const api = useClientgateApi();

  const checkBoxRef = useRef(null);
  const searchFields = [
    {
      dataField: "ToFrom",
      label: {
        text: t("ToFrom"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        console.log(formData);
        return (
          <DateRangeBox
            width={"95%"}
            className="dateRange ml-[12px]"
            displayFormat="yyyy-MM-dd"
            showClearButton={true}
            defaultStartDate={
              formData.ToFrom[0]
                ? typeof formData.ToFrom[0] === "object"
                  ? format(formData.ToFrom[0], "yyyy-MM-dd")
                  : formData.ToFrom[0]
                : ""
            }
            defaultEndDate={
              formData.ToFrom[1]
                ? typeof formData.ToFrom[1] === "object"
                  ? format(formData.ToFrom[1], "yyyy-MM-dd")
                  : formData.ToFrom[1]
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
    {
      dataField: "Top",
      label: {
        text: t("Top"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <TextField
            formInstance={formComponent}
            dataField={dataField}
            defaultValue={formData[dataField]}
            width={"100%"}
          />
        );
      },
    },
    {
      dataField: "FlagDataWH",
      label: {
        visible: false,
        text: t("FlagDataWH"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <CheckboxField
            checkBoxRef={checkBoxRef}
            label={t("FlagDataWH")}
            dataField={dataField}
            formInstance={formComponent}
            defaultValue={formData?.[dataField] == "1" ? true : false}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value ? "1" : "0");
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
      setVisibleColumns(outputColumns);
    }
  }, []);
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const formRef = useRef<Form>(null);
  const formData = { ...data };

  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearch = (e: any) => {
    if (formData.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      onSearch(formData);
    }
  };

  const handleSearchWH = () => {
    if (formData.FlagDataWH === true) {
      onSearch(formData);
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
          <form className={"h-full w-[300px]"} onSubmit={handleSearch}>
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
            actualColumns={columns}
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
      <GetDataWH
        onSearch={handleSearchWH}
        formRef={formRef}
        checkBoxRef={checkBoxRef}
      />
    </>
  );
};
