import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import React, { useRef } from "react";
import Header from "./Components/header";
import GridPT from "./Components/grid";
import FormPT from "./Components/form";
import Service from "./Components/service";
import "./style.scss";
const BaoGiaPhuTung = () => {
  const formRef = useRef(null);
  const gridRef = useRef(null);

  return (
    <AdminContentLayout className="">
      <AdminContentLayout.Slot name={"Header"}>
        <Header />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <div className="pl-2 pr-2">
          <FormPT ref={formRef} />
          <GridPT ref={gridRef} />
          <Service />
        </div>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default BaoGiaPhuTung;
