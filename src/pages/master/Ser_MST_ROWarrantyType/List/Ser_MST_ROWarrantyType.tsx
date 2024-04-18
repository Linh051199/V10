import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersType,
  RequiredVietNameeseExcludeSpecialCharacters,
  requiredType,
} from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_District, SearchParam } from "@/packages/types";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { StatusButton } from "@/packages/ui/status-button";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import { CustomHeaderTitle } from "@/packages/ui/HeaderTitle/CustomHeaderTitle";

export const Ser_MST_ROWarrantyTypePage = () => {
  const api = useClientgateApi();
  const config = useConfiguration();
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const { t } = useI18n("Ser_MST_ROWarrantyType");
  let gridRef: any = useRef<DataGrid | null>(null);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const showError = useSetAtom(showErrorAtom);

  const columns: ColumnOptions[] = [
    {
      dataField: "ROWTypeCode",
      caption: t("ROWTypeCode"),
      editorType: "dxTextBox",
      allowFiltering: true,
      editorOptions: {
        placeholder: t("Input"),
      },
      // validationRules: [requiredType, ExcludeSpecialCharactersType],
    },
    {
      dataField: "ROWTypeName",
      caption: t("ROWTypeName"),
      editorType: "dxSelectBox",
      // validationRules: [requiredType, ExcludeSpecialCharactersType],
      // editorOptions: {
      //   placeholder: t("Select"),
      //   dataSource: listProvince?.DataList ?? [],
      //   displayExpr: "ProvinceCode",
      //   valueExpr: "ProvinceCode",
      // },
    },
    {
      dataField: "ROWTypeDtlCode",
      caption: t("ROWTypeDtlCode"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ROWTypeDtlName",
      caption: t("ROWTypeDtlName"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
    {
      dataField: "ROWPhotoType",
      caption: t("ROWPhotoType"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DistrictCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "ProvinceCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: any) => {
    const list = rows.map((item: any) => {
      return {
        DistrictCode: item.DistrictCode,
        ProvinceCode: item.ProvinceCode,
      };
    });
    const respone = await api.Mst_District_Delete_Multiple(list);
    if (respone.isSuccess) {
      toast.success(t("Delete successfully!"));
      setSelectionKeysAtom([]);
      await onRefetch();
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

  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const searchCondition = useRef<any>({
    ROWTID: "",
    ROWTypeCode: "",
    ROWTypeDtlCode: "",
    FlagActive: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100
  });

  const fetchData = async () => {
    const resp: any = await api.Ser_MST_ROWarrantyType_Search({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    console.log(146, resp);
    return resp;
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    if (data) {
      ConfirmComponent({
        asyncFunction: async () => {
          const respone = await api.Mst_District_Delete(data);
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

  const handleDeleteMulti = async (e: any) => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current?.getSelectedRowsData();
        await handleDeleteRows(listChecked);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };
  const setCondition = (keyword: string) => {
    searchCondition.current.keyword = keyword;
    gridRef?.current?.refetchData();
  };
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <CustomHeaderTitle
              displayName="Ser_MST_ROWarrantyType"
              isSearch={false}
            />
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center"></PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
          dataSource={[]} // cars
          columns={columns}
          fetchData={fetchData}
          onSelectionChanged={handleSelectionChanged}
          autoFetchData={true}
          isHiddenCheckBox={true}
          allowSelection={false}
          isLoading={false}
          customToolbarItems={[]}
          onPageChanged={(number) => onRefetch(number ?? 0)}
          onEditorPreparing={handleEditorPreparing}
          onRowDeleteBtnClick={handleDelete}
          onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr={"MaLoaiAnh"}
          storeKey="Ser_MST_ROWarrantyType_manager"
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
