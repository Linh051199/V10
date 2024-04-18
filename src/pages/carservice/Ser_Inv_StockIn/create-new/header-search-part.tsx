import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Popup, ScrollView } from "devextreme-react";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { RequiredRule } from "devextreme-react/form";
import { nanoid } from "nanoid";
import "./style.scss";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useVisibilityControl } from "@/packages/hooks";
import { TextField } from "@/packages/components/text-field";
import Form, { SimpleItem } from "devextreme-react/form";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Button } from "devextreme-react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { RowClickEvent, RowDblClickEvent } from "devextreme/ui/data_grid";
import { ModifyForm } from "./modify-form/modify-form";
import { BButton } from "@/packages/components/buttons";
interface IProps {
  // searchFields: any;
  mode: boolean;
  handleAddNew: () => void;
  handleEdit: () => void;
  searchCondition: any;
  onSearch: (data: any) => void;
}
const HeaderSearchPart = forwardRef(
  (
    {
      searchCondition,
      mode,
      // searchFields,
      handleAddNew,
      handleEdit,
      onSearch,
    }: IProps,
    ref: any
  ) => {
    const { t } = useI18n("TraCuuLichSuaSuaChua_PartCodePopup");
    const formData = { ...searchCondition };
    const formRef = useRef<any>();
    useImperativeHandle(ref, () => ({
      getFormRef() {
        return formRef;
      },
    }));
    const handleSearch = (e: any) => {
      const formDatas = formRef?.current?.instance.option("formData");
      // onSearch(formDatas);
      // e.preventDefault();
      if (formRef.current?.instance.validate().isValid) {
        onSearch(formDatas);
      } else {
        return;
      }
    };
    const searchFields: any[] = [
      {
        visible: true,
        dataField: "PartCode",
        label: {
          text: t("PartCode"),
          visible: false,
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
        visible: true,
        dataField: "VieName",
        label: {
          text: t("VieName"),
          visible: false,
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
    ];
    return (
      <div className="flex">
        <form className={"min-w-[300px]"} onSubmit={handleSearch}>
          <Form
            // ref={ref}
            ref={formRef}
            formData={searchCondition}
            colCount={1}
            scrollingEnabled={true}
            validationGroup={"form"}
            showValidationSummary={true}
          >
            {searchFields
              .filter((f: any) => f.visible)
              .map((field: any, index: number) => {
                const found = searchFields.find(
                  (f: any) => f.dataField == field.dataField
                );
                return <SimpleItem key={index} {...found} />;
              })}
          </Form>
        </form>

        <BButton iconName="search" label={t("Search")} onClick={handleSearch} />
        <BButton
          // className={!mode ? "active-button-click" : ""}
          iconName="plus"
          label={t("Add")}
          // label={mode ? t("Add") : t("Mode Add")}
          onClick={handleAddNew}
        />
        <BButton
          // className={mode ? "active-button-click" : ""}
          iconName="edit"
          label={t(" Edit")}
          // label={mode ? t("Mode Edit") : t(" Edit")}
          onClick={() => {
            handleEdit();
          }}
        />
      </div>
    );
  }
);

export default HeaderSearchPart;
