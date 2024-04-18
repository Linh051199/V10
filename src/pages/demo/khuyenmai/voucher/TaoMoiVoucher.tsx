import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, ScrollView, Tabs } from "devextreme-react";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TabInfoVoucher from "./components/TabInfo/TabInfoVoucher";
import TabListVoucher from "./components/TabList/TabListVoucher";
import { VoucherStore } from "./components/store/VoucherStore";
import "./taomoi.scss";

const TaoMoiVoucher = () => {
  const methods = useForm();

  const gridRef = useRef();
  const refSubmitButton = useRef();

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
    defaultValues: {
      CurrentTab: 0,
      PrmType: 1,
      RadioPrmType: 1,
      RadioReleaseType: 1,
      RadioConditionApply: 1,
      RadioTimeApply: 1,
      RadioTargetOrg: 1,
      RadioCreateBy: 1,
      RadioGroupCustomer: 1,
    },
  });

  const currentTab = watch("CurrentTab");

  const onSubmit = (data) => {
    console.log(gridRef.current.getData());
    alert();
  };

  console.log(errors);

  const onSave = () => {
    refSubmitButton.current.click();
  };

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="TaoMoiVoucher"
      useNative
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} id={"editForm"}>
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-[10px]">
              <div className="flex items-center gap-[5px]">
                <ToggleSidebarButton />
                <div className="font-semibold text-[#00703c]">Voucher</div>
                <div>&gt;</div>
                <div className="font-semibold">Tạo mới voucher</div>
              </div>
              <div className="flex items-center gap-[10px]">
                <Button
                  style={{
                    padding: 10,
                  }}
                  type="default"
                  onClick={onSave}
                >
                  Lưu
                </Button>
              </div>
            </div>

            <div className="separator"></div>

            <Tabs
              dataSource={VoucherStore.Tabs}
              width={400}
              className="m-[10px]"
              keyExpr={"id"}
              defaultSelectedIndex={currentTab}
              onSelectedIndexChange={(value) => {
                setValue("CurrentTab", value);
              }}
            />

            {currentTab == 0 && (
              <TabInfoVoucher
                control={control}
                errors={errors}
                setValue={setValue}
                watch={watch}
              />
            )}

            {currentTab == 1 && <TabListVoucher ref={gridRef} />}
          </div>

          <button
            hidden={true}
            ref={refSubmitButton}
            type={"submit"}
            form={"editForm"}
          ></button>
        </form>
      </FormProvider>
    </ScrollView>
  );
};

export default TaoMoiVoucher;
