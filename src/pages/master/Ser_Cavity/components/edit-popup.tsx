import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { FormOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Popup } from "devextreme-react";
import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { viewingDataAtom } from "./dealer-store";

export interface DealerPopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const DealerPopupView = ({
  onEdit,
  formSettings,
}: DealerPopupViewProps) => {
  const { t } = useI18n("Common");
  const [viewingItem, setViewingItem] = useAtom(viewingDataAtom);

  const api = useClientgateApi();

  const handleEdit = () => {
    let rowIndex = viewingItem?.rowIndex;
    if (viewingItem) {
      setViewingItem(undefined);
    }
    if (typeof rowIndex === "number") {
      onEdit(rowIndex);
    }
  };

  const handleCancel = () => {
    setViewingItem(undefined);
  };

  const {
    register,
    reset,
    unregister,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<any>({
    values: {
      KhachHangCungLaNguoiLienLac: true,
      KhachHang: "CANHAN",
      visible: false,
      visible_TKTTKH: false,
    },
  });

  const { data: getCavityType } = useQuery(
    ["getCavityType"],
    api.Mst_Compartment_GetAllActive
  );

  const handleSave = () => {};

  return (
    <Popup
      visible={false}
      width={600}
      showCloseButton
      toolbarItems={[
        {
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: t("Save"),
            stylingMode: "contained",
            type: "default",
            onClick: handleSave,
          },
        },
      ]}
    >
      <div className="flex flex-col ttkh">
        <div className="relative mt-[20px]">
          <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
            Thông tin khoang dịch vụ
          </div>
          <div className="grid grid-cols-1 mx-[5px] px-[5px] pt-[20px] border-[1px] border-[#bebebe] gap-[10px]">
            <div className="">
              <Controller
                name={"CavityNo"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("CavityNo")}
                      error={errors.CavityNo}
                      required
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"CavityName"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("CavityName")}
                      error={errors.CavityName}
                      required
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"CavityType"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      required
                      field={field}
                      label={t("CavityType")}
                      dataSource={getCavityType?.DataList}
                      displayExpr="CompartmentName"
                      valueExpr="CompartmentCode"
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"Note"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("Note")}
                      error={errors.Note}
                      required
                    />
                  );
                }}
              />
            </div>

            <div className="">
              <Controller
                name={"StartUseDate"}
                control={control}
                render={({ field }) => {
                  return (
                    <DateBoxField
                      field={field}
                      label={t("StartUseDate")}
                      error={errors.StartUseDate}
                      displayFormat="yyyy-MM-dd"
                      type="date"
                      required
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"FinishUseDate"}
                control={control}
                render={({ field }) => {
                  return (
                    <DateBoxField
                      field={field}
                      label={t("FinishUseDate")}
                      error={errors.FinishUseDate}
                      displayFormat="yyyy-MM-dd"
                      type="date"
                      required
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};
