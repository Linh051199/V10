import { useI18n } from "@/i18n/useI18n";
import { Button } from "devextreme-react";
import { Icon } from "@packages/ui/icons";
import { Tooltip } from "devextreme-react/tooltip";

interface HeaderProps {
  onToggleSettings?: () => void;
  onCollapse?: () => void;
  enableColumnToggler?: boolean;
  className?: string;
}

export const Header = ({
  className,
  onCollapse,
  onToggleSettings,
  enableColumnToggler = true,
}: HeaderProps) => {
  const { t } = useI18n("Common");
  return (
    <div className={`flex ${className} flex-row p-1 items-center`}>
      <div className={"mr-auto flex items-center text-[#00703C]"}>
        <Icon name={"search"} width={14} height={14} />
        <span className={"search-form__title"}>{t("Search")}</span>
      </div>
      <div className={"flex flex-end ml-auto"}>
        {enableColumnToggler && (
          <div
            id={"search-form__settings"}
            className={"search-form__settings cursor-pointer"}
            onClick={onToggleSettings}
          >
            <Icon name={"setting"} width={14} height={14} />
            <Tooltip
              target="#search-form__settings"
              showEvent="dxhoverstart"
              hideEvent="dxhoverend"
              container={"#searchForm"}
            >
              {/*&nbsp; is required to make it display at top level*/}
              <div className={"z-[9999]"} style={{ zIndex: 9999 }}>
                {t("ColumnToggleTooltip")}
              </div>
              &nbsp;
            </Tooltip>
          </div>
        )}
        <div
          className={"search-form__settings cursor-pointer"}
          onClick={onCollapse}
        >
          <Icon name={"collapseLeft"} width={14} height={14} />
        </div>
      </div>
    </div>
  );
};
