import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LoadPanel, Popup, ScrollView } from "devextreme-react";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export const PopupShowSysObject = forwardRef(({}, ref: any) => {
  const [open, setOpen] = useState(false);
  const setLoad = useSetAtom(loadPanelAtom);
  const gridRef1 = useRef<any>(null);
  const gridRef2 = useRef<any>(null);
  const [dataColumns, setDataColumns] = useState<any>({});
  const api = useClientgateApi();
  const { t } = useI18n("PopupShowSysObject");
  const showError = useSetAtom(showErrorAtom);

  useImperativeHandle(ref, () => ({
    setShowPopup: async (data: any) => {
      setLoad(true);
      setDataColumns(data);
      setTimeout(() => {
        setOpen(true);
        setLoad(false);
      }, 500);
    },
  }));

  const { data: GetMapSysUserSysObject, isLoading: isLoadingSysObject } =
    useQuery({
      queryKey: ["GetMapSysUserSysObjectByUserCodeDL", dataColumns],
      queryFn: async () => {
        const response = await api.Mst_User_GetMapSysUserSysObjectByUserCodeDL(
          dataColumns.UserCode
        );
        if (response.isSuccess) {
          gridRef1.current.setData(response.DataList);
          setLoad(false);
          return response.DataList;
        } else {
          setLoad(false);
          showError({
            message: t(response._strErrCode),
            _strErrCode: response._strErrCode,
            _strTId: response._strTId,
            _strAppTId: response._strAppTId,
            _objTTime: response._objTTime,
            _strType: response._strType,
            _dicDebug: response._dicDebug,
            _dicExcs: response._dicExcs,
          });
        }
      },
    });
  const { data: GetMapSysGroupSysUser, isLoading: isLoadingSysGroup } =
    useQuery({
      queryKey: ["GetMapSysGroupSysUserByUserCodeDL", dataColumns],
      queryFn: async () => {
        const response = await api.Mst_User_GetMapSysGroupSysUserByUserCodeDL(
          dataColumns.UserCode
        );

        if (response.isSuccess) {
          gridRef2.current.setData(response.DataList);
          setLoad(false);
          return response.DataList;
        } else {
          setLoad(false);
          showError({
            message: t(response._strErrCode),
            _strErrCode: response._strErrCode,
            _strTId: response._strTId,
            _strAppTId: response._strAppTId,
            _objTTime: response._objTTime,
            _strType: response._strType,
            _dicDebug: response._dicDebug,
            _dicExcs: response._dicExcs,
          });
        }
      },
    });

  const onHidding = () => {
    setOpen(false);
    setLoad(false);
  };

  const columns1: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      alignment: "center",
      editorType: "dxTextBox",
      width: 100,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
      },
      cellRender: (e) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "ObjectCode",
      caption: t("ObjectCode"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ObjectType",
      caption: t("ObjectType"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "ObjectName",
      caption: t("ObjectName"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "PartnerCode",
      caption: t("PartnerCode"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      alignment: "center",
      dataField: "SOFlagActive",
      caption: t("SOFlagActive"),
      editorType: "dxSwitch",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      cellRender: ({ data }: any) => {
        return (
          <StatusButton
            key={nanoid()}
            isActive={data.SOFlagActive === "1" ? true : false}
          />
        );
      },
    },
  ];
  const columns2: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      alignment: "center",
      editorType: "dxTextBox",
      width: 100,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
      },
      cellRender: (e) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "GroupCode",
      caption: t("GroupCode"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
      },
    },
    {
      dataField: "GroupName",
      caption: t("GroupName"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      alignment: "center",
      dataField: "SUFlagActive",
      caption: t("SUFlagActive"),
      editorType: "dxSwitch",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      cellRender: ({ data }: any) => {
        return (
          <StatusButton
            key={nanoid()}
            isActive={data.SUFlagActive === "1" ? true : false}
          />
        );
      },
    },
  ];
  const subGridToolbars1: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold"}>{t("SysUserSysObject")}</div>;
      },
    },
  ];
  const subGridToolbars2: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <div className={"font-bold"}>{t("SysUserSysGroup")}</div>;
      },
    },
  ];
  return (
    <Popup
      visible={open}
      title={t("Detail function")}
      container={".dx-viewport"}
      showCloseButton={true}
      onHiding={onHidding}
      wrapperAttr={{
        class: "search-car-popup popup-fill",
      }}
      shading={false}
      shadingColor="transparent"
      hideOnOutsideClick={true}
    >
      <div className="mb-5">
        <GridViewOne
          toolbarItems={subGridToolbars1}
          customHeight={400}
          ref={gridRef1}
          defaultPageSize={999999999999999}
          dataSource={GetMapSysUserSysObject ?? []} // cars
          columns={columns1}
          isHidenHeaderFilter
          // fetchData={fetchData}
          autoFetchData={true}
          allowSelection={false}
          isLoading={false}
          customToolbarItems={[]}
          editMode={false}
          isHiddenCheckBox
          keyExpr="ObjectCode"
          storeKey={"Mst_UserManager-SysUserSysObject-columns"}
        />
        <GridViewOne
          isHiddenCheckBox
          toolbarItems={subGridToolbars2}
          customHeight={400}
          ref={gridRef2}
          defaultPageSize={999999999999999}
          dataSource={GetMapSysGroupSysUser ?? []} // cars
          columns={columns2}
          // fetchData={fetchData}
          autoFetchData={true}
          allowSelection={false}
          isHidenHeaderFilter
          isLoading={false}
          customToolbarItems={[]}
          editMode={false}
          keyExpr="GroupCode"
          storeKey={"Mst_UserManager-SysUserSysGroup-columns"}
        />
      </div>

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
  );
});
