import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateField } from "@/packages/components/date-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { usePermissions } from "@/packages/contexts/permission";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import FieldToggler from "@/packages/ui/field-toggler/field-toggler";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { format } from "date-fns";
import {
  Button,
  DateRangeBox,
  Form,
  ScrollView,
  Validator,
} from "devextreme-react";
import {
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  SimpleItem,
} from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useReducer, useRef } from "react";

interface IColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}

interface ISearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}

export const SearchForm = ({ data, onSearch }: ISearchFormProps) => {
  const { t } = useI18n("Mst_CarModelStd");
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const formData = { ...data };
  const windowSize = useWindowSize();
  const { isHQ, isHTC } = usePermissions();

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);

  const formRef = useRef<Form>(null);

  //============================searchFields====================================
  const searchFields: any[] = [
    {
      visible: true,
      dataField: "ModelCode",
      label: {
        text: t("ModelCode"),
      },

      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
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
      visible: true,
      dataField: "ModelName",
      label: {
        text: t("ModelName"),
      },

      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
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
      dataField: "FlagActive",
      label: {
        text: t("FlagActive"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <SelectField
              formInstance={formComponent}
              dataField={dataField}
              items={[
                {
                  text: t("Tất cả"),
                  value: "",
                },
                {
                  text: t("Active"),
                  value: "1",
                },
                {
                  text: t("Inactive"),
                  value: "0",
                },
              ]}
              valueExpr={"value"}
              displayExpr={"text"}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              defaultValue={value}
              dropDownOptions={{
                resizeEnabled: true,
              }}
            ></SelectField>
          </div>
        );
      },
    },
  ];

  //   render form fields
  const columns: IColumnVisible[] = searchFields.map(
    (field) =>
      ({
        dataField: field.dataField,
        caption: field.label.text,
        visible: true,
      } as IColumnVisible)
  );
  //============================searchFields-end====================================

  //=======================Handle=========================================
  //   đóng form search
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const handleSearch = (e: any) => {
    // const dataSearch = {
    //   ...formData,
    // };
    // onSearch(dataSearch);
    console.log(" ~ formRef ", formRef.current);
    if (formRef.current?.instance.validate().isValid) {
      onSearch(formData);
    } else {
      return;
    }
  };
  //=======================Handle-end=========================================

  // ===============================toggle columns=======================================
  // lấy cấu hình table local storage key
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Mst_CarModelStd-search-form",
  });
  // thực hiện dispatch ẩn hiện lưu cấu hình columns
  const [visibleColumns, setVisibleColumns] = useReducer(
    (state: ColumnOptions[], changes: ColumnOptions[]) => {
      // save changes into localStorage
      saveState(changes);
      return changes;
    },
    columns
  );
  //   thực hiện xử lý lưu cấu hình
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
      const hasVisibleTrue = outputColumns.some((item) => item.visible);
      if (hasVisibleTrue) {
        formRef.current?.instance.option("visible", true);
      } else {
        formRef.current?.instance.option("visible", false);
      }
      setVisibleColumns(outputColumns);
    }
  }, []);
  //   hàm confirm nếu có thay đổi thì lưu không thì thôi
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
  // đóng popup toggle columns chooser
  const onHiding = () => {
    chooserVisible.close();
  };
  // ===============================toggle columns-end=======================================

  return (
    <>
      <div id={"searchForm"} className="w-[300px]">
        {/* Header form search : toogle columns & hidden form  */}
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
              className={"h-full w-[300px9]"}
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
