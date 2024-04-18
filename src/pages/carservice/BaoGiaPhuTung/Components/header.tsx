import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { PageHeaderNoSearchLayout } from "@/packages/layouts/page-header-layout-2/page-header-nosearch-layout";
import React from "react";

interface Button {
  title: string;
  action: Function;
}

const Header = () => {
  const { t } = useI18n("");

  const listButton = [
    {
      title: "Lưu",
      action: () => {},
    },
    {
      title: "Xóa báo giá",
      action: () => {},
    },
    {
      title: "In báo giá",
      action: () => {},
    },
    {
      title: "In phiếu bán",
      action: () => {},
    },
    {
      title: "Tạo phiếu xuất kho",
      action: () => {},
    },
    {
      title: "In phiếu ra cổng",
      action: () => {},
    },
  ];

  return (
    <PageHeaderNoSearchLayout>
      <PageHeaderNoSearchLayout.Slot name={"Before"}>
        <div className="font-bold dx-font-m">{t("Báo giá phụ tùng")}</div>
      </PageHeaderNoSearchLayout.Slot>
      <PageHeaderNoSearchLayout.Slot name={"After"}>
        {listButton.map((item: Button, index: number) => {
          return (
            <BButton
              key={index}
              stylingMode="contained"
              type="default"
              label={item.title}
              onClick={() => item.action()}
            ></BButton>
          );
        })}
      </PageHeaderNoSearchLayout.Slot>
    </PageHeaderNoSearchLayout>
  );
};

export default Header;
