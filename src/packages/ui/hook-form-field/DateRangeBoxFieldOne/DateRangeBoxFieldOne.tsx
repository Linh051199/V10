import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { DateRangeBox, Validator } from "devextreme-react";
import { RequiredRule } from "devextreme-react/form";
import { Properties } from "devextreme/ui/date_range_box";
import './DateRangeBoxFieldOne.scss'
import { useState } from "react";
import { useVisibilityControl } from "@/packages/hooks";


interface DateRangeBoxFieldOneProps extends Properties {
  field?: any;
  label?: string;
  error?: any;
  required?: boolean;
  direction?: string;
  showClearButton?: boolean;
  type?: "date" | "datetime" | "time";
  disabled?: boolean;
  pickerType?: "calendar" | "list" | "native" | "rollers";
  multiView?: boolean;
  formComponent: any
  dataField: any
  requireDateFrom?: boolean
}

export const DateRangeBoxFieldOne = ({
  field,
  label,
  required = false,
  error,
  direction,
  showClearButton = false,
  type = "datetime",
  pickerType = "calendar",
  disabled = false,
  multiView = true,
  labelMode = "hidden",
  formComponent,
  dataField,
  requireDateFrom = false,
  ...rest
}: DateRangeBoxFieldOneProps) => {
  const { t } = useI18n("Placeholder");
  // const [showRequireTextFrom, setShowRequireTextFrom] = useState(false)
  const showRequireTextFrom = useVisibilityControl({
    defaultVisible: true,
  });
  return (
    <div
      className={`relative flex ${direction == "vertical" ? "flex-col" : "items-center"
        }  ${required ? "required" : ""} mb-[5px]`}
    >
      <div className={`flex flex-row date-range-box-field-one ${requireDateFrom && 'date-require-from'} ${showRequireTextFrom.visible ? 'show-text-require-from' : ""}`}>
        <DateRangeBox
          width={"100%"}
          className="dateRange"
          displayFormat="yyyy-MM-dd"
          showClearButton={true}
          // defaultStartDate={searchCondition.current?.DateFromTo[0]}
          // defaultEndDate={searchCondition.current?.DateFromTo[1]}
          useMaskBehavior={true}
          openOnFieldClick={true}
          labelMode="hidden"
          multiView={multiView}
          onValueChanged={(e: any) => {
            if (e.value[0] && requireDateFrom) {
              showRequireTextFrom.open()
            } else {
              showRequireTextFrom.close()
            }
            formComponent.updateData(dataField, e.value);
          }}
        >
          <Validator
            validationGroup={formComponent.option("validationGroup")}
            validationRules={[
              RequiredField(t(`${dataField}IsRequired`)),
            ]}
          >
            <RequiredRule message={t("DateFromToIsRequired")} />
          </Validator>
        </DateRangeBox>
      </div>
    </div>
  );
};
