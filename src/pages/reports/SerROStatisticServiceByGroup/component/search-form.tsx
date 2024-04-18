import { SimpleItem } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  Button,
  DateRangeBox,
  Form,
  ScrollView,
  Validator,
} from "devextreme-react";

import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import FieldToggler from "@/packages/ui/field-toggler/field-toggler";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

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
  const { t } = useI18n("SerROStatisticServiceByGroup");
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const formData = { ...data };
  const windowSize = useWindowSize();

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const formRef = useRef<Form>(null);
  const checkBoxRef = useRef<Form>(null);
  //============================searchFields====================================
  const searchFields: any[] = [
    {
      dataField: "FromDateFromTo",
      label: {
        text: t("FromDateFromTo"),
      },
      validationRules: [RequiredField(t("FromDateFromToIsRequired"))],
      editorOptions: {
        validationMessage: "always",
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");

        return (
          <DateRangeBox
            elementAttr={{
              id: "checkAgainThisCode",
            }}
            width={"95%"}
            className="dateRange ml-[12px]"
            displayFormat="yyyy-MM-dd"
            showClearButton={true}
            defaultStartDate={formData?.FromDateFromTo[0]}
            defaultEndDate={formData?.FromDateFromTo[1]}
            useMaskBehavior={true}
            openOnFieldClick={true}
            labelMode="hidden"
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            validationMessageMode="always"
            validationMessagePosition={"top"}
          >
            <Validator
              validationGroup={formComponent.option("validationGroup")}
              validationRules={[RequiredField(t("FromDateFromToIsRequired"))]}
            ></Validator>
          </DateRangeBox>
        );
      },
    },

    {
      dataField: "IsChoSua",
      label: {
        visible: false,
        text: t("IsChoSua"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsChoSua")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsDangSua",
      label: {
        visible: false,
        text: t("IsDangSua"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsDangSua")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsSuaXong",
      label: {
        visible: false,
        text: t("IsSuaXong"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsSuaXong")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsEnd",
      label: {
        visible: false,
        text: t("IsEnd"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsEnd")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsThanhToanXong",
      label: {
        visible: false,
        text: t("IsThanhToanXong"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsThanhToanXong")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsDaGiaoXe",
      label: {
        visible: false,
        text: t("IsDaGiaoXe"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsDaGiaoXe")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsROReject",
      label: {
        visible: false,
        text: t("IsROReject"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsROReject")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsKhongDung",
      label: {
        visible: false,
        text: t("IsKhongDung"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsKhongDung")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
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
              checkBoxRef={checkBoxRef}
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
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

  const handleSearchWH = () => {
    if (formRef.current?.instance.validate().isValid) {
      if (formData.FlagDataWH) {
        onSearch(formData);
      }
    } else {
      return;
    }
  };
  //=======================Handle-end=========================================

  // ===============================toggle columns=======================================
  // lấy cấu hình table local storage key
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "SerROStatisticServiceByGroup-search-form",
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
      <GetDataWH
        onSearch={handleSearchWH}
        formRef={formRef}
        checkBoxRef={checkBoxRef}
      />
    </>
  );
};
