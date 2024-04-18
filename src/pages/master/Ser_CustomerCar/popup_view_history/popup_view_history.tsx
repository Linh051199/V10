import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { Link } from "@/packages/components/link/link";
import { VisibilityControl, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { SearchForm } from "./search-form";
import { PopupViewHistoryDetail } from "./popup_view_history_detail";

interface IPopupViewHistoryProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
}

export const PopupViewHistory = forwardRef(
  (
    { visible, container, position, onHidding }: IPopupViewHistoryProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_ViewHistoryService");
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const showViewHistoryDetailPopup = useVisibilityControl({
      defaultVisible: false,
    });

    const showError = useSetAtom(showErrorAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const gridRef = useRef<any>(null);
    const viewHistoryDetailPopupRef = useRef<any>(null);
    const formRef = useRef<any>(null);
    const searchCondition = useRef<Partial<any>>({
      PartCode: "",
      VieName: "",
      FlagDataWH: false,
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    useImperativeHandle(popupRef, () => ({
      // getGridViewOneRef() {
      //   return ref;
      // },
      show() {
        showPopup.open();
      },
    }));

    //=======================handle=========================================
    const handleClose = () => {
      showPopup.close();
    };

    const handleExport = () => {};

    const handleViewDetail = (e: any) => {
      viewHistoryDetailPopupRef?.current.show();
    };

    const handleSearch = async () => {
      const dataSearch = formRef?.current?.props?.formData;
      gridRef?.current?.setData([
        {
          DealerCode: "1",
          Ro: "1",
          Dess: "1",
        },
        {
          DealerCode: "2",
          Ro: "2",
          Dess: "2",
        },
        {
          DealerCode: "3",
          Ro: "3",
          Dess: "3",
        },
      ]);
      // const respone = await api.Ser_MST_Part_SearchDL({
      //   PartID: dataSearch?.PartID ?? "",
      //   PartCode: dataSearch?.PartCode ?? "",
      //   EngName: dataSearch?.EngName ?? "",
      //   VieName: dataSearch?.VieName ?? "",
      //   CusTypeID: dataSearch?.CusTypeID ?? "",
      //   FreqUsed: dataSearch?.FreqUsed ?? "",
      //   IsActive: dataSearch?.IsActive ?? "",
      //   PartGroupID: dataSearch?.PartGroupID ?? "",
      //   Ft_PageIndex: 0,
      //   Ft_PageSize: 100,
      // });
      // if (respone.isSuccess) {
      //   gridRef?.current?.setData(respone?.DataList);
      // } else {
      //   showError({
      //     message: t(respone._strErrCode),
      //     _strErrCode: respone._strErrCode,
      //     _strTId: respone._strTId,
      //     _strAppTId: respone._strAppTId,
      //     _objTTime: respone._objTTime,
      //     _strType: respone._strType,
      //     _dicDebug: respone._dicDebug,
      //     _dicExcs: respone._dicExcs,
      //   });
      // }
    };

    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            formRef={formRef}
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
          />
        );
      },
      [searchCondition.current]
    );

    const fetchData = async () => {
      return [
        {
          DealerCode: "1",
          Ro: "1",
          Dess: "1",
        },
        {
          DealerCode: "2",
          Ro: "2",
          Dess: "2",
        },
        {
          DealerCode: "3",
          Ro: "3",
          Dess: "3",
        },
      ];
    };
    //=======================handle-end=========================================

    //=============================columns===================================
    const columns: ColumnOptions[] = [
      {
        dataField: "STT",
        caption: t("STT"),
        visible: true,
        alignment: "center",
        width: 90,
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "DealerCode",
        caption: t("DealerCode"),
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
                handleViewDetail(e?.data);
              }}
            />
          );
        },
      },
      {
        dataField: "Ro",
        caption: t("Ro"),
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
                handleViewDetail(e?.data);
              }}
            />
          );
        },
      },
      {
        dataField: "Dess",
        caption: t("Dess"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Unit",
        caption: t("Unit"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Price",
        caption: t("Price"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "VAT",
        caption: t("VAT"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Model",
        caption: t("Model"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "InStockQuantity",
        caption: t("InStockQuantity"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ];
    return (
      <Popup
        visible={showPopup.visible}
        title={t("ViewHistoryService")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 200}
        width={windowSize.width - 100}
      >
        <WithSearchPanelLayout
          searchPanelRender={renderSearchForm}
          contentPanelRender={(control: VisibilityControl) => (
            <div className={"flex h-full justify-center"}>
              <div className="search-results  h-full">
                {/* <LoadPanel
                  visible={isLoading}
                  showIndicator={true}
                  showPane={true}
                /> */}
                <ScrollView className={" h-full"} showScrollbar={"always"}>
                  <GridViewOne
                    ref={gridRef}
                    fetchData={fetchData}
                    keyExpr={"PartCode"}
                    customHeight={windowSize.height - 270}
                    isLoading={false}
                    allowMultiRowDelete={false}
                    dataSource={[]}
                    editMode={false}
                    defaultPageSize={999}
                    columns={columns}
                    isHidenHeaderFilter
                    isHiddenCheckBox
                    storeKey={"Ser_CustomerCar_ViewHistoryService"}
                    allowSelection={false}
                  />
                </ScrollView>
              </div>
            </div>
          )}
        ></WithSearchPanelLayout>

        <PopupViewHistoryDetail
          ref={viewHistoryDetailPopupRef}
          visible={showViewHistoryDetailPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showViewHistoryDetailPopup.close();
          }}
        />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("ExportExcel"),
            type: "default",
            stylingMode: "contained",
            onClick: handleExport,
          }}
        />
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
