import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { Controller, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

const PopupDanhSachTonKho = ({
  visible,
  handleClose,
  control,
  watch,
  getValues,
  setValue,
}) => {
  const fieldArray_DanhSachTonKho = useFieldArray({
    control,
    name: "ListDanhSachTonKho",
  });

  const MaHangHoaHienTai = watch("MaHangHoaHienTai");

  const handleSave = () => {
    const ListDanhSachTonKho = getValues("ListDanhSachTonKho");
    if (ListDanhSachTonKho.some((item) => item.SoLuongTon < item.SoLuongXuat)) {
      toast.error("Số lượng xuất không được lớn hơn số lượng tồn!");
      return;
    }

    const SoLuong = ListDanhSachTonKho.reduce(
      (prev, cur) => (prev += cur.SoLuongXuat),
      0
    );

    setValue(`ListSanPham.${watch("Index")}.ViTriXuat`, ListDanhSachTonKho);
    setValue(`ListSanPham.${watch("Index")}.SoLuong`, SoLuong);

    handleClose();
  };

  return (
    <Popup
      visible={visible}
      showCloseButton
      onHiding={handleClose}
      title="Danh sách tồn kho"
      width={500}
      wrapperAttr={{
        class: "popup-ton-kho",
      }}
    >
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center">Mã hàng hóa: {MaHangHoaHienTai}</div>
        <table>
          <tr>
            <th>Vị trí</th>
            <th>Số lượng tồn</th>
            <th>Số lượng xuất</th>
          </tr>
          {fieldArray_DanhSachTonKho.fields.map((item, index) => {
            const ViTri = watch(`ListDanhSachTonKho.${index}.ViTri`);

            return (
              <tr>
                <td>{ViTri}</td>
                <td>
                  <div className="w-full">
                    <Controller
                      name={`ListDanhSachTonKho.${index}.SoLuongTon`}
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
                      name={`ListDanhSachTonKho.${index}.SoLuongXuat`}
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
              </tr>
            );
          })}
        </table>
      </div>

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: "Lưu",
          onClick: handleSave,
          stylingMode: "contained",
          type: "default",
        }}
      />
    </Popup>
  );
};

export default PopupDanhSachTonKho;
