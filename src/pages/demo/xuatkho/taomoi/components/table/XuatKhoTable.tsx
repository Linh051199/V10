import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Button } from "devextreme-react";
import { Controller } from "react-hook-form";
import PopupDanhSachTonKho from "../popup/PopupDanhSachTonKho";

const XuatKhoTable = ({
  fieldArray_ListSanPham,
  control,
  setValue,
  watch,
  getValues,
}) => {
  const visible = watch("Open");

  const handleRemove = (index) => {
    fieldArray_ListSanPham.remove(index);
  };

  const handleOpen = async (code, DanhSachKho, currentIndex) => {
    setValue("Open", true);

    setValue("ListDanhSachTonKho", DanhSachKho);
    setValue("MaHangHoaHienTai", code);
    setValue("Index", currentIndex);
  };

  const handleOpenEdit = async (code, ViTriKho, currentIndex) => {
    setValue("Open", true);
    setValue("ListDanhSachTonKho", ViTriKho);
    setValue("MaHangHoaHienTai", code);
    setValue("Index", currentIndex);
  };

  const handleClose = () => {
    setValue("Open", false);
    setValue("ListDanhSachTonKho", []);
    setValue("MaHangHoaHienTai", null);
  };

  const handleSave = () => {};

  const handleUpdateViTriXuat = (value, ViTriKho, index) => {
    let i = 0;
    let result = [];
    let currentValue = value;
    while (i < ViTriKho.length) {
      if (ViTriKho[i].SoLuongTon < currentValue) {
        result.push(ViTriKho[i]);
        result[i].SoLuongXuat = result[i].SoLuongTon;
        currentValue = currentValue - result[i].SoLuongTon;
      } else {
        result.push(ViTriKho[i]);
        result[i].SoLuongXuat = currentValue;
        currentValue = 0;
      }
      i++;
    }
    console.log(result);
  };

  return (
    <div className="w-full ">
      <table className="w-full">
        <tr className="border-[1px] border-black">
          <th></th>
          <th>Mã hàng hóa</th>
          <th>Tên hàng hóa (TV)</th>
          <th>Đơn vị tính</th>
          <th>Tồn kho</th>
          <th>Số lượng</th>
          <th>Vị trí xuất</th>
          {/* <th>Giá vốn</th> */}
          <th>Đơn giá</th>
          <th>Giảm giá</th>
          <th>Thành tiền</th>
          <th>Ghi chú</th>
        </tr>
        {fieldArray_ListSanPham.fields.map((item, index) => {
          const MaHangHoa = watch(`ListSanPham.${index}.MaHangHoa`);
          const TenHangHoa = watch(`ListSanPham.${index}.TenHangHoa`);
          const ViTriXuat = watch(`ListSanPham.${index}.ViTriXuat`);
          const ListDonViTinh = watch(`ListSanPham.${index}.ListDonViTinh`);

          const handleChangeDVT = (value) => {
            const result = ListDonViTinh.find((i) => i.id == value);

            setValue(`ListSanPham.${index}.TonKho`, result.TonKho);
            setValue(`ListSanPham.${index}.DonGia`, result.DonGia);
            setValue(`ListSanPham.${index}.GiamGia`, result.GiamGia);
            setValue(`ListSanPham.${index}.ViTriXuat`, result.ViTriXuat);
            setValue(`ListSanPham.${index}.SoLuong`, 0);
          };

          return (
            <tr className="border-[1px] border-black">
              <td>
                <Button
                  icon="/images/icons/trash.svg"
                  stylingMode="text"
                  type="normal"
                  onClick={() => handleRemove(index)}
                ></Button>
              </td>
              <td>{MaHangHoa}</td>
              <td>{TenHangHoa}</td>
              <td>
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.DonViTinh`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          dataSource={ListDonViTinh}
                          displayExpr={"DonViTinh"}
                          valueExpr="id"
                          width={100}
                          onValueChanged={handleChangeDVT}
                        />
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.TonKho`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberBoxField
                          field={field}
                          disabled
                          props={{
                            width: 100,
                            format: "#,##0",
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.SoLuong`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberBoxField
                          field={field}
                          props={{
                            width: 100,
                            format: "#,##0",
                            max: watch(`ListSanPham.${index}.TonKho`),
                            onValueChanged: (e) => {
                              field.onChange({
                                target: {
                                  name: field.name,
                                  value: e.value,
                                },
                              });

                              handleUpdateViTriXuat(e.value, ViTriXuat, index);
                            },
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                {ViTriXuat == null ? (
                  <Button
                    style={{
                      padding: 10,
                    }}
                    icon={"/images/icons/add.svg"}
                    stylingMode="outlined"
                    type="default"
                    onClick={() =>
                      handleOpen(
                        watch(`ListSanPham.${index}.MaHangHoa`),
                        watch(`ListSanPham.${index}.DanhSachKho`),
                        index
                      )
                    }
                  ></Button>
                ) : (
                  <div className="flex gap-[10px] items-center">
                    <div>
                      {ViTriXuat.filter((item) => item.SoLuongXuat > 0)
                        .map((item: any) => item.ViTri)
                        .join(",")
                        .toString()}
                    </div>
                    <Button
                      style={{
                        padding: 10,
                      }}
                      icon={"/images/icons/edit.svg"}
                      type="default"
                      stylingMode="outlined"
                      onClick={() =>
                        handleOpenEdit(
                          watch(`ListSanPham.${index}.MaHangHoa`),
                          watch(`ListSanPham.${index}.ViTriXuat`),
                          index
                        )
                      }
                    ></Button>
                  </div>
                )}
              </td>
              {/* <td>
                {" "}
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.GiaVon`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberBoxField
                          field={field}
                          disabled
                          props={{
                            width: 100,
                            format: "#,##0",
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td> */}
              <td>
                {" "}
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.DonGia`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberBoxField
                          field={field}
                          props={{
                            width: 100,
                            format: "#,##0",
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                {" "}
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.GiamGia`}
                    control={control}
                    render={({ field }) => {
                      const DonGia = watch(`ListSanPham.${index}.DonGia`);

                      return (
                        <NumberBoxField
                          field={field}
                          props={{
                            width: 100,
                            format: "#,##0",
                            max: DonGia,
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                {" "}
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.ThanhTien`}
                    control={control}
                    render={({ field }) => {
                      const SoLuong = watch(`ListSanPham.${index}.SoLuong`);
                      const DonGia = watch(`ListSanPham.${index}.DonGia`);
                      const GiamGia = watch(`ListSanPham.${index}.GiamGia`);

                      return (
                        <NumberBoxField
                          field={field}
                          disabled
                          props={{
                            width: 100,
                            format: "#,##0",
                            value:
                              SoLuong > 0 ? SoLuong * (DonGia - GiamGia) : 0,
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td>
              <td>
                <div className="w-full">
                  <Controller
                    name={`ListSanPham.${index}.GhiChu`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          props={{
                            width: 100,
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </table>
      <PopupDanhSachTonKho
        handleClose={handleClose}
        visible={visible}
        control={control}
        watch={watch}
        getValues={getValues}
        setValue={setValue}
      />
    </div>
  );
};

export default XuatKhoTable;
