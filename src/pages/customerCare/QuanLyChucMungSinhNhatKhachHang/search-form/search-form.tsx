import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { Button, DateBox, DateRangeBox, ScrollView, Validator } from "devextreme-react";
import Form, { RequiredRule, SimpleItem } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { Mst_Transporter } from "@/packages/types";
import { useClientgateApi } from "@/packages/api";
import { useQuery } from "@tanstack/react-query";
import { showErrorAtom } from "@/packages/store";
import { TagBoxField } from "@/packages/ui/hook-form-field/TagBoxField";
import { TagField } from "@/packages/components/tag-field/tag-field";
import './search-form.scss'
interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}
const SearchForm = ({ data, onSearch }: SearchFormProps) => {
  const { t } = useI18n("NPPTimKiemThongTinSuaChua-Manager  ");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const formRef = useRef<Form>(null);
  const checkBoxRef = useRef<Form>(null);
  const formData = {
    ...data,
    MoiTao: 1,
    DangTienHanh: 1,
  };
  const windowSize = useWindowSize();

  const tagRender = (data: any) => {
    return <div className="">{data.text},</div>;
  };
  // list selected

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "TenKhachHang",
      label: {
        text: t("TenKhachHang"),
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
      dataField: "SinhNhatFromTo",
      caption: t("SinhNhatFromTo"),
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row ml-[12px]"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange"
              displayFormat=" yyyy-MM-dd"
              showClearButton={true}
              // defaultStartDate={searchCondition?.current?.TDate_FromTo[0]}
              // defaultEndDate={searchCondition?.current?.TDate_FromTo[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "TrangThai",
      label: {
        visible: true,
        text: t("TrangThai"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        // formData?.[dataField] ? true : false
        return (
          <div className={"flex flex-col list-checkbox"}>
            <CheckboxField
              label={t("ChuaLienHe")}
              dataField={'ChuaLienHe'}
              formInstance={formComponent}
              defaultValue={formData?.["ChuaLienHe"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData('ChuaLienHe', e.value);
              }}
            />
            <CheckboxField
              label={t("DaLienHe")}
              dataField={"DaLienHe"}
              formInstance={formComponent}
              defaultValue={formData?.["DaLienHe"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("DaLienHe", e.value);
              }}
            />
            <CheckboxField
              label={t("KhongKetThuc")}
              dataField={"KhongKetThuc"}
              formInstance={formComponent}
              defaultValue={formData?.["KhongKetThuc"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("KhongKetThuc", e.value);
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

  //   render form fields
  const columns: ColumnVisible[] = searchFields.map(
    (field) =>
    ({
      dataField: field.dataField,
      // caption: field.label.text,
      visible: true,
    } as ColumnVisible)
  );
  // ==============================SearchField===============================

  // ====================Handle================================
  // action data form to form
  const handleSearch = (e: any) => {
    // e.preventDefault();
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
    if (formData.FlagDataWH) {
      onSearch(formData);
    }
  };

  //   đóng form search
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  // đóng popup toggle columns chooser
  const onHiding = () => {
    chooserVisible.close();
  };
  // ====================Handle================================
  // ===============================toggle columns=======================================
  // lấy cấu hình table local storage key
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "NPPTimKiemThongTinSuaChua-search-form",
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
      setVisibleColumns(latest);
      chooserVisible.close();
    },
    [setVisibleColumns]
  );
  // ===============================toggle columns=======================================
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
          <form className={"h-full min-w-[300px]"} onSubmit={handleSearch}>
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
            // useSubmitBehavior={true}
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

export default SearchForm;