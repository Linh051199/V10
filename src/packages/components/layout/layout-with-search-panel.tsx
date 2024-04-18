import React, { PropsWithChildren, ReactNode } from "react";
import Drawer from "devextreme-react/drawer";
import { useVisibilityControl, VisibilityControl } from "@packages/hooks";
import ScrollView from "devextreme-react/scroll-view";
import "src/packages/components/layout/layout-with-search-panel.scss";
import { useWindowSize } from "@packages/hooks/useWindowSize";
interface WithSearchPanelLayoutProps {
  searchPanelRender: (control: VisibilityControl) => ReactNode;
  contentPanelRender: (control: VisibilityControl) => ReactNode;
}

export const WithSearchPanelLayout = ({
  searchPanelRender,
  contentPanelRender,
}: PropsWithChildren<WithSearchPanelLayoutProps>) => {
  const searchPanelVisible = useVisibilityControl({ defaultVisible: true });

  const windowSize = useWindowSize();
  return (
    <div className={"h-full layout-with-search-panel"}>
      <Drawer
        opened={searchPanelVisible.visible}
        openedStateMode={"shrink"}
        position="left"
        revealMode={"slide"}
        height={"100%"}
        render={() => <>{searchPanelRender(searchPanelVisible)}</>}
      >
        <div className="h-full">{contentPanelRender(searchPanelVisible)}</div>
      </Drawer>
    </div>
  );
};
