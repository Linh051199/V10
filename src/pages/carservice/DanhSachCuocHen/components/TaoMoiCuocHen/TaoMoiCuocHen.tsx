import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, ScrollView } from "devextreme-react";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import PopupThongTinKhachHangVaXe from "@/packages/components/popup/PopupThongTinKhachHangVaXe/PopupThongTinKhachHangVaXe";
import PopupTimKiemThongTinKhachHang from "@/packages/components/popup/PopupTimKiemThongTinKhachHang/PopupTimKiemThongTinKhachHang";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import "./components/TaoMoiCuocHen.scss";
import { useColumnsAnhSoBaoHanh } from "./components/use-columns-anh-so-bao-hanh";
import { useColumnsLichSuGhiChu } from "./components/use-columns-lich-su-ghi-chu";
import { useColumnsPhanCongLaoDong } from "./components/use-columns-phan-cong-lao-dong";
import { useColumnsPhanCongPhuTung } from "./components/use-columns-phan-cong-phu-tung";

const TaoMoiCuocHenPage = () => {
  const { t } = useI18n("TaoMoiCuocHen");
  const { t: common } = useI18n("Common");

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
      KhachHangCungLaNguoiLienLac: true,
      KhachHang: "CANHAN",
      visible: false,
      visible_TKTTKH: false,
    },
  });

  // #region ["Popup thong tin khach hang va xe"]
  const visiblePopup = watch("visible");

  const handleOpen = () => {
    setValue("visible", true);
  };

  const handleClose = () => {
    setValue("visible", false);
  };
  // #endregion

  // #region ["Popup tim kiem thong tin khach hang"]
  const visible_TKTTKH = watch("visible_TKTTKH");

  const handleOpen_TKTTKH = () => {
    setValue("visible_TKTTKH", true);
  };

  const handleClose_TKTTKH = () => {
    setValue("visible_TKTTKH", false);
  };
  // #endregion

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

  // #region [GetFormData]

  // #endregion

  const fetchData = async () => {};

  const handleSelectionChanged = (rowKeys: any) => {};

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="TaoMoiCuocHen"
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
              Danh sách cuộc hẹn
            </p>
            <p className="mx-[5px]">&gt;</p>
            <p className="text-[#00703c] font-semibold">Tạo mới cuộc hẹn</p>
          </div>
          <div className="flex items-center gap-[5px] button-group">
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Xác nhận"
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
              text="Hủy"
            ></Button>
          </div>
        </div>
        <div className="h-[3px] mt-[50px]"></div>
        <div className="flex flex-col ttkh">
          <div className="relative mt-[20px]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Thông tin cuộc hẹn
            </div>
            <div className="grid grid-cols-3 mx-[5px] px-[5px] pt-[20px] border-[1px] border-[#bebebe] gap-[10px]">
              <div className=" grid grid-rows-2">
                <div className="">
                  <Controller
                    name={"ChuXe"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("SoCuocHen")}
                          error={errors.SoCuocHen}
                          disabled
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"LoaiCuocHen"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={t("LoaiCuocHen")}
                          error={errors.LoaiCuocHen}
                          dataSource={[]}
                          displayExpr=""
                          required
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className=" grid grid-rows-2">
                <div className="">
                  <Controller
                    name={"NgayHenTu"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <DateBoxField
                          field={field}
                          label={t("NgayHenTu")}
                          error={errors.NgayHenTu}
                          displayFormat="yyyy-MM-dd HH:mm:ss"
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"CVDV"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          required
                          field={field}
                          label={t("CVDV")}
                          error={errors.CVDV}
                          dataSource={[]}
                          displayExpr=""
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className=" grid grid-rows-2">
                <div className="">
                  <Controller
                    name={"DKGiaoXe"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <DateBoxField
                          field={field}
                          label={t("DKGiaoXe")}
                          error={errors.DKGiaoXe}
                          displayFormat="yyyy-MM-dd HH:mm:ss"
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"Khoang"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={t("Khoang")}
                          error={errors.Khoang}
                          dataSource={[]}
                          displayExpr=""
                          required
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-[20px]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Thông tin khách hàng và xe
            </div>
            <div className="grid grid-cols-3 mx-[5px] px-[5px] pt-[20px] border-[1px] border-[#bebebe] gap-[10px]">
              <div className=" grid grid-rows-2">
                <div className="">
                  <Controller
                    name={"ChuXe"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("ChuXe")}
                          error={errors.ChuXe}
                          required
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"BienSo"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("BienSo")}
                          error={errors.BienSo}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className=" grid grid-rows-2">
                <div className="">
                  <Controller
                    name={"DienThoai"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("DienThoai")}
                          error={errors.DienThoai}
                          disabled
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"Hang"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("Hang")}
                          error={errors.Hang}
                          disabled
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className=" grid grid-rows-2">
                <div className="flex items-center">
                  <Button
                    style={{
                      background: "#00703c",
                      color: "#fff",
                      margin: 0,
                    }}
                    onClick={handleOpen}
                    text="Chi tiết"
                  ></Button>
                </div>

                <div className="">
                  <Controller
                    name={"Model"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("Model")}
                          error={errors.Model}
                          disabled
                        />
                        // <UploadFileField field={"Model"} label="" />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-[20px]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Yêu cầu khách hàng
            </div>
            <div className="grid grid-cols-3 grid-rows-3 h-full">
              <div className="col-span-2 row-span-3 h-full chuxe border-[1px] mx-[5px] px-[5px] pt-[20px] border-[#bebebe]">
                <Controller
                  name={"ChuXe"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextAreaField
                        field={field}
                        error={errors.ChuXe}
                        required
                      />
                    );
                  }}
                />
              </div>
              <div className="h-[50px]"></div>
              <div className="h-[50px]"></div>
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
          </div>

          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Phụ tùng/dầu mỡ vật tư
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
          </div>
        </div>
      </FormProvider>

      <PopupThongTinKhachHangVaXe
        control={control}
        errors={errors}
        watch={watch}
        handleClose={handleClose}
        visible={visiblePopup}
      />

      <PopupTimKiemThongTinKhachHang
        control={control}
        errors={errors}
        watch={watch}
        handleClose={handleClose_TKTTKH}
        visible={visible_TKTTKH}
      />
    </ScrollView>
  );
};

export default TaoMoiCuocHenPage;
