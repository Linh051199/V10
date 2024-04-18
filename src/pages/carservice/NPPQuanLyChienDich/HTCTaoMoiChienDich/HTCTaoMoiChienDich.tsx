import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { DateRangeBoxField } from "@/packages/ui/hook-form-field/DateRangeBoxField";
import { TagBoxField } from "@/packages/ui/hook-form-field/TagBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { format } from "date-fns";
import { Button, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { data } from "../components/data";
import "./components/HTCTaoMoiChienDich.scss";
import { useColumnsDanhSachDaiLy } from "./components/use-columns-danh-sach-dai-ly";
import { useColumnsDanhSachPhuTung } from "./components/use-columns-danh-sach-phu-tung";
import { useColumnsDanhSachVIN } from "./components/use-columns-danh-sach-vin";
import { useListDealer } from "./components/use-list-dealer";

const HTCTaoMoiChienDichPage = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => {
  const { t } = useI18n("HTCTaoMoiChienDich");

  // #region [Navigate handler]
  const navigate = useNetworkNavigate();

  const handleNavigateHome = () => {
    navigate("/service/NPPQuanLyChienDich");
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
    defaultValues: {
      MaChienDich: "CD.001.demo",
      NgayTao: format(new Date(), "yyyy-MM-dd"),
      NgayChienDichTu: [undefined, undefined],
      NgayKichHoatBaoHanh: [undefined, undefined],
      visible: false,
    },
  });

  const listDealer = useListDealer();

  const visiblePopup = watch("visible");

  const handleOpen = () => {
    setValue("visible", true);
  };

  const handleClose = () => {
    setValue("visible", false);
  };

  // #region [Declare Ref]
  const DanhSachVinRef = useRef();
  const DanhSachPhuTungRef = useRef();
  const DanhSachDaiLyRef = useRef();
  // #endregion

  // #region [Declare Column]
  const columnsDanhSachVin = useColumnsDanhSachVIN({});
  const columnsDanhSachPhuTung = useColumnsDanhSachPhuTung({});
  const columnsDanhSachDaiLy: any = useColumnsDanhSachDaiLy();

  // #endregion

  // #region [Get Data If Code Valid]
  useEffect(() => {
    if (code) {
      const currentData: any = data.find(
        (item: any) => item.MaChienDich == code
      );

      const NgayChienDichTuDate = [
        currentData.TuNgay ? new Date(currentData.TuNgay) : null,
        currentData.DenNgay ? new Date(currentData.DenNgay) : null,
      ];

      setValue("MaChienDich", currentData?.MaChienDich);
      setValue("NgayTao", currentData?.NgayTao);
      setValue("TenChienDich", currentData?.TenChienDich);
      setValue("NoiDungChienDich", currentData?.NoiDung);
      setValue("NgayChienDichTu", NgayChienDichTuDate);
    }
  }, [code]);
  // #endregion

  const fetchData = async () => {};

  const fetchDataDanhSachDaiLy = async () => {
    const result = {
      DataList: listDealer,
    };
    return result;
  };

  const handleChooseDealer = () => {
    const selectedData = DanhSachDaiLyRef.current?.getSelectedRowsData();

    if (selectedData && selectedData.length == 0) {
      toast.error("Chưa chọn đại lý!");
      return;
    }

    const result = selectedData?.map((item: any) => item.MaDaiLy);

    setValue("DaiLy", result);

    handleClose();
  };

  const handleSelectionChanged = (rowKeys: any) => {};

  const tagRender = (data: any) => {
    return <div className="">{data.TenDaiLy},</div>;
  };

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="htctaomoichiendich"
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center">
            <p
              className="font-medium cursor-pointer hover:underline"
              onClick={handleNavigateHome}
            >
              NPP Quản lý chiến dịch
            </p>
            <p className="mx-[5px]">&gt;</p>
            <p className="text-[#00703c] font-semibold">
              {code ? "Chi tiết chiến dịch" : "HTC Tạo mới chiến dịch"}
            </p>
          </div>
          {!disabled && (
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Lưu"
              width={90}
            ></Button>
          )}
        </div>
        <div className="h-[3px] w-full bg-slate-100"></div>
        <div className="flex flex-col">
          <div className="grid grid-cols-2">
            <div className="flex flex-col p-2">
              <div className="mb-2 text-md font-semibold">
                Thông tin chiến dịch
              </div>
              <Controller
                name={"MaChienDich"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("MaChienDich")}
                      required={true}
                      error={errors.MaChienDich}
                      disabled={true}
                    />
                  );
                }}
              />
              <Controller
                name={"NgayTao"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("NgayTao")}
                      required={true}
                      error={errors.NgayTao}
                      disabled={true}
                    />
                  );
                }}
              />
              <Controller
                name={"TenChienDich"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("TenChienDich")}
                      required={true}
                      error={errors.TenChienDich}
                      disabled={disabled}
                    />
                  );
                }}
              />
              <Controller
                name={"NoiDungChienDich"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextAreaField
                      field={field}
                      label={t("NoiDungChienDich")}
                      disabled={disabled}
                      required={true}
                      error={errors.NoiDungChienDich}
                      props={{
                        height: 100,
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <div className="mb-2 text-md font-semibold">
                Điều kiện chiến dịch
              </div>
              <Controller
                name={"NgayChienDichTu"}
                control={control}
                render={({ field }) => {
                  return (
                    <DateRangeBoxField
                      field={field}
                      label={t("NgayChienDichTu")}
                      required={true}
                      error={errors.NgayChienDichTu}
                      disabled={disabled}
                    />
                  );
                }}
              />
              <Controller
                name={"NgayKichHoatBaoHanh"}
                control={control}
                render={({ field }) => {
                  return (
                    <DateRangeBoxField
                      field={field}
                      label={t("NgayKichHoatBaoHanh")}
                      disabled={disabled}
                    />
                  );
                }}
              />
              <Controller
                name={"DauBienSoXe"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("DauBienSoXe")}
                      disabled={disabled}
                    />
                  );
                }}
              />
              <Controller
                name={"VINChuaKyTu"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("VINChuaKyTu")}
                      disabled={disabled}
                    />
                  );
                }}
              />
              <div className="flex items-center w-full gap-[10px]">
                <div
                  style={{
                    width: disabled ? "100%" : "calc(100% - 90px)",
                  }}
                >
                  <Controller
                    name={"DaiLy"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TagBoxField
                          field={field}
                          label={t("DaiLy")}
                          dataSource={listDealer}
                          displayExpr={"TenDaiLy"}
                          valueExpr={"MaDaiLy"}
                          showClearButton={false}
                          disabled={true}
                          showPlaceholder={false}
                          value={watch("DaiLy")}
                          props={{
                            tagRender: tagRender,
                            height: 65,
                          }}
                        />
                      );
                    }}
                  />
                </div>

                {!disabled && (
                  <Button
                    style={{
                      background: "#00703c",
                      color: "#fff",
                      margin: 0,
                    }}
                    text="Chọn"
                    width={90}
                    onClick={handleOpen}
                  ></Button>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col p-2 my-custom-table">
              <div className="my-2 text-md font-semibold flex items-center justify-between">
                <p>Danh sách VIN</p>
                {!disabled && (
                  <div className="flex gap-[10px]">
                    <Button
                      style={{
                        background: "#00703c",
                        color: "#fff",
                        margin: 0,
                      }}
                      text="Import Excel"
                    ></Button>
                    <Button
                      style={{
                        background: "#00703c",
                        color: "#fff",
                        margin: 0,
                      }}
                      text="Export Template"
                    ></Button>
                    <Button
                      style={{
                        background: "#00703c",
                        color: "#fff",
                        margin: 0,
                      }}
                      text="Xóa"
                    ></Button>
                  </div>
                )}
              </div>
              <GridViewOne
                ref={DanhSachVinRef}
                dataSource={listDealer} // cars
                columns={columnsDanhSachVin}
                fetchData={fetchData}
                onSelectionChanged={handleSelectionChanged}
                autoFetchData={true}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                editMode={true}
                keyExpr={"VIN"}
                storeKey={"HTCTaoMoiChienDich-DanhSachVIN"}
                customHeight={350}
                isHidenHeaderFilter
              />
            </div>
            <div className="flex flex-col p-2 my-custom-table">
              <div className="my-2 text-md font-semibold flex items-center justify-between">
                <p>Danh sách phụ tùng khuyến mại</p>

                {!disabled && (
                  <div className="flex items-center justify-between gap-[10px]">
                    <Button
                      style={{
                        background: "#00703c",
                        color: "#fff",
                        margin: 0,
                      }}
                      text="Import Excel"
                    ></Button>
                    <Button
                      style={{
                        background: "#00703c",
                        color: "#fff",
                        margin: 0,
                      }}
                      text="Export Template"
                    ></Button>
                    <Button
                      style={{
                        background: "#00703c",
                        color: "#fff",
                        margin: 0,
                      }}
                      text="Xóa"
                    ></Button>
                  </div>
                )}
              </div>
              <GridViewOne
                ref={DanhSachPhuTungRef}
                dataSource={[]} // cars
                columns={columnsDanhSachPhuTung}
                fetchData={fetchData}
                onSelectionChanged={handleSelectionChanged}
                autoFetchData={true}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                editMode={true}
                keyExpr={"MaPhuTung"}
                storeKey={"HTCTaoMoiChienDich-DanhSachPhuTung"}
                customHeight={350}
                isHidenHeaderFilter
              />
            </div>
          </div>
        </div>
      </FormProvider>

      <Popup
        visible={visiblePopup}
        title="Danh sách đại lý"
        showCloseButton
        onHidden={handleClose}
        className="dealer-popup"
        width={600}
        contentRender={() => {
          return (
            <div className="flex flex-col my-custom-table">
              <GridViewOne
                ref={DanhSachDaiLyRef}
                dataSource={listDealer} // cars
                columns={columnsDanhSachDaiLy}
                fetchData={fetchDataDanhSachDaiLy}
                onSelectionChanged={handleSelectionChanged}
                autoFetchData={true}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                // editMode={true}
                keyExpr={"MaDaiLy"}
                storeKey={"HTCTaoMoiChienDich-DanhSachDaiLy"}
                isHidenHeaderFilter
                allowInlineEdit={false}
                allowMultiRowEdit={false}

                // editingOptions={{
                //   allowUpdating: false,
                //   allowDeleting: false,
                // }}
              />
            </div>
          );
        }}
      >
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          visible={!disabled}
          options={{
            text: "Chọn",
            type: "default",
            stylingMode: "contained",
            onClick: handleChooseDealer,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: t("Thoát"),
            onClick: handleClose,
          }}
        />
      </Popup>
    </ScrollView>
  );
};

export default HTCTaoMoiChienDichPage;
