import { GridCustomToolBarItem } from "@/packages/ui/gridview-one/grid-custom-toolbar";
import { Button, Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import React, { useRef, useState } from "react";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { toast } from "react-toastify";
import { useClientgateApi } from "@/packages/api";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import { quantity } from "../../../store";
import QuantityComponent from "./quantity";
type Props = {
  handleSettingExcel: (t: string) => void;
  handleSelectChange: any;
  handleCheckValidate: any;
  handleOpen: any;
};

const customToolbar = ({
  handleSettingExcel,
  handleSelectChange,
  handleCheckValidate,
  handleOpen,
}: Props) => {
  const forCustomerRef: any = useRef();
  const formData = {};
  const [change, setChange] = useState(true);

  const handleDropdownShowing = (e: any, s: string) => {
    const popup = e.component; // Access the popup instance

    popup.option("toolbarItems", [
      {
        widget: "dxButton",

        options: {
          text: "Tìm kiếm thêm",
          icon: "plus", // Optional icon
          onClick: () => {
            handleOpen();
          },
        },
      },
    ]);
  };

  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const store = new CustomStore({
    key: "CustomerCode",
    cacheRawData: true,
    loadMode: "processed",
    load: async (loadOptions) => {
      const check = handleCheckValidate();
      console.log("check", check, "loadOptions ", loadOptions);
      if (check.isValid) {
        if (!loadOptions.searchValue || loadOptions.searchValue == "") {
          return [];
        }

        const resp: any = await api.Mst_Customer_Search({
          KeyWord: loadOptions?.searchValue,
          ScrTplCodeSys: "SCRTPLCODESYS.2023",
          Ft_PageSize: 15,
        });
        return [
          {
            MaHangHoa: "HangHoa1",
            TenHangHoa: "Hàng Hóa 1",
            DonVi: "Cai",
          },
          {
            MaHangHoa: "HangHoa2",
            TenHangHoa: "Hàng Hóa 2",
            DonVi: "Cai",
          },
          {
            MaHangHoa: "HangHoa3",
            TenHangHoa: "Hàng Hóa 3",
            DonVi: "Cai",
          },
          {
            MaHangHoa: "TimKiemThem",
            TenHangHoa: "Tìm Kiếm Thêm",
            DonVi: "Cai",
          },
        ];
      } else {
        // toast.error("Vui lòng nhập đủ thông tin trên Form");

        return [];
      }
      // if (field?.value?.CustomerCodeSys) {
      //   return [{ ...field.value }];
      // }
    },
    byKey: async (key: any) => {
      // if (key && field.value) {
      //   return [{ ...field.value }];
      // }

      // return [];

      const resp: any = await api.Mst_Customer_Search({
        ScrTplCodeSys: "SCRTPLCODESYS.2023",
        KeyWord: key,
        Ft_PageSize: 15,
      });
      return resp?.DataList.filter((i: any) => i.CustomerCode === key) ?? [];
    },
  });

  const listButtonMoreWhenCheck = (ref: any) => {
    const listData: any[] = ref.current?.instance?.getSelectedRowsData?.();

    let listButton = [
      {
        text: "Nhập hàng hóa",
        action: () => {
          handleSettingExcel("Nhập hàng hóa");
        },
      },
      {
        text: "Nhập lô",
        action: () => {
          handleSettingExcel("Nhập lô");
        },
      },
      {
        text: "Nhập serial",
        action: () => {
          handleSettingExcel("Nhập serial");
        },
      },
      {
        text: "Nhập thông tin xác thực",
        action: () => {
          handleSettingExcel("Nhập thông tin xác thực");
        },
      },
      {
        text: "Xu Nhập thông tin xác thực rất hàng hóa",
        action: () => {
          handleSettingExcel("Xuất hàng hóa");
        },
      },
      {
        text: "Xuất lô",
        action: () => {
          handleSettingExcel("Xuất lô");
        },
      },
      {
        text: "Xuất serial",
        action: () => {
          handleSettingExcel("Xuất serial");
        },
      },
      {
        text: "Xuất thông tin xác thực",
        action: () => handleSettingExcel("Xuất thông tin xác thực"),
      },
    ];

    return (
      <div className="flex align-items-center justify-start">
        <DropDownButton
          showArrowIcon={false}
          keyExpr={"id"}
          className="menu-items"
          displayExpr={"text"}
          wrapItemText={false}
          dropDownOptions={{
            width: 150,
            wrapperAttr: {
              class: "headerform__menuitems",
            },
          }}
          icon="/images/icons/more.svg"
        >
          {listButton.map((item: any, index: number) => {
            return (
              <DropDownButtonItem
                key={"Button Inside " + index}
                render={(itemRe: any) => {
                  return (
                    <Button onClick={() => item.onclick(listData)}>
                      {`${item.text}`}
                    </Button>
                  );
                }}
              />
            );
          })}
        </DropDownButton>
      </div>
    );
  };

  const ToolBarList: GridCustomToolBarItem[] = [
    {
      text: "",
      onClick: (ref: any) => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => {
        return (
          <Form labelMode="hidden" ref={forCustomerRef} formData={formData}>
            <SimpleItem
              dataField="SearchPrdCodeOrPrdName"
              editorType="dxSelectBox"
              visible={change}
              editorOptions={{
                dataSource: store,
                onValueChanged: handleSelectChange,
                // width: 250,
                dropDownOptions: {
                  onShowing: (e: any) => handleDropdownShowing(e, "NhaCungCap"),
                  height: "auto",
                  wrapperAttr: {
                    class: "demo-dropdown",
                  },
                },
                displayExpr: "TenHangHoa",
                valueExpr: "MaHangHoa",
                searchEnabled: true,
                placeholder: "Nhập tên hàng hoặc mã hàng để tìm kiếm",
              }}
            />
            <SimpleItem
              visible={!change}
              dataField="quetmavach"
              editorOptions={{
                width: 250,
                placeholder: "Quét mã vạch",
              }}
            />
          </Form>
        );
      },
    },
    {
      text: "Quét mã vạch",
      onClick: (ref: any) => {
        console.log("Quét mã vạch");
        setChange((prev) => !prev);
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
    {
      text: "",
      onClick: () => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => listButtonMoreWhenCheck(ref),
    },

    {
      text: "",
      onClick: (ref: any) => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => {
        return <QuantityComponent />;
      },
    },
  ];

  return ToolBarList;
};

export default customToolbar;
