import { useScreenSize } from "@/utils/media-query";
import TreeView from "devextreme-react/tree-view";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import "./sidebar.scss";

import { useI18n } from "@/i18n/useI18n";
import { useAuth } from "@packages/contexts/auth";
import ScrollView from "devextreme-react/scroll-view";
import * as events from "devextreme/events";
import dxTreeView, { ItemClickEvent } from "devextreme/ui/tree_view";
import { useLocation } from "react-router-dom";

export interface SidebarProps {
  selectedItemChanged: (e: ItemClickEvent) => void;
  openMenu: (e: React.PointerEvent) => void;
  compactMode: boolean;
  onMenuReady: (e: events.EventInfo<dxTreeView>) => void;
  items: any[];
}
export function Sidebar(props: React.PropsWithChildren<SidebarProps>) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady,
    items,
  } = props;

  const {
    auth: { networkId },
  } = useAuth();
  const { t } = useI18n("SideMenu");
  const { pathname: currentPath } = useLocation();

  const scrollRef = useRef();

  const { isLarge } = useScreenSize();
  function normalizePath() {
    return items
      .filter((item) => !item.isHidden)
      .map((item) => ({
        ...item,
        text: t(item.subMenuTitle),
        expanded: isLarge,
        path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
        // path: `/${item.path}`,
        items: item.items
          ?.filter((subItem: any) => !subItem.isHidden)
          .map((subItem: any) => ({
            ...subItem,
            text: t(subItem.text),
            path: subItem.subMenuTitle
              ? `${item.path}/${subItem.path}`
              : `/${subItem.path}`,
          })),
      }));
  }
  const treeItems = useMemo(
    normalizePath,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  const treeViewRef = useRef<TreeView>(null);
  const wrapperRef = useRef<HTMLDivElement>();
  const getWrapperRef = useCallback(
    (element: HTMLDivElement) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e: React.PointerEvent) => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }
    if (currentPath !== undefined) {
      treeView.expandAll();
      const cleanedPath = currentPath.replace(`/${networkId}`, "");
      treeView.selectItem(cleanedPath);
      // treeView.expandItem(cleanedPath);
    }
    var selectedParents = treeView.getSelectedNodes().map(function (node) {
      return node.parent;
    });

    var selectedParent =
      selectedParents.length > 0 ? selectedParents[0]?.itemData : null;

    customerTreeItems.forEach((item) => {
      if (selectedParent && item.key == selectedParent.key)
        treeView.expandItem(item);
      else treeView.collapseItem(item);
    });

    // const cleanedPath = currentPath.replace(`/${networkId}/`, "");

    // const f = items.findIndex((item) => item.path == cleanedPath) + 1;

    // const sideMenuScroll = document.querySelector(".sidemenuscroll");
    // const scrollHeight = sideMenuScroll?.getElementsByClassName(
    //   "dx-scrollable-scroll"
    // );

    // const heightOfMenu = sideMenuScroll?.clientHeight;

    // const heightOfScrollbar = scrollHeight[1]?.clientHeight;

    // const calc = f * 39;

    // console.log(heightOfMenu, heightOfScrollbar, calc);

    // if (calc <= heightOfScrollbar) {
    // } else {
    //   scrollRef.current.instance.scrollTo(20 * (calc / heightOfScrollbar));
    // }

    // scrollRef.current.instance.scrollBy(39 * f);
  }, [currentPath, compactMode, items]);

  // console.log(scrollRef.current?.instance?.scrollHeight());

  const customerTreeItems = treeItems.map((item) => {
    if (item.children) {
      return {
        ...item,
        text: t(item.text),
        children: item.children.map((subItem: any) => {
          return {
            ...subItem,
            text: t(subItem.text),
            subMenuTitle: t(subItem.subMenuTitle),
          };
        }),
      };
    }
    return {
      ...item,
      text: t(item.text),
    };
  });

  return (
    <div
      className={"dx-swatch-additional  side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      <div className={"menu-container"}>
        <ScrollView
          className={"pb-4 sidemenuscroll"}
          showScrollbar={"always"}
          ref={scrollRef}
        >
          <TreeView
            width={245}
            className={"pl-2 pb-4 mb-6 menu-list"}
            visible={!compactMode}
            ref={treeViewRef}
            items={customerTreeItems}
            keyExpr={"path"}
            displayExpr={"text"}
            selectionMode={"single"}
            focusStateEnabled={false}
            expandEvent={"click"}
            onItemClick={selectedItemChanged}
            onContentReady={onMenuReady}
            id="treeview"
          />
        </ScrollView>
      </div>
    </div>
  );
}
