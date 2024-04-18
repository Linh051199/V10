import { useI18n } from "@/i18n/useI18n";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, Popup, ScrollView, Tabs, TextBox } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import TabHangThanhPhan from "./components/TabHangThanhPhan";
import TabThongTinChinh from "./components/TabThongTinChinh";
import TabThongTinKhac from "./components/TabThongTinKhac";
import "./components/style.scss";
import { data } from "./data";

const TaoMoiHangHoa = () => {
  const { t } = useI18n("TaoMoiHangHoa");

  const { id } = useParams();

  const galleryRef = useRef();

  const ref = useRef();

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

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
    defaultValues: {
      LoaiHang: "PRODUCT", // SERVICE
      CurrentTab: 0,
      CurrentTabKhac: 0,
      HinhAnh: [
        {
          id: 1,
          file: null,
        },
        {
          id: 2,
          file: null,
        },
        {
          id: 3,
          file: null,
        },
        {
          id: 4,
          file: null,
        },
        {
          id: 5,
          file: null,
        },
      ],

      ListThongTin: [],
      ListThuocTinh: [],
      ListDonVi: [],
      ProductIntro: null,
      ProductUserGuide: null,
      ProductDrawing: null,
      ListSanPham: [],
      PopupThemThongTin: false,
      PopupThemThuocTinh: false,
      PopupSuaThongTin: false,
      PopupSuaThuocTinh: false,
      ListSelectThongTin: [],
      ListSelectThuocTinh: [],
      DonViCoBan: null,
      TonKhoToiDa: 0,
      TonKhoToiUu: 0,
      TonKhoNhoNhat: 0,
      GiaBan: 0,
      GiaMua: 0,
      NhomHang: "All",

      ListDanhSachHangCungLoai: [],
    },
  });

  const currentTab = watch("CurrentTab");
  const currentHinhAnh = watch("HinhAnh");
  const currentActiveImage = watch("ActiveImage");
  const currentListThongTin = watch("ListThongTin");
  const currentListThuocTinh = watch("ListThuocTinh");
  const currentListDonVi = watch("ListDonVi");
  const currentLoaiHang = watch("LoaiHang");
  const visiblePopupThemThongTin = watch("PopupThemThongTin");
  const visiblePopupThemThuocTinh = watch("PopupThemThuocTinh");
  const visiblePopupSuaThongTin = watch("PopupSuaThongTin");
  const visiblePopupSuaThuocTinh = watch("PopupSuaThuocTinh");

  const listSelectThongTin = watch("ListSelectThongTin");
  const listSelectThuocTinh = watch("ListSelectThuocTinh");
  const currentListDanhSach = watch("ListDanhSachHangCungLoai");

  const currentMaHang = watch("MaHang");
  const currentTenHang = watch("TenHang");
  const currentDonVi = watch("DonViCoBan");
  const currentBarCode = watch("BarCode");

  const firstEditor = watch("ProductIntro");
  const secondEditor = watch("ProductUserGuide");
  const thirdEditor = watch("ProductDrawing");

  const backupRefTab3 = useRef<any>(firstEditor);
  const backupRefTab1 = useRef<any>(secondEditor);
  const backupRefTab2 = useRef<any>(thirdEditor);

  const dataSource = {
    Tabs: [
      {
        id: 1,
        text: "Thông tin chính",
      },
      {
        id: 2,
        text: "Hàng thành phần",
      },
      {
        id: 3,
        text: "Thông tin khác",
      },
    ],
    TabKhac: [
      {
        id: 1,
        text: "Chi tiết sản phẩm",
      },
      {
        id: 2,
        text: "Hướng dẫn sử dụng",
      },
      {
        id: 3,
        text: "Bản vẽ",
      },
    ],
    LoaiHang: [
      {
        label: "Sản phẩm",
        value: "PRODUCT",
      },
      {
        label: "Dịch vụ",
        value: "SERVICE",
      },
    ],
    ThueVAT: [
      {
        label: "Thuế 0%",
        value: "VAT0",
      },
      {
        label: "Thuế 10%",
        value: "VAT10",
      },
      {
        label: "Thuế 5%",
        value: "VAT5",
      },
      {
        label: "Thuế 8%",
        value: "VAT8",
      },
      {
        label: "Không chịu thuế",
        value: "VAT",
      },
    ],
    NhomHang: [
      {
        label: "All",
        value: "ALL",
      },
    ],
    MaBrand: [
      {
        label: "Hyundai",
        value: "hyundai",
      },
      {
        label: "Toyota",
        value: "toyota",
      },
    ],
  };

  useEffect(() => {
    if (id) {
      console.log(data);

      const rootProd = data.Lst_Mst_Product.find(
        (item) => item.ProductLevelSys == "ROOTPRD"
      );

      const currentProdCode = rootProd?.ProductCode;

      setValue("LoaiHang", rootProd?.ProductType);
      setValue("MaHang", rootProd?.ProductCode);
      setValue("BarCode", rootProd?.ProductBarCode);
      setValue("TenHang", rootProd?.ProductName);
      setValue("NhomHang", rootProd?.ProductGrpCode);
      setValue("MaBrand", rootProd?.BrandCode);
      setValue("GiaMua", rootProd?.UPBuy);
      setValue("ThueVAT", rootProd?.VATRateCode);
      setValue("TonKhoNhoNhat", rootProd?.QtyMinSt);
      setValue("TonKhoToiUu", rootProd?.QtyEffSt);
      setValue("TonKhoToiDa", rootProd?.QtyMaxSt);
      setValue("GhiChu", rootProd?.Remark);

      const lst_Mst_ProductImages = data.Lst_Mst_ProductImages;

      const lst_Images = currentHinhAnh.map((item: any, index: any) => {
        if (lst_Mst_ProductImages[index]) {
          return {
            ...item,
            link: lst_Mst_ProductImages[index].ProductImagePath,
          };
        }

        return item;
      });

      setValue("HinhAnh", lst_Images);

      const list_Atrr = data.Lst_Prd_Attribute.filter(
        (item) => item.ProductCode == currentProdCode
      );

      setValue("ListThuocTinh", list_Atrr);

      setValue("DonViCoBan", rootProd?.UnitCode);
      setValue("CoDuocBan", rootProd?.FlagSell);
      setValue("CoDuocMua", rootProd?.FlagBuy);

      const listDonVi = data.Lst_Mst_Product.map((item) => {
        return {
          UnitCode: item.UnitCode,
          UPBuy: item.UPBuy,
          UPSell: item.UPSell,
          ValConvert: item.ValConvert,
          FlagSell: item.FlagSell,
          FlagBuy: item.FlagBuy,
          id: nanoid(),
        };
      });

      setValue("ListDonVi", listDonVi);

      setValue("TenTiengAnh", rootProd?.ProductNameEN);

      setValue("ListSanPham", data.Lst_Mst_ProductBOM);

      // setValue("ProductIntro", );

      backupRefTab1.current = `<p>hello my friend</p>`;
      backupRefTab2.current = `<p>this is demo</p>`;
      backupRefTab3.current = `<p>okay</p>`;
    }
  }, [id]);

  const addThongTin = () => {
    const result = [
      ...currentListThongTin,
      {
        id: nanoid(),
        TenThongTin: null,
        NoiDung: [],
      },
    ];

    setValue("ListThongTin", result);
  };

  const addThuocTinh = () => {
    const result = [
      ...currentListThuocTinh,
      {
        id: nanoid(),
        TenThuocTinh: null,
        NoiDung: [],
      },
    ];

    setValue("ListThuocTinh", result);
  };

  const addDonVi = () => {
    const result = [
      ...currentListDonVi,
      {
        id: nanoid(),
        TenDonVi: "",
        Quantity: 0,
        SellPrice: 0,
        BuyPrice: 0,
        CanBuy: false,
        CanSell: false,
      },
    ];

    setValue("ListDonVi", result);
  };

  const handleAddThongTin = () => {
    const value = ref?.current?._instance?._changedValue;

    const find = listSelectThongTin?.some((item: any) => item == value);

    if (find) {
      handleClosePopupThongTin();
    } else {
      const result = [...listSelectThongTin, value];

      setValue("ListSelectThongTin", result);
      handleClosePopupThongTin();
    }
  };

  const handleClosePopupThongTin = () => {
    setValue("PopupThemThongTin", false);
  };

  const handleAddThuocTinh = () => {
    const value = ref?.current?._instance?._changedValue;

    const find = listSelectThuocTinh?.some((item: any) => item == value);

    if (find) {
      handleClosePopupThuocTinh();
    } else {
      const result = [...listSelectThuocTinh, value];

      setValue("ListSelectThuocTinh", result);
      handleClosePopupThuocTinh();
    }
  };

  const handleSuaThuocTinh = (name: any) => {
    const value = ref?.current?._instance?._changedValue;

    const result = listSelectThuocTinh?.map((item: any) => {
      if (item == name) {
        item = value;
      }

      return item;
    });

    setValue("ListSelectThuocTinh", result);

    handleClosePopupThuocTinh();
  };

  const handleClosePopupThuocTinh = () => {
    setValue("PopupThemThuocTinh", false);
  };

  useEffect(() => {
    const isValidListDonVi = currentListDonVi.some((c) => c.UnitCode);

    const filteredList = currentListDonVi.filter((c) => c.UnitCode);

    if (
      currentDonVi != "" &&
      currentDonVi != null &&
      isValidListDonVi == true
    ) {
      const resultFilterd = filteredList.map((item: any, index: any) => {
        if (currentListDanhSach[index + 1]) {
          return {
            id: index + 1,
            HangHoa: currentListDanhSach[index + 1].HangHoa,
            MaHang: currentListDanhSach[index + 1].MaHang,
            MaVach: currentListDanhSach[index + 1].MaVach,
            DonVi: currentListDanhSach[index + 1].DonVi,
            GiaMua: currentListDanhSach[index + 1].GiaMua,
            GiaBan: currentListDanhSach[index + 1].GiaBan,
            isShow: currentListDanhSach[index + 1].isShow,
          };
        }
        return {
          id: index + 1,
          HangHoa: currentTenHang ? currentTenHang : "",
          MaHang: currentMaHang ? `${currentMaHang}-${index + 1}` : "",
          MaVach: currentBarCode ? `${currentBarCode}-${index + 1}` : "",
          DonVi: item.TenDonVi,
          GiaMua: item.SellPrice,
          GiaBan: item.BuyPrice,
          isShow: true,
        };
      });

      const first = currentListDanhSach[0]
        ? {
            id: 0,
            HangHoa: currentListDanhSach[0].HangHoa,
            MaHang: currentListDanhSach[0].MaHang,
            MaVach: currentListDanhSach[0].MaVach,
            DonVi: currentListDanhSach[0].DonVi,
            GiaMua: currentListDanhSach[0].GiaMua,
            GiaBan: currentListDanhSach[0].GiaBan,
            isShow: currentListDanhSach[0].isShow,
          }
        : {
            id: 0,
            HangHoa: currentTenHang ? currentTenHang : "",
            MaHang: currentMaHang ? `${currentMaHang}` : "",
            MaVach: currentBarCode ? `${currentBarCode}` : "",
            DonVi: currentDonVi,
            GiaMua: 0,
            GiaBan: 0,
            isShow: true,
          };

      const result = [first, ...resultFilterd];

      setValue("ListDanhSachHangCungLoai", result);
    }
  }, [
    currentMaHang,
    currentTenHang,
    currentDonVi,
    currentBarCode,
    currentListDonVi,
  ]);

  const onSave = () => {
    console.log(
      backupRefTab3.current,
      backupRefTab2.current,
      backupRefTab1.current
    );
  };

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="TaoMoiHangHoa"
      useNative
    >
      <FormProvider {...methods}>
        <form>
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-[10px]">
              <div className="flex items-center gap-[5px]">
                <ToggleSidebarButton />
                <div className="font-semibold text-[#00703c]">Hàng hóa</div>
                <div>&gt;</div>
                <div className="font-semibold">
                  {id ? "Cập nhật" : "Tạo mới"}
                </div>
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
                <Button
                  style={{
                    padding: 10,
                  }}
                  type="default"
                >
                  Lưu & Tạo mới
                </Button>
              </div>
            </div>
            <div className="separator"></div>
            <div className="flex flex-col">
              <Tabs
                dataSource={
                  currentLoaiHang == "PRODUCT"
                    ? dataSource.Tabs
                    : dataSource.Tabs.filter((c) => c.id != 2)
                }
                width={400}
                className="m-[10px]"
                keyExpr={"id"}
                defaultSelectedIndex={currentTab}
                onSelectedIndexChange={(value) => {
                  setValue("CurrentTab", value);
                }}
              />

              {currentTab == 0 && (
                <TabThongTinChinh
                  control={control}
                  errors={errors}
                  currentHinhAnh={currentHinhAnh}
                  currentListThongTin={currentListThongTin}
                  currentListThuocTinh={currentListThuocTinh}
                  currentListDonVi={currentListDonVi}
                  currentListDanhSach={currentListDanhSach}
                  customFunction={{
                    addThongTin: addThongTin,
                    addThuocTinh: addThuocTinh,
                    addDonVi: addDonVi,
                  }}
                  dataSource={{
                    ...dataSource,
                    listSelectThongTin: listSelectThongTin,
                    listSelectThuocTinh: listSelectThuocTinh,
                  }}
                  setValue={setValue}
                  t={t}
                  watch={watch}
                />
              )}

              {currentTab == 1 && (
                <TabHangThanhPhan
                  t={t}
                  control={control}
                  setValue={setValue}
                  watch={watch}
                />
              )}

              {currentTab == 2 && (
                <TabThongTinKhac
                  control={control}
                  dataSource={dataSource}
                  errors={errors}
                  t={t}
                  setValue={setValue}
                  watch={watch}
                  listRef={{
                    ref1: ref1,
                    ref2: ref2,
                    ref3: ref3,
                  }}
                  backupRef={{
                    backupRefTab3: backupRefTab3,
                    backupRefTab2: backupRefTab2,
                    backupRefTab1: backupRefTab1,
                  }}
                  currentParentTab={currentTab}
                />
              )}
            </div>
          </div>

          {visiblePopupThemThongTin && (
            <Popup
              visible={visiblePopupThemThongTin}
              width={400}
              height={200}
              title="Thêm thông tin"
            >
              <TextBox ref={ref} />
              <ToolbarItem
                widget="dxButton"
                toolbar="bottom"
                location={"after"}
                cssClass="btn-cancel"
                options={{
                  text: "Thêm",
                  stylingMode: "contained",
                  type: "default",
                  onClick: handleAddThongTin,
                }}
              />
              <ToolbarItem
                widget="dxButton"
                toolbar="bottom"
                location={"after"}
                options={{
                  text: "Thoát",
                  stylingMode: "contained",
                  type: "default",
                  onClick: handleClosePopupThongTin,
                }}
              />
            </Popup>
          )}

          {visiblePopupThemThuocTinh && (
            <Popup
              visible={visiblePopupThemThuocTinh}
              width={400}
              height={200}
              title="Thêm thuộc tính"
            >
              <TextBox ref={ref} />
              <ToolbarItem
                widget="dxButton"
                toolbar="bottom"
                location={"after"}
                cssClass="btn-cancel"
                options={{
                  text: "Thêm",
                  stylingMode: "contained",
                  type: "default",
                  onClick: handleAddThuocTinh,
                }}
              />
              <ToolbarItem
                widget="dxButton"
                toolbar="bottom"
                location={"after"}
                options={{
                  text: "Thoát",
                  stylingMode: "contained",
                  type: "default",
                  onClick: handleClosePopupThuocTinh,
                }}
              />
            </Popup>
          )}
        </form>
      </FormProvider>
    </ScrollView>
  );
};

export default TaoMoiHangHoa;
