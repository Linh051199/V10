import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { Button, TreeList } from "devextreme-react";
import {
  Column,
  ColumnChooser,
  HeaderFilter,
  SearchPanel,
  Selection,
  Toolbar,
  Item as ToolbarItem,
} from "devextreme-react/tree-list";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Icon } from "../icons";

const TreeGridView = ({ fetchData, dataSourceOptions }) => {
  const treeViewRef = useRef<any>(null);

  console.log(treeViewRef);

  const handleSelectedRowKeysChange = (value) => {
    console.log(value);
  };

  const dataSource = [
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T2",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555709",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "160007555709",
      ProductCodeBase: "0C3008GM00000TT",
      ProductCodeRoot: "0C3008GM00000TT",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T21",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555709",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "160007555709",
      ProductCodeBase: "0C3008GM00000TT",
      ProductCodeRoot: "0C3008GM00000TT",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
      ParentId: "0C3008GM00000T2",
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T3",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555710",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "Sản phẩm TT240109A",
      ProductCodeBase: "0C3008GM00000TT",
      ProductCodeRoot: "0C3008GM00000TT",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T4",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555711",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "160007555710",
      ProductCodeBase: "0C3008GM00000TT",
      ProductCodeRoot: "0C3008GM00000TT",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T5",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555712A",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "160007555710",
      ProductCodeBase: "0C3008GM00000TT",
      ProductCodeRoot: "0C3008GM00000TT",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T6",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555713B",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "160007555711",
      ProductCodeBase: "0C3008GM00000T6",
      ProductCodeRoot: "0C3008GM00000T6",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0C3008GM00000T8",
      NetworkID: "6451164000",
      ProductCodeUser: "160007555715TTB",
      BrandCode: "HYUNDAI",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "160007555711",
      ProductCodeBase: "0C3008GM00000T8",
      ProductCodeRoot: "0C3008GM00000T8",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 1035000,
      UPSell: 1500000,
      FlagActive: "1",
      mb_BrandName: "Hyundai",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0E3008GM000VSN9",
      NetworkID: "6451164000",
      ProductCodeUser: "CV01",
      ProductType: "SERVICE",
      ProductGrpCode: "ALL",
      ProductName: "Công thay dầu máy",
      ProductCodeBase: "0E3008GM000VSN9",
      ProductCodeRoot: "0E3008GM000VSN9",
      UnitCode: "LAN",
      FlagSell: "0",
      FlagBuy: "0",
      UPBuy: 0,
      UPSell: 500000,
      FlagActive: "1",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "SERVICE",
      mpt_ProductTypeName: "Dịch vụ",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0E3008GM000VSPZ",
      NetworkID: "6451164000",
      ProductCodeUser: "CV02",
      ProductType: "SERVICE",
      ProductGrpCode: "ALL",
      ProductName: "Công thay kính chắn gió",
      ProductCodeBase: "0E3008GM000VSPZ",
      ProductCodeRoot: "0E3008GM000VSPZ",
      UnitCode: "LAN",
      FlagSell: "0",
      FlagBuy: "0",
      UPBuy: 0,
      UPSell: 200000,
      FlagActive: "1",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "SERVICE",
      mpt_ProductTypeName: "Dịch vụ",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0E3008GM000VSQC",
      NetworkID: "6451164000",
      ProductCodeUser: "PT01",
      BrandCode: "",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "Kính chắn gió loại 2",
      ProductCodeBase: "0E3008GM000VSQC",
      ProductCodeRoot: "0E3008GM000VSQC",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 0,
      UPSell: 1000000,
      FlagActive: "1",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
    {
      CountPrdBase: "1",
      OrgID: "6451164000",
      ProductCode: "0E3008GM000VSS2",
      NetworkID: "6451164000",
      ProductCodeUser: "PT02",
      ProductType: "PRODUCT",
      ProductGrpCode: "ALL",
      ProductName: "Kính chắn gió-",
      ProductCodeBase: "0E3008GM000VSS2",
      ProductCodeRoot: "0E3008GM000VSS2",
      UnitCode: "CAI",
      FlagSell: "1",
      FlagBuy: "1",
      UPBuy: 0,
      UPSell: 250000,
      FlagActive: "1",
      mpg_ProductGrpName: "ALL",
      mpt_ProductType: "PRODUCT",
      mpt_ProductTypeName: "Sản phẩm",
      CustomDataDict: {},
    },
  ];

  useEffect(() => {}, []);

  const [searchPanelVisible, setSearchPanelVisible] = useAtom(
    searchPanelVisibleAtom
  );

  const onToolbarPreparing = (e) => {
    let toolbarItems = e.toolbarOptions.items;

    // e.toolbarOptions.items.push({
    //   widget: "dxButton",
    //   location: "after",
    //   visible: false,
    //   options: {
    //     icon: "/images/icons/settings.svg",
    //     elementAttr: {
    //       id: "myColumnChooser",
    //     },
    //     onClick: () => setVisible(!visible),
    //   },
    // });
  };

  return (
    <TreeList
      dataSource={dataSource}
      showBorders={true}
      columnAutoWidth={true}
      wordWrapEnabled={true}
      keyExpr="ProductCode"
      parentIdExpr="ParentId"
      id="tasks"
      ref={treeViewRef}
      height={600}
      onSelectedRowKeysChange={handleSelectedRowKeysChange}
      showColumnLines
      showColumnHeaders
      showRowLines
      searchPanel={{
        highlightSearchText: true,
      }}
      onToolbarPreparing={onToolbarPreparing}
    >
      <SearchPanel visible={true} width={250} />
      <HeaderFilter visible={true} />
      <Selection mode="multiple" />
      <ColumnChooser enabled={true} />

      <Toolbar>
        <ToolbarItem location="before" visible={true}>
          <Button
            onClick={() => setSearchPanelVisible(true)}
            stylingMode="text"
          >
            <div className="toggle__search mb-[1px]">
              <Icon name={"search"} width={14} height={14} />
            </div>
          </Button>
        </ToolbarItem>

        <ToolbarItem name="searchPanel" location="before" visible={true} />
      </Toolbar>

      <Column dataField="ProductCode" width={300} caption="Mã hàng" />
      <Column
        dataField="ProductName"
        caption="Tên hàng"
        minWidth={200}
      ></Column>
      <Column
        dataField="mpt_ProductTypeName"
        caption="Lọai hàng"
        width={200}
      ></Column>
      <Column
        dataField="mpg_ProductGrpName"
        caption="Nhóm hàng"
        width={200}
      ></Column>
      <Column dataField="BrandCode" caption="Nhãn hiệu" width={200}></Column>
      <Column dataField="UnitCode" caption="Đơn vị" width={200}></Column>
      <Column dataField="FlagBuy" caption="Được mua" width={200}></Column>
      <Column dataField="FlagSell" caption="Được bán" width={200}></Column>
      <Column dataField="UpBuy" caption="Giá mua" width={200}></Column>
      <Column dataField="UpSell" caption="Giá bán" width={200}></Column>
      <Column
        dataField="FlagActive"
        caption="Trạng thái hoạt động"
        width={200}
      ></Column>
      <Column dataField="OrgID" caption="Chi nhánh" width={200}></Column>
    </TreeList>
  );
};

export default TreeGridView;
