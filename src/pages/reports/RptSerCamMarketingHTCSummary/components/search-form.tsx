import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import FieldToggler from "@/packages/ui/field-toggler/field-toggler";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { Header } from "@/packages/ui/search-panel";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Button,
  DateRangeBox,
  Form,
  ScrollView,
  Validator,
} from "devextreme-react";
import { RequiredRule, SimpleItem } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

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
  const { t } = useI18n("Ord_PerformanceInvoice");
  const chooserVisible = useVisibilityControl({ defaultVisible: false });
  const [formData, setFormData] = useState({ ...data });
  const windowSize = useWindowSize();
  const api = useClientgateApi();
  const setLoad = useSetAtom(loadPanelAtom);
  const { t: validateMsg } = useI18n("Validate");

  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef<Form>(null);
  const [dataCamMarketingNo, setDataCamMarketingNo] = useState<any>([]);

  const { data: Dealer_GetAllActive, isLoading } = useQuery(
    ["Dealer_GetAllActive-Ord_PerformanceInvoice"],
    async () => {
      const resp = await api.Dealer_GetAllActive();
      if (resp.DataList) {
        return [
          ...resp.DataList
        ];
      }
    }
  );

  const handleChangeDealerCode = async (key: any) => {
    setLoad(true);
    const resp = await api.RptSerCamMarketingHTCSummary_SerCampaign({
      CamNo: "",
      CamName: "",
      DealerCode: key,
      Ft_PageIndex: 0,
      Ft_PageSize: 9999,
    });
    if (resp.isSuccess && resp.DataList) {
      setDataCamMarketingNo(resp?.DataList);
    }
    setLoad(false);
  };

  useEffect(() => {
    handleChangeDealerCode(data?.DealerCode);
  }, []);
  //============================searchFields====================================
  const searchFields: any[] = [
    {
      dataField: "DealerCode",
      label: {
        text: t("DealerCode"),
      },
      isRequired: true,
      validationRules: [RequiredField(t("DealerCodeIsRequired"))],
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={270}
            className="ml-2"
            items={Dealer_GetAllActive ?? []}
            valueExpr={"DealerCode"}
            displayExpr={(item: any) => {
              if (!item) {
                return "";
              }
              return `${item.DealerCode} - ${item.DealerName}`;
            }}
            defaultValue={value}
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              handleChangeDealerCode(e.value);
              formComponent.updateData(dataField, e.value);
            }}
            dropDownOptions={{
              resizeEnabled: true,
            }}
            validationRules={[
              RequiredField(validateMsg("DealerCode is required")),
            ]}
            validationGroup={formComponent.option("validationGroup")}
          />
        );
      },
    },
    {
      dataField: "CamMarketingNo",
      label: {
        text: t("CamMarketingNo"),
      },
      isRequired: true,
      validationRules: [RequiredField(t("CamMarketingNoIsRequired"))],
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={270}
            className="ml-2"
            items={dataCamMarketingNo ?? []}
            valueExpr={"CamNo"}
            displayExpr={(item: any) => {
              if (!item) {
                return "";
              }
              return `${item.CamNo} - ${item.CamName}`;
            }}
            defaultValue={value}
            dataField={dataField}
            formInstance={formComponent}
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
            validationRules={[
              RequiredField(validateMsg("CamMarketingNo is required")),
            ]}
            validationGroup={formComponent.option("validationGroup")}
          />
        );
      },
    },
    {
      dataField: "CheckInDateFromTo",
      label: {
        text: t("CheckInDateFromTo"),
      },
      validationRules: [RequiredField(t("CheckInDateFromToIsRequired"))],
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");

        return (
          <DateRangeBox
            width={"95%"}
            className="dateRange ml-[12px]"
            displayFormat="yyyy-MM-dd"
            showClearButton={true}
            defaultStartDate={
              Object.keys(formData).length !== 0
                ? formData?.CheckInDateFromTo[0] !== ""
                  ? formData?.CheckInDateFromTo[0]
                  : ""
                : ""
            }
            defaultEndDate={
              Object.keys(formData).length !== 0
                ? formData?.CheckInDateFromTo[1] !== ""
                  ? formData?.CheckInDateFromTo[1]
                  : ""
                : ""
            }
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
              validationGroup={"form"}
              validationRules={[
                RequiredField(t("CheckInDateFromToIsRequired")),
              ]}
            >
              <RequiredRule message={t("CheckInDateFromToIsRequired")} />
            </Validator>
          </DateRangeBox>
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
    storeKey: "ord-performance-invoice-search-form",
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
