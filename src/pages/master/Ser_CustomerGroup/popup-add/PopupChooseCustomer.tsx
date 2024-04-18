import { useI18n } from "@/i18n/useI18n";
import { Link } from "@/packages/components/link/link";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";

interface IPopupAddNewProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  onChoose: (data: any) => void;
  onSelect: (data: any) => void;
}

export const PopupChooseCustomer = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      onChoose,
      onSelect,
    }: IPopupAddNewProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerGroup_AddNew_PopupChooseCustomer");
    const windowSize = useWindowSize();

    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });

    const gridRef = useRef<any>(null);

    useImperativeHandle(popupRef, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
      show() {
        showUploadPopup.open();
      },
      close() {
        showUploadPopup.close();
      },
    }));

    //=============================handle===================================
    const handleClose = () => {
      showUploadPopup.close();
    };
    const handleSelect = () => {
      const items = gridRef.current?.getSelectedRowsData();
      if (items.length === 0) {
        toast.warning(t("Please select items!!!"));
      } else {
        onSelect(items);
        handleClose();
      }
    };
    //=============================handle-end===================================

    //=============================columns===================================
    const columns: ColumnOptions[] = [
      {
        dataField: "STT",
        caption: t("STT"),
        visible: true,
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "PlateNo",
        caption: t("PlateNo"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                onChoose(e?.data);
              }}
            />
          );
        },
      },
      {
        dataField: "CusName",
        caption: t("CusName"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                onChoose(e?.data);
              }}
            />
          );
        },
      },
      {
        dataField: "TradeMarkCode",
        caption: t("TradeMarkCode"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Tel",
        caption: t("Tel"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Address",
        caption: t("Address"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "FrameNo",
        caption: t("FrameNo"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ColorCode",
        caption: t("ColorCode"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ];

    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("Search Customer")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 200}
        width={windowSize.width - 150}
      >
        {/* <LoadPanel
            container={".dx-viewport"}
            shadingColor="rgba(0,0,0,0.4)"
            position={"center"}
            visible={isGetDataProvince}
            showIndicator={true}
            showPane={true}
          /> */}
        <div className="h-full">
          <ScrollView className={" h-full"} showScrollbar={"always"}>
            <GridViewOne
              ref={gridRef}
              keyExpr={"CusID"}
              customHeight={windowSize.height - 350}
              defaultPageSize={999}
              isLoading={false}
              isHiddenCheckBox
              allowMultiRowDelete={false}
              dataSource={[]}
              //   editMode={true}
              //   editingOptions={{
              //     mode: "row",
              //     allowDeleting: false,
              //   }}
              columns={columns}
              isHidenHeaderFilter
              storeKey={"Ser_CustomerGroup_AddNew_PopupChooseCustomer"}
              allowSelection={false}
            />
          </ScrollView>
        </div>

        {/* <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Select"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSelect,
          }}
        /> */}

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
