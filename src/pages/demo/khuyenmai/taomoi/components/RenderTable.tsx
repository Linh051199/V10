import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { Button } from "devextreme-react";
import { nanoid } from "nanoid";
import { Controller } from "react-hook-form";
import CustomTagBoxPrm from "./CustomTagBoxPrm";
import VoucherTagBox from "./VoucherTagBox";

const RenderTable = ({
  fields,
  remove,
  control,
  PRMPrdType,
  PRMMainType,
  setValue,
  fieldSale,
  watch,
}) => {
  const dataSource = {
    Type: [
      { id: 1, value: "Tiền" },
      { id: 2, value: "%" },
    ],
    SaleType: [
      { id: 1, value: "Giảm giá" },
      { id: 2, value: "Giá bán" },
    ],
    SalePurchaseType: [
      { id: 1, value: "VNĐ" },
      { id: 2, value: "%" },
    ],
  };

  if (PRMMainType == 2 && PRMPrdType == 1 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Hàng/nhóm hàng khuyến mại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHangPrm`, isNhomHang);
                    };

                    const isNhomHang = watch(
                      `DetailPrm.${index}.isNhomHangPrm`
                    );

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 2 && PRMPrdType == 2 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Hàng được giảm giá
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SL giảm giá
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Giảm giá
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Loại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tối đa
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHangPrm`, isNhomHang);
                    };

                    const isNhomHang = watch(
                      `DetailPrm.${index}.isNhomHangPrm`
                    );

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.SalePrice`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <SelectBoxField
                      dataSource={dataSource.Type}
                      displayExpr={"value"}
                      valueExpr="id"
                      field={field}
                    />
                  )}
                  name={`DetailPrm.${index}.Type`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Max`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 2 && PRMPrdType == 3 && fields.length > 0) {
    return fieldSale.fields?.map((item: any, index: any) => {
      return (
        <div className="flex flex-col gap-[10px] py-[20px]" key={nanoid()}>
          <div className="flex items-center  gap-[10px] p-[10px]">
            <div className="w-[30px] h-[30px]">
              <Button
                icon="/images/icons/trash.svg"
                stylingMode="text"
                type="normal"
                onClick={() => remove(index)}
              ></Button>
            </div>

            <div>Khi mua</div>

            <div className="flex-grow">
              <Controller
                render={({ field }) => {
                  const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                    setValue(`Lst_QtySale.${index}.isNhomHang`, isNhomHang);
                  };

                  const isNhomHang = watch(`Lst_QtySale.${index}.isNhomHang`);

                  return (
                    <CustomTagBoxPrm
                      field={field}
                      append={handleChangeIsNhomHang}
                      isNhomHang={isNhomHang}
                    />
                  );
                }}
                name={`Lst_QtySale.${index}.Lst_BuyProduct`}
                control={control}
              />
            </div>
          </div>
          <div className="ml-[50px] flex flex-col gap-[10px]">
            {item.Array.map((c, i) => {
              const crSaleType = watch(
                `Lst_QtySale.${index}.Array.${i}.SaleType`
              );

              const crSalePurchaseType = watch(
                `Lst_QtySale.${index}.Array.${i}.SalePurchaseType`
              );

              return (
                <div className="flex items-center gap-[10px]" key={nanoid()}>
                  <div className="w-[30px] h-[30px]">
                    <Button
                      icon="/images/icons/trash.svg"
                      stylingMode="text"
                      type="normal"
                      onClick={() => {
                        const updatedArray = item.Array.filter(
                          (item, arrayIndex) => arrayIndex !== i
                        );
                        fieldSale.update(index, {
                          ...item,
                          Array: updatedArray,
                        }); // Update the item with new array
                      }}
                    ></Button>
                  </div>
                  <div>Số lượng từ</div>
                  <Controller
                    render={({ field }) => (
                      <NumberBoxField
                        field={field}
                        props={{
                          format: "#,##0",
                        }}
                      />
                    )}
                    name={`Lst_QtySale.${index}.Array.${i}.QtyFrom`}
                    control={control}
                  />
                  <div>Thành tiền</div>
                  <Controller
                    render={({ field }) => (
                      <NumberBoxField
                        field={field}
                        props={{
                          format: "#,##0",
                        }}
                      />
                    )}
                    name={`Lst_QtySale.${index}.Array.${i}.Price`}
                    control={control}
                  />
                  <Controller
                    render={({ field }) => (
                      <SelectBoxField
                        dataSource={dataSource.SaleType}
                        displayExpr={"value"}
                        valueExpr="id"
                        field={field}
                        width={100}
                      />
                    )}
                    name={`Lst_QtySale.${index}.Array.${i}.SaleType`}
                    control={control}
                  />
                  <Controller
                    render={({ field }) => (
                      <NumberBoxField
                        field={field}
                        props={{
                          format: "#,##0",
                          width: 100,
                        }}
                      />
                    )}
                    name={`Lst_QtySale.${index}.Array.${i}.SalePrice`}
                    control={control}
                  />
                  <div className="flex items-center gap-[10px]">
                    <div
                      className={`${
                        crSalePurchaseType == 1 && "bg-[#00703c] text-white"
                      } h-[30px] w-[50px] flex items-center justify-center  cursor-pointer border-[1px] border-solid`}
                      onClick={() => {
                        setValue(
                          `Lst_QtySale.${index}.Array.${i}.SalePurchaseType`,
                          1
                        );
                      }}
                    >
                      VND
                    </div>
                    <div
                      className={`${
                        crSalePurchaseType == 2 && "bg-[#00703c] text-white"
                      } h-[30px] w-[50px] flex items-center justify-center  cursor-pointer border-[1px] border-solid`}
                      onClick={() => {
                        setValue(
                          `Lst_QtySale.${index}.Array.${i}.SalePurchaseType`,
                          2
                        );
                      }}
                    >
                      %
                    </div>
                  </div>
                  {crSaleType == 1 && (
                    <>
                      <div>Tối đa</div>
                      <Controller
                        render={({ field }) => (
                          <NumberBoxField
                            field={field}
                            props={{
                              format: "#,##0",
                              width: 100,
                            }}
                          />
                        )}
                        name={`Lst_QtySale.${index}.Array.${i}.Max`}
                        control={control}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <Button
            className="w-[100px] ml-[60px] mt-[10px]"
            stylingMode="outlined"
            type="default"
            onClick={() => {
              const updatedArray = [
                ...item.Array,
                {
                  SaleType: 1,
                },
              ]; // Create a copy and add new item
              fieldSale.update(index, {
                ...item,
                Array: updatedArray,
              }); // Update the item with new array
            }}
          >
            + Thêm
          </Button>

          <div
            className="h-[0.5px] bg-[#00703c] ml-[20px] mt-[20px]"
            style={{
              width: "calc(100% - 40px)",
            }}
          ></div>
        </div>
      );
    });
  }

  if (PRMMainType == 2 && PRMPrdType == 4 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Voucher
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    return <VoucherTagBox field={field} />;
                  }}
                  name={`DetailPrm.${index}.Lst_Voucher`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 1 && PRMPrdType == 1 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Giảm giá đơn hàng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Loại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tối đa
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.TotalPrice`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.SalePrice`}
                  control={control}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <SelectBoxField
                      dataSource={dataSource.Type}
                      displayExpr={"value"}
                      valueExpr="id"
                      field={field}
                    />
                  )}
                  name={`DetailPrm.${index}.Type`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Max`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 1 && PRMPrdType == 2 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[200px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng khuyến mại
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.TotalPrice`}
                  control={control}
                  key={nanoid()}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                    };

                    const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        key={nanoid()}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                  key={nanoid()}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                  key={nanoid()}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 1 && PRMPrdType == 3 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[200px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng khuyến mại
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Giảm giá
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Loại
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tối đa
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.TotalPrice`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                    };

                    const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.SalePrice`}
                  control={control}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <SelectBoxField
                      dataSource={dataSource.Type}
                      displayExpr={"value"}
                      valueExpr="id"
                      field={field}
                    />
                  )}
                  name={`DetailPrm.${index}.Type`}
                  control={control}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Max`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 1 && PRMPrdType == 4 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[200px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Voucher
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    return <VoucherTagBox field={field} />;
                  }}
                  name={`DetailPrm.${index}.Lst_Voucher`}
                  control={control}
                />
              </td>

              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 3 && PRMPrdType == 4 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Voucher
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    return <VoucherTagBox field={field} />;
                  }}
                  name={`DetailPrm.${index}.Lst_Voucher`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 3 && PRMPrdType == 3 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[300px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[300px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Hàng/nhóm hàng khuyến mại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Giảm giá
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Loại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tối đa
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHangPrm`, isNhomHang);
                    };

                    const isNhomHang = watch(
                      `DetailPrm.${index}.isNhomHangPrm`
                    );

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <SelectBoxField
                      dataSource={dataSource.Type}
                      displayExpr={"value"}
                      valueExpr="id"
                      field={field}
                    />
                  )}
                  name={`DetailPrm.${index}.Type`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 3 && PRMPrdType == 2 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Hàng/nhóm hàng khuyến mại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            SLKM
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHangPrm`, isNhomHang);
                    };

                    const isNhomHang = watch(
                      `DetailPrm.${index}.isNhomHangPrm`
                    );

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  if (PRMMainType == 3 && PRMPrdType == 1 && fields.length > 0) {
    return (
      <table className="p-[10px]" key={nanoid()}>
        <tr key={nanoid()}>
          <th className="w-[50px] border-[1px] border-solid border-black h-[40px] font-semibold"></th>{" "}
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tổng tiền hàng
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Hàng/nhóm hàng mua
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số lượng
          </th>
          <th className="w-[150px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Số tiền
          </th>
          <th className="w-[400px] border-[1px] border-solid border-black h-[40px] font-semibold ml-[10px]">
            Giảm giá đơn hàng
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Loại
          </th>
          <th className="w-[100px] border-[1px] border-solid border-black h-[40px] font-semibold">
            Tối đa
          </th>
        </tr>
        {fields.map((item: any, index: number) => {
          return (
            <tr key={nanoid()}>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center">
                  <Button
                    icon="/images/icons/trash.svg"
                    stylingMode="text"
                    type="normal"
                    onClick={() => remove(index)}
                  ></Button>
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black">
                <div className="w-full h-full flex items-center justify-center p-[5px]">
                  <Controller
                    render={({ field }) => {
                      const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                        setValue(`DetailPrm.${index}.isNhomHang`, isNhomHang);
                      };

                      const isNhomHang = watch(`DetailPrm.${index}.isNhomHang`);

                      return (
                        <CustomTagBoxPrm
                          field={field}
                          append={handleChangeIsNhomHang}
                          isNhomHang={isNhomHang}
                        />
                      );
                    }}
                    name={`DetailPrm.${index}.Lst_BuyProduct`}
                    control={control}
                  />
                </div>
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Qty`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.Price`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => {
                    const handleChangeIsNhomHang = (isNhomHang: boolean) => {
                      setValue(`DetailPrm.${index}.isNhomHangPrm`, isNhomHang);
                    };

                    const isNhomHang = watch(
                      `DetailPrm.${index}.isNhomHangPrm`
                    );

                    return (
                      <CustomTagBoxPrm
                        field={field}
                        append={handleChangeIsNhomHang}
                        isNhomHang={isNhomHang}
                      />
                    );
                  }}
                  name={`DetailPrm.${index}.Lst_PrmProduct`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <SelectBoxField
                      dataSource={dataSource.Type}
                      displayExpr={"value"}
                      valueExpr="id"
                      field={field}
                    />
                  )}
                  name={`DetailPrm.${index}.Type`}
                  control={control}
                />
              </td>
              <td className="border-[1px] border-solid border-black p-[5px]">
                <Controller
                  render={({ field }) => (
                    <NumberBoxField
                      field={field}
                      props={{
                        format: "#,##0",
                      }}
                    />
                  )}
                  name={`DetailPrm.${index}.QtyPrm`}
                  control={control}
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  return <></>;
};

export default RenderTable;
