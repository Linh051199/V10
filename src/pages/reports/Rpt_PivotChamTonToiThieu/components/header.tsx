import Form, {
  ButtonItem,
  ButtonOptions,
  CustomRule,
  Item,
  RequiredRule,
} from "devextreme-react/form";
import { useCallback, useMemo } from "react";
import { useI18n } from "@/i18n/useI18n";
import { isAfter, isBefore } from "date-fns";

export interface ReportParam {
  ExpectedDateFrom: Date;
  SDMDlvStartDateFrom: Date;
  SDMDlvStartDateTo: Date;
  SDMDlvStartDateFromTo: any[];
  FlagDataWH: 1 | 0;
}

interface HeaderProps {
  onSearch: (data: ReportParam) => void;
  data: ReportParam;
}

export const Header = ({ onSearch, data }: HeaderProps) => {
  const { t } = useI18n("StatisticGrpDealer02");
  const handleSearch = useCallback((e: any) => {
    onSearch(data);
    e.cancel = true;
    e.preventDefault();
  }, []);
  const dateFieldOptions = useMemo(
    () => ({
      validationMessageMode: "always",
      openOnFieldClick: true,
      showClearButton: true,
    }),
    []
  );
  return (
    <form onSubmit={handleSearch}>
      <Form
        labelLocation={"left"}
        colCount={2}
        formData={data}
        validationGroup={"all"}
      >
        <Item itemType={"group"}>
          <Item
            itemType={"simple"}
            dataField={"Date_From"}
            editorOptions={dateFieldOptions}
            editorType={"dxDateBox"}
          >
            <RequiredRule message={t("FieldIsRequired")} />
            <CustomRule
              ignoreEmptyValue={true}
              type={"custom"}
              message={t("DateFromMustBeBeforeDateTo")}
              validationCallback={({ value }: any) => {
                if (data.SDMDlvStartDateFrom) {
                  return isBefore(value, data.SDMDlvStartDateFrom);
                }
                return true;
              }}
            />
          </Item>
          <Item
            itemType={"simple"}
            dataField={"Date_To"}
            editorType={"dxDateBox"}
            editorOptions={dateFieldOptions}
          >
            <RequiredRule message={t("FieldIsRequired")} />
            <CustomRule
              ignoreEmptyValue={true}
              type={"custom"}
              message={t("DateToMustBeGreaterThanDateFrom")}
              validationCallback={({ value }: any) => {
                if (data.SDMDlvStartDateTo) {
                  return isAfter(value, data.SDMDlvStartDateTo);
                }
                return true;
              }}
            />
          </Item>
        </Item>
        <Item
          itemType={"simple"}
          dataField={"FlagDataWH"}
          editorType={"dxCheckBox"}
        />
        <ButtonItem verticalAlignment={"center"} horizontalAlignment={"left"}>
          <ButtonOptions
            text={t("GetData")}
            stylingMode={"contained"}
            type="default"
            useSubmitBehavior={true}
          />
        </ButtonItem>
      </Form>
    </form>
  );
};
