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
      component: <LenhSuaXe index={index} ref={popupRef} />,
    },
    {
      id: 2,
      text: "Cập nhật KH sau dịch vụ",
      component: <KHSauDichVu24h index={index} ref={lenhSuaXeRef} />,
    },
  ];

  return (
    <div>
      <Tabs
        selectedIndex={index}
        items={list}
        onItemClick={(e) => {
          if (e.itemIndex === 0) {
            lenhSuaXeRef.current.setOpen();
          }
          if (e.itemIndex === 1) {
            popupRef.current.setOpen();
          }
          setIndex(e.itemIndex);
        }}
      ></Tabs>
      <LenhSuaXe index={index} ref={lenhSuaXeRef} />
      <KHSauDichVu24h index={index} ref={popupRef} />
    </div>
  );
};

export default TabComponent;
