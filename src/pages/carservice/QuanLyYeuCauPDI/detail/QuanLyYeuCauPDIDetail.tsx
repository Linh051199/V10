import { useI18n } from "@/i18n/useI18n";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { ScrollView } from "devextreme-react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import "./ChiTietYeuCauPDI.scss";

const QuanLyYeuCauPDIDetail = () => {
  const { t } = useI18n("ChiTietYeuCauPDI");

  const methods = useForm();

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
    values: {},
  });

  const handleNavigateHome = () => {};

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="ChiTietYeuCauPDI"
      useNative
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center p-2 header-content">
          <div className="flex items-center h-[30px]">
            <ToggleSidebarButton />
            <p
              className="font-medium cursor-pointer hover:underline"
              onClick={handleNavigateHome}
            >
              Quản lý yêu cầu PDI
            </p>
            <p className="mx-[5px]">&gt;</p>
            <p className="text-[#00703c] font-semibold">Chi tiết yêu cầu PDI</p>
          </div>
        </div>
        <div className="h-[3px] mt-[50px]"></div>
        <div className="grid grid-cols-3 grid-rows-2 gap-[10px] p-[5px]">
          <div className="grid">
            <div>
              <Controller
                name={"SoYCPDI"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("SoYCPDI")}
                      error={errors.SoYCPDI}
                      disabled
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"NgayTao"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("NgayTao")}
                      error={errors.NgayTao}
                      disabled
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <Controller
                name={"TrangThai"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("TrangThai")}
                      error={errors.TrangThai}
                      disabled
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"NgayDuyet"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("NgayDuyet")}
                      error={errors.NgayDuyet}
                      disabled
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid">
            <div>
              <Controller
                name={"PhuKien"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("PhuKien")}
                      error={errors.PhuKien}
                      disabled
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                name={"NoiDung"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("NoiDung")}
                      error={errors.NoiDung}
                      disabled
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </FormProvider>
    </ScrollView>
  );
};

export default QuanLyYeuCauPDIDetail;
