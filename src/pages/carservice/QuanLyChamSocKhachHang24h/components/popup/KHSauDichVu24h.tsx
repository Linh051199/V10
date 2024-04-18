import { ColumnOptions } from "@/types";
import { Form, Popup } from "devextreme-react";
import { GroupItem, ISimpleItemProps, SimpleItem } from "devextreme-react/form";
import { nanoid } from "nanoid";
import "./style.scss";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import { useAtomValue } from "jotai";
import { viewingDataAtom, selectedItemsAtom } from "../store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
interface Props {
  index: number;
  ref: any;
}

const KHSauDichVu24h = forwardRef(({ index }: Props, ref: any) => {
  const popupRef: any = useRef();
  const [visible, setVisible] = useState(false);
  const formRef: any = useRef();
  const item = useAtomValue(selectedItemsAtom);
  const onclose = () => {
    ref.current.setClose();
  };

  useImperativeHandle(
    ref,
    () => ({
      setOpen: () => {
        setVisible(true);
      },
      setClose: () => {
        setVisible(false);
      },
    }),
    []
  );

  const array1 = [
    "TenCaNhan/ToChuc",
    "BienSo",
    "SoVin",
    "DiaChi",
    "NgayLienHe",
  ];

  const array2 = ["NgayVaoXuong", "NgayKetThucDV"];

  const array3 = [
    "1XeCuaAnh/ChiLamDichVuCoVanDeGiKhong",
    "2Anh/ChiCoHaiLongVeChatLuongDichVuKhong",
    "3TheoAnh/ChiThaiDoPhucVuVaTuVanCuaNhanVienHyundaiLa",
    "4Anh/ChiSanSangVaoXuongDichVuTrongLanSuaChua/BaoDuongTiepTheo",
    "5XuongDichVu,CoSoVatChatDaDapUngDuocNhuCauCoBanCuaAnh/ChiChua",
    "6Anh/ChiMongMuonGiOSuPhucVuCuaCongTy",
  ];

  const ListRadio1 = [
    { id: 0, text: "Có" },
    { id: 1, text: "Không" },
  ];

  const ListRadio2 = [
    { id: 0, text: "Hài lòng" },
    { id: 1, text: "Bình thường" },
    { id: 1, text: "Không Hài Lòng" },
  ];

  const ListRadio3 = [
    { id: 0, text: "Thân thiện, lịch sự, có thái độ phục vụ tận tình chu đáo" },
    { id: 1, text: "Bình thường" },
    { id: 2, text: "Thiếu tính chuyên nghiệp và quan tâm tới khách hàng" },
    { id: 3, text: "Khác" },
  ];

  const ListRadio4 = [
    { id: 0, text: "Có" },
    { id: 1, text: "Không" },
  ];

  const ListRadio5 = [
    { id: 0, text: "Đẹp, đầy đủ tiên nghi, phục vụ tốt công việc" },
    { id: 1, text: "Bình thường" },
    { id: 2, text: "Chưa đầy đủ" },
    { id: 3, text: "Khác" },
  ];

  const arr4 = [ListRadio1, ListRadio2, ListRadio3, ListRadio4, ListRadio5];

  const handleContactWaitForResponse = () => {
    return ConfirmComponent({
      asyncFunction: async () => {},
      title: "Report",
      contentConfirm:
        "Do you want to update state already contact with this customer ?",
    });
  };

  return (
    <Popup
      ref={popupRef}
      showCloseButton={true}
      onHiding={onclose}
      showTitle={true}
      className="popup-KHDichVu"
      title="K.H sau dịch vụ 24h"
      height={500}
      visible={index === 0 && item.length === 1 && visible}
    >
      <div className="popup-content-KHDichVu">
        <Form ref={formRef}>
          <GroupItem colCount={3} caption="Thông Tin">
            <GroupItem colSpan={2} colCount={2}>
              {array1.map((item, index) => {
                if (item === "NgayLienHe") {
                  return (
                    <SimpleItem
                      dataField={item}
                      editorType="dxDateBox"
                      colSpan={1}
                      key={nanoid()}
                      editorOptions={{
                        displayFormat: "yyyy-MM-dd",
                        type: "date",
                      }}
                    />
                  );
                }

                if (["BienSo", "SoVin"].includes(item)) {
                  return (
                    <SimpleItem
                      dataField={item}
                      colSpan={1}
                      editorType="dxTextBox"
                      key={nanoid()}
                      editorOptions={{}}
                    />
                  );
                }

                return (
                  <SimpleItem
                    colSpan={2}
                    dataField={item}
                    editorType="dxTextBox"
                    key={nanoid()}
                    editorOptions={{}}
                  />
                );
              })}
            </GroupItem>
            <GroupItem colSpan={1}>
              {array2.map((item) => (
                <SimpleItem
                  key={nanoid()}
                  colSpan={1}
                  dataField={item}
                  editorType="dxDateBox"
                  editorOptions={{
                    displayFormat: "yyyy-MM-dd",
                    type: "date",
                  }}
                />
              ))}
            </GroupItem>
          </GroupItem>
          <GroupItem caption="Đánh giá bởi ý kiến khách hàng" colCount={4}>
            {array3.map((item: string, index: number) => {
              if (index === 5) {
                return (
                  <SimpleItem
                    colSpan={2}
                    dataField={item}
                    editorType="dxTextArea"
                    key={nanoid()}
                  />
                );
              }

              if (index === 2 || index === 4) {
                return (
                  <SimpleItem
                    colSpan={2}
                    dataField={item}
                    editorType="dxRadioGroup"
                    editorOptions={{
                      items: arr4[index],
                      layout: "vertical",
                    }}
                    key={nanoid()}
                  />
                );
              }

              return (
                <SimpleItem
                  colSpan={2}
                  dataField={item}
                  editorType="dxRadioGroup"
                  editorOptions={{
                    items: arr4[index],
                    layout: "horizontal",
                  }}
                  key={nanoid()}
                />
              );
            })}
          </GroupItem>
        </Form>
      </div>

      <ToolbarItem toolbar={"bottom"} location="after">
        <BButton
          onClick={() => handleContactWaitForResponse()}
          label="Đã liên hệ, chờ phản hồi"
        ></BButton>
        <BButton
          onClick={() => handleContactWaitForResponse()}
          label="Đã liên hệ, đã phản hồi"
        ></BButton>
        <BButton
          onClick={() => handleContactWaitForResponse()}
          label="Không liên hệ"
        ></BButton>
        <BButton onClick={onclose} label="Thoát"></BButton>
      </ToolbarItem>
    </Popup>
  );
});

export default KHSauDichVu24h;
