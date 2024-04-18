import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, CheckBox, DateBox, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import "./DuyetBaoCaoBaoHanh.scss";
import { TextField } from "@/packages/components/text-field";
// import { useColumnsPhanCongLaoDong } from "./component/use-columns-phan-cong-lao-dong";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateRangeBoxField } from "@/packages/ui/hook-form-field/DateRangeBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { RadioBoxField } from "@/packages/ui/hook-form-field/RadioBoxField";
// import { useColumnsAnhSoBaoHanh } from "./components/use-columns-anh-so-bao-hanh";
// import { useColumnsLichSuGhiChu } from "./components/use-columns-lich-su-ghi-chu";
// import { useColumnsPhanCongLaoDong } from "./components/use-columns-phan-cong-lao-dong";
// import { useColumnsPhanCongPhuTung } from "./components/use-columns-phan-cong-phu-tung";

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

const KhachHangDichVu72h = () => {
  const { t } = useI18n("HTCTaoMoiChienDich");

  // #region [Navigate handler]
  const navigate = useNetworkNavigate();

  const handleNavigateHome = () => {
    navigate("/service/XemXetBaoCaoBaoHanh");
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
    },
  });

  const visiblePopup = watch("visible");

  const handleOpen = () => {
    setValue("visible", true);
  };

  // #region [Declare Ref]
  const PhanCongLaoDongRef = useRef();
  const PhanCongPhuTungRef = useRef();
  const LichSuGhiChuRef = useRef();
  const AnhSoBaoHanhRef = useRef();

  // #endregion

  // const columnsPhanCongLaoDong = useColumnsPhanCongLaoDong();
  // const columnsPhanCongPhuTung = useColumnsPhanCongPhuTung();
  // const columnsLichSuGhiChu = useColumnsLichSuGhiChu();
  // const columnsAnhSoBaoHanh = useColumnsAnhSoBaoHanh();

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

  // const columnsPhanCongLaoDong = useColumnsPhanCongLaoDong();

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="KhachHangDichVu72h"
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center p-2 header-content">
          <div className="flex items-center">
            <ToggleSidebarButton />
            <p
              className="font-medium cursor-pointer hover:underline"
              onClick={handleNavigateHome}
            >
              Khách hàng sau dịch vụ 72h
            </p>

          </div>
          <div className="flex items-center gap-[5px] button-group">
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Đã liên hệ,chờ phản hồi"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Lưu"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Đã liên hệ, đã phản hồi"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Không liên hệ"
            ></Button>
          </div>
        </div>

        <div className="h-[3px] mt-[50px]"></div>
        <div className="flex flex-col ttkh border-[#bebebe] border-[1px] pb-[12px]">

          <div className="grid grid-cols-7 mt-[20px] gap-[10px]">
            <div className="col-span-4 grid grid-rows-1">
              <div className="row-span-2 relative ml-[5px]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Thông tin
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px] status-none">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"TrangThai"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("TrangThai")}
                              error={errors.TrangThai}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-[10px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"TenCaNhanToChuc"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("TenCaNhanToChuc")}
                              error={errors.TenCaNhanToChuc}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[10px]  border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"BienSo"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              // disabled={true}
                              field={field}
                              label={t("BienSo")}
                              error={errors.BienSo}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"SoVIN"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("SoVIN")}
                              error={errors.SoVIN}
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
                <div className="grid grid-cols-1 gap-[10px] border-b-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"NgayLienHe"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <DateBoxField
                              // disabled={true}
                              field={field}
                              label={t("NgayLienHe")}
                              error={errors.NgayLienHe}
                              displayFormat={"yyyy-MM-dd"} />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 grid grid-rows-1 border-[1px] border-[#bebebe] p-[5px] mr-[5px]">
              <div className="grid-cols-2 gap-[10px] flex-col flex items-center">
                <div className="w-full">
                  <Controller
                    name={"NgayVaoXuong"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          cssClass="flex !flex-row"
                          disabled={true}
                          // direction="vertical"
                          field={field}
                          label={t("NgayVaoXuong")}
                          error={errors.NgayVaoXuong}
                        />
                      );
                    }}
                  />
                </div>
                <div className="w-full">
                  <Controller
                    name={"NgayKetThucDV"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          cssClass="flex !flex-row"
                          disabled={true}
                          // direction="vertical"
                          field={field}
                          label={t("NgayKetThucDV")}
                          error={errors.NgayKetThucDV}
                        />
                      );
                    }}
                  />
                </div>
                <Button
                  style={{
                    background: "#00703c",
                    color: "#fff",
                    margin: 0,
                    width: '50%'
                  }}
                  text="Ảnh bảo hành"
                  onClick={handleOpenImage}
                ></Button>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-7 mt-[20px] gap-[10px]">
            <div className="col-span-7 grid grid-rows-1">
              <div className="row-span-2 relative ml-[5px]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Đánh giá bởi ý kiến khách hàng
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px]">
                  <div className="radio-list">
                    <span>1. Xe của anh/Chị làm dịch vụ có vấn đề gì không?</span>
                    <Controller
                      name={"TrieuChungLoi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioBoxField
                            // disabled={true}
                            field={field}
                            error={errors.TrieuChungLoi}
                            label={""}
                            dataSource={[
                              { value: "1", label: "Tốt" },
                              { value: "2", label: "Bình thường" }
                            ]}
                            displayExpr={"label"} />
                        );
                      }}
                    />
                  </div>
                  <div className="radio-list">
                    <span>2.Anh chị có hài lòng về chất lượng dịch vụ không ?</span>
                    <Controller
                      name={"TrieuChungLoi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioBoxField
                            // disabled={true}
                            field={field}
                            error={errors.TrieuChungLoi}
                            label={""}
                            dataSource={[
                              {
                                value: "1", label: "Hài lòng"
                              },
                              { value: "2", label: "Bình thường" },
                              {
                                value: "3", label: "Không hài lòng"
                              }
                            ]}
                            displayExpr={"label"} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[10px]  border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div className="radio-list radio-list-col">
                    <span>3.Theo anh/Chị thái độ phục vụ và tư vấn của nhân viên Hyundai là :</span>
                    <Controller
                      name={"TrieuChungLoi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioBoxField
                            // disabled={true}
                            field={field}
                            error={errors.TrieuChungLoi}
                            label={""}
                            dataSource={[
                              {
                                value: "1", label: "Thân thiện , lịch sự , có thái độ phục vụ tận tình chu đáo"
                              },
                              { value: "2", label: "Bình thường" },
                              {
                                value: "3", label: "Thiếu tính chuyên nghiệp và quan tâm tới khách hàng"
                              },
                              {
                                value: "4", label: "Khác"
                              },
                            ]}
                            displayExpr={"label"} />
                        );
                      }}
                    />
                  </div>
                  <div className="radio-list">
                    <span>4.Anh/Chị sẵn sàng vào xưởng dịch vụ trong lần sửa chữa bảo dưỡng tiếp theo ?</span>
                    <Controller
                      name={"TrieuChungLoi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioBoxField
                            // disabled={true}
                            field={field}
                            error={errors.TrieuChungLoi}
                            label={""}
                            dataSource={[
                              {
                                value: "1", label: "Có"
                              },
                              { value: "2", label: "Không " },
                            ]}
                            displayExpr={"label"} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div className="radio-list radio-list-col">
                    <span>5.Xưởng dịch vụ , cơ sở vật chất đã đáp ứng được nhu cầu cơ bản của anh/chị chưa ?</span>
                    <Controller
                      name={"TrieuChungLoi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioBoxField
                            // disabled={true}
                            field={field}
                            error={errors.TrieuChungLoi}
                            label={""}
                            dataSource={[
                              {
                                value: "1", label: "Đẹp , đầy đủ tiện nghi , phục vụ tốt công việc"
                              },
                              { value: "2", label: "Bình thường" },
                              {
                                value: "3", label: "Chưa đầy đủ"
                              },
                              {
                                value: "4", label: "Khác"
                              },
                            ]}
                            displayExpr={"label"} />
                        );
                      }}
                    />
                  </div>
                  <div className="radio-list">
                    <span>6. Anh / Chị mong muốn gì ở sự phục vụ của Công ty ???</span>
                    <Controller
                      name={"TrieuChungLoi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextAreaField
                            // disabled={true}
                            field={field}
                            error={errors.TrieuChungLoi}
                            label={""}
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
      </FormProvider>
    </ScrollView>
  );
};

export default KhachHangDichVu72h;
