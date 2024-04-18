import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BButton } from "@/packages/components/buttons";
import { Link } from "@/packages/components/link/link";
import { useNetworkNavigate } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { Alignment } from "@/types";
import { DataGrid } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useRef } from "react";

export const XuatKho = () => {
  const { t } = useI18n("XuatKho");
  const api = useClientgateApi();
  const navigate = useNetworkNavigate();

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<any>>({
    CusID: "",
    CusName: "",
    DealerCode: "",
    Address: "",
    Phone: "",
    PlateNo: "",
    FrameNo: "",
    EngineNo: "",
    TradeMarkCode: "",
    ModelId: "",
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    const response = await api.Ser_CustomerCar_SearchDL({
      CusID: searchCondition.current?.CusID ?? "",
      CusName: searchCondition.current?.CusName ?? "",
      DealerCode: searchCondition.current?.DealerCode ?? "",
      Address: searchCondition.current?.Address ?? "",
      Phone: searchCondition.current?.Phone ?? "",
      PlateNo: searchCondition.current?.PlateNo ?? "",
      FrameNo: searchCondition.current?.FrameNo ?? "",
      EngineNo: searchCondition.current?.EngineNo ?? "",
      TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
      ModelId: searchCondition.current?.ModelId ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return response;
    }
  };
  //======================CallAPI-end==========================================

  //===============================Handle=================================================

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };
  const handleAddNew = () => {
    navigate("/admin/XuatKho/Create");
  };
  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };

    await onRefetchData();
  };
  //===============================Handle-end=================================================

  //=====================Columns===========================================
  const columns: any = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "CusID",
      visible: true,
      caption: t("CusID"),
    },
    {
      dataField: "CusName",
      visible: true,
      caption: t("CusName"),
      // alignment: "center" as Alignment,
      sortIndex: 0,
      allowFiltering: true,
      sortingMethod: function (value1: any, value2: any) {
        if (!value1 && value2) return -1;
        if (!value1 && !value2) return 0;
        if (value1 && !value2) return 1;
        // Determines whether two strings are equivalent in the current locale
        return value1.localeCompare(value2);
      },
    },

    {
      dataField: "DOB",
      caption: t("DOB"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },

    {
      dataField: "Sex",
      caption: t("Sex"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: ({ data, rowIndex, value }: any) => {
        if (value) {
          return <span>Nam</span>;
        } else if (value === null) {
          return <span></span>;
        } else {
          return <span>Nữ</span>;
        }
      },
    },

    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TradeMarkCode",
      caption: t("TradeMarkCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ProductYear",
      caption: t("ProductYear"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ColorCode",
      caption: t("ColorCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "InsVieName",
      caption: t("InsVieName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Mobile",
      caption: t("Mobile"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Tel",
      caption: t("Tel"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ContName",
      caption: t("ContName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ContTel",
      caption: t("ContTel"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "LogLUDateTime",
      caption: t("LogLUDateTime"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },
    {
      dataField: "MemberCarID",
      caption: t("MemberCarID"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  //=====================Columns-end===========================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("CusName"),
      dataField: "CusName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("FrameNo"),
      dataField: "FrameNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Phone",
      caption: t("Phone"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("Address"),
      dataField: "Address",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];
  //==========================searchConditions-end================================================

  return (
    <AdminContentLayout className={"Category_Manager"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("Xuat Kho")}</div>
          <div className="ml-auto">
            <BButton
              iconName="plus"
              label={t("AddNew")}
              onClick={handleAddNew}
            />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout
          // searchPermissionCode="BTN_ETICKET_LIST_SEARCH"
          searchPermissionCode=""
        >
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchPanelV2
              conditionFields={searchConditions}
              storeKey="XuatKho_SearchField"
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <div className="eticket-manager">
              <GridViewOne
                isLoading={false}
                fetchData={fetchData}
                autoFetchData={true}
                ref={gridRef}
                dataSource={[]}
                onPageChanged={(number) => onRefetchData(number ?? 0)}
                columns={columns}
                keyExpr={"SoPhieuNhap"}
                isHiddenCheckBox={false}
                allowSelection={true}
                onSelectionChanged={() => {}}
                hidenTick={true}
                onSaveRow={() => {}}
                onEditorPreparing={() => {}}
                onEditRowChanges={() => {}}
                onDeleteRows={() => {}}
                storeKey={"Manage"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
