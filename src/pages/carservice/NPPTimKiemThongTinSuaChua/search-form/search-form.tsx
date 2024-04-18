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
    ChoSua: 1,
    DangSua: 1,
    SuaXong: 1,
    KiemTraCuoiCung: 1
  };
  const windowSize = useWindowSize();

  const tagRender = (data: any) => {
    return <div className="">{data.text},</div>;
  };

  const listStatus = [
    {
      value: "1",
      text: "Mới tạo",
    },
    {
      value: "2",
      text: "Đã có phiếu xuất",
    },
    {
      value: "3",
      text: "Đã xuất",
    },
    {
      value: "4",
      text: "Đã điều chỉnh phiếu xuất",
    },
    {
      value: "5",
      text: "Đã hủy phiếu xuất",
    },
  ];
  // list selected

  const searchFields: any[] = [
    {
      dataField: "DealerCode",
      caption: t("DaiLy"),
      label: { text: t("DaiLy") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={[
              {
                DealerCode: "101",
                DealerName: "Dai ly 1",
              },
              {
                DealerCode: "102",
                DealerName: "Dai ly 2",
              },
            ]}
            valueExpr={"DealerCode"}
            displayExpr={"DealerName"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={true}
            placeholder={t("Select")}
          />
        );
      },
    },
    {
      dataField: "NgayVaoFromTo",
      caption: t("NgayVaoFromTo"),
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
      dataField: "NgayGiaoXeFrom",
      caption: t("NgayGiaoXeFrom"),
      label: { text: t("NgayGiaoXeFrom") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <DateBox
            width={"100%"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={true}
          />
        );
      },
    },
    {
      dataField: "NgayGiaoXeTo",
      caption: t("NgayGiaoXeTo"),
      label: { text: t("NgayGiaoXeTo") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <DateBox
            width={"100%"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={true}
          // placeholder={t("Select")}
          />
        );
      },
    },

    {
      visible: true,
      dataField: "BienSo",
      label: {
        text: t("BienSo"),
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
      dataField: "SoVIN",
      label: {
        text: t("SoVIN"),
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
      dataField: "TrangThai",
      label: {
        visible: true,
        text: t("TrangThai"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        // formData?.[dataField] ? true : false
        console.log(248,)
        return (
          <div className={"flex flex-col list-checkbox"}>
            <CheckboxField
              label={t("ChoSua")}
              dataField={'ChoSua'}
              formInstance={formComponent}
              defaultValue={formData?.["ChoSua"] ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
            <CheckboxField
              label={t("DangSua")}
              dataField={"DangSua"}
              formInstance={formComponent}
              defaultValue={formData?.["DangSua"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("DangSua", e.value);
              }}
            />
            <CheckboxField
              label={t("SuaXong")}
              dataField={"SuaXong"}
              formInstance={formComponent}
              defaultValue={formData?.["SuaXong"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("SuaXong", e.value);
              }}
            />
            <CheckboxField
              label={t("KiemTraCuoiCung")}
              dataField={"KiemTraCuoiCung"}
              formInstance={formComponent}
              defaultValue={formData?.["KiemTraCuoiCung"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("KiemTraCuoiCung", e.value);
              }}
            />
            <CheckboxField
              label={t("ThanhToanXong")}
              dataField={"ThanhToanXong"}
              formInstance={formComponent}
              defaultValue={formData?.["ThanhToanXong"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("ThanhToanXong", e.value);
              }}
            />
            <CheckboxField
              label={t("DaGiaoXe")}
              dataField={"DaGiaoXe"}
              formInstance={formComponent}
              defaultValue={formData?.["DaGiaoXe"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("DaGiaoXe", e.value);
              }}
            />
            <CheckboxField
              label={t("LenhHuy")}
              dataField={"LenhHuy"}
              formInstance={formComponent}
              defaultValue={formData?.["LenhHuy"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("LenhHuy", e.value);
              }}
            />
            <CheckboxField
              label={t("KhongDung")}
              dataField={"KhongDung"}
              formInstance={formComponent}
              defaultValue={formData?.["KhongDung"] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData("KhongDung", e.value);
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
