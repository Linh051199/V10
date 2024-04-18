import { useI18n } from "@/i18n/useI18n";
import { MenuBarItem } from "@/types";
import { useAuth } from "@packages/contexts/auth";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { usePermissions } from "../contexts/permission";

export const useHeaderItems = () => {
  const { t } = useI18n("NavMenu");
  const {
    auth: { networkId },
  } = useAuth();
  const { hasMenuPermission } = usePermissions();
  const { pathname } = useLocation();

  const menuBarItems = useMemo<{
    mainItems: MenuBarItem[];
    extraItems: MenuBarItem[];
  }>(() => {
    let mainItems: MenuBarItem[] = [
      {
        text: t("Admin"),
        path: `/admin`,
        // permissionCode: "MNU_ADMIN",
        permissionCode: "",
      },
      {
        text: t("Report"),
        path: `/report`,
        // permissionCode: "MNU_ADMIN",
        permissionCode: "",
      },
      {
        text: t("Service"),
        path: `/service`,
        // permissionCode: "MNU_ADMIN",
        permissionCode: "",
      },
      {
        text: t("Storage"),
        path: `/storage`,
        // permissionCode: "MNU_ADMIN",
        permissionCode: "",
      },
      {
        text: t("CustomerCare"),
        path: `/customerCare`,
        // permissionCode: "MNU_ADMIN",
        permissionCode: "",
      },
    ].filter(
      (item) =>
        item.permissionCode === "" ||
        (item.permissionCode && hasMenuPermission(item.permissionCode))
    );
    let extraItems: MenuBarItem[] = [];
    if (mainItems.length > 7) {
      extraItems = mainItems.slice(7);
      mainItems = mainItems.slice(0, 7);
    }

    const selected = extraItems.find((item) =>
      pathname.startsWith(`/${networkId}${item.path}`)
    );

    // if selected item is extra item.
    if (!selected) {
      return {
        mainItems: mainItems.concat(extraItems.slice(0, 1)),
        extraItems: extraItems.slice(1),
      };
    } else {
      return {
        mainItems: mainItems.concat([selected]),
        extraItems: extraItems.filter((item) => item.path !== selected.path),
      };
    }
  }, [t, pathname]);

  // return { items: menuBarItems.mainItems, extraItems: menuBarItems.extraItems };
  return { items: menuBarItems.mainItems, extraItems: menuBarItems.mainItems };
};
