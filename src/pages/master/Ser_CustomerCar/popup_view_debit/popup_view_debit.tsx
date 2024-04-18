import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { Form, Popup, ScrollView } from "devextreme-react";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { FormPay } from "./form-pay";

interface IPopupViewDebitProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
}

export const PopupViewDebit = forwardRef(
  (
    { visible, container, position, onHidding }: IPopupViewDebitProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_AddNew_ViewDebit");
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const showPopup = useVisibilityControl({ defaultVisible: visible });

    const formDetailRef = useRef<any>(null);
    const grid1Ref = useRef<any>(null);
    const grid2Ref = useRef<any>(null);
    const formPayRef = useRef<Form>();

    const showError = useSetAtom(showErrorAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const [formDetailData, setFormDetailData] = useState({});
    const [formData, setformData] = useState({});

    useImperativeHandle(popupRef, () => ({
      // getGridViewOneRef() {
      //   return ref;
      // },
      show() {
        showPopup.open();
      },
    }));
    //===========================callAPI=====================================
    //===========================callAPI-end=====================================

    //===========================handle=====================================
    const handleClose = () => {
      showPopup.close();
    };
    const handleSave = () => {};

    //===========================handle-end=====================================

    //===========================columns1=====================================\
    const columns1: ColumnOptions[] = [
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
      },
      {
        dataField: "Ro",
        caption: t("Ro"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
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
    ];
    //===========================columns1-end=====================================

    //===========================columns2=====================================
    const columns2: ColumnOptions[] = [
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
      },
      {
        dataField: "Ro",
        caption: t("Ro"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
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
    ];
    //===========================columns2-end=====================================

    //===========================SubgridToolBar=====================================
    const subGridToolbars1: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <span>{t("Nợ")}</span>;
        },
      },
    ];
    const subGridToolbars2: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <span>{t("Thu")}</span>;
        },
      },
    ];
    //===========================SubgridToolBar-end=====================================
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
        <ScrollView className={" h-full"} showScrollbar={"always"}>
          <Form
            ref={formDetailRef}
            id="Popup_UpdateCar_CarInfo"
            formData={formDetailData}
            labelLocation={"top"}
            validationGroup="Popup_UpdateCar_CarInfo"
          >
            <GroupItem colCount={1} caption={t("Thông tin khách hàng")}>
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
                      width={"50%"}
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
                      width={"50%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      readOnly
                    />
                  );
                }}
              ></SimpleItem>
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
            columns={columns1}
            isHiddenCheckBox
            isHidenHeaderFilter
            storeKey={"Ser_CustomerCar_AddNew_ViewDebit1"}
            allowSelection={false}
          >
            <Summary>
              <TotalItem
                column={"Price"}
                summaryType={"sum"}
                displayFormat={`${t("Sum")} : {0}`}
                valueFormat="#,##0.##"
              ></TotalItem>
            </Summary>
          </GridViewOne>
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
            columns={columns2}
            isHiddenCheckBox
            isHidenHeaderFilter
            storeKey={"Ser_CustomerCar_AddNew_ViewDebit2"}
            allowSelection={false}
          >
            <Summary>
              <TotalItem
                column={"Unit"}
                summaryType={"sum"}
                displayFormat={`${t("Sum")} : {0}`}
                valueFormat="#,##0.##"
              ></TotalItem>
            </Summary>
          </GridViewOne>
          <div className={"separator"} />
          <FormPay ref={formPayRef} formData={formData} />
        </ScrollView>
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Save"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSave,
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
