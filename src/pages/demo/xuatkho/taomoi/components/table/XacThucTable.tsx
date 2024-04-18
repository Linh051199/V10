import { Button } from "devextreme-react";

const XacThucTable = ({ fieldArray_ListXacThuc, watch }) => {
  const handleRemove = (index) => {
    fieldArray_ListXacThuc.remove(index);
  };

  return (
    <div className="w-full ">
      <table className="w-full">
        <tr className="border-[1px] border-black">
          <th></th>
          <th>Mã hàng hóa</th>
          <th>Tên hàng hóa (TV)</th>
          <th>Mã xác thực</th>
          <th>Loại</th>
        </tr>
        {fieldArray_ListXacThuc.fields.map((item, index) => {
          const MaHangHoa = watch(`ListXacThuc.${index}.MaHangHoa`);
          const TenHangHoa = watch(`ListXacThuc.${index}.TenHangHoa`);
          const MaXacThuc = watch(`ListXacThuc.${index}.MaXacThuc`);
          const Loai = watch(`ListXacThuc.${index}.Loai`);

          return (
            <tr>
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
              <td>{MaXacThuc}</td>
              <td>{Loai}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default XacThucTable;
