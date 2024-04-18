import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { ForwardedRef, forwardRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import {
  Autocomplete,
  Button,
  NumberBox,
  TextArea,
  TextBox,
} from "devextreme-react";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { SelectField } from "@/packages/components/select-field";
import { toast } from "react-toastify";
import { faker } from "@faker-js/faker";
import CustomStore from "devextreme/data/custom_store";
import "./styles.scss";
import DataSource from "devextreme/data/data_source";
import { useQuery } from "@tanstack/react-query";
import ODataStore from "devextreme/data/odata/store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { listKhachHang } from "@/packages/api/clientgate/carservice/XuatKhoApi";
interface HeaderFormEditProps {
  code?: string | any;
  time?: any;
}
export const HeaderFormEdit = forwardRef(
  ({ code, time }: HeaderFormEditProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("QR_BoxV3_Create");

    const [formData, setFormData] = useState({
      SoPhieuNhap: "",
      LoaiNhapKho: "",
      KhoNhap: "",
      NhaCungCap: "",
      SoContainer: "",
      RefType: "",
      SoRefNo: "",
      NhapTheoDonHang: false,
      SoHopDong: "",
      SoHoaDon: "",
      BienSoXe: "",
      NoiDungNhap: "",
      TongTienHang: "",
      TongGiamGia: "",
      TongTienTraNCC: "",
    });
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const handleDropDownBtnSearch = () => {
      toast.info("popup");
    };
    //
    // const listLocationID = new DataSource({
    //   key: "LocationID",
    //   load: async (loadOptions) => {
    //     const response = await api.Ser_Mst_Location_GetAllActive();

    //     return response.DataList;
    //   },
    //   byKey: async (loadOptions) => {
    //     const response = await api.Ser_Mst_Location_GetAllActive();

    //     return response.DataList;
    //   },
    //   pageSize: 5,
    //   loadMode: "raw",
    //   // cacheRawData: true,
    // });

    //
    const { data: testData } = useQuery(["listLocationID", "xxx"], async () => {
      const response = await api.Xuat_Kho_Search({
        key: "",
      });
      return response;
    });
    const store = new CustomStore({
      key: "MaHangHoa",
      cacheRawData: true,
      // loadMode: "raw",
      loadMode: "processed",
      load: async (loadOptions) => {
        console.log("loadOptions ", loadOptions);
        const resp: any = await api.Xuat_Kho_Search({
          key: "",
        });
        if (!loadOptions.searchValue || loadOptions.searchValue == "") {
          return [];
        }

        return resp;
      },
      byKey: async (key: any) => {
        // if (!!key || key == "") {
        //   return [];
        // }
        const resp: any = await api.Xuat_Kho_Search({
          key: "",
        });
        return resp;
      },
      // pageSize: 5,
      // searchExpr: ["MaHangHoa"],
      // searchValue: ""
      // filter: ["MaHangHoa", "contains", key],
    });

    const storeAutoCom = new DataSource({
      store: new ODataStore({
        url: "http://www.example.com/Northwind.svc/Products",
        key: "ProductID",
        keyType: "Int32",
        // Other ODataStore properties go here
      }),
      // Other DataSource properties go here
    });
    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={3}
          formData={formData}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("SoPhieuNhap"),
              }}
              dataField={"SoPhieuNhap"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("LoaiXuatKho"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"LoaiXuatKho"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={"LoaiXuatKho"}
                    // items={listLoaiXuatKho}
                    // valueExpr={"value"}
                    // displayExpr={"label"}
                    items={store}
                    valueExpr={"MaHangHoa"}
                    displayExpr={"TenHangHoa"}
                    onValueChanged={async (e) => {
                      console.log("==================", e);
                      formInstance.updateData(dataField, e.value);
                    }}
                    onOpened={(e) => {
                      console.log("______________e ", e);
                      // const data = ref?.current?.instance.option("formData");
                      // const result = resp.filter(
                      //   (item) => item.MaHangHoa === data.LoaiXuatKho
                      // );
                      // console.log(
                      //   "===result",
                      //   result,
                      //   resp,
                      //   ref?.current?.instance.option("formData")
                      // );
                      // e.component.options("items");
                    }}
                    defaultValue={value}
                    dropDownOptions={{
                      onShowing: (e: any) => {
                        e.component.option("toolbarItems", [
                          {
                            widget: "dxButton",
                            options: {
                              text: "Search",
                              onClick: handleDropDownBtnSearch,
                            },
                          },
                        ]);
                      },
                    }}
                    itemRender={(data: any) => {
                      return (
                        <div className="slt-box-container flex p-0 m-0">
                          <img
                            className="slt-box-img w-[40px] h-[40px] rounded-full"
                            alt="Product name"
                            src={data.Img ?? ""}
                          />
                          <div className="product-name pl-[10px]">
                            <p className="font-bold">{data.TenHangHoa ?? ""}</p>
                            <p>{data.Desc}</p>
                          </div>
                        </div>
                      );
                    }}
                    // fieldRender={(data: any) => {
                    //   return (
                    //     <div className="slt-box-container flex p-0 m-0">
                    //       pppp
                    //     </div>
                    //   );
                    // }}
                    // validationRules={[RequiredField(t("Dealer"))]}
                    // validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("KhoXuat"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"KhoXuat"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    valueExpr="MaHangHoa"
                    // valueExpr={"TenHangHoa"}
                    items={testData}
                    onValueChanged={async (e: any) => {
                      console.log("eeeeeeeeee", e);
                      formInstance.updateData(dataField, e.value);
                    }}
                    itemRender={(data: any) => {
                      return (
                        <div className="slt-box-container flex p-0 m-0">
                          <img
                            className="slt-box-img w-[40px] h-[40px] rounded-full"
                            alt="Product name"
                            src={data.Img ?? ""}
                          />
                          <div className="product-name pl-[10px]">
                            <p className="font-bold">{data.TenHangHoa ?? ""}</p>
                            <p>{data.Desc}</p>
                          </div>
                        </div>
                      );
                    }}
                    dropDownOptions={{
                      onShowing: (e: any) => {
                        e.component.option("toolbarItems", [
                          {
                            widget: "dxButton",
                            options: {
                              text: "Search",
                              onClick: handleDropDownBtnSearch,
                            },
                          },
                        ]);
                      },
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("KhachHang"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"KhachHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={dataField}
                    items={listKhachHang}
                    valueExpr={"Idx"}
                    displayExpr={"Name"}
                    onValueChanged={() => {}}
                    defaultValue={value}
                    dropDownOptions={{
                      onShowing: (e: any) => {
                        e.component.option("toolbarItems", [
                          {
                            widget: "dxButton",
                            options: {
                              text: "Search",
                              onClick: handleDropDownBtnSearch,
                            },
                          },
                        ]);
                      },
                    }}
                    // validationRules={[RequiredField(t("Dealer"))]}
                    // validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>

          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("NhapTheoDonHang"),
              }}
              dataField={"NhapTheoDonHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <CheckboxField
                    dataField={dataField}
                    label={""}
                    formInstance={formInstance}
                    onValueChanged={() => {}}
                    // formInstance={formInstance}
                    // dataField={dataField}
                    // defaultValue={value}
                    //
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("RefType"),
              }}
              dataField={"RefType"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoRefNo"),
              }}
              dataField={"SoRefNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoContainer"),
              }}
              dataField={"SoContainer"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("SoHopDong"),
              }}
              dataField={"SoHopDong"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoHoaDon"),
              }}
              dataField={"SoHoaDon"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("BienSoXe"),
              }}
              dataField={"BienSoXe"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NoiDungNhap"),
              }}
              dataField={"NoiDungNhap"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TongTienHang"),
              }}
              dataField={"TongTienHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <NumberBox readOnly format="#,##0.##" defaultValue={0} />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TongGiamGia"),
              }}
              dataField={"TongGiamGia"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <NumberBox readOnly format="#,##0.##" defaultValue={0} />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TongTienTraNCC"),
              }}
              dataField={"TongTienTraNCC"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <NumberBox readOnly format="#,##0.##" defaultValue={0} />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);
