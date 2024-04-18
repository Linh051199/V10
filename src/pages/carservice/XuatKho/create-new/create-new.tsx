import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { Button } from "devextreme-react";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderFormEdit } from "./header-form-edit/header-form-edit";
import { BButton } from "@/packages/components/buttons";

export const ExportWarehouseCreateNew = () => {
  const { t } = useI18n("ExportWarehouse");
  const formRef: any = useRef();

  const handleSave = () => {
    toast.info("handleSave");
  };

  const handleSaveAndCreateNew = () => {
    toast.info("handleSaveAndCreateNew");
  };

  return (
    <AdminContentLayout className={"donhang"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex items-center justify-between w-full h-[55px] pl-2">
          <div className="flex">
            <div className="page-title pr-[5px]">{"Nhập Kho"}</div>
            <div className="page-title pr-[5px]">{">"}</div>
            <div className="pr-[5px]">{"Tạo mới"}</div>
          </div>
          <div className=" ">
            <BButton
              className="w-[100px] ml-2"
              text={"Save"}
              onClick={handleSave}
              stylingMode="contained"
            />
            <BButton
              className="ml-2"
              text={t("Save & CreateNew")}
              onClick={handleSaveAndCreateNew}
              stylingMode="contained"
            />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <>
          <HeaderFormEdit ref={formRef} />
          <div className="separate mt-1 mb-1"></div>
          <div className="mr-[10px] ml-[10px]">
            {/* <TabImportStore
              ref={tabRef}
              handleGetData={handleGetData}
              handleCheckValidate={handleCheckValidate}
            /> */}
          </div>
        </>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
