import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { faker } from "@faker-js/faker";
import { Button, DropDownButton, ScrollView, Tabs } from "devextreme-react";
import { Item as DropDownButtonItem } from "devextreme-react/drop-down-button";
import { nanoid } from "nanoid";
import { useMemo, useRef } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import PopupTimKiemKhachHang from "./components/popup/PopupTimKiemKhachHang";
import PopupTimKiemKhoXuat from "./components/popup/PopupTimKiemKhoXuat";
import PopupTimKiemLoaiXuatKho from "./components/popup/PopupTimKiemLoaiXuatKho";
import "./components/style.scss";
import XacThucTable from "./components/table/XacThucTable";
import XuatKhoTable from "./components/table/XuatKhoTable";

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TaoMoiXuatKho = () => {
  const methods = useForm();

  const refSubmitButton = useRef();

  function generateString() {
    // Define the format of the string with placeholders
    const format = "PX.{department}.{number}";

    // Use faker to generate random values for placeholders
    const department = faker.commerce.department();
    const number = faker.random.numeric(6); // Generate 6 digit number

    // Replace placeholders in the format with generated values
    const generatedString = format
      .replace("{department}", department)
      .replace("{number}", number);

    return generatedString;
  }

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
  } = useForm({
    defaultValues: {
      SoPhieuXuat: generateString(),
      ListSanPham: [],
      ListDanhSachTonKho: [],
      Open: false,
      Open_LoaiXuatKho: false,
      LoaiXuatKho: null,
      Open_KhoXuat: false,
      KhoXuat: null,
      Open_KhachHang: false,
      KhachHang: null,
      FlagXuatTuDonHang: false,
      CurrentTab: 0,
      ListXacThuc: [],
    },
  });

  const fieldArray_ListSanPham = useFieldArray({
    control,
    name: "ListSanPham",
  });

  const fieldArray_ListXacThuc = useFieldArray({
    control,
    name: "ListXacThuc",
  });

  const ListSanPham = watch("ListSanPham");
  const FlagXuatTuDonHang = watch("FlagXuatTuDonHang");
  const Open_LoaiXuatKho = watch("Open_LoaiXuatKho");
  const LoaiXuatKho = watch("LoaiXuatKho");
  const Open_KhoXuat = watch("Open_KhoXuat");
  const KhoXuat = watch("KhoXuat");
  const Open_KhachHang = watch("Open_KhachHang");
  const KhachHang = watch("KhachHang");
  const currentTab = watch("CurrentTab");

  const TinhToanSanPham = ListSanPham.reduce(
    (prev, cur) => {
      prev.TongTienHang = prev.TongTienHang += cur.SoLuong * cur.DonGia;
      prev.GiamGia = prev.GiamGia += cur.SoLuong * cur.GiamGia;
      prev.TongThanhToan = prev.TongThanhToan +=
        cur.SoLuong * cur.DonGia - cur.SoLuong * cur.GiamGia;

      return prev;
    },
    {
      TongTienHang: 0,
      GiamGia: 0,
      TongThanhToan: 0,
    }
  );

  const ds_HangHoa = useMemo(() => {
    return Array.from({ length: 10 }, (v, idx) => {
      const GiamGia = randomInteger(0, 5000);
      const SoLuong = 0;
      const DonGia = randomInteger(0, 100000);

      const dvt = randomInteger(1, 3);

      const resultDvt = Array.from({ length: dvt }, (v, i) => {
        const TonKho = randomInteger(0, 1000);

        const t = randomInteger(1, 5);

        const result = Array.from({ length: t }, (_, i) => {
          return {
            ViTri: faker.address.countryCode(),
            SoLuongTon: Math.floor(TonKho / t),
            SoLuongXuat: 0,
          };
        });

        return {
          id: nanoid(),
          DonViTinh: faker.commerce.productMaterial(),
          DonGia: randomInteger(0, 100000),
          SoLuong: randomInteger(0, 1000),
          TonKho: TonKho,
          GiamGia: randomInteger(0, 5000),
          ViTriXuat: result,
        };
      });

      return {
        MaHangHoa: faker.internet.userName(),
        TenHangHoa: faker.commerce.product(),
        DonViTinh: resultDvt[0].id,
        SoLuong: SoLuong,
        TonKho: resultDvt[0].TonKho,
        DonGia: resultDvt[0].DonGia,
        GiamGia: resultDvt[0].GiamGia,
        ThanhTien: SoLuong * DonGia - GiamGia,
        GhiChu: "",
        DanhSachKho: resultDvt[0].ViTriXuat,
        ViTriXuat: resultDvt[0].ViTriXuat,
        ListDonViTinh: resultDvt,
      };
    });
  }, []);

  const ds_XacThuc = useMemo(() => {
    return Array.from({ length: 10 }, (v, i) => {
      const hh = faker.commerce.product();

      return {
        MaHangHoa: hh,
        TenHangHoa: hh,
        MaXacThuc: faker.internet.password(10),
        Loai: faker.commerce.productMaterial(),
      };
    });
  }, []);

  const ds_KhoXuat = useMemo(() => {
    const result = Array.from({ length: 10 }, (v, i) => {
      return {
        TenKho: faker.address.cityName(),
        MaKho: faker.address.countryCode(),
      };
    });

    return [{ TenKho: "Tất cả", MaKho: "All" }, ...result];
  }, []);

  const ds_LoaiXuatKho = useMemo(() => {
    const result = Array.from({ length: 10 }, (v, i) => {
      const t = faker.commerce.productMaterial();
      return {
        TenLoaiXuatKho: t,
        MaLoaiXuatKho: t,
      };
    });

    return [{ TenLoaiXuatKho: "Tất cả", MaLoaiXuatKho: "All" }, ...result];
  }, []);

  const ds_KhachHang = useMemo(() => {
    const result = Array.from({ length: 10 }, (v, i) => {
      return {
        TenKhachHang: faker.internet.userName(),
        MaKhachHang: faker.internet.userName(),
      };
    });

    return [{ TenKhachHang: "Tất cả", MaKhachHang: "All" }, ...result];
  }, []);

  const handleAppend = (e) => {
    if (!e) {
      return;
    }

    const result = ds_HangHoa.find((item) => item.MaHangHoa == e);

    if (fieldArray_ListSanPham.fields.some((c) => c.MaHangHoa == e)) {
      toast.error(`Sản phẩm đã tồn tại!`);
      return;
    }

    fieldArray_ListSanPham.append(result);
  };

  const TongSoLuong = ListSanPham.reduce(
    (prev, cur) => (prev += cur.SoLuong),
    0
  );

  const handleAppendXacThuc = (e) => {
    if (!e) {
      return;
    }

    const result = ds_XacThuc.find((item) => item.MaXacThuc == e);

    if (fieldArray_ListXacThuc.fields.some((c) => c.MaXacThuc == e)) {
      toast.error(`Mã xác thực của sản phẩm đã tồn tại!`);
      return;
    }

    fieldArray_ListXacThuc.append(result);
  };

  const handleFindLoaiXuatKho = () => {
    setValue("Open_LoaiXuatKho", true);
  };

  const handleClose_LoaiXuatKho = () => {
    setValue("Open_LoaiXuatKho", false);
  };

  const handleFindKhoXuat = () => {
    setValue("Open_KhoXuat", true);
  };

  const handleClose_KhoXuat = () => {
    setValue("Open_KhoXuat", false);
  };

  const handleFindKhachHang = () => {
    setValue("Open_KhachHang", true);
  };

  const handleClose_KhachHang = () => {
    setValue("Open_KhachHang", false);
  };

  const onSubmit = (data) => {
    console.log(data);

    if (!data.ListSanPham || data.ListSanPham.length == 0) {
      toast.error("Vui lòng nhập thông tin hàng hóa!");
      return;
    }
  };

  const handleSave = () => {
    refSubmitButton.current.click();
  };

  return (
    <ScrollView>
      <FormProvider {...methods}>
        <form id={"editForm"} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[10px] p-[10px] xk">
            <div className="flex justify-end mt-[10px]">
              <Button type="default" width={100} onClick={handleSave}>
                Lưu
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-[10px] header">
              <div className="flex flex-col gap-[5px]">
                <div>
                  <Controller
                    name={"SoPhieuXuat"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Số phiếu xuất"
                          required
                          error={errors.SoPhieuXuat}
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: "Số phiếu xuất không được bỏ trống!",
                      },
                    }}
                  />
                </div>
                <div className="flex items-center gap-[5px]">
                  <Controller
                    name={"LoaiXuatKho"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label="Loại xuất kho"
                          dataSource={ds_LoaiXuatKho}
                          displayExpr={"TenLoaiXuatKho"}
                          valueExpr="MaLoaiXuatKho"
                          required
                          error={errors.LoaiXuatKho}
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: "Loại xuất kho không được bỏ trống!",
                      },
                    }}
                  />
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={handleFindLoaiXuatKho}
                    icon="/images/icons/search.svg"
                  ></Button>
                </div>
                <div className="flex items-center gap-[5px]">
                  <Controller
                    name={"KhoXuat"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label="Kho xuất"
                          dataSource={ds_KhoXuat}
                          displayExpr={"TenKho"}
                          valueExpr="MaKho"
                          required
                          disabled={ListSanPham.length > 0}
                          error={errors.KhoXuat}
                          props={{
                            itemRender: (data) => {
                              return (
                                <div className="flex items-center gap-[10px]">
                                  {data.MaKho} - {data.TenKho}
                                </div>
                              );
                            },
                          }}
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: "Kho xuất được bỏ trống!",
                      },
                    }}
                  />
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={handleFindKhoXuat}
                    icon="/images/icons/search.svg"
                  ></Button>
                </div>
                <div className="flex items-center gap-[5px]">
                  <Controller
                    name={"KhachHang"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label="Khách hàng"
                          dataSource={ds_KhachHang}
                          displayExpr={"TenKhachHang"}
                          valueExpr="MaKhachHang"
                          required
                          error={errors.KhachHang}
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: "Khách hàng không được bỏ trống!",
                      },
                    }}
                  />
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={handleFindKhachHang}
                    icon="/images/icons/search.svg"
                  ></Button>
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="ml-[160px]">
                  <Controller
                    name={"FlagXuatTuDonHang"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <CheckBoxField field={field} label="Xuất từ đơn hàng" />
                      );
                    }}
                  />
                </div>
                <div>
                  <Controller
                    name={"RefType"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label="RefType"
                          dataSource={[]}
                          displayExpr={""}
                          valueExpr=""
                          disabled={FlagXuatTuDonHang == false}
                        />
                      );
                    }}
                  />
                </div>
                <div>
                  <Controller
                    name={"RefNo"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label="Số RefNo"
                          disabled={FlagXuatTuDonHang == false}
                        />
                      );
                    }}
                  />
                </div>
                <div>
                  <Controller
                    name={"SoContainer"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField field={field} label="Số Container" />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <div>
                  <Controller
                    name={"CodeXuatKho"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField field={field} label="Code xuất khẩu" />
                      );
                    }}
                  />
                </div>
                <div>
                  <Controller
                    name={"BienSoXe"}
                    control={control}
                    render={({ field }) => {
                      return <TextBoxField field={field} label="Biển số xe" />;
                    }}
                  />
                </div>
                <div className="row-span-2">
                  <Controller
                    name={"NoiDungXuat"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextAreaField field={field} label="Nội dung xuất" />
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-[50px]">
              <Tabs
                width={400}
                dataSource={[
                  { id: 0, text: "Danh mục hàng hóa" },
                  { id: 1, text: "Thông tin xác thực" },
                ]}
                keyExpr={"id"}
                defaultSelectedIndex={currentTab}
                onSelectedIndexChange={(value) => {
                  setValue("CurrentTab", value);
                }}
              />

              <div className="flex items-center gap-[10px]">
                <div className="flex items-center gap-[5px]">
                  <div>Tổng tiền hàng:</div>
                  <div>
                    <Controller
                      name={"TongTienHang"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <NumberBoxField
                            field={field}
                            disabled
                            showPlaceholder={false}
                            props={{
                              width: 100,
                              format: "#,##0",
                              value: TinhToanSanPham.TongTienHang,
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px]">
                  <div>Giảm giá:</div>
                  <div>
                    <Controller
                      name={"GiamGia"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <NumberBoxField
                            field={field}
                            disabled
                            props={{
                              width: 100,
                              format: "#,##0",
                              value: TinhToanSanPham.GiamGia,
                            }}
                            showPlaceholder={false}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[5px]">
                  <div>Tổng tiền thanh toán:</div>
                  <div>
                    <Controller
                      name={"TongThanhToan"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <NumberBoxField
                            field={field}
                            disabled
                            showPlaceholder={false}
                            props={{
                              width: 100,
                              format: "#,##0",
                              value: TinhToanSanPham.TongThanhToan,
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {currentTab == 0 && (
              <div className="flex justify-between items-center hh">
                <div className="flex items-center gap-[3px]">
                  <Controller
                    name={"HangHoa"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label="Hàng Hóa"
                          dataSource={ds_HangHoa}
                          displayExpr={"TenHangHoa"}
                          valueExpr="MaHangHoa"
                          width={300}
                          onValueChanged={handleAppend}
                          showClearButton
                          disabled={!KhoXuat}
                          props={{
                            placeholder:
                              KhoXuat == null
                                ? "Vui lòng chọn kho xuất để tìm sản phẩm!"
                                : "Chọn",
                          }}
                        />
                      );
                    }}
                  />
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={handleFindLoaiXuatKho}
                    icon="/images/icons/search.svg"
                  ></Button>
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    icon="/images/icons/scan.svg"
                  ></Button>
                  <DropDownButton
                    showArrowIcon={false}
                    keyExpr={"id"}
                    className="menu-items"
                    hoverStateEnabled={false}
                    activeStateEnabled={false}
                    displayExpr={"text"}
                    wrapItemText={false}
                    dropDownOptions={{
                      width: 200,
                      wrapperAttr: {
                        style: {
                          top: 2,
                          right: 0,
                        },
                        class: "headerform__menuitems",
                      },
                    }}
                    elementAttr={{
                      class: "showmore-button",
                    }}
                    icon={"/images/icons/more-white.svg"}
                    stylingMode="contained"
                    style={{
                      background: "#00703c",
                    }}
                  >
                    <DropDownButtonItem
                      // visible={checkPermision(permissionImportExecl)}
                      render={(item: any) => {
                        return (
                          <div>
                            <Button
                              stylingMode="text"
                              hoverStateEnabled={false}
                              // onClick={onImportExcelFile}
                              text={"Xuất excel"}
                            />
                          </div>
                        );
                      }}
                    />
                  </DropDownButton>
                </div>

                <div>
                  Tổng số lượng: <strong>{TongSoLuong}</strong>
                </div>
              </div>
            )}

            {currentTab == 0 && (
              <XuatKhoTable
                fieldArray_ListSanPham={fieldArray_ListSanPham}
                control={control}
                key={nanoid()}
                setValue={setValue}
                watch={watch}
                getValues={getValues}
              />
            )}

            {currentTab == 1 && (
              <div className="flex justify-between items-center hh">
                <div className="flex items-center gap-[3px]">
                  <Controller
                    name={"MaXacThuc"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label="Mã xác thực"
                          dataSource={ds_XacThuc}
                          displayExpr={"TenHangHoa"}
                          valueExpr="MaXacThuc"
                          width={300}
                          onValueChanged={handleAppendXacThuc}
                          showClearButton
                        />
                      );
                    }}
                  />
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    icon="/images/icons/scan.svg"
                  ></Button>
                  <DropDownButton
                    showArrowIcon={false}
                    keyExpr={"id"}
                    className="menu-items"
                    hoverStateEnabled={false}
                    activeStateEnabled={false}
                    displayExpr={"text"}
                    wrapItemText={false}
                    dropDownOptions={{
                      width: 200,
                      wrapperAttr: {
                        style: {
                          top: 2,
                          right: 0,
                        },
                        class: "headerform__menuitems",
                      },
                    }}
                    elementAttr={{
                      class: "showmore-button",
                    }}
                    icon={"/images/icons/more-white.svg"}
                    stylingMode="contained"
                    style={{
                      background: "#00703c",
                    }}
                  >
                    <DropDownButtonItem
                      // visible={checkPermision(permissionImportExecl)}
                      render={(item: any) => {
                        return (
                          <div>
                            <Button
                              stylingMode="text"
                              hoverStateEnabled={false}
                              // onClick={onImportExcelFile}
                              text={"Xuất excel"}
                            />
                          </div>
                        );
                      }}
                    />
                  </DropDownButton>
                </div>
              </div>
            )}

            {currentTab == 1 && (
              <XacThucTable
                fieldArray_ListXacThuc={fieldArray_ListXacThuc}
                watch={watch}
              />
            )}

            <PopupTimKiemLoaiXuatKho
              visible={Open_LoaiXuatKho}
              handleClose={handleClose_LoaiXuatKho}
              setValue={setValue}
            />

            <PopupTimKiemKhoXuat
              visible={Open_KhoXuat}
              handleClose={handleClose_KhoXuat}
              setValue={setValue}
            />

            <PopupTimKiemKhachHang
              visible={Open_KhachHang}
              handleClose={handleClose_KhachHang}
              setValue={setValue}
            />
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

export default TaoMoiXuatKho;
