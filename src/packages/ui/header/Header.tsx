import React, { useMemo } from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import { UserPanel } from "@packages/ui/user-panel";
import { Template } from "devextreme-react/core/template";
import { MenuBar } from "../menu-bar";

import "./Header.scss";
import { HeaderProps } from "@/types";
import { Icon } from "@packages/ui/icons";

export function Header({
  menuToggleEnabled,
  title,
  toggleMenu,
  extraItems,
  items,
  logo,
  onMenuItemClick,
}: HeaderProps) {
  const menubar = useMemo(() => {
    return (
      <MenuBar
        items={items ?? []}
        extraItems={extraItems ?? []}
        onClick={onMenuItemClick}
      />
    );
  }, [items]);
  return (
    <header className={"header-component"}>
      <Toolbar className={"header-toolbar"}>
        <Item
          visible={menuToggleEnabled}
          location={"before"}
          widget={"dxButton"}
          cssClass={"menu-button"}
        >
          <Button stylingMode="text" onClick={toggleMenu}>
            <Icon name={"menu"} width={12} height={12} />
          </Button>
        </Item>
        <Item location={"before"} cssClass={"header-logo"} visible={logo}>
          <i className={"dx-icon system-logo"} />
        </Item>
        <Item
          location={"before"}
          cssClass={"header-title text-2xl font-extrabold ml-[50px]"}
          text={title}
          visible={!!title}
        />
        {!!items && (
          <Item location={"before"} cssClass="header-menu-bar">
            {menubar}
          </Item>
        )}
        <Item
          location={"after"}
          locateInMenu={"auto"}
          menuItemTemplate={"userPanelTemplate"}
        >
          <Button
            className={"user-button authorization"}
            width={40}
            height={"100%"}
            stylingMode={"text"}
          >
            <UserPanel menuMode={"context"} />
          </Button>
        </Item>
        <Template name={"userPanelTemplate"}>
          <UserPanel menuMode={"list"} />
        </Template>
      </Toolbar>
    </header>
  );
}
