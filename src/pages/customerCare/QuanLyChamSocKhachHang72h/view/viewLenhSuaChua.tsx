import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, CheckBox, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import "./DuyetBaoCaoBaoHanh.scss";
import { TextField } from "@/packages/components/text-field";
import { useColumnsPhanCongLaoDong } from "./component/use-columns-phan-cong-lao-dong";
import { CheckboxField } from "@/packages/components/checkbox-field";
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

const LenhSuChuaDetail = () => {
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

  const columnsPhanCongLaoDong = useColumnsPhanCongLaoDong();

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="LenhSuChuaDetail"
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center p-2 header-content">
          <div className="flex items-center">
            <ToggleSidebarButton />
            <p
              className="font-medium cursor-pointer hover:underline"
              onClick={handleNavigateHome}
            >
              Lệnh sửa chữa
            </p>

          </div>
          <div className="flex items-center gap-[5px] button-group">
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Phân công"
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
              text="Kiểm tra cuối cùng"
            ></Button>
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Huỷ lệnh"
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
              text="In lệnh"
            ></Button>
          </div>
        </div>

        <div className="h-[3px] mt-[50px]"></div>
        <div className="flex flex-col ttkh border-[#bebebe] border-[1px] pb-[12px]">
          <div className="grid grid-cols-2 mt-[20px] gap-[5px] pl-[5px]">
            <div className="flex items-center gap-[10px]">
              <div className="flex grid-cols-4 gap-[10px]">
                <Controller
                  name={"BienSo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        // label={t("MaPhanNan")}
                        error={errors.BienSo}
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
                {/* <div> */}
                <Controller
                  name={"BienSo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        cssClass="w-full"
                        // disabled={true}
                        field={field}
                        // label={t("BienSo")}
                        error={errors.BienSo}
                      />
                    );
                  }}
                />
                {/* </div> */}
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex  gap-[10px]">
                <Controller
                  name={"LenhSo"}
                  control={control}
                  render={({ field }) => {
                    return (

                      <TextBoxField
                        cssClass="w-full"
                        disabled={true}
                        field={field}
                        label={t("LenhSo")}
                        error={errors.BienSo}
                      />
                    );
                  }}
                />
                {/* <div> */}
                <Controller
                  name={"MucDoKiemTra"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("MucDoKiemTra")}
                        error={errors.MucDoKiemTra}
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
                {/* </div> */}
              </div>
            </div>
          </div>


          <div className="grid grid-cols-7 mt-[20px] ttkh gap-[10px] ">
            <div className="col-span-3 grid grid-rows-1">
              <div className="row-span-2 relative ml-[5px]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Thông tin khách hàng
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"ChuXe"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("ChuXe")}
                              error={errors.ChuXe}
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
                <div className="grid grid-cols-2 gap-[10px]  border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"NguoiSuDung"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              // disabled={true}
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
                    <div className="">
                      <Controller
                        name={"MST"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("MST")}
                              error={errors.MST}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-b-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"DiaChi"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              // disabled={true}

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
            </div>

            <div className="col-span-3 grid grid-rows-1">
              <div className="row-span-2 relative ml-[5px]">
                <div className="text-[14px] font-semibold absolute left-[15px] top-[-10px] z-20 bg-white px-[1px]">
                  Thông tin xe
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[10px]">
                  <div>
                    {" "}
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
                  </div>
                  <div>
                    {" "}
                    <div className="dtkh">
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
                <div className="grid grid-cols-2 gap-[10px]  border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"Hang"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("Hang")}
                              error={errors.Hang}
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
                        name={"Model"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("Model")}
                              error={errors.Model}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[10px] border-b-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px]">
                  <div>
                    {" "}
                    <div className="">
                      <Controller
                        name={"SoMay"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("SoMay")}
                              error={errors.SoMay}
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
                        name={"MaMauNT"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("MaMau")}
                              error={errors.MaMau}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-rows-1 border-[1px] border-[#bebebe] p-[5px] mr-[5px]">
              <div className="grid grid-cols-1 gap-[10px]">
                <div className="">
                  <Controller
                    name={"Km"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          cssClass="flex !flex-row"
                          disabled={true}
                          direction="vertical"
                          field={field}
                          label={t("Km")}
                          error={errors.Km}
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
                Yêu cầu khách hàng
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
            </div>
            <div className="flex flex-col relative border-[1px] p-[5px] ml-[5px] border-[#bebebe] mr-[5px]">
              <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
                Tình trạng tiếp nhận xe
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
            </div>
          </div>
        </div>

        <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe] pcld">
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
        </div>

        <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe] pcld">
          <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
            Phụ tùng/Dầu mỡ vật tư
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
            storeKey={"DuyetBaoCaoBaoHanh-PhuTungDauMoVatTu"}
            customHeight={300}
            isHidenHeaderFilter
            isHiddenCheckBox
          />
        </div>
        <div className="grid grid-cols-8 mt-[20px] gap-[10px] mb-[20px]">
          <div className="col-span-4 grid grid-rows-1">
            <div className="text-[14px] font-semibold relative left-[15px] top-[-10px] z-20 bg-white px-[1px]">
              Kế hoạch công việc
            </div>
            <div className="row-span-2 relative ml-[5px] khcv">
              <div className="grid grid-cols-3 gap-[10px] border-t-[1px] border-[#bebebe] border-l-[1px] border-r-[1px] px-[5px] pt-[30px] ">
                <div className="text-[14px] absolute  top-[10px] z-20 bg-white px-[1px]">
                  Kế hoạch công việc
                </div>
                <div>
                  {" "}
                  <div className="">
                    <Controller
                      name={"KHToi"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            disabled={true}
                            direction={"vertical"}
                            field={field}
                            label={t("KHToi")}
                            error={errors.KHToi}
                            dataSource={undefined}
                            displayExpr={""} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="dtkh">
                    <Controller
                      name={"BDSC"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            disabled={true}
                            direction={"vertical"}
                            field={field}
                            label={t("BDSC")}
                            error={errors.BDSC} dataSource={undefined} displayExpr={""} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="dtkh">
                    <Controller
                      name={"ThoiGianSC"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            disabled={true}
                            direction={"vertical"}
                            field={field}
                            label={t("ThoiGianSC")}
                            error={errors.ThoiGianSC} dataSource={undefined} displayExpr={""} />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[10px]  border-[#bebebe] border-l-[1px] border-r-[1px] border-b-[1px] px-[5px]">
                <div>
                  {" "}
                  <div className="">
                    <Controller
                      name={"DKienGX"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            disabled={true}
                            direction={"vertical"}
                            field={field}
                            label={t("DKienGX")}
                            error={errors.DKienGX} dataSource={undefined} displayExpr={""} />
                        );
                      }}
                    />
                  </div>
                </div>
                <div>
                  {" "}
                  <div className="">
                    <Controller
                      name={"KetThucSC"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            disabled={true}
                            direction={"vertical"}
                            field={field}
                            label={t("KetThucSC")}
                            error={errors.KetThucSC} dataSource={undefined} displayExpr={""} />
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 grid grid-rows-1">
            <div className="row-span-2 relative ml-[5px] khcv">
              <div className="grid grid-cols-5 gap-[10px] px-[5px] pt-[55px] ">
                <div className="text-[14px] absolute  top-[0px] z-20 bg-white px-[1px] py-[12px]">
                  Thông tin khác
                </div>
                <div>
                  {" "}
                  <div className="">
                    <Controller
                      name={"KhachHangCho"}
                      control={control}
                      render={(param: any) => {
                        const { dataField, component: formComponent } = param;
                        return (
                          <CheckboxField
                            label={t("KhachHangCho")}
                            dataField={'KhachHangCho'}
                            formInstance={formComponent}
                            defaultValue={true}
                            onValueChanged={(e: any) => {
                              formComponent.updateData(dataField, e.value);
                            }}
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
                      name={"YeuCauRuaXe"}
                      control={control}
                      render={(param: any) => {
                        const { dataField, component: formComponent } = param;
                        return (
                          <CheckboxField
                            label={t("YeuCauRuaXe")}
                            dataField={'YeuCauRuaXe'}
                            formInstance={formComponent}
                            defaultValue={false}
                            onValueChanged={(e: any) => {
                              formComponent.updateData(dataField, e.value);
                            }}
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
                      name={"ThanhToanBangThe"}
                      control={control}
                      render={(param: any) => {
                        const { dataField, component: formComponent } = param;
                        return (
                          <CheckboxField
                            label={t("ThanhToanBangThe")}
                            dataField={'ThanhToanBangThe'}
                            formInstance={formComponent}
                            defaultValue={false}
                            onValueChanged={(e: any) => {
                              formComponent.updateData(dataField, e.value);
                            }}
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
                      name={"KhachLayPTCu"}
                      control={control}
                      render={(param: any) => {
                        const { dataField, component: formComponent } = param;
                        return (
                          <CheckboxField
                            label={t("KhachLayPTCu")}
                            dataField={'KhachLayPTCu'}
                            formInstance={formComponent}
                            defaultValue={false}
                            onValueChanged={(e: any) => {
                              formComponent.updateData(dataField, e.value);
                            }}
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
                      name={"PhanTu"}
                      control={control}
                      render={(param: any) => {
                        const { dataField, component: formComponent } = param;
                        return (
                          <CheckboxField
                            label={t("PhanTu")}
                            dataField={'PhanTu'}
                            formInstance={formComponent}
                            defaultValue={false}
                            onValueChanged={(e: any) => {
                              formComponent.updateData(dataField, e.value);
                            }}
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

        <div className="flex flex-col ttkh pb-[12px]">
          <div className="grid grid-cols-2 mt-[20px] gap-[5px] pl-[5px]">
            <div className="flex items-center gap-[10px]">
              <div className="flex gap-[10px]">
                <Controller
                  name={"CVDV"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("CVDV")}
                        error={errors.CVDV}
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
                {/* <div> */}
                <Controller
                  name={"ThoiGianSuaChuaCuoiCung"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        cssClass="w-full"
                        disabled={true}
                        field={field}
                        label={t("ThoiGianSuaChuaCuoiCung")}
                        error={errors.ThoiGianSuaChuaCuoiCung}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </ScrollView>
  );
};

export default LenhSuChuaDetail;
