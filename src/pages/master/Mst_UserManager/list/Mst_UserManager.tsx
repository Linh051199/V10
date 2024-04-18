import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { AdminContentLayout } from "@layouts/admin-content-layout";

import { useClientgateApi } from "@packages/api";
import { ProvinceDto } from "@packages/api/clientgate/Mst_ProvinceApi";

import {
  requiredEmailType,
  requiredType,
} from "@packages/common/Validation_Rules";
import { useConfiguration } from "@packages/hooks";
import { logger } from "@packages/logger";
import { showErrorAtom } from "@packages/store";

import { ColumnOptions } from "@packages/ui/base-gridview";

import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";

import { usePermissions } from "@/packages/contexts/permission";

import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import SearchForm from "../search-form/search-form";
import { StatusButton } from "@/packages/ui/status-button";
import { nanoid } from "nanoid";
import { BButton } from "@/packages/components/buttons";
import { PopupShowSysObject } from "../components/use-popup";

export const MST_UserManager = () => {
  const { t } = useI18n("MST_UserManager");
  const api = useClientgateApi();
  const config = useConfiguration();
  const PopupShowSysObjectRef = useRef<any>(null);
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<any>({
    UserCode: "",
    UserName: "",
    FlagActiveListForUser: "1",
    DealerCode: "",
    DealerType: "",
    AreaCode: "",
    BUCode: "",
    FlagActiveListForDealer: "1",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const { isHQ } = usePermissions();

  const handleSearch = (condition: any) => {
    searchCondition.current = condition;
    gridRef?.current?.refetchData();
  };

  const onCreate = async (data: any) => {
    const dataCreate = {
      UserCode: data.UserEmail,
      UserName: data.UserName,
      UserPassword: data.UserPassword,
      UserPhone: data.UserPhone,
      UserEmail: data.UserEmail,
      SUFlagActive: data.hasOwnProperty("SUFlagActive")
        ? data.SUFlagActive
          ? "1"
          : "0"
        : "1",
      FlagSysAdmin: "0",
      TimeZone: "UTC+7",
      Language: "vi",
      UserID: "",
    };
    const respone = await api.Mst_User_Create(dataCreate);
    if (respone.isSuccess) {
      toast.success(t("Create Successfully"));
      gridRef?.current?.getDxInstance().cancelEditData();

      return true;
    } else {
      showError({
        message: t(respone._strErrCode),
        _strErrCode: respone._strErrCode,
        _strTId: respone._strTId,
        _strAppTId: respone._strAppTId,
        _objTTime: respone._objTTime,
        _strType: respone._strType,
        _dicDebug: respone._dicDebug,
        _dicExcs: respone._dicExcs,
      });
    }
  };
  const onUpdate = async (key: string, data: Partial<any>) => {
    const dataUser = gridRef.current
      .getData()
      .filter((val: any) => val.UserCode === key)[0];

    const dataUpdate = {
      UserCode: key,
      ...data,
      FlagActive:
        typeof data.FlagActive === "boolean"
          ? data.FlagActive
            ? "1"
            : "0"
          : dataUser.FlagActive
          ? "1"
          : "0",
      SUFlagActive:
        typeof data.SUFlagActive === "boolean"
          ? data.SUFlagActive
            ? "1"
            : "0"
          : dataUser.SUFlagActive,
    };
    const respone = await api.Mst_User_update(dataUpdate);
    if (respone.isSuccess) {
      toast.success(t("Update Successfully"));
      gridRef?.current?.getDxInstance().cancelEditData();
      gridRef?.current?.refetchData();
      return true;
    } else {
      showError({
        message: t(respone._strErrCode),
        _strErrCode: respone._strErrCode,
        _strTId: respone._strTId,
        _strAppTId: respone._strAppTId,
        _objTTime: respone._objTTime,
        _strType: respone._strType,
        _dicDebug: respone._dicDebug,
        _dicExcs: respone._dicExcs,
      });
    }
  };
  const onDelete = async (key: string) => {
    const respone = await api.Ser_MST_ServiceType_Delete(key);
    if (respone.isSuccess) {
      toast.success(t("Delete Successfully"));
      await onRefetch();
      return true;
    }
    showError({
      message: t(respone._strErrCode),
      _strErrCode: respone._strErrCode,
      _strTId: respone._strTId,
      _strAppTId: respone._strAppTId,
      _objTTime: respone._objTTime,
      _strType: respone._strType,
      _dicDebug: respone._dicDebug,
      _dicExcs: respone._dicExcs,
    });
    throw new Error(respone._strErrCode);
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "UserCode",
      caption: t("UserCode"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
      },
      cellRender: ({ value, data }: any) => {
        return (
          <span
            className="hover:text-[#00703c] cursor-pointer hover:underline"
            onClick={() => PopupShowSysObjectRef.current.setShowPopup(data)}
          >
            {value}
          </span>
        );
      },
    },
    {
      dataField: "UserName",
      caption: t("UserName"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "UserPassword",
      caption: t("UserPassword"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "UserPhone",
      caption: t("UserPhone"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "UserEmail",
      caption: t("UserEmail"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [requiredType, requiredEmailType],
    },
    {
      dataField: "SUFlagActive",
      caption: t("SUFlagActive"),
      alignment: "center",
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
    {
      alignment: "center",
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxSwitch",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      cellRender: ({ data }: any) => {
        return <StatusButton key={nanoid()} isActive={data.FlagActive} />;
      },
    },
  ];

  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "UserPassword") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "UserEmail") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "FlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
        e.editorOptions.readOnly = true;
      }
    }
    if (e.dataField === "SUFlagActive") {
      if (e.row?.isNewRow) {
        e.editorOptions.value = true;
      }
    }
  };

  const handleSavingRow = async (e: any) => {
    logger.debug("e:", e);

    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        let newData = e.changes[0].data!;

        e.promise = onCreate(newData);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
    logger.debug("e after:", e);
  };

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };
  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const fetchData = async () => {
    const resp = await api.Mst_User_Search({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    if (resp?.isSuccess) {
      return resp;
    } else {
      showError({
        message: t(resp!._strErrCode),
        _strErrCode: resp!._strErrCode,
        _strTId: resp!._strTId,
        _strAppTId: resp!._strAppTId,
        _objTTime: resp!._objTTime,
        _strType: resp!._strType,
        _dicDebug: resp!._dicDebug,
        _dicExcs: resp!._dicExcs,
      });
    }
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    if (data) {
      ConfirmComponent({
        asyncFunction: async () => {
          const respone = await api.Mst_User_Delete(data);
          if (respone.isSuccess) {
            toast.success(t("Delete successfully!"));
            gridRef?.current?.refetchData();
          } else {
            showError({
              message: t(respone._strErrCode),
              _strErrCode: respone._strErrCode,
              _strTId: respone._strTId,
              _strAppTId: respone._strAppTId,
              _objTTime: respone._objTTime,
              _strType: respone._strType,
              _dicDebug: respone._dicDebug,
              _dicExcs: respone._dicExcs,
            });
          }
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    }
  };

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("MST_UserManager")}</div>
          <div className="mx-2">
            <BButton label={t("AddNew")} onClick={handleAddNew} />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchForm
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={true}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              editMode={true}
              editingOptions={{
                mode: "row",
              }}
              isSingleSelection={true}
              onSaving={handleSavingRow}
              onPageChanged={(number) => onRefetch(number ?? 0)}
              onEditorPreparing={handleEditorPreparing}
              onRowDeleteBtnClick={handleDelete}
              keyExpr="UserCode"
              storeKey={"Mst_UserManager-management-columns"}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
        <PopupShowSysObject ref={PopupShowSysObjectRef} />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
