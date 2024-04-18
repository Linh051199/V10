import { useI18n } from "@/i18n/useI18n";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateRangeBoxField } from "@/packages/ui/hook-form-field/DateRangeBoxField";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TagBoxField } from "@/packages/ui/hook-form-field/TagBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { format } from "date-fns";
import { Button, RadioGroup, ScrollView, Tabs, TagBox } from "devextreme-react";
import { nanoid } from "nanoid";
import { useRef } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import RenderTable from "./components/RenderTable";
import "./style.scss";

const TaoMoiKhuyenMai = () => {
  const methods = useForm();

  const { t } = useI18n("TaoMoiKhuyenMai");

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
      PRMCode: "PRMCODESYS.E3B.00019",
      DaysOfWeek: null,
      Months: null,
      Hours: null,
      Days: null,
      PRMName: null,
      Remark: null,
      DetailPrm: [
        {
          Lst_BuyProduct: [],
          Qty: 0,
          Price: 0,
          Lst_PrmProduct: [],
          QtyPrm: 0,
          isNhomHang: false,
          Lst_Voucher: [],
          Type: 1,
          SalePrice: 0,
          Max: 0,
          TotalPrice: 0,
        },
      ],
      PRMMainType: 2,
      PRMPrdType: 1,
      Lst_QtySale: [
        {
          id: nanoid(),
          Lst_BuyProduct: [],
          Array: [
            {
              SaleType: 1,
              SalePurchaseType: 1,
            },
          ],
        },
      ],
      TargetOrg: 1,
      TargetCreateBy: 1,
      TargetGroupCustomer: 1,
      FlagBirthDayEffType: 0,
      Lst_org: [],
      Lst_createBy: [],
      Lst_groupCode: [],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "DetailPrm",
    });

  const fieldSale = useFieldArray({
    control,
    name: "Lst_QtySale",
  });

  const dataSource = {
    OrgID: [
      {
        id: 1,
        value: "all",
      },
      {
        id: 2,
        value: [
          { org: 1, name: "Org 1" },
          { org: 2, name: "Org 2" },
        ],
      },
    ],
    CreateBy: [
      {
        id: 1,
        value: "all",
      },
      {
        id: 2,
        value: [
          { createBy: 1, name: "Người tạo A" },
          { createBy: 2, name: "Người tạo B" },
        ],
      },
    ],
    GroupCustomer: [
      {
        id: 1,
        value: "all",
      },
      {
        id: 2,
        value: [
          { groupCode: 1, name: "Nhóm khách hàng A" },
          { groupCode: 2, name: "Nhóm khách hàng B" },
        ],
      },
    ],
    Tabs: [
      {
        id: 0,
        text: "Thông tin khuyến mại",
      },
      {
        id: 1,
        text: "Thời gian và phạm vi áp dụng",
      },
    ],
    PRMMainType: [
      {
        id: 1,
        name: "Đơn hàng",
      },
      {
        id: 2,
        name: "Hàng hóa",
      },
      {
        id: 3,
        name: "Hàng hóa và đơn hàng",
      },
    ],
    PRMPrdType: [
      {
        id: 1,
        name: "Tặng hàng",
      },
      {
        id: 2,
        name: "Giảm giá hàng",
      },
      {
        id: 3,
        name: "Giảm giá và bán theo SL mua",
      },
      {
        id: 4,
        name: "Tặng voucher",
      },
    ],
    DaysOfWeek: [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ].map((item: any, index: any) => {
      return {
        id: index,
        value: item,
      };
    }),
    Months: [
      "Tháng Một",
      "Tháng Hai",
      "Tháng Ba",
      "Tháng Tư",
      "Tháng Năm",
      "Tháng Sáu",
      "Tháng Bảy",
      "Tháng Tám",
      "Tháng Chín",
      "Tháng Mười",
      "Tháng Mười Một",
      "Tháng Mười Hai",
    ].map((item: any, index: any) => {
      return {
        id: index,
        value: item,
      };
    }),
    Hours: [...Array(24).keys()].map((hour) => {
      return {
        id: Math.floor(Math.random() * 10000),
        value: hour,
        name: `${hour} giờ`,
      };
    }),
    Days: [...Array(31).keys()]
      .map((day) => day + 1)
      .map((day) => {
        return {
          id: Math.floor(Math.random() * 10000),
          name: `Ngày ${day}`,
        };
      }),
    SaleType: [
      { id: 1, value: "Giảm giá" },
      { id: 2, value: "Giá bán" },
    ],
    SalePurchaseType: [
      { id: 1, value: "VNĐ" },
      { id: 2, value: "%" },
    ],
  };

  const currentTab = watch("CurrentTab");
  const currentDaysOfWeek = watch("DaysOfWeek");
  const currentMonths = watch("Months");
  const currentHours = watch("Hours");
  const currentDays = watch("Days");
  const currentPRMMainType = watch("PRMMainType");
  const currentPRMPrdType = watch("PRMPrdType");

  const renderCustomItem = (
    data,
    strValue,
    valueExpr,
    displayExpr,
    titleTagBox,
    titleAll
  ) => {
    if (data.id == 1) {
      return <div>{titleAll}</div>;
    } else {
      return (
        <div className="flex items-center gap-[5px]">
          <div>{titleTagBox}</div>
          <TagBox
            dataSource={data[strValue]}
            valueExpr={valueExpr}
            displayExpr={displayExpr}
            className="w-full"
            onValueChange={(e) => {
              setValue(`Lst_${valueExpr}`, e);
            }}
            value={watch(`Lst_${valueExpr}`)}
          />
        </div>
      );
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    let lst = [];

    if (data.PRMMainType == 1 && data.PRMPrdType == 1) {
      lst = data.DetailPrm.map((item) => {
        return {
          TotalPrice: item.TotalPrice,
          SalePrice: item.SalePrice,
          Type: item.Type,
          Max: item.Max,
        };
      });
    }

    if (data.PRMMainType == 1 && data.PRMPrdType == 2) {
      lst = data.DetailPrm.map((item) => {
        return {
          TotalPrice: item.TotalPrice,
          Lst_PrmProduct: item.Lst_PrmProduct,
          QtyPrm: item.QtyPrm,
        };
      });
    }

    if (data.PRMMainType == 1 && data.PRMPrdType == 3) {
      lst = data.DetailPrm.map((item) => {
        return {
          TotalPrice: item.TotalPrice,
          Lst_PrmProduct: item.Lst_PrmProduct,
          QtyPrm: item.QtyPrm,
          SalePrice: item.SalePrice,
          Type: item.Type,
          Max: item.Max,
        };
      });
    }

    if (data.PRMMainType == 1 && data.PRMPrdType == 4) {
      lst = data.DetailPrm.map((item) => {
        return {
          TotalPrice: item.TotalPrice,
          QtyPrm: item.QtyPrm,
          Lst_Voucher: item.Lst_Voucher,
        };
      });
    }

    if (data.PRMMainType == 2 && data.PRMPrdType == 1) {
      lst = data.DetailPrm.map((item) => {
        return {
          Lst_BuyProduct: item.Lst_BuyProduct,
          Qty: item.Qty,
          Price: item.Price,
          Lst_PrmProduct: item.Lst_PrmProduct,
          QtyPrm: item.QtyPrm,
        };
      });
    }

    if (data.PRMMainType == 2 && data.PRMPrdType == 2) {
      lst = data.DetailPrm.map((item) => {
        return {
          Lst_BuyProduct: item.Lst_BuyProduct,
          Qty: item.Qty,
          Price: item.Price,
          Lst_PrmProduct: item.Lst_PrmProduct,
          QtyPrm: item.QtyPrm,
          SalePrice: item.SalePrice,
          Type: item.Type,
          Max: item.Max,
        };
      });
    }

    if (data.PRMMainType == 2 && data.PRMPrdType == 3) {
      lst = data.Lst_QtySale;
    }

    const result = {
      "Thời gian": `EffDTime: ${format(
        data.EffDTime[0],
        "yyyy-MM-dd"
      )} -> ${format(data.EffDTime[1], "yyyy-MM-dd")}`,
      Tháng: `Months: ${data.Months}`,
      Ngày: `Days: ${data.Days}`,
      Thứ: `DaysOfWeek: ${data.DaysOfWeek}`,
      Giờ: `Hours: ${data.Hours}`,
      "Cờ sinh nhật": `FlagBirthDayEffType: ${
        data.FlagBirthDayEffType ? 1 : 0
      }`,
      "Cờ tất cả chi nhánh": `TargetOrg: ${data.TargetOrg == 1 ? 1 : 0}`,
      "Cờ tất cả người tạo đơn hàng": `TargetCreateBy: ${
        data.TargetCreateBy == 1 ? 1 : 0
      }`,
      "Cờ tất cả khách hàng": `TargetGroupCustomer: ${
        data.TargetGroupCustomer == 1 ? 1 : 0
      }`,
      "Chọn chi nhánh": `Lst_org: ${data.Lst_org}`,
      "Chọn người tạo": `Lst_createBy: ${data.Lst_createBy}`,
      "Chọn nhóm KH": `Lst_groupCode: ${data.Lst_groupCode}`,
      "Mã chương trình": `PRMCode: ${data.PRMCode}`,
      "Tên chương trình": `PRMName: ${data.PRMName}`,
      "Ngân sách": `BudgetVal: ${data.BudgetVal}`,
      "Ghi chú": `Remark: ${data.Remark}`,
      "Cờ không áp dụng dồn": `FlagParallel: ${data.FlagParallel ? 1 : 0}`,
      "Khuyến mại theo": `PRMMainType: ${data.PRMMainType} - ${
        dataSource.PRMMainType.find((c) => c.id == data.PRMMainType)?.name
      }`,
      "Hình thức khuyến mại": `PRMPrdType: ${data.PRMPrdType} - ${
        dataSource.PRMPrdType.find((c) => c.id == data.PRMPrdType)?.name
      }`,
      "Cờ nhận khuyến mại": `FlagMulti: ${data.FlagMulti ? 1 : 0}`,
      "Chi tiết khuyến mại": lst,
    };

    const jsonContent = JSON.stringify(result, null, 2); // Format JSON with indentation
    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.json";
    link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const onSave = () => {
    refSubmitButton.current.click();
  };

  const handleAppend = () => {
    if (currentPRMMainType == 2 && currentPRMPrdType == 3) {
      fieldSale.append({
        id: nanoid(),
        Array: [
          {
            SaleType: 1,
            SalePurchaseType: 1,
          },
        ],
      });
    } else {
      append({
        Lst_BuyProduct: [],
        Qty: 0,
        Price: 0,
        Lst_PrmProduct: [],
        QtyPrm: 0,
        isNhomHang: false,
        isNhomHangPrm: false,
        Lst_Voucher: [],
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <ScrollView>
        <form onSubmit={handleSubmit(onSubmit)} id={"editForm"}>
          <div className="flex flex-col pb-[10px] taomoikhuyenmai">
            <div className="flex items-center justify-between p-[10px]">
              <div className="font-semibold">Tạo mới khuyến mại</div>
              <div className="flex items-center">
                <Button
                  stylingMode="contained"
                  type="default"
                  text="Lưu"
                  onClick={onSave}
                ></Button>
                <Button
                  stylingMode="contained"
                  type="default"
                  text="Lưu & Tạo mới"
                ></Button>
              </div>
            </div>

            <div className="separator"></div>

            <Tabs
              dataSource={dataSource.Tabs}
              width={400}
              className="m-[10px]"
              keyExpr={"id"}
              defaultSelectedIndex={currentTab}
              onSelectedIndexChange={(value) => {
                setValue("CurrentTab", value);
              }}
            />

            {currentTab == 0 && (
              <>
                <div className="grid grid-cols-2 w-full gap-[10px] p-[10px]">
                  <div className="">
                    <div className="">
                      <Controller
                        name={"PRMCode"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={"Mã chương trình"}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"PRMName"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              field={field}
                              label={"Tên chương trình"}
                              required
                              error={errors.PRMName}
                            />
                          );
                        }}
                        rules={{
                          required: {
                            value: true,
                            message: "Tên chương trình không được bỏ trống!",
                          },
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"BudgetVal"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <NumberBoxField
                              field={field}
                              label={t("Ngân sách")}
                              props={{
                                format: "#,##0.00",
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name={"FlagParallel"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <CheckBoxField
                              field={field}
                              label={
                                "Không được áp dụng đồng thời với chương trình KM khác"
                              }
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="row-span-2">
                    <div className="">
                      <Controller
                        name={"Remark"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextAreaField field={field} label="Ghi chú" />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-[10px] text-[18px] text-[#00703c] font-semibold">
                  HÌNH THỨC KHUYẾN MẠI
                </div>

                <div className="grid grid-cols-3 gap-[10px] p-[10px]">
                  <div className="">
                    <div className="">
                      <Controller
                        name={"PRMMainType"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectBoxField
                              dataSource={dataSource.PRMMainType}
                              valueExpr="id"
                              displayExpr="name"
                              field={field}
                              label={"Khuyến mãi theo"}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <div className="">
                      <Controller
                        name={"PRMPrdType"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <SelectBoxField
                              dataSource={dataSource.PRMPrdType}
                              valueExpr="id"
                              displayExpr="name"
                              field={field}
                              label={"Hình thức khuyến mại"}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <Controller
                        name={"FlagMulti"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <CheckBoxField
                              field={field}
                              label={"Nhân khuyến mại theo số lượng mua"}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-[10px] text-[18px] text-[#00703c] font-semibold">
                  CHI TIẾT KHUYẾN MẠI
                </div>

                <RenderTable
                  control={control}
                  fields={fields}
                  remove={remove}
                  PRMMainType={currentPRMMainType}
                  PRMPrdType={currentPRMPrdType}
                  setValue={setValue}
                  fieldSale={fieldSale}
                  watch={watch}
                />

                <Button
                  className="w-[100px] m-[10px]"
                  stylingMode="contained"
                  type="default"
                  onClick={handleAppend}
                >
                  Thêm
                </Button>
              </>
            )}

            {currentTab == 1 && (
              <>
                <div className="px-[10px] text-[18px] text-[#00703c] font-semibold">
                  THỜI GIAN ÁP DỤNG
                </div>

                <div className="grid grid-cols-3 gap-[10px] pt-[10px] px-[10px]">
                  <div className="">
                    <div className="">
                      <Controller
                        name={"EffDTime"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateRangeBoxField
                              field={field}
                              label={"Thời gian"}
                              required
                              error={errors.EffDTime}
                            />
                          );
                        }}
                        rules={{
                          required: {
                            value: true,
                            message: "Thời gian không được bỏ trống!",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <div className="">
                      <Controller
                        name={"Months"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TagBoxField
                              dataSource={dataSource.Months}
                              field={field}
                              displayExpr="value"
                              valueExpr="id"
                              label="Theo tháng"
                              value={currentMonths}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <div className="">
                      <Controller
                        name={"Days"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TagBoxField
                              dataSource={dataSource.Days}
                              field={field}
                              displayExpr="name"
                              valueExpr="id"
                              label="Ngày"
                              value={currentDays}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-[10px] px-[10px]">
                  <div className="">
                    <div className="">
                      <Controller
                        name={"DaysOfWeek"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TagBoxField
                              dataSource={dataSource.DaysOfWeek}
                              field={field}
                              displayExpr="value"
                              valueExpr="id"
                              label="Thứ"
                              value={currentDaysOfWeek}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <div className="">
                      <Controller
                        name={"Hours"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TagBoxField
                              dataSource={dataSource.Hours}
                              field={field}
                              displayExpr="name"
                              valueExpr="value"
                              label="Giờ"
                              value={currentHours}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="">
                    {" "}
                    <div className="">
                      <Controller
                        name={"FlagBirthDayEffType"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <CheckBoxField
                              field={field}
                              label={"Ngày sinh nhật của khách hàng"}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-[10px] px-[10px] text-[18px] text-[#00703c] font-semibold">
                  PHẠM VI ÁP DỤNG
                </div>

                <div className="grid grid-cols-3 gap-[10px] px-[10px] pt-[10px]">
                  <div className="">
                    <RadioGroup
                      items={dataSource.OrgID}
                      itemRender={(data) =>
                        renderCustomItem(
                          data,
                          "value",
                          "org",
                          "name",
                          `Chọn chi nhánh`,
                          `Tất cả chi nhánh`
                        )
                      }
                      valueExpr={"id"}
                      value={watch("TargetOrg")}
                      onValueChange={(e) => {
                        setValue("TargetOrg", e);
                      }}
                    />
                  </div>
                  <div className="">
                    <RadioGroup
                      items={dataSource.CreateBy}
                      itemRender={(data) =>
                        renderCustomItem(
                          data,
                          "value",
                          "createBy",
                          "name",
                          `Chọn người tạo`,
                          `Tất cả người tạo đơn hàng`
                        )
                      }
                      valueExpr={"id"}
                      value={watch("TargetCreateBy")}
                      onValueChange={(e) => {
                        setValue("TargetCreateBy", e);
                      }}
                    />
                  </div>
                  <div className="">
                    <RadioGroup
                      items={dataSource.GroupCustomer}
                      itemRender={(data) =>
                        renderCustomItem(
                          data,
                          "value",
                          "groupCode",
                          "name",
                          `Chọn nhóm KH`,
                          `Tất cả khách hàng`
                        )
                      }
                      valueExpr={"id"}
                      value={watch("TargetGroupCustomer")}
                      onValueChange={(e) => {
                        setValue("TargetGroupCustomer", e);
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            hidden={true}
            ref={refSubmitButton}
            type={"submit"}
            form={"editForm"}
          ></button>
        </form>
      </ScrollView>
    </FormProvider>
  );
};

export default TaoMoiKhuyenMai;
