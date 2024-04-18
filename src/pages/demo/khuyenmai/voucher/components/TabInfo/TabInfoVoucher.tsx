import { DateRangeBoxField } from "@/packages/ui/hook-form-field/DateRangeBoxField";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { RadioGroup, SelectBox } from "devextreme-react";
import { Controller } from "react-hook-form";
import CustomTagBoxPrm from "../../../taomoi/components/CustomTagBoxPrm";
import { VoucherStore } from "../store/VoucherStore";

const TabInfoVoucher = ({ control, errors, setValue, watch }) => {
  const crRadioPrmType = watch("RadioPrmType");

  return (
    <div className="p-[10px] grid grid-cols-2 gap-[20px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[5px] h-[150px]">
          <Controller
            name={"ReleaseCode"}
            control={control}
            render={({ field }) => {
              return <TextBoxField field={field} label={"Mã đợt phát hành"} />;
            }}
          />
          <Controller
            name={"ReleaseName"}
            control={control}
            render={({ field }) => {
              return (
                <TextBoxField
                  field={field}
                  label={"Tên đợt phát hành"}
                  required
                  error={errors.ReleaseName}
                />
              );
            }}
            rules={{
              required: {
                value: true,
                message: "Tên đợt phát hành không được bỏ trống!",
              },
            }}
          />
          <Controller
            name={"ReleaseQty"}
            control={control}
            render={({ field }) => {
              return <NumberBoxField field={field} label={"Số lượng"} />;
            }}
          />
        </div>

        <div className="bg-[#F6F6F6] w-full uppercase font-semibold p-[10px]">
          Kiểu ưu đãi
        </div>

        <RadioGroup
          items={VoucherStore.RadioPrmType}
          itemRender={(data) => {
            if (data.id == 2) {
              return <div>{data.value}</div>;
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <Controller
                  name={"SalePrice"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <NumberBoxField
                        field={field}
                        required={crRadioPrmType == 1}
                        error={crRadioPrmType == 1 ? errors.SalePrice : null}
                      />
                    );
                  }}
                  rules={
                    crRadioPrmType == 1
                      ? {
                          required: {
                            value: true,
                            message: "",
                          },
                        }
                      : {}
                  }
                />
                <SelectBox
                  dataSource={VoucherStore.PrmType}
                  width={100}
                  valueExpr={"id"}
                  displayExpr={"value"}
                  className="w-full"
                  onValueChanged={(e) => {
                    setValue(`PrmType`, e.value);
                  }}
                  value={watch(`PrmType`)}
                />
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioPrmType")}
          onValueChange={(e) => {
            setValue("RadioPrmType", e);
          }}
        />

        <div className="bg-[#F6F6F6] w-full uppercase font-semibold p-[10px]">
          Hình thức phát hành
        </div>

        <RadioGroup
          items={VoucherStore.RadioReleaseType}
          itemRender={(data) => {
            if (data.id == 2) {
              return <div>{data.value}</div>;
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <Controller
                  name={"SellPrice"}
                  control={control}
                  render={({ field }) => {
                    return <NumberBoxField field={field} />;
                  }}
                />
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioReleaseType")}
          onValueChange={(e) => {
            setValue("RadioReleaseType", e);
          }}
        />

        <div className="bg-[#F6F6F6] w-full uppercase font-semibold p-[10px]">
          Điều kiện áp dụng
        </div>

        <Controller
          name={"Price"}
          control={control}
          render={({ field }) => {
            return <NumberBoxField field={field} label="Giá trị đơn hàng" />;
          }}
        />

        <RadioGroup
          items={VoucherStore.RadioConditionApply}
          itemRender={(data) => {
            if (data.id == 1) {
              return <div>{data.value}</div>;
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <div className="w-full flex-grow flex">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`Lst_Product`}
                    control={control}
                  />
                </div>
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioConditionApply")}
          onValueChange={(e) => {
            setValue("RadioConditionApply", e);
          }}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="h-[150px]">
          <Controller
            name={"Remark"}
            control={control}
            render={({ field }) => {
              return <TextAreaField field={field} label="Mô tả" />;
            }}
          />
        </div>

        <div className="bg-[#F6F6F6] w-full uppercase font-semibold p-[10px]">
          Thời gian áp dụng
        </div>

        <RadioGroup
          items={VoucherStore.RadioTimeApply}
          itemRender={(data) => {
            if (data.id == 1) {
              return (
                <div className="flex items-center gap-[10px]">
                  <Controller
                    name={"EffDate"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <DateRangeBoxField
                          field={field}
                          label="Ngày hiệu lực"
                        />
                      );
                    }}
                  />
                </div>
              );
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <Controller
                  name={"TimeQty"}
                  control={control}
                  render={({ field }) => {
                    return <NumberBoxField field={field} />;
                  }}
                />
                <SelectBox
                  dataSource={VoucherStore.TimeType}
                  width={100}
                  valueExpr={"id"}
                  displayExpr={"value"}
                  className="w-full"
                  onValueChanged={(e) => {
                    setValue(`TimeType`, e.value);
                  }}
                  value={watch(`TimeType`)}
                />
                <div>Kể từ ngày phát hành</div>
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioTimeApply")}
          onValueChange={(e) => {
            setValue("RadioTimeApply", e);
          }}
        />

        <div className="bg-[#F6F6F6] w-full uppercase font-semibold p-[10px]">
          Phạm vi áp dụng
        </div>

        <RadioGroup
          items={VoucherStore.RadioTargetOrg}
          itemRender={(data) => {
            if (data.id == 1) {
              return <div>{data.value}</div>;
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <Controller
                  name={"Org"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        dataSource={[]}
                        displayExpr={"OrgName"}
                        valueExpr="OrgID"
                      />
                    );
                  }}
                />
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioTargetOrg")}
          onValueChange={(e) => {
            setValue("RadioTargetOrg", e);
          }}
        />

        <RadioGroup
          className="mt-[20px]"
          items={VoucherStore.RadioCreateBy}
          itemRender={(data) => {
            if (data.id == 1) {
              return <div>{data.value}</div>;
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <Controller
                  name={"Org"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        dataSource={[]}
                        displayExpr={"OrgName"}
                        valueExpr="OrgID"
                      />
                    );
                  }}
                />
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioCreateBy")}
          onValueChange={(e) => {
            setValue("RadioCreateBy", e);
          }}
        />

        <RadioGroup
          className="mt-[20px]"
          items={VoucherStore.RadioGroupCustomer}
          itemRender={(data) => {
            if (data.id == 1) {
              return <div>{data.value}</div>;
            }
            return (
              <div className="flex items-center gap-[10px]">
                <div>{data.value}</div>
                <Controller
                  name={"Org"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        dataSource={[]}
                        displayExpr={"OrgName"}
                        valueExpr="OrgID"
                      />
                    );
                  }}
                />
              </div>
            );
          }}
          valueExpr={"id"}
          value={watch("RadioGroupCustomer")}
          onValueChange={(e) => {
            setValue("RadioGroupCustomer", e);
          }}
        />
      </div>
    </div>
  );
};

export default TabInfoVoucher;
