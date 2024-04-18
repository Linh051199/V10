import React from "react";
import { Icon } from "../icons";
import { useI18n } from "@/i18n/useI18n";

export default function PageNotData({ text }: any) {
  const { t } = useI18n("Common");
  return (
    <div className="flex justify-center pt-[13%]">
      <div className="flex items-center gap-2">
        <Icon name="WarningIcon" size={30} />
        <div className="text-[18px] font-normal text-[#5F7D95]">
          {t(text ? text : "No data")}
        </div>
      </div>
    </div>
  );
}
