import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { ColumnOptions } from "@/types";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { SelectField } from "@packages/components/select-field";
import { TextField } from "@packages/components/text-field";
import { useVisibilityControl } from "@packages/hooks";
import { useSavedState } from "@packages/ui/base-gridview/components";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Header } from "@packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { Button } from "devextreme-react";
import Form, { SimpleItem } from "devextreme-react/form";
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
  const { t } = useI18n("PRD_PaymentReqDiscount");
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "PRD_PaymentReqDiscount_Search_Form",
  });
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const windowSize = useWindowSize();
  const api = useClientgateApi();

  const { data: getCavityType } = useQuery(
    ["getCavityType"],
    api.Mst_Compartment_GetAllActive
  );

  console.log(getCavityType?.DataList);

  const searchFields = [
    {
      visible: true,
      dataField: "PRDiscountNo",
      label: {
        text: t("PRDiscountNo"),
      },
      cssClass: "dms-form-field",
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
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
      dataField: "CavityType",
      label: {
        text: t("CavityType"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              items={getCavityType?.DataList}
              valueExpr="CompartmentCode"
              displayExpr="CompartmentName"
            />
          </div>
        );
      },
    },

    {
      dataField: "VIN",
      label: {
        text: t("VIN"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row dms-form-field"}>
            <TextField
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={value}
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
      dataField: "PRDiscountStatus",
      label: {
        text: t("PRDiscountStatus"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              items={[
                { text: "Tất cả", value: "" },
                { text: "Chờ duyệt", value: "P" },
                { text: "Duyệt A1", value: "A1" },
                { text: "Duyệt A2", value: "A2" },
              ]}
              valueExpr="value"
              displayExpr="text"
            />
          </div>
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
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField] == 1 ? true : false}
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
  const formData = {
    ...data,
    CreatedDateFromTo: [new Date(), new Date()],
    Appr2DateFromTo: [new Date(), new Date()],
    // DealerCode: "HTC"
  };
  const handleSearch = (e: any) => {
    if (formRef.current?.instance.validate().isValid) {
      if (formData.FlagDataWH) {
        setOpenPopupWH(true);
      } else {
        onSearch(formData);
      }
    } else {
      return;
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
  const handleSearchWH = () => {
    if (formRef.current?.instance.validate().isValid) {
      if (formData.FlagDataWH) {
        onSearch(formData);
      }
    } else {
      return;
    }
  };

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <div id={"searchForm"} className="w-[300px]">
      <Header
        enableColumnToggler={true}
        onToggleSettings={() => {
          chooserVisible.toggle();
        }}
        onCollapse={onClose}
      />
      <ScrollView showScrollbar={"onScroll"}>
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
      <GetDataWH
        onSearch={handleSearchWH}
        formRef={formRef}
        checkBoxRef={checkBoxRef}
      />
    </div>
  );
};
