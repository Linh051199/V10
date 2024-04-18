import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BButton } from "@/packages/components/buttons";
import { useNetworkNavigate } from "@/packages/hooks";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@layouts/content-searchpanel-layout";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { format } from "date-fns";
import { ReactNode, useEffect, useRef, useState } from "react";

import { SearchForm } from "./search-form";

import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";

import { Dlr_Contract_OrderList } from "./order-list/order-list";
import { useGetTime } from "@/packages/hooks/useGetTime";
import { useStateSearch } from "@/packages/hooks/useStateSearch";  

import DropDownButton, {
  Item as DropDownButtonItem,
  Item,
} from "devextreme-react/drop-down-button";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

export const Mst_InventoryCusReturn = () => {
  const { t } = useI18n("Mst_InventoryCusReturn");
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);

  const api = useClientgateApi();

  const searchCondition = useRef<Partial<any>>({
    DealerCode: "",
    DlrContractNo: "",
    DlrContractNoUser: "",
    CreatedDateFrom: "",
    CreatedDateTo: "",
    FullName: "",
    SMCode: "",
    ModelCode: "",
    IDCardNo: "",
    FlagDealFinish: "",
    FlagDataWH: false,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CreatedDate: ["", ""],
  });
  const { data, saveState } = useStateSearch({
    storeKey: "search-Mst_InventoryCusReturn",
  });
  const navigate = useNetworkNavigate();
  const { convertISO8601Full } = useGetTime();
  const handleViewDetail = (code: string) => {
    navigate(
      `/dealer/DlrContractHQ/${
        searchCondition.current.FlagDataWH ? "GetWHH" : "GetHQ"
      }/${code}`
    );
  };

  const { columns } = Dlr_Contract_OrderList({
    onViewDetail: handleViewDetail,
  });

  const handleSearch = (condition: any) => {
    const currentCondition = {
      ...condition,
      Ft_PageIndex: condition.Ft_PageIndex,
      Ft_PageSize: condition.Ft_PageSize,
      CreatedDate: [
        condition?.CreatedDate && condition?.CreatedDate[0]
          ? convertISO8601Full(condition?.CreatedDate[0])
          : "",
        condition?.CreatedDate && condition?.CreatedDate[1]
          ? convertISO8601Full(condition?.CreatedDate[1])
          : "",
      ],
    };
    searchCondition.current = currentCondition;
    saveState(currentCondition);
    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    // const response = await api.DlrContract_SearchHQ({
    //   ...searchCondition.current,
    //   CreatedDateFrom: searchCondition?.current?.CreatedDate[0]
    //     ? searchCondition.current?.CreatedDate[0]
    //     : "",
    //   CreatedDateTo: searchCondition?.current?.CreatedDate[1]
    //     ? searchCondition.current?.CreatedDate[1]
    //     : "",
    //   Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
    //   Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
    // });
    // if (response?.isSuccess) {
    //   gridRef?.current?.getDxInstance().clearSelection();
    //   return response.Data;
    // }
    return {
      PageIndex: 0,
      PageSize: 100,
      PageCount: 1,
      ItemCount: 6,
      DataList: [
        {
          AreaNameDealer: "Miền Trung",
          DealerCode: "VC004",
          SalesGroupType: "F",
          SalesGroupTypeName: "Fleet",
          SalesType: "F7",
          SalesTypeNameVN: "Các loại bán lô khác",
          FlagBanNgang: "1",
          DlrContractNo: "2403DRC23163",
          DlrContractNoUser: "VN009",
          CustomerCode: "VC004",
          FullName: "Hyundai Vinh",
          Address:
            "Km số 3+500, Đại lộ Lê Nin, xã Nghi Phú, thành phố Vinh, Nghệ An",
          PhoneNo: "0383513423",
          ProvinceCode: "38",
          ProvinceName: "Nghệ An",
          DistrictName: null,
          IDCardNo: "FAKEVC004",
          IDCardType: "CMND",
          IDCardTypeName: "Chứng minh nhân dân",
          DateOfBirth: null,
          SMCode: "186665799",
          SMName: "Vi Thị Oanh",
          HTCStaffInCharge: "KIENNH",
          PmtType: "Trả thẳng",
          CreatedDate: "2024-03-04",
          TransactorCode: "VC004",
          TransactorFullName: "Hyundai Vinh",
          TransactorAddress:
            "Km số 3+500, Đại lộ Lê Nin, xã Nghi Phú, thành phố Vinh, Nghệ An",
          TransactorPhoneNo: "0383513423",
          TransactorProvinceCode: "38",
          TransactorProvinceName: "Nghệ An",
          TransactorDistrictName: null,
          TransactorIDCardNo: "FAKEVC004",
          TransactorIDCardType: "CMND",
          TransactorIDCardTypeName: "Chứng minh nhân dân",
          TransactorDateOfBirth: null,
          LastestFormDateTime: null,
          BankCode: null,
          BankName: null,
          ContractDate: "2024-03-04",
        },
        {
          AreaNameDealer: "Miền Trung",
          DealerCode: "VC004",
          SalesGroupType: "F",
          SalesGroupTypeName: "Fleet",
          SalesType: "F7",
          SalesTypeNameVN: "Các loại bán lô khác",
          FlagBanNgang: "1",
          DlrContractNo: "2403DRC23176",
          DlrContractNoUser: "VC048",
          CustomerCode: "VC004",
          FullName: "Hyundai Vinh",
          Address:
            "Km số 3+500, Đại lộ Lê Nin, xã Nghi Phú, thành phố Vinh, Nghệ An",
          PhoneNo: "0383513423",
          ProvinceCode: "38",
          ProvinceName: "Nghệ An",
          DistrictName: null,
          IDCardNo: "FAKEVC004",
          IDCardType: "CMND",
          IDCardTypeName: "Chứng minh nhân dân",
          DateOfBirth: null,
          SMCode: "186452465",
          SMName: "Lê Thị Thanh Huyền",
          HTCStaffInCharge: "KIENNH",
          PmtType: "Trả thẳng",
          CreatedDate: "2024-03-04",
          TransactorCode: "VC004",
          TransactorFullName: "Hyundai Vinh",
          TransactorAddress:
            "Km số 3+500, Đại lộ Lê Nin, xã Nghi Phú, thành phố Vinh, Nghệ An",
          TransactorPhoneNo: "0383513423",
          TransactorProvinceCode: "38",
          TransactorProvinceName: "Nghệ An",
          TransactorDistrictName: null,
          TransactorIDCardNo: "FAKEVC004",
          TransactorIDCardType: "CMND",
          TransactorIDCardTypeName: "Chứng minh nhân dân",
          TransactorDateOfBirth: null,
          LastestFormDateTime: null,
          BankCode: null,
          BankName: null,
          ContractDate: "2024-03-04",
        },
        {
          AreaNameDealer: "Miền Trung",
          DealerCode: "VC048",
          SalesGroupType: "F",
          SalesGroupTypeName: "Fleet",
          SalesType: "F7",
          SalesTypeNameVN: "Các loại bán lô khác",
          FlagBanNgang: "1",
          DlrContractNo: "2403DRC23179",
          DlrContractNoUser: "VN009",
          CustomerCode: "VC048",
          FullName: "Hyundai Đà Lạt",
          Address: "Số 12 Đường 3 Tháng 4, P. 3, TP. Đà Lạt, T. Lâm Đồng, VN",
          PhoneNo: "01638.320.888",
          ProvinceCode: "63",
          ProvinceName: "Lâm Đồng",
          DistrictName: null,
          IDCardNo: "FAKEVC048",
          IDCardType: "CMND",
          IDCardTypeName: "Chứng minh nhân dân",
          DateOfBirth: null,
          SMCode: "VC048BH1904SM53496",
          SMName: "LÊ TẤN MINH",
          HTCStaffInCharge: "HOANNN",
          PmtType: "Trả thẳng",
          CreatedDate: "2024-03-04",
          TransactorCode: "VC048",
          TransactorFullName: "Hyundai Đà Lạt",
          TransactorAddress:
            "Số 12 Đường 3 Tháng 4, P. 3, TP. Đà Lạt, T. Lâm Đồng, VN",
          TransactorPhoneNo: "01638.320.888",
          TransactorProvinceCode: "63",
          TransactorProvinceName: "Lâm Đồng",
          TransactorDistrictName: null,
          TransactorIDCardNo: "FAKEVC048",
          TransactorIDCardType: "CMND",
          TransactorIDCardTypeName: "Chứng minh nhân dân",
          TransactorDateOfBirth: null,
          LastestFormDateTime: null,
          BankCode: null,
          BankName: null,
          ContractDate: "2024-03-04",
        },
        {
          AreaNameDealer: "Miền Bắc",
          DealerCode: "VN009",
          SalesGroupType: "P",
          SalesGroupTypeName: "Private",
          SalesType: "P1",
          SalesTypeNameVN: "Bán cho KH Cá nhân",
          FlagBanNgang: "0",
          DlrContractNo: "2403DRC23181",
          DlrContractNoUser: "HD123",
          CustomerCode: "2403CTM97246",
          FullName: "Nguyễn Ngọc",
          Address: "Từ sơn, Bắc Ninh",
          PhoneNo: "0937557283",
          ProvinceCode: "241",
          ProvinceName: "Bắc Ninh",
          DistrictName: "Thị xã Từ Sơn",
          IDCardNo: "099856545875",
          IDCardType: "CMND",
          IDCardTypeName: "Chứng minh nhân dân",
          DateOfBirth: "1993-07-10 00:00:00",
          SMCode: "VN009BH1808SM43585",
          SMName: "Nguyễn Quang Huy",
          HTCStaffInCharge: "TUNGNM",
          PmtType: "Trả góp",
          CreatedDate: "2024-03-04",
          TransactorCode: "2403CTM97246",
          TransactorFullName: "Nguyễn Ngọc",
          TransactorAddress: "Từ sơn, Bắc Ninh",
          TransactorPhoneNo: "0937557283",
          TransactorProvinceCode: "241",
          TransactorProvinceName: "Bắc Ninh",
          TransactorDistrictName: "Thị xã Từ Sơn",
          TransactorIDCardNo: "099856545875",
          TransactorIDCardType: "CMND",
          TransactorIDCardTypeName: "Chứng minh nhân dân",
          TransactorDateOfBirth: "1993-07-10 00:00:00",
          LastestFormDateTime: null,
          BankCode: "AGRIBANK.HO",
          BankName: "NH NN và PT NT Việt Nam - Hội Sở",
          ContractDate: "2024-03-04",
        },
        {
          AreaNameDealer: "Miền Bắc",
          DealerCode: "VN009",
          SalesGroupType: "D",
          SalesGroupTypeName: "Demonstrationa",
          SalesType: "D2",
          SalesTypeNameVN: "Xe cho KH Mượn chờ sửa",
          FlagBanNgang: "0",
          DlrContractNo: "2403DRC23225",
          DlrContractNoUser: "XE LAI THU",
          CustomerCode: "2403CTM97246",
          FullName: "Nguyễn Ngọc",
          Address: "Từ sơn, Bắc Ninh",
          PhoneNo: "0937557283",
          ProvinceCode: "241",
          ProvinceName: "Bắc Ninh",
          DistrictName: "Thị xã Từ Sơn",
          IDCardNo: "099856545875",
          IDCardType: "CMND",
          IDCardTypeName: "Chứng minh nhân dân",
          DateOfBirth: "1993-07-10 00:00:00",
          SMCode: "VN009BH1708SM33718",
          SMName: "Trần Nam Hải",
          HTCStaffInCharge: "TUNGNM",
          PmtType: "Trả thẳng",
          CreatedDate: "2024-03-07",
          TransactorCode: "2403CTM97246",
          TransactorFullName: "Nguyễn Ngọc",
          TransactorAddress: "Từ sơn, Bắc Ninh",
          TransactorPhoneNo: "0937557283",
          TransactorProvinceCode: "241",
          TransactorProvinceName: "Bắc Ninh",
          TransactorDistrictName: "Thị xã Từ Sơn",
          TransactorIDCardNo: "099856545875",
          TransactorIDCardType: "CMND",
          TransactorIDCardTypeName: "Chứng minh nhân dân",
          TransactorDateOfBirth: "1993-07-10 00:00:00",
          LastestFormDateTime: null,
          BankCode: null,
          BankName: null,
          ContractDate: "2024-03-07",
        },
        {
          AreaNameDealer: "Miền Bắc",
          DealerCode: "VN009",
          SalesGroupType: "D",
          SalesGroupTypeName: "Demonstrationa",
          SalesType: "D3",
          SalesTypeNameVN: "Xe lái thử",
          FlagBanNgang: "0",
          DlrContractNo: "2403DRC23226",
          DlrContractNoUser: "XE LAI THU",
          CustomerCode: "2403CTM97246",
          FullName: "Nguyễn Ngọc",
          Address: "Từ sơn, Bắc Ninh",
          PhoneNo: "0937557283",
          ProvinceCode: "241",
          ProvinceName: "Bắc Ninh",
          DistrictName: "Thị xã Từ Sơn",
          IDCardNo: "099856545875",
          IDCardType: "CMND",
          IDCardTypeName: "Chứng minh nhân dân",
          DateOfBirth: "1993-07-10 00:00:00",
          SMCode: "VN009BH1808SM43587",
          SMName: "Đỗ Hoàng Tân",
          HTCStaffInCharge: "TUNGNM",
          PmtType: "Trả thẳng",
          CreatedDate: "2024-03-07",
          TransactorCode: "2403CTM97246",
          TransactorFullName: "Nguyễn Ngọc",
          TransactorAddress: "Từ sơn, Bắc Ninh",
          TransactorPhoneNo: "0937557283",
          TransactorProvinceCode: "241",
          TransactorProvinceName: "Bắc Ninh",
          TransactorDistrictName: "Thị xã Từ Sơn",
          TransactorIDCardNo: "099856545875",
          TransactorIDCardType: "CMND",
          TransactorIDCardTypeName: "Chứng minh nhân dân",
          TransactorDateOfBirth: "1993-07-10 00:00:00",
          LastestFormDateTime: null,
          BankCode: null,
          BankName: null,
          ContractDate: "2024-03-07",
        },
      ],
    };
  };
  useEffect(() => {
    const newFormValue = {
      ...searchCondition.current,
      ...(data as any),
    };

    if (data === null) {
      return;
    }
    setTimeout(() => {
      if (JSON.stringify(data) === "{}") {
        handleSearch(searchCondition.current);
      } else {
        handleSearch(newFormValue);
      }
    }, 1000);
  }, []);
  // console.log(103, selectRef);

  const handleExportExcel = async (data: any) => {
    // const dataExport = {
    //   FlagDataWH: searchCondition.current.FlagDataWH,
    //   Lst_Dlr_Contract: data.map((item: any) => {
    //     return {
    //       DlrContractNo: item.DlrContractNo,
    //     };
    //   }),
    // };
    // const responsive = await api.DlrContract_ExportHQ(dataExport);
    // if (responsive.isSuccess) {
    //   toast.success(t("ExportExcelSuccess"));
    //   window.location.href = responsive.Data!;
    // } else {
    //   showError({
    //     message: t(responsive._strErrCode),
    //     _strErrCode: responsive._strErrCode,
    //     _strTId: responsive._strTId,
    //     _strAppTId: responsive._strAppTId,
    //     _objTTime: responsive._objTTime,
    //     _strType: responsive._strType,
    //     _dicDebug: responsive._dicDebug,
    //     _dicExcs: responsive._dicExcs,
    //   });
    // }
  };

  const handlePrint = async (data: any) => {
    // setIsProcessing(true);
    // const dataPrint = {
    //   FlagDataWH: searchCondition.current.FlagDataWH,
    //   DlrContractNo: data[0].DlrContractNo,
    // };
    // const response = await api.DlrContract_PrintHQ(dataPrint);
    // if (response?.isSuccess) {
    //   quickPrint({
    //     url: response.Data!,
    //   });
    // } else {
    //   toast.error(t(`SomethingWentWrong`));
    // }
    // setIsProcessing(false);
  };

  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: t(`Export Excel`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleExportExcel(ref.current.instance.getSelectedRowsData());
        }
      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref.current.instance.getSelectedRowsData().length > 0) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
    {
      text: t(`Print`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handlePrint(ref.current.instance.getSelectedRowsData());
        }
      },
      shouldShow: (ref: any) => {
        let check = false;

        if (ref) {
          if (ref.current.instance.getSelectedRowsData().length === 1) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
    {
      text: t(``),
      onClick: (e: any, ref: any) => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => {
        const selectedRowsData =
          ref?.current?.instance?.getSelectedRowsData?.();

        const listsButtonDropDown: { content: ReactNode; visible?: boolean }[] =
          [
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Hủy")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Xóa")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Xuất Excel")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("In phiếu")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Gửi email")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("In tem mã")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
          ];
        return (
          <>
            <DropDownButton
              visible={true}
              icon="more"
              showArrowIcon={false}
              dropDownOptions={{
                width: 200,
              }}
            >
              {listsButtonDropDown.map(
                (btn: { content: ReactNode; visible?: any }, index: number) => {
                  return (
                    <Item
                      key={index}
                      render={() => {
                        return <>{btn.content}</>;
                      }}
                      visible={btn.visible}
                    ></Item>
                  );
                }
              )}
            </DropDownButton>
          </>
        );
      },
    },
  ];
  const handleAddNew = () => {
    navigate("/admin/InventoryCusReturn/Create");
  };

  const windowSize = useWindowSize();
  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("Mst_InventoryCusReturn")}</div>
          <div className="mx-2">
            <BButton
              iconName="plus"
              label={t("AddNew")}
              onClick={handleAddNew}
            />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchForm
              data={data ?? searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              keyExpr={"DlrContractNo"}
              dataSource={[]}
              columns={columns}
              isLoading={false}
              autoFetchData={false}
              allowSelection={false}
              storeKey={"Dlr_ContractHQ_List"}
              customToolbarItems={toolbarItems ?? []}
              fetchData={fetchData}
              // onSelectionGetData={handleSelectionChanged}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
