import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import "./components/DuyetBaoCaoBaoHanh.scss";
import { useColumnsDanhSachPhuTung } from "./components/use-columns-danh-sach-phu-tung";
import { IToolbarItemProps, Summary, TotalItem } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import { PopupHuyPhieuNhap } from "./popupHuyPhieuNhap";
import { PopupViTriTonKho } from "./popupViTriTonKho";

const listImg: any = [
  {
    TenAnh:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPPqDeaFFoSg3H_8gOk-FLWg-ZmB3KMbdxLHmloqjORdqTT8oc4vBGK2PUY2y612Z4aB3mVyRJZm9m27Ngg28qaMzwdNhCU9SDfgmAXHJPgYhq1bnpzdLUedPLejpF5wliRv8GMEoX_QcA1vwEvT5mt7mH8lQwhn_F-e6spz9zTh7UTr0kk4-y848vEA/w1200-h630-p-k-no-nu/sunrise-scenery-chill-coffee-bart-simpson-digital-art-phone-wallpaper.jpg",
    Loai: "Ảnh trước khi tháo",
    LoaiAnh: "Ảnh báo cáo sửa chữa",
    GiaTri: "",
  },
  {
    TenAnh:
      "https://moewalls.com/wp-content/uploads/2023/11/lofi-boy-chilling-with-cat-thumb.jpg",
    Loai: "Ảnh trước khi tháo",
    LoaiAnh: "Ảnh báo cáo sửa chữa",
    GiaTri: "",
  },
  {
    TenAnh: "https://cdn.wallpapersafari.com/73/72/KXqv7Q.jpg",
    Loai: "Ảnh sau khi tháo",
    LoaiAnh: "Ảnh báo cáo sửa chữa",
    GiaTri: "123",
  },
];

const QuanLyYeuCauXuatKhoView = () => {
  const { t } = useI18n("QuanLyYeuCauXuatKhoView");

  // #region [Navigate handler]
  const navigate = useNetworkNavigate();

  const handleNavigateHome = () => {
    navigate("/service/QuanLyPhieuXuatKho");
  };

  // #endregion

  const { code } = useParams();

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
    values: {
      SoBaoCaoBH: "VS058-231113-001",
      NguoiLap: "SYSADMIN",
      NgayCTBH: "2023-12-28",
      TrangThai: "PENDING",
      LoaiBCBH: "Bảo hành thiện chí",
      NgayLapPT: "",
      SoBaoCaoRO: "LS-VS058-231113-001",
      DienThoai: "0123456789",
      NgayXayRa: "2023-11-13",
      NgaySuaXong: "2023-11-13",
      ChiTietLoaiBH: "Bảo hành thiện chí",
      VIN: "MW3NW81DEPJ020534",
      NguoiSuDung: "BÙI THỊ NGỌC LINH",
      DienThoaiKH: "0933583873/0933038730",
      DiaChi: "72 THỊ SÁCH - Thành phố Đà Lạt - Lâm Đồng",
      BienSo: "49A-37488",
      NgayDKBH: "2021-01-19",
      Km: "10,000",
      TTGuiHMC: "Gửi Không thành công",
      NgayHHBH: "2024-01-19",
      PhuTungLoi: "2091027F40",
      TenPhuTungLoi: "Bộ gioăng đại tu máy",
      NgayKHXNBH: "2024-01-19",
      zoom: 1,
      SoYeuCauXuat: "+84348112871",
      TenKhachHang: 'Van Dong'
    },
  });

  const visiblePopup = watch("visible");
  const visibleViTriTonKho = watch("visibleViTriTonKho");

  const handleOpen = () => {
    setValue("visible", true);
  };

  const handleClose = () => {
    setValue("visible", false);
  };
  const handleOpenViTriTonKho = () => {
    setValue("visibleViTriTonKho", true);
  };

  const handleCloseViTriTonKho = () => {
    setValue("visibleViTriTonKho", false);
  }

  // #region [Declare Ref]
  const PhanCongLaoDongRef = useRef();
  const refPopup = useRef();
  const refPopupViTriLuuKho = useRef();

  // #endregion

  const columnsPhanCongLaoDong = useColumnsDanhSachPhuTung(handleOpenViTriTonKho);
  // #region [Get Data If Code Valid]
  useEffect(() => {
    if (code) {
    }
  }, [code]);
  // #endregion

  const fetchData = async () => { };

  const fetchDataListImage = async () => {
    return {
      DataList: listImg,
    };
  };

  const handleSelectionChanged = (rowKeys: any) => { };

  const onSelectionChanged_ImageTable = ({ selectedRowsData }: any) => {
    const data = selectedRowsData[0];

    setValue("TenAnh", data?.TenAnh);
  };

  const subGridToolbars: IToolbarItemProps[] = [
    // {
    //   location: "before",
    //   render: () => {
    //     return <div className={"font-bold"}>{t("CarList")}</div>;
    //   },
    // },
    // {
    //   location: "before",
    //   render: () => {
    //     return (
    //       <BButton
    //         label={t("AddNewCar")}
    //         onClick={() => onHandleAddNewCar(PhanCongLaoDongRef)}
    //       />
    //     );
    //   },
    // },
  ]

  const onHandleAddNewCar = (gridRef: any) => {
    // const { isValid } = formRef.current._instance.validate();
    const isValid = true
    if (isValid) {
      // if (paramUrl.action === "create") {
      //   setReadOnly(true);
      // }
      gridRef?.current?.addData([
        {
          MaPhuTung: "",
          TenPhuTung: "",
          DonViTinh: "",
          SoLuong: "",
          MoTa: ""
        },
      ]);
    }
  };

  const handleOpenImage = () => {
    handleOpen();
  };

  const downloadImage = async () => {
    const imageUrl = watch("TenAnh");

    if (!imageUrl) {
      return;
    }

    try {
      // Fetch the image data
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");

      anchor.href = blobUrl;

      anchor.download = "downloaded_image.png";

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className=""
      useNative
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center p-2 header-content">
          <div className="flex items-center">
            <ToggleSidebarButton />
            <p
              className="font-medium cursor-pointer hover:underline"
              onClick={handleNavigateHome}
            >
              Chi tiết phiếu xuất kho thường
            </p>
            {/* <p className="mx-[5px]">&gt;</p>
            <p className="text-[#00703c] font-semibold">
              Duyệt báo cáo bảo hành
            </p> */}
          </div>
          <div className="flex items-center gap-[5px] button-group">
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Save"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="KetThuc"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Print"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="PrintInvoice"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Huỷ"
              onClick={handleOpenImage}
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Delete"
            ></Button>
          </div>
        </div>
        <div className="h-[3px] mt-[10px]"></div>
        <div className="flex flex-col ttkh">
          <div className="grid grid-cols-8 mt-[20px] gap-[10px]">
            <div className="col-span-4 grid grid-rows-1">
              <div className="row-span-2 relative ml-[5px]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Thông tin chung
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px]">
                  <div className="ttc">
                    {""}
                    <div className="">
                      <Controller
                        name={"PhieuXuat"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("PhieuXuat")}
                              error={errors.PhieuXuat}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"NguoiTao"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("NguoiTao")}
                              error={errors.NguoiTao}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"NgayXuat"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("NgayXuat")}
                              error={errors.NgayXuat}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"LoaiXuat"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("LoaiXuat")}
                              error={errors.LoaiXuat}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-b-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"MoTa"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={false}
                              field={field}
                              label={t("MoTa")}
                              error={errors.MoTa}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 grid grid-rows-1">
              <div className="row-span-2 relative ml-[5px] border-[1px] border-[#bebebe]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Thông tin khách hàng
                </div>
                <div className="grid grid-cols-1 gap-[10px] px-[5px] pt-[10px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"TenKhachHang"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={false}
                              field={field}
                              label={t("TenKhachHang")}
                              error={errors.TenKhachHang}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"DiaChi"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("DiaChi")}
                              error={errors.DiaChi}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"DienThoai"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("DienThoai")}
                              error={errors.DienThoai}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"DiDong"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("DiDong")}
                              error={errors.DiDong}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-3 mx-[12px]">
            <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
              Thông tin lệnh xuất
            </div>
            <table className="mt-3 w-full">
              <thead>
                <tr>
                  <th className="w-[50%] px-2 border-[#bebebe] border-b-[1px] border-r-[1px] border-t-[1px] border-l-[1px] py-2 text-left">Số yêu cầu xuất</th>
                  <th className="w-[50%] px-2 border-[#bebebe] border-b-[1px] border-t-[1px] border-r-[1px] py-2 text-left">Tên khách hàng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-[#bebebe] border-b-[1px] border-t-[1px] border-l-[1px] border-r-[1px] py-2  text-right pr-[12px]">
                    <div>
                      {" "}
                      <div className="">
                        <Controller
                          name={"SoYeuCauXuat"}
                          control={control}
                          render={({ field }) => {
                            console.log(529, field)
                            return (
                              <span>{
                                field.value
                              }</span>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border-[#bebebe] border-b-[1px] border-t-[1px] border-r-[1px] py-2 text-right pr-[12px]">
                    <div>
                      {" "}
                      <div className="">
                        <Controller
                          name={"TenKhachHang"}
                          control={control}
                          render={({ field }) => {
                            return (
                              <span>
                                {
                                  field.value
                                }
                              </span>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Thông tin phụ tùng
            </div>
            <GridViewOne
              ref={PhanCongLaoDongRef}
              dataSource={[
                {
                  MaPhuTung: 'Abc',
                  TenPhuTung: "tenPhuTung",
                  DonViTinh: "dvt",
                  SoLuongYeuCau: '2',
                  SoYeuCauXuat: '4',
                  SoLuongXuat: "3",
                  Gia: '2000',
                  VAT: "10%",
                  TongGia: '5000',
                  TonKho: '30',
                  ViTriDuKien: 'HN',
                  ViTriThucTe: 'DongDa'
                },
                {
                  MaPhuTung: 'Abc2',
                  TenPhuTung: "tenPhuTung2",
                  DonViTinh: "dvt2",
                  SoLuongYeuCau: '22',
                  SoYeuCauXuat: '42',
                  SoLuongXuat: "32",
                  Gia: '20002',
                  VAT: "10%",
                  TongGia: '4000',
                  TonKho: '302  ',
                  ViTriDuKien: 'HN',
                  ViTriThucTe: 'DongDa'
                }
              ]} // cars
              columns={columnsPhanCongLaoDong}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[
              ]}
              editMode={true}
              editingOptions={{
                mode: "batch",
              }}
              keyExpr={"MaPhuTung"}
              storeKey={"quanlyphieuxuatkho-thongtinphutung"}
              toolbarItems={subGridToolbars}
              customHeight={600}
              isHidenHeaderFilter
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  column="TongGia"
                  summaryType="sum"
                  displayFormat={"Count: {0}"}
                />
              </Summary>

            </GridViewOne>
            {/* <GridViewOne
              ref={PhanCongLaoDongRef}
              toolbarItems={subGridToolbars}
              dataSource={[{
                MaPhuTung: 'Abc',
                TenPhuTung: "tenPhuTung",
                DonViTinh: "dvt",
                SoLuongYeuCau: '2',
                SoYeuCauXuat: '4',
                SoLuongXuat: "3",
                Gia: '2000',
                VAT: "10%",
                TongGia: '5000',
                TonKho: '30',
                ViTriDuKien: 'HN',
                ViTriThucTe: 'DongDa'
              }]}
              columns={columnsPhanCongLaoDong}
              allowSelection={true}
              allowInlineEdit={true}
              allowMultiRowEdit={true}
              editMode={true}
              editingOptions={{
                mode: "batch",
              }}
              defaultPageSize={9999999}
              // onRowDeleteBtnClick={(e) => onRowDeleteBtnClick(e, ref)}
              // onSaveRow={handleSavingRow}
              onSelectionChanged={handleSelectionChanged}
              // onEditorPreparing={onEditorPreparing}
              customHeight={"auto"}
              storeKey={"quanlyphieuxuatkho-columns_view"}
            /> */}
          </div>
        </div>
      </FormProvider>

      <PopupHuyPhieuNhap
        visiblePopup={visiblePopup}
        onClose={handleClose}
        ref={refPopup}
      />
      <PopupViTriTonKho
        visiblePopup={visibleViTriTonKho}
        onClose={handleCloseViTriTonKho}
        ref={refPopupViTriLuuKho}
        onOpenPopup={handleOpenViTriTonKho}
      />
    </ScrollView>
  );
};

export default QuanLyYeuCauXuatKhoView;

