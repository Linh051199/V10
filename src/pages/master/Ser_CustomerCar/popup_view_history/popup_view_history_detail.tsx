import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { Link } from "@/packages/components/link/link";
import { VisibilityControl, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { Form, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SearchForm } from "./search-form";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { TextField } from "@/packages/components/text-field";

interface IPopupViewHistoryDetailProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
}

export const PopupViewHistoryDetail = forwardRef(
  (
    { visible, container, position, onHidding }: IPopupViewHistoryDetailProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_ViewHistoryDetailService");
    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const grid1Ref = useRef<any>(null);
    const grid2Ref = useRef<any>(null);
    const formRef = useRef<any>(null);
    const formDetailRef = useRef<any>(null);
    const searchCondition = useRef<Partial<any>>({
      PartCode: "",
      VieName: "",
      FlagDataWH: false,
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });
    const [formDetailData, setFormDetailData] = useState({});

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

    const handleViewDetail = (e: any) => {};

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
    //=============================columns-end===================================

    const subGridToolbars1: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return (
            <span>
              {t(
                `Phần công lao động (${
                  grid1Ref?.current?.getVisibleData()?.length
                })`
              )}
            </span>
          );
        },
      },
    ];
    const subGridToolbars2: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return (
            <span>
              {t(
                `Phần phụ tùng/ dầu mỡ vật tư (${
                  grid1Ref?.current?.getVisibleData()?.length
                })`
              )}
            </span>
          );
        },
      },
    ];

    return (
      <Popup
        visible={showPopup.visible}
        title={t("ViewHistoryServiceDetail")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 100}
        width={windowSize.width - 150}
      >
        <ScrollView className={" h-full"} showScrollbar={"always"}>
          <Form
            ref={formDetailRef}
            id="Popup_UpdateCar_CarInfo"
            formData={formDetailData}
            labelLocation={"top"}
            validationGroup="Popup_UpdateCar_CarInfo"
          >
            <GroupItem colCount={3}>
              <GroupItem colCount={1} caption={t("Thông tin xe")}>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
              </GroupItem>
              <GroupItem colCount={1} caption={t("Thông tin sửa chữa")}>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
              </GroupItem>
              <GroupItem colCount={1} caption={t("Yêu cầu khách hàng")}>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PlateNo"),
                  }}
                  dataField={"PlateNo"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
              </GroupItem>
            </GroupItem>
          </Form>
          <div className={"separator"} />

          <GridViewOne
            ref={grid1Ref}
            toolbarItems={subGridToolbars1}
            keyExpr={"PartCode"}
            customHeight={windowSize.height - 400}
            isLoading={false}
            allowMultiRowDelete={false}
            dataSource={[]}
            editMode={false}
            defaultPageSize={999}
            columns={columns}
            isHiddenCheckBox
            isHidenHeaderFilter
            storeKey={"Ser_CustomerCar_ViewHistoryDetailService1"}
            allowSelection={false}
          />
          <div className={"separator"} />

          <GridViewOne
            ref={grid2Ref}
            toolbarItems={subGridToolbars2}
            keyExpr={"PartCode"}
            customHeight={windowSize.height - 400}
            isLoading={false}
            allowMultiRowDelete={false}
            dataSource={[]}
            editMode={false}
            defaultPageSize={999}
            columns={columns}
            isHiddenCheckBox
            isHidenHeaderFilter
            storeKey={"Ser_CustomerCar_ViewHistoryDetailService2"}
            allowSelection={false}
          />
        </ScrollView>
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
