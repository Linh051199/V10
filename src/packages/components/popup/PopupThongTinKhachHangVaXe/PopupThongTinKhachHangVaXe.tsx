import { useI18n } from "@/i18n/useI18n";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

interface IPopupThongTinKhachHangVaXe {
  control: Control;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  handleClose: any;
  visible: boolean;
}

const PopupThongTinKhachHangVaXe = ({
  control,
  errors,
  watch,
  handleClose,
  visible,
}: IPopupThongTinKhachHangVaXe) => {
  const { t: common } = useI18n("Common");
  const { t } = useI18n("PopupThongTinKhachHangVaXe");

  const fd_KhachHangCungLaNguoiLienLac = watch("KhachHangCungLaNguoiLienLac");
  const fd_LoaiKhachHang = watch("KhachHang");
  const fd_KhongCoBienSo = watch("KhongCoBienSo");

  const dataSource_LoaiKhachHang = [
    {
      type: "CANHAN",
      display: "Cá nhân",
    },
    {
      type: "TOCHUC",
      display: "Tổ chức",
    },
  ];

  const dataSource_GioiTinh = [
    {
      value: "0",
      display: "Nam",
    },
    {
      value: "1",
      display: "Nữ",
    },
  ];

  const renderTenKH = () => {
    return fd_LoaiKhachHang == "CANHAN" ? (
      <Controller
        name={"HoTen"}
        control={control}
        render={({ field }) => {
          return (
            <TextBoxField
              field={field}
              label={t("HoTen")}
              error={errors.HoTen}
              required
            />
          );
        }}
      />
    ) : (
      <Controller
        name={"TenToChuc"}
        control={control}
        render={({ field }) => {
          return (
            <TextBoxField
              field={field}
              label={t("TenToChuc")}
              error={errors.TenToChuc}
              required
            />
          );
        }}
      />
    );
  };

  const renderLoaiKH = () => {
    return fd_LoaiKhachHang == "CANHAN" ? (
      <Controller
        name={"GioiTinh"}
        control={control}
        render={({ field }) => {
          return (
            <SelectBoxField
              field={field}
              label={t("GioiTinh")}
              error={errors.GioiTinh}
              dataSource={dataSource_GioiTinh}
              valueExpr="value"
              displayExpr="display"
              required
            />
          );
        }}
      />
    ) : (
      <Controller
        name={"LoaiKH"}
        control={control}
        render={({ field }) => {
          return (
            <SelectBoxField
              field={field}
              label={t("LoaiKH")}
              error={errors.LoaiKH}
              dataSource={[]}
              valueExpr="value"
              displayExpr="display"
              required
            />
          );
        }}
      />
    );
  };

  const renderInfor = () => {
    return (
      <div className="flex flex-col ttkh TaoMoiCuocHen thongtinkhachhang-popup">
        {/* Thong tin khach hang */}
        <div className="flex flex-col relative">
          <div className="flex items-center gap-[10px]">
            <div className="text-[12px] font-semibold bg-white px-[1px] ">
              Thông tin khách hàng
            </div>
            <div className="h-[25px] flex items-center ">
              <Controller
                name={"KhachHangCungLaNguoiLienLac"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField
                      field={field}
                      label={t("KhachHangCungLaNguoiLienLac")}
                      className=""
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="grid grid-rows-5 mx-[5px] px-[5px] pt-[5px] ">
              <div className="">
                <Controller
                  name={"KhachHang"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("KhachHang")}
                        dataSource={dataSource_LoaiKhachHang}
                        valueExpr="type"
                        displayExpr="display"
                      />
                    );
                  }}
                />
              </div>
              <div className="">{renderLoaiKH()}</div>
              <div className="">
                <Controller
                  name={"NgaySinh"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("NgaySinh")}
                        error={errors.NgaySinh}
                        disabled={fd_LoaiKhachHang != "CANHAN"}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"DiDong"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("DiDong")}
                        error={errors.DiDong}
                        required
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"Email"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("Email")}
                        error={errors.Email}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid grid-rows-5 mx-[5px] px-[5px] pt-[5px] ">
              <div className="">{renderTenKH()}</div>
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
                      />
                    );
                  }}
                />
              </div>

              <div className="">
                <Controller
                  name={"Website"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        disabled={fd_LoaiKhachHang == "CANHAN"}
                        field={field}
                        label={t("Website")}
                        error={errors.Website}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"Tinh"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("Tinh")}
                        error={errors.Tinh}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                        required
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"Quan"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("Quan")}
                        error={errors.Quan}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                        required
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid grid-rows-5 mx-[5px] px-[5px] pt-[10px] ">
              <div className="">
                <Controller
                  name={"Fax"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("Fax")}
                        error={errors.Fax}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"MST"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("MST")}
                        error={errors.MST}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"CMND"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("CMND")}
                        error={errors.CMND}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"SoNha"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("SoNha")}
                        error={errors.SoNha}
                        required
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[5px] bg-[#ececec] my-[5px]"></div>
        </div>

        {/*  */}

        {/* Thông tin liên lạc */}

        {!fd_KhachHangCungLaNguoiLienLac && (
          <div className="flex flex-col relative ">
            <div className="flex items-center">
              <div className="text-[12px] font-semibold  bg-white px-[1px]">
                Thông tin người liên lạc
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="grid grid-rows-2 mx-[5px] px-[5px] pt-[10px]">
                <div className="">
                  <Controller
                    name={"HoTen"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("HoTen")}
                          error={errors.HoTen}
                          required
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
                          field={field}
                          label={t("DienThoai")}
                          error={errors.DienThoai}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-rows-2 mx-[5px] px-[5px] pt-[10px]">
                <div className="">
                  <Controller
                    name={"DiaChi"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("DiaChi")}
                          error={errors.DiaChi}
                        />
                      );
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"DiDong"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("DiDong")}
                          error={errors.DiDong}
                          required
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-rows-2 mx-[5px] px-[5px] pt-[10px]">
                <div className="">
                  <Controller
                    name={"GioiTinh"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={t("GioiTinh")}
                          error={errors.GioiTinh}
                          dataSource={[]}
                          valueExpr=""
                          displayExpr=""
                          required
                        />
                      );
                    }}
                  />
                </div>

                <div className="">
                  <Controller
                    name={"Email"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("Email")}
                          error={errors.Email}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[5px] my-[5px] bg-[#ececec]"></div>
          </div>
        )}

        {/*  */}

        {/* Thông tin xe */}

        <div className="flex flex-col relative">
          <div className="flex items-center gap-[10px]">
            <div className="text-[12px] font-semibold  bg-white px-[1px]">
              Thông tin xe
            </div>
            <div className="h-[25px] flex items-center">
              <Controller
                name={"KhongCoBienSo"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField field={field} label={t("KhongCoBienSo")} />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="grid mx-[5px] px-[5px] pt-[10px] grid-rows-6">
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
                        required
                        disabled={fd_KhongCoBienSo}
                      />
                    );
                  }}
                />
              </div>

              <div className="">
                <Controller
                  name={"SoKhung"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("SoKhung")}
                        error={errors.SoKhung}
                        required
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"SoKm"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("SoKm")}
                        error={errors.SoKm}
                        disabled
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgayHetHanBaoHanh"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <DateBoxField
                        disabled={true}
                        field={field}
                        label={t("Ngay Het Han Bao Hanh")}
                        error={errors.NgayHetHanBaoHanh}
                        displayFormat="yyyy-MM-dd"
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"MauBienSo"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("MauBienSo")}
                        error={errors.MauBienSo}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"KmGioiHanBH"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("KmGioiHanBH")}
                        error={errors.KmGioiHanBH}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid mx-[5px] px-[5px] pt-[10px] grid-rows-6">
              <div className="">
                <Controller
                  name={"HieuXe"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("HieuXe")}
                        error={errors.HieuXe}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                        required
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"SoMay"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("SoMay")}
                        error={errors.SoMay}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgayMuaXe"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <DateBoxField
                        disabled={true}
                        field={field}
                        label={t("Ngay Mua Xe")}
                        error={errors.NgayMuaXe}
                        displayFormat="yyyy-MM-dd"
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgayMuaXe"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <DateBoxField
                        disabled={true}
                        field={field}
                        label={t("Ngay DK bao hanh")}
                        error={errors.NgayMuaXe}
                        displayFormat="yyyy-MM-dd"
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
                      <DateBoxField
                        disabled={true}
                        field={field}
                        label={t("Ngay KH XN bao hanh")}
                        error={errors.NgayKHXNBH}
                        displayFormat="yyyy-MM-dd"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid mx-[5px] px-[5px] pt-[10px] grid-rows-6 label-end">
              <div className="">
                <Controller
                  name={"Model"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("Model")}
                        error={errors.Model}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                        required
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"Mau"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("Mau")}
                        error={errors.Mau}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"DoiXe"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("DoiXe")}
                        error={errors.DoiXe}
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
                        field={field}
                        label={t("MaAVN")}
                        error={errors.MaAVN}
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"MaBinhAcQuy"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("MaBinhAcQuy")}
                        error={errors.MaBinhAcQuy}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[5px] my-[5px] bg-[#ececec]"></div>
        </div>

        {/*  */}

        {/* Thông tin bảo hiểm */}

        <div className="flex flex-col relative ">
          <div className="flex items-center">
            <div className="text-[12px] font-semibold  bg-white px-[1px]">
              Thông tin bảo hiểm
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="grid mx-[5px] px-[5px] pt-[5px]">
              <div className="">
                <Controller
                  name={"HangBH"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("HangBH")}
                        error={errors.HangBH}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"SoHopDong"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextBoxField
                        field={field}
                        label={t("SoHopDong")}
                        error={errors.SoHopDong}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid mx-[5px] px-[5px] pt-[5px]">
              <div className="">
                <Controller
                  name={"NgayBatDau"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("NgayBatDau")}
                        error={errors.NgayBatDau}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                      />
                    );
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"NgayHetHan"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("NgayHetHan")}
                        error={errors.NgayHetHan}
                        dataSource={[]}
                        valueExpr=""
                        displayExpr=""
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popup
      visible={visible}
      title="Thông tin khách hàng và xe"
      contentRender={renderInfor}
      height={730}
      wrapperAttr={{
        class: "custom-popup",
      }}
      showCloseButton
    >
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: common("Save"),
          onClick: handleClose,
          stylingMode: "contained",
          type: "default",
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: common("Cancel"),
          onClick: handleClose,
          stylingMode: "contained",
          type: "default",
        }}
      />
    </Popup>
  );
};

export default PopupThongTinKhachHangVaXe;
