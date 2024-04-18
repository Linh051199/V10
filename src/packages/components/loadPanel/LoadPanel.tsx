import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { LoadPanel } from "devextreme-react";
import { useAtomValue } from "jotai";
import React from "react";

export default function LoadPanelConfig() {
  const loadPanel = useAtomValue(loadPanelAtom);

  return (
    <>
      <LoadPanel
        visible={loadPanel}
        shading={true}
        shadingColor="5px 5px 10px 2px rgba(229, 229, 229, 0.8)"
      />
    </>
  );
}
