import { useI18n } from '@/i18n/useI18n';
import { WithSearchPanelLayout } from '@/packages/components/layout/layout-with-search-panel';
import { VisibilityControl, useVisibilityControl } from '@/packages/hooks';
import { GridViewOne } from '@/packages/ui/base-gridview/gridview-one';
import { Icon } from '@/packages/ui/icons';
import { Button, Popup } from 'devextreme-react';
import { Position, ToolbarItem } from 'devextreme-react/data-grid';
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { FormInput } from './header-form-edit';

interface SearchCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  dataRef?: any;
  onSelectedCars: any
}

export const CapNhatTinhTrangLienHe = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      dataRef,
      onSelectedCars,
    }: SearchCarProps,
    ref: any
  ) => {
    const { t } = useI18n("CapNhatTinhTrangLienHe");
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });
    const gridRef = useRef<any>(null);
    useImperativeHandle(ref, () => ({
      getGridRef() {
        return gridRef;
      },
      openSearchCar() {
        // set Trạng thái mở của popup
        showSelectCarPopup.open();
      },
      closeSearchCar() {
        // set Trạng thái đóng của popup
        showSelectCarPopup.close();
      },
    }));
    // const handleOpen = () => {
    //   refSearchCar.current.openSearchCar();
    // };
    const formRef = useRef(null)
    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("Popup cập nhật tình trạng liên hệ")}
        container={container}
        showCloseButton={true}
        onHiding={() => {
          showSelectCarPopup.close();
        }}
        wrapperAttr={{
          class: "search-car-popup",
        }}
      >
        <Position
          at={`${position} top`}
          my={`${position} top`}
          of={`${container}`}
          offset={{ x: 150, y: 100 }}
        />

        <FormInput ref={formRef} />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Select"),
            type: "default",
            stylingMode: "contained",
            onClick: () => {

            },
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: onHidding,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    )
  }
)

export default CapNhatTinhTrangLienHe
