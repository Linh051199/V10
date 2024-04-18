import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { usePermissions } from "@/packages/contexts/permission";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import TreeGridView from "@/packages/ui/tree-gridview/TreeGridView";
import { DataGrid } from "devextreme-react";
import { useRef } from "react";
import { match } from "ts-pattern";
import { HeaderPart } from "./components/header-part";
import SearchForm from "./components/search-form";
import { useColumns } from "./components/use-columns";

const QuanLyHangHoa = () => {
  const { t } = useI18n("QuanLyHangHoa");

  let gridRef: any = useRef<DataGrid | null>(null);

  const { isHQ } = usePermissions();

  const api = useClientgateApi();

  const handleAddNew = () => {};

  const searchCondition = useRef<Partial<any>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CavityNo: "",
    CavityName: "",
    CavityType: "",
    IsActive: "",
  });

  const handleSearch = () => {};

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };

  const handleRefetch = () => {
    gridRef?.current?.refetchData();
  };

  const columns = useColumns();

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Ser_Cavity_SearchHQ({
          IsActive: searchCondition.current?.IsActive ?? "",
          CavityName: searchCondition.current.CavityName,
          CavityNo: searchCondition.current.CavityNo,
          CavityType: searchCondition.current.CavityType,
          DealerCode: "VS058",
          Ft_PageIndex: 0,
          Ft_PageSize: 100,
        });

        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Cavity_SearchDL({
          IsActive: searchCondition.current?.IsActive ?? "",
          CavityName: searchCondition.current.CavityName,
          CavityNo: searchCondition.current.CavityNo,
          CavityType: searchCondition.current.CavityType,
          Ft_PageIndex: 0,
          Ft_PageSize: 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      return resp;
    }
  };

  const dataSourceOptions = {
    // store: tasks.map((task) => {
    //   employees.forEach((employee) => {
    //     if (task.Task_Assigned_Employee_ID === employee.ID) {
    //       task.Task_Assigned_Employee = employee;
    //     }
    //   });
    //   return task;
    // }),
  };

  return (
    <AdminContentLayout className={"dealer-management QuanLyHangHoa"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart
          onAddNew={handleAddNew}
          searchCondition={searchCondition}
          handleRefetch={handleRefetch}
          gridRef={gridRef}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout searchPermissionCode="">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchForm
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <TreeGridView
              fetchData={fetchData}
              dataSourceOptions={dataSourceOptions}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default QuanLyHangHoa;
