import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { Button, ScrollView } from "devextreme-react";
import Form, { SimpleItem } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useReducer, useRef } from "react";
interface ColumnVisible {
  dataField: string;
  caption: string;
  visible: boolean;
}
interface IStorageCodeType {
  StorageCode?: string;
  StorageName?: string;
  ProvinceCode?: string;
  StorageAddress?: string;
  StorageType?: string;
  LogLUDTimeUTC?: string | any;
  LogLUBy?: string | any;
}

interface SearchFormProps {
  data: any;
  onSearch: (data: any) => void;
}
const SearchForm = ({ data, onSearch }: SearchFormProps) => {
  const { t } = useI18n("QuanLyDeNghiCungCapGia");
  const api = useClientgateApi();

  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const formRef = useRef<Form>(null);
  const formData = { ...data };
  const windowSize = useWindowSize();
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const checkBoxRef = useRef<Form>(null);
  // list codes selected

  // ==============================SearchField===============================
  // CBReqNo		Số yêu cầu đóng thùng
  // VIN		Số VIN
  // CBReqStatus		Trạng thái
  // CreatedDateFrom		Ngày tạo từ
  // CreatedDateTo		Ngày tạo đến
  // StorageCodeTo		Kho đến			DS kho  StorageType = "DT"
  // FlagDataWH		Lấy dữ liệu lịch sử 		Khi tích chọn lấy dữ liệu lịch sử sẽ gọi hàm Search WH

  const searchFields: any[] = [
    {
      visible: true,
      dataField: "HangHoa",
      label: {
        text: t("Hàng hóa"),
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
              placeholder={t("Nhập mã hoặc tên hàng")}
            />
          </div>
        );
      },
    },

    {
      dataField: "NhomHangHoa",
      caption: t("NhomHangHoa"),
      label: { text: t("Nhóm Hàng Hóa") },
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
  ];

  //   render form fields
  const columns: ColumnVisible[] = searchFields.map(
    (field) =>
      ({
        dataField: field.dataField,
        caption: field.label.text,
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
    if (formRef.current?.instance.validate().isValid) {
      if (formData.FlagDataWH) {
        onSearch(formData);
      }
    } else {
      return;
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
    storeKey: "QuanLyDeNghiCungCapGia-search-form",
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
        <form className={"h-full  min-w-[300px]"} onSubmit={handleSearch}>
          <Form
            ref={formRef}
            formData={formData} // formData = {...data} từ cha dải xuống và set ngược lại vào Form
            labelLocation={"top"}
            colCount={1}
            className={"h-full w-[300px]"}
            scrollingEnabled={true}
            height={windowSize.height - 235}
            validationGroup={"form"}
            showValidationSummary={true}
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
      <GetDataWH
        onSearch={handleSearchWH}
        formRef={formRef}
        checkBoxRef={checkBoxRef}
      />
    </div>
  );
};

export default SearchForm;