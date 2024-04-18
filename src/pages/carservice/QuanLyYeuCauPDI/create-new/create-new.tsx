import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, ScrollView } from "devextreme-react";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { BButton } from "@/packages/components/buttons";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import "./components/DuyetBaoCaoBaoHanh.scss";
import { useColumnsDanhSachPhuTung } from "./components/use-columns-danh-sach-phu-tung";
import { PopupCapNhatThongTinKhachHang } from "./popupCapNhatThongTinKhachHang";

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

const QuanLyYeuCauPDICreate = () => {
  const { t } = useI18n("QuanLyYeuCauPDICreate");

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
    setValue("visible", false);
  };

  // #region [Declare Ref]
  const PhanCongLaoDongRef = useRef();

  // #endregion

  const columnsPhanCongLaoDong = useColumnsDanhSachPhuTung();

  // #region [Get Data If Code Valid]
  useEffect(() => {
    if (code) {
    }
  }, [code]);
  // #endregion

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

  const subGridToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold"}>{t("CarList")}</div>;
      },
    },
    {
      location: "before",
      render: () => {
        return (
          <BButton
            label={t("AddNewCar")}
            onClick={() => onHandleAddNewCar(PhanCongLaoDongRef)}
          />
        );
      },
    },
  ];

  const onHandleAddNewCar = (gridRef: any) => {
    // const { isValid } = formRef.current._instance.validate();
    const isValid = true;
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
          MoTa: "",
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
                        name={"SoPhieuYeuCau"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("SoPhieuYeuCau")}
                              error={errors.SoPhieuYeuCau}
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
                        name={"LoaiYeuCauXuat"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("LoaiYeuCauXuat")}
                              error={errors.LoaiYeuCauXuat}
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
                        name={"NgayYeuCauXuat"}
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextBoxField
                              disabled={true}
                              field={field}
                              label={t("NgayYeuCauXuat")}
                              error={errors.NgayYeuCauXuat}
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
                              disabled={true}
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
                              disabled={true}
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
                <div className="p-1">
                  <Button
                    style={{
                      background: "#00703c",
                      color: "#fff",
                      margin: 0,
                    }}
                    text="Cập nhật thông tin khách hàng"
                    onClick={handleOpenImage}
                  ></Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              Danh sach phu tung
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
              storeKey={"QuanLyYeuCauPDI-danhsachphutung"}
              toolbarItems={subGridToolbars}
              customHeight={300}
              isHidenHeaderFilter
              isHiddenCheckBox
            />
            {/* <GridViewOne
              ref={PhanCongLaoDongRef}
              toolbarItems={subGridToolbars}
              dataSource={[]}
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
              storeKey={"DMS40_Ord_SalesOrderRoot_Create"}
            /> */}
          </div>
        </div>
      </FormProvider>

      <PopupCapNhatThongTinKhachHang
        visiblePopup={visiblePopup}
        onClose={handleClose}
      />
    </ScrollView>
  );
};

export default QuanLyYeuCauPDICreate;
