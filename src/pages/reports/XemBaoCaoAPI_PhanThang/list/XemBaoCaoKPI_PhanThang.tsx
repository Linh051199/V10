import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useI18n } from "@/i18n/useI18n";
import React, {
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./styles.scss";
import { saveAs } from "file-saver";
import { useClientgateApi } from "@packages/api";
import { format, getMonth, set } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { toast } from "react-toastify";
import { ContentSearchPanelLayout } from "@layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { PageHeader } from "../components";
import Form, { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import {
  Button,
  DropDownBox,
  LoadPanel,
  TreeList,
  TreeView,
} from "devextreme-react";
import { nanoid } from "nanoid";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { showErrorAtom } from "@/packages/store";
import { SelectField } from "@/packages/components/select-field";
import { DateField } from "@/packages/components/date-field";
import {
  Column,
  ColumnChooser,
  ColumnChooserSearch,
  ColumnChooserSelection,
  HeaderFilter,
  Item,
  Position,
  SearchPanel,
  Selection,
  Toolbar,
} from "devextreme-react/tree-list";
import { Workbook } from "exceljs";
import { usePermissions } from "@/packages/contexts/permission";
import { match } from "ts-pattern";
import { transformData } from "./utils";
import { ExportExcelButton } from "@/packages/components/buttons";
import { formatDate } from "devextreme/localization";
import DataGrid, { GroupPanel, Grouping } from "devextreme-react/data-grid";
export const BaoCaoXemKPI_PhanThang = () => {
  const { t } = useI18n("BaoCaoXemKPI_PhanThang");
  const { isHQ } = usePermissions();
  const showError = useSetAtom(showErrorAtom);
  const [searchCondition, setSearchCondition] = useState<any>({
    DealerCode: "",
    Month: set(Date.now(), {
      month: +getMonth(Date.now()) - 1,
      date: 1,
    }),
    // Month: new Date(),
    FlagDataWH: false,
  } as any);
  const windowSize = useWindowSize();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();
  const [gettingData, setGettingData] = useState(false);
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    reloading();
  };
  const treeList = useRef<any>();
  const { data: listDealerCode } = useQuery({
    queryKey: ["all dealer code"],
    queryFn: async () => {
      const resp = await api.XemBaoCaoKPI_PhanThang_GetAllActive();
      return [{ DealerCode: "", DealerName: "All" }, ...(resp.DataList as any)];
    },
  });
  const { data: respData, isLoading } = useQuery({
    queryKey: [
      "report",
      "XemBaoCaoKPI_PhanThang_Search",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      // if (loadingKey !== "0") {
      const resp = match(isHQ())
        .with(true, async () => {
          const resp = await api.XemBaoCaoKPI_PhanThang_SearchHQ({
            DealerCode: searchCondition.DealerCode ?? "",
            Month: searchCondition.Month,
            FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
          });
          toast.info("reponse data HQ");
          return resp;
        })
        .with(false, async () => {
          const resp = await api.XemBaoCaoKPI_PhanThang_SearchDL({
            DealerCode: searchCondition.DealerCode,
            Month: searchCondition.Month,
            FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
          });
          toast.info("reponse data DL");
          return resp;
        })
        .otherwise(() => null);

      return resp;
      // } else {
      //   return null;
      // }
    },
    enabled: true,
  });
  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      // setGettingData(true);
      setSearchCondition({
        // ...searchCondition,
        // Month: data.Month ? format(data.Month, "yyyy-MM-dd") : "",
        ...data,
      });
      reloading();
      // setGettingData(false);
    }
  };
  // columns
  const calculateColumns = transformData(
    ["Task_ID", "Task_Parent_ID", "Task_Subject"],
    respData!
  );

  const searchFields: IItemProps[] = [
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      label: { text: t("DealerCode") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={listDealerCode ?? []}
            valueExpr={"DealerCode"}
            displayExpr={"DealerName"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={false}
            placeholder={t("Select")}
          />
        );
      },
    },
    {
      dataField: "Month", // dealine
      caption: t("Month"),
      label: {
        text: t("Month"),
      },
      visible: true,
      editorOptions: {
        width: "auto",
        type: "date",
        calendarOptions: {
          maxZoomLevel: "year",
        },
        elementAttr: {
          // id: "DateBox-PhanThang",
          class: "DateBox-BaoCaoXemKPI",
        },
        openOnFieldClick: true,
        displayFormat: "yyyy-MM",
      },
      editorType: "dxDateBox",
    },
    {
      dataField: "FlagDataWH",
      caption: t("FlagDataWH"),
      visible: true,
      label: {
        visible: false,
        text: t("FlagDataWH"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              checkBoxRef={checkBoxRef}
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];
  // dataSourceOptions
  const dataSourceOptions = {
    store: respData?.map((data: any) => {
      return data;
    }),
  };
  // const exportToExcel = () => {
  //   // debugger;
  //   const workbook = new Workbook();
  //   const worksheet = workbook.addWorksheet("Employees");
  //   if (treeList.current !== null) {
  //     exportTreeList({
  //       component: treeList.current.instance,
  //       worksheet,
  //     })
  //       .then(() => {
  //         workbook.xlsx
  //           .writeBuffer()
  //           .then((buffer) => {
  //             saveAs(
  //               new Blob([buffer], { type: "application/octet-stream" }),
  //               "XemBaoCaoAPI_PhanThang.xlsx"
  //             );
  //           })
  //           .catch(() => {});
  //       })
  //       .catch(() => {});
  //   }
  // };
  // const exportButtonOptions = useMemo(() => {
  //   return {
  //     icon: "xlsxfile",
  //     onClick: exportToExcel,
  //   };
  // }, []);

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_PivotTransPlan_search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isLoading || gettingData}
              showIndicator={true}
              showPane={true}
            />
            <div className={"w-full mt-4"}>
              {/* <ExportExcelButton className="flex " onClick={exportToExcel}>
                Export Excel
              </ExportExcelButton> */}
              <TreeList
                ref={treeList}
                allowColumnResizing={true}
                columnResizingMode={"widget"}
                dataSource={dataSourceOptions}
                showBorders={true}
                noDataText={t("No data search results found")}
                columnAutoWidth={true}
                wordWrapEnabled={true}
                autoExpandAll={true}
                keyExpr="Task_ID"
                parentIdExpr="Task_Parent_ID"
                id="TreeList_DMS"
                defaultExpandedRowKeys={["Tree_A", "Tree_B"]}
                height={windowSize.height - 150}
                showRowLines={true}
              >
                <GroupPanel visible={true} />
                <Grouping autoExpandAll={true} />
                {/* <SearchPanel visible={true} width={250} /> */}
                <HeaderFilter visible={false} />
                <Selection mode="none" />

                {calculateColumns?.map((col: any) => {
                  // debugger;
                  return (
                    <Column
                      key={col.dataField}
                      dataField={col.dataField}
                      {...col}
                    ></Column>
                  );
                })}
                {/* <Toolbar>
                  <Item
                    widget="dxButton"
                    locateInMenu="auto"
                    options={exportButtonOptions}
                  />
                </Toolbar> */}
                {/* <ColumnChooser enabled={true} mode={"select"}>
                  <Position
                    my="right top"
                    at="right bottom"
                    of=".dx-treelist-column-chooser-button"
                  />
                  <ColumnChooserSearch enabled={true} />
                  <ColumnChooserSelection
                    allowSelectAll={true}
                    selectByClick={true}
                    recursive={true}
                  />
                </ColumnChooser> */}
              </TreeList>
            </div>
            <GetDataWH
              onSearch={handleSearchWH}
              formRef={formRef}
              checkBoxRef={checkBoxRef}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
