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

export const Ser_MST_ROWarrantyPhotoTypePage = () => {
  const api = useClientgateApi();
  const config = useConfiguration();
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const { t } = useI18n("Ser_MST_ROWarrantyPhotoType");
  let gridRef: any = useRef<DataGrid | null>(null);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const showError = useSetAtom(showErrorAtom);

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      width: 100,
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "ROWPTCode",
      caption: t("ROWPTCode"),
      editorType: "dxTextBox",
      allowFiltering: true,
      editorOptions: {
        placeholder: t("Input"),
      },
      // validationRules: [requiredType, ExcludeSpecialCharactersType],
    },
    {
      dataField: "ROWPTName",
      caption: t("ROWPTName"),
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
  ];

  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const searchCondition = useRef<any>({
    keyword: "",
  });

  const fetchData = async () => {
    const resp: any = await api.Ser_MST_ROWarrantyPhotoType_Search();

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

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              {t("Ser_MST_ROWarrantyPhotoType")}
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            {/* <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={onDownloadTemplate}
              setCondition={setCondition}
              searchCondition={searchCondition}
            /> */}
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
          dataSource={[]} // cars
          columns={columns}
          fetchData={fetchData}
          autoFetchData={true}
          allowSelection={false}
          enablePaging="no"
          isLoading={false}
          customToolbarItems={[]}
          keyExpr={"ROWPTCode"}
          storeKey="Ser_MST_ROWarrantyPhotoType_manager"
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
