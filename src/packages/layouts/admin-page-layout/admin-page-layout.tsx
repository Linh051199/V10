import { protectedRoutes } from "@/app-routes";
import { useScreenSize } from "@/utils/media-query";
import { useMenuPatch } from "@/utils/patches";
import { useNetworkNavigate } from "@packages/hooks";
import { useHeaderItems } from "@packages/hooks/useHeaderItems";
import { Sidebar } from "@packages/ui/sidebar";
import Drawer from "devextreme-react/drawer";
import ScrollView from "devextreme-react/scroll-view";
import { ItemClickEvent } from "devextreme/ui/tree_view";
import { useCallback, useMemo, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useI18n } from "@/i18n/useI18n";
import { usePermissions } from "@/packages/contexts/permission";
import { permissionAtom } from "@/packages/store/permission-store";
import PageNotData from "@/packages/ui/PageError/PageNotData";
import { MenuBarItem, SidebarItem } from "@/types";
import { sidebarAtom } from "@packages/store";
import { Header } from "@packages/ui/header";
import { Icon } from "@packages/ui/icons";
import { useAtomValue, useSetAtom } from "jotai";
import "./admin-page-layout.scss";

export const AdminPageLayout = () => {
  const { t } = useI18n("Common");
  const { items, extraItems } = useHeaderItems();
  const navigate = useNetworkNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const location = useLocation();
  const isSidebarOpen = useAtomValue(sidebarAtom);
  const setSidebarOpen = useSetAtom(sidebarAtom);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const { hasMenuPermission } = usePermissions();
  const mainKey = location.pathname.split("/")[2];
  const permissionStore = useAtomValue(permissionAtom);
  const sidebarItems = useMemo(() => {
    const mainKey = location.pathname.split("/")[2];

    return protectedRoutes
      .filter(
        (route) =>
          route.key !== route.mainMenuKey &&
          route.mainMenuKey === mainKey &&
          !!route.subMenuTitle
      )
      .filter(
        (route) =>
          route.permissionCode === "" ||
          (route.permissionCode && hasMenuPermission(route.permissionCode))
      )
      .map(
        (route) =>
          ({
            subMenuTitle: route.subMenuTitle,
            path: route.path,
            key: route.key,
            items: route.items
              ?.filter((route) => !!route.subMenuTitle)
              .filter((r) =>
                r.isHQ ? r.isHQ === permissionStore.sysUser?.BizUserType : true
              )
              .filter(
                (route) =>
                  route.permissionCode === "" ||
                  (route.permissionCode &&
                    hasMenuPermission(route.permissionCode))
              )
              .map((item) => ({
                ...item,
                text: item.subMenuTitle,
              })),
          } as SidebarItem)
      );
  }, [location]);

  const onNavigationChanged = useCallback(
    ({ itemData, event, node }: ItemClickEvent) => {
      if (!itemData?.path || node?.selected) {
        event?.preventDefault();
        return;
      }
      navigate(itemData.path);
      scrollViewRef.current?.instance.scrollTo(0);
    },
    [navigate, isLarge]
  );

  const temporaryOpenMenu = useCallback(() => {}, []);
  const navigateItem = useCallback((item: MenuBarItem) => {
    navigate(item.path);
    openSidebar();
  }, []);

  // memo to avoid re-rendering header
  const header = useMemo(() => {
    return (
      <Header
        logo={true}
        menuToggleEnabled={false}
        title={t("DMS")}
        items={items}
        extraItems={extraItems}
        onMenuItemClick={navigateItem}
      />
    );
  }, [t, navigateItem, items]);

  const sidebarElement = useMemo(() => {
    return (
      <Sidebar
        compactMode={!isSidebarOpen}
        selectedItemChanged={onNavigationChanged}
        openMenu={temporaryOpenMenu}
        onMenuReady={onMenuReady}
        items={sidebarItems}
      >
        <div className={"dms-sidebar__toolbar"}>
          <div className="py-[10px]">
            <Icon
              className={"cursor-pointer"}
              name={"menu"}
              width={12}
              height={12}
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </Sidebar>
    );
  }, [sidebarItems, toggleSidebar]);

  return (
    <>
      <div className={"dms w-full h-full bg-white"}>
        {header}
        {sidebarItems.length === 0 ? (
          <>{mainKey !== undefined ? <PageNotData text={"No Data"} /> : null}</>
        ) : (
          <Drawer
            className={[
              "main-sidebar",
              "drawer",
              patchCssClass,
              sidebarItems.length === 0 ? "no-sidebar" : "",
            ].join(" ")}
            position={"before"}
            openedStateMode={isLarge ? "shrink" : "overlap"}
            revealMode={isXSmall ? "slide" : "expand"}
            minSize={0}
            maxSize={sidebarItems.length > 0 ? 250 : 0}
            shading={false}
            opened={sidebarItems.length > 0 ? isSidebarOpen : false}
            template={"menu"}
            render={() => {
              return sidebarItems.length > 0 ? sidebarElement : null;
            }}
          >
            <div className={"w-full h-full"}>
              <Outlet />
            </div>
            {/* <Template name={"menu"}>{sidebarElement}</Template> */}
          </Drawer>
        )}
      </div>
    </>
  );
};
