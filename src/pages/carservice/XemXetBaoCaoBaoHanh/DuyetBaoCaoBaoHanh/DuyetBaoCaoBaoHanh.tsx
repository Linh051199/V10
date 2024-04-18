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
import { useColumnsAnhSoBaoHanh } from "./components/use-columns-anh-so-bao-hanh";
import { useColumnsLichSuGhiChu } from "./components/use-columns-lich-su-ghi-chu";
import { useColumnsPhanCongLaoDong } from "./components/use-columns-phan-cong-lao-dong";
import { useColumnsPhanCongPhuTung } from "./components/use-columns-phan-cong-phu-tung";

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

const DuyetBaoCaoBaoHanh = () => {
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

  const handleClose = () => {
    const crImg = document.getElementById("image-bao-hanh");
    crImg.style.transform = `scale(1)`;

    setValue("visible", false);
    setValue("TenAnh", undefined);
    setValue("zoom", 1);
  };

  // #region [Declare Ref]
  const PhanCongLaoDongRef = useRef();
  const PhanCongPhuTungRef = useRef();
  const LichSuGhiChuRef = useRef();
  const AnhSoBaoHanhRef = useRef();

  // #endregion

  const columnsPhanCongLaoDong = useColumnsPhanCongLaoDong();
  const columnsPhanCongPhuTung = useColumnsPhanCongPhuTung();
  const columnsLichSuGhiChu = useColumnsLichSuGhiChu();
  const columnsAnhSoBaoHanh = useColumnsAnhSoBaoHanh();

  // #region [Get Data If Code Valid]
  useEffect(() => {
    if (code) {
    }
  }, [code]);
  // #endregion

  const handleChooseDealer = () => {
    // const selectedData = DanhSachDaiLyRef.current?.getSelectedRowsData();

    // if (selectedData && selectedData.length == 0) {
    //   toast.error("Chưa chọn đại lý!");
    //   return;
    // }

    // const result = selectedData?.map((item: any) => item.MaDaiLy);

    // setValue("DaiLy", result);

    handleClose();
  };

  const fetchData = async () => {};

  const fetchDataListImage = async () => {
    return {
      DataList: listImg,
    };
  };

  const handleSelectionChanged = (rowKeys: any) => {};

  const onSelectionChanged_ImageTable = ({ selectedRowsData }: any) => {
    const data = selectedRowsData[0];

    setValue("TenAnh", data?.TenAnh);
  };

  const handleOpenImage = () => {
    handleOpen();
  };

  const handleZoomIn = () => {
    const crImg = document.getElementById("image-bao-hanh");

    const crZoom = watch("zoom");

    if (crZoom >= 2) {
      return;
    }

    crImg.style.transform = `scale(${crZoom + 0.5})`;

    setValue("zoom", crZoom + 0.5);
  };

  const handleZoomOut = () => {
    const crImg = document.getElementById("image-bao-hanh");

    const crZoom = watch("zoom");

    if (crZoom <= 0.4) {
      return;
    }

    crImg.style.transform = `scale(${crZoom - 0.2})`;

    setValue("zoom", crZoom - 0.2);
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
      className="duyetbaocaobaohanh"
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
              Xem xét báo cáo bảo hành
            </p>
            <p className="mx-[5px]">&gt;</p>
            <p className="text-[#00703c] font-semibold">
              Duyệt báo cáo bảo hành
            </p>
          </div>
          <div className="flex items-center gap-[5px] button-group">
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Gửi lại GWMS"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Chờ xem xét"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Xem báo cáo"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Chờ duyệt"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Duyệt"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Hoàn trả đại lý"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Không chấp thuận BH"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="In BCBH"
            ></Button>
          </div>
        </div>
        <div className="h-[3px] mt-[50px]"></div>
        <div className="flex flex-col ttkh">
          <div className="flex flex-col relative mt-[20px] z-10">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Thông tin cơ bản
            </div>
            <div className="grid grid-cols-4 mx-[5px] px-[5px] pt-[20px] gap-[20px] border-t-[1px] border-l-[1px] border-r-[1px] border-[#bebebe]">
              <div className="">
                <Controller
                  name={"SoBaoCaoBH"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("SoBaoCaoBH")}
                        error={errors.SoBaoCaoBH}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NguoiLap"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("NguoiLap")}
                        error={errors.NguoiLap}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgayCTBH"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("NgayCTBH")}
                        error={errors.NgayCTBH}
                      />
                    );
                  }}
                />
              </div>
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
            <div className="grid grid-cols-4 mx-[5px] px-[5px] gap-[20px] border-l-[1px] border-r-[1px] border-[#bebebe]">
              <div className="">
                <Controller
                  name={"SoBaoCaoRO"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("SoBaoCaoRO")}
                        error={errors.SoBaoCaoRO}
                      />
                    );
                  }}
                />
              </div>
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
              <div className="">
                <Controller
                  name={"NgayXayRa"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("NgayXayRa")}
                        error={errors.NgayXayRa}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgaySuaXong"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("NgaySuaXong")}
                        error={errors.NgaySuaXong}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 mx-[5px] px-[5px] gap-[20px] border-l-[1px] border-r-[1px] border-b-[1px] border-[#bebebe]">
              <div className="">
                <Controller
                  name={"LoaiBCBH"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("LoaiBCBH")}
                        error={errors.LoaiBCBH}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"ChiTietLoaiBH"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("ChiTietLoaiBH")}
                        error={errors.ChiTietLoaiBH}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgayLapPT"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={true}
                        field={field}
                        label={t("NgayLapPT")}
                        error={errors.NgayLapPT}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 mt-[20px] gap-[10px]">
            <div className="col-span-3 grid grid-rows-4">
              <div className="row-span-2 relative ml-[5px]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Thông tin khách hàng
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"NguoiSuDung"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("NguoiSuDung")}
                              error={errors.NguoiSuDung}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {" "}
                    <div className="dtkh">
                      <Controller
                        name={"DienThoaiKH"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("DienThoai")}
                              error={errors.DienThoaiKH}
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
              </div>

              <div className="grid grid-cols-1 gap-[10px] ml-[10px] mr-[5px]">
                <div className="">
                  <Controller
                    name={"PhuTungLoi"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("PhuTungLoi")}
                          error={errors.PhuTungLoi}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-[10px] ml-[10px] mr-[5px]">
                <div className="">
                  <Controller
                    name={"TenPhuTungLoi"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("TenPhuTungLoi")}
                          error={errors.TenPhuTungLoi}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4 grid grid-rows-4 border-[1px] border-[#bebebe] p-[5px] mr-[5px]">
              <div className="grid grid-cols-3 gap-[10px]">
                <div className="">
                  <Controller
                    name={"BienSo"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("BienSo")}
                          error={errors.BienSo}
                        />
                      );
                    }}
                  />
                </div>
                <div className="min-label">
                  <Controller
                    name={"VIN"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("VIN")}
                          error={errors.VIN}
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"MaAVN"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("MaAVN")}
                          error={errors.MaAVN}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[10px]">
                <div className="">
                  <Controller
                    name={"NgayDKBH"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("NgayDKBH")}
                          error={errors.NgayDKBH}
                        />
                      );
                    }}
                  />
                </div>
                <div className="min-label">
                  <Controller
                    name={"Km"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("Km")}
                          error={errors.Km}
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"MaBinhAcquy"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("MaBinhAcquy")}
                          error={errors.MaBinhAcquy}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[10px]">
                <div className="">
                  <Controller
                    name={"NgayHHBH"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("NgayHHBH")}
                          error={errors.NgayHHBH}
                        />
                      );
                    }}
                  />
                </div>

                <div className="">
                  <Controller
                    name={"NgayKHXNBH"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("NgayKHXNBH")}
                          error={errors.NgayKHXNBH}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[10px] ttx">
                <div className="">
                  <Controller
                    name={"SoBCBH_HMC"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("SoBCBH_HMC")}
                          error={errors.SoBCBH_HMC}
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"TTGuiHMC"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          disabled={true}
                          field={field}
                          label={t("TTGuiHMC")}
                          error={errors.TTGuiHMC}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-[20px] gap-[5px]">
            <div className="flex flex-col relative border-[1px] p-[5px] ml-[5px] border-[#bebebe]">
              <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
                Triệu chứng lỗi
              </div>
              <div className="">
                <Controller
                  name={"TrieuChungLoi"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextAreaField
                        disabled={true}
                        field={field}
                        error={errors.TrieuChungLoi}
                      />
                    );
                  }}
                />
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="flex-grow">
                  <Controller
                    name={"MaPhanNan"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={t("MaPhanNan")}
                          error={errors.MaPhanNan}
                          dataSource={[]}
                          valueExpr=""
                          displayExpr=""
                          props={{
                            width: 200,
                          }}
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
                  }}
                  text="Ảnh bảo hành"
                  onClick={handleOpenImage}
                ></Button>
              </div>
            </div>
            <div className="flex flex-col relative border-[1px] p-[5px] ml-[5px] border-[#bebebe] mr-[5px]">
              <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
                Kết quả chuẩn đoán
              </div>
              <div className="">
                <Controller
                  name={"KetQuaChuanDoan"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextAreaField
                        disabled={true}
                        field={field}
                        error={errors.KetQuaChuanDoan}
                      />
                    );
                  }}
                />
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="flex-grow">
                  <Controller
                    name={"MaChuanDoan"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={t("MaChuanDoan")}
                          error={errors.MaChuanDoan}
                          dataSource={[]}
                          valueExpr=""
                          displayExpr=""
                          props={{
                            width: 200,
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Phần công lao động
            </div>
            <GridViewOne
              ref={PhanCongLaoDongRef}
              dataSource={[]} // cars
              columns={columnsPhanCongLaoDong}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={true}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              editMode={false}
              keyExpr={"MaCV"}
              storeKey={"DuyetBaoCaoBaoHanh-PhanCongLaoDong"}
              customHeight={300}
              isHidenHeaderFilter
              isHiddenCheckBox
            />
            <div className="flex items-end justify-end w-full ">
              <div>
                <Controller
                  name={"TongTienPhanCongLaoDong"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("TongTienPhanCongLaoDong")}
                        props={{
                          width: 200,
                        }}
                        disabled
                        cssClass="total"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Phần tiền phụ tùng/dầu mỡ vật tư
            </div>
            <GridViewOne
              ref={PhanCongPhuTungRef}
              dataSource={[]} // cars
              columns={columnsPhanCongPhuTung}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={true}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              editMode={false}
              keyExpr={"MaPT"}
              storeKey={"DuyetBaoCaoBaoHanh-PhanCongPhuTung"}
              customHeight={300}
              isHidenHeaderFilter
              isHiddenCheckBox
            />
            <div className="flex flex-col items-end justify-end w-full ">
              <div>
                <Controller
                  name={"TongTienPhuTungDauMoVatTu"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("TongTienPhuTungDauMoVatTu")}
                        props={{
                          width: 200,
                        }}
                        disabled
                        cssClass="total"
                      />
                    );
                  }}
                />
              </div>
              <div>
                <Controller
                  name={"TongTienSauThue"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("TongTienSauThue")}
                        props={{
                          width: 200,
                        }}
                        disabled
                        cssClass="total"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe] lsgc">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Lịch sử ghi chú
            </div>
            <GridViewOne
              ref={LichSuGhiChuRef}
              dataSource={[]} // cars
              columns={columnsLichSuGhiChu}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={true}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              editMode={false}
              keyExpr={"MaCV"}
              storeKey={"DuyetBaoCaoBaoHanh-LichSuGhiChu"}
              customHeight={200}
              isHidenHeaderFilter
              isHiddenCheckBox
            />
          </div>

          <div className="flex mt-[20px] w-full px-[10px] mb-[20px]">
            <Controller
              name={"GhiChu"}
              control={control}
              render={({ field }) => {
                return (
                  <TextAreaField
                    label="GhiChu"
                    field={field}
                    error={errors.GhiChu}
                    cssClass="ghichu"
                  />
                );
              }}
            />
          </div>
        </div>
      </FormProvider>

      <Popup
        visible={visiblePopup}
        title="Ảnh sổ bảo hành"
        showCloseButton
        onHidden={handleClose}
        contentRender={() => {
          return (
            <div className="grid grid-cols-2 image-table gap-[10px]">
              <div>
                <GridViewOne
                  ref={AnhSoBaoHanhRef}
                  dataSource={listImg} // cars
                  columns={columnsAnhSoBaoHanh}
                  fetchData={fetchDataListImage}
                  onSelectionChanged={onSelectionChanged_ImageTable}
                  autoFetchData={true}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  editMode={false}
                  keyExpr={"TenAnh"}
                  storeKey={"DuyetBaoCaoBaoHanh-AnhSoBaoHanh"}
                  isHidenHeaderFilter
                  isHiddenCheckBox
                  customHeight={500}
                  isSingleSelectionNotCheckbbox={true}
                />
              </div>
              <div className="flex flex-col justify-between h-[500px]">
                <div className="overflow-auto w-full h-full flex items-center justify-center">
                  <img src={watch("TenAnh")} alt="" id="image-bao-hanh" />
                </div>
                <div className="h-[50px] flex items-center justify-center gap-[5px]">
                  <button
                    className="border-[1px] border-[#434343] flex items-center justify-center p-[5px] shadow-md rounded-[5px] cursor-pointer hover:shadow-[#bebebe]"
                    onClick={handleZoomIn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        opacity="1"
                        fill="#1E3050"
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"
                      />
                    </svg>
                  </button>
                  <button
                    className="border-[1px] border-[#434343] flex items-center justify-center p-[5px] shadow-md rounded-[5px] cursor-pointer hover:shadow-[#bebebe]"
                    onClick={handleZoomOut}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        opacity="1"
                        fill="#1E3050"
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z"
                      />
                    </svg>
                  </button>
                  <button
                    className="border-[1px] border-[#434343] flex items-center justify-center p-[5px] shadow-md rounded-[5px] cursor-pointer hover:shadow-[#bebebe]"
                    onClick={downloadImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      width="24"
                      viewBox="0 0 448 512"
                    >
                      <path
                        opacity="1"
                        fill="#1E3050"
                        d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      >
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: t("Thoát"),
            onClick: handleClose,
            stylingMode: "contained",
            type: "default",
          }}
        />
      </Popup>
    </ScrollView>
  );
};

export default DuyetBaoCaoBaoHanh;
