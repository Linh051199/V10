import { Button, Form } from "devextreme-react";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import FormInputStore from "./Components/Form";
import TabImportStore from "./Components/Tab";
import Calc from "./Components/Tab/Components/Calc";
import "./style.scss";
const InfomationImportStore = () => {
  const { ticketID } = useParams();
  const formRef: any = useParams();
  const tabRef: any = useParams();
  const navigate = useNavigate();

  const handleGetData = (d: any) => {
    formRef.current.setData(d);
  };

  const handleCheckValidate = () => {
    return formRef.current.checkValidate();
  };

  return (
    <AdminContentLayout className={"donhang"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex items-center w-full h-[55px] pl-2">
          <div className="page-title pr-[5px]">{"Nhập Kho"}</div>
          <div className="page-title pr-[5px]">{">"}</div>
          <div className="pr-[5px]">{"Tạo mới"}</div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <>
          <div className="pb-[28px] mt-[14px]">
            <Button
              className="w-[100px] ml-2"
              text={"Lưu"}
              onClick={() => {}}
              stylingMode="contained"
            />
            <Button
              className="ml-2"
              text={"Lưu và tạo mới"}
              onClick={() => {}}
              stylingMode="contained"
            />
          </div>

          <FormInputStore ref={formRef} />
          <div className="separate mt-1 mb-1"></div>
          <div className="mr-[10px] ml-[10px]">
            <TabImportStore
              ref={tabRef}
              handleGetData={handleGetData}
              handleCheckValidate={handleCheckValidate}
            />
          </div>
        </>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default InfomationImportStore;
