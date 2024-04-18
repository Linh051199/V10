import { Tabs } from "devextreme-react/tabs";
import React, { useRef, useState } from "react";
import KHSauDichVu24h from "../components/popup/KHSauDichVu24h";
import LenhSuaXe from "../components/popup/LenhSuaXe/LenhSuaXe";

const TabComponent = () => {
  const [index, setIndex] = useState(0);
  const popupRef: any = useRef();
  const lenhSuaXeRef: any = useRef();

  const list = [
    {
      id: 1,
      text: "Xem lệnh sửa chưa",
      component: <KHSauDichVu24h index={index} ref={popupRef} />,
    },
    {
      id: 2,
      text: "Cập nhật KH sau dịch vụ",
      component: <LenhSuaXe index={index} ref={lenhSuaXeRef} />,
    },
  ];

  return (
    <div>
      <Tabs
        selectedIndex={index}
        items={list}
        onItemClick={(e) => {
          console.log("e ", e.itemIndex, e.itemIndex === 0, e.itemIndex === 1);
          if (e.itemIndex === 0) {
            popupRef.current.setOpen();
          }
          if (e.itemIndex === 1) {
            lenhSuaXeRef.current.setOpen();
          }
          setIndex(e.itemIndex);
        }}
      ></Tabs>
      <KHSauDichVu24h index={index} ref={popupRef} />
      <LenhSuaXe index={index} ref={lenhSuaXeRef} />
    </div>
  );
};

export default TabComponent;
