import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { LoadPanel, NumberBox, ScrollView, TextArea } from "devextreme-react";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { MST_PARAM_OPTIONAL } from "./common";
import { useQuery } from "@tanstack/react-query";
import { Mst_Param_Save } from "@/packages/types/master/Mst_Param_Optional";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import "./style.css";
import { ContentReadyEvent } from "devextreme/ui/number_box";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
// import Globalize from "globalize";

// Load CLDR data
// Promise.all([
//   import("cldr-data/main/en/numbers.json"),
//   import("cldr-data/main/en/ca-gregorian.json"),
//   import("cldr-data/main/en/timeZoneNames.json"),
//   import("cldr-data/supplemental/likelySubtags.json"),
// ])
//   .then(([numbers, caGregorian, timeZoneNames, likelySubtags]) => {
//     console.log("xxxxx", numbers, caGregorian, timeZoneNames, likelySubtags);
//     Globalize.load(numbers.default);
//     Globalize.load(caGregorian.default);
//     Globalize.load(timeZoneNames.default);
//     Globalize.load(likelySubtags.default); // Load likelySubtags data
//   })
//   .then(() => {
//     // Set the locale to English (US)

//     Globalize.locale("en-US");
//   });

interface HeaderFormEditProps {}
export const HeaderFormEdit = forwardRef(
  ({}: HeaderFormEditProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("Mst_Param_Optional");
    const api = useClientgateApi();
    const { isHQ } = usePermissions();
    const showError = useSetAtom(showErrorAtom);
    const windowSize = useWindowSize();
    // const [formData, setFormData] = useState({  });
    const { data, refetch, isLoading } = useQuery({
      queryKey: [MST_PARAM_OPTIONAL.MST_PARAM_OPTIONAL],
      queryFn: async () => {
        let obj: any = {};
        const resp = await match(isHQ())
          .with(true, async () => {
            const response = await api.Mst_Param_Optional_SearchDL({
              ParamCode: "",
              ParamType: "Optional",
              DealerCode: "",
              ParamValue: "",
            });
            return response;
          })
          .otherwise(async () => {
            const response = await api.Mst_Param_Optional_SearchDL({
              ParamCode: "",
              ParamType: "Optional",
              DealerCode: "",
              ParamValue: "",
            });
            return response;
          });

        if (resp?.isSuccess && resp.DataList) {
          for (let item of resp?.DataList) {
            obj[item["ParamCode"]] = item.ParamValue;
          }
          return obj;
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
      },
      enabled: true,
    });

    useEffect(() => {
      refetch();
    }, []);

    const handleContentReady = (e: ContentReadyEvent) => {
      // e.component
    };

    return (
      <div className={"p-2 mst-param-option-container"}>
        <LoadPanel visible={isLoading} showPane={true} showIndicator={true} />
        <Form
          ref={ref}
          height={400}
          colCount={2}
          formData={data}
          labelLocation={"left"}
          validationGroup={"main"}
          elementAttr={{
            id: "mst-param-option-form",
            class: "mst-param-option-form",
          }}
        >
          <GroupItem colCount={1} cssClass="mst-param-option-group-item-left">
            <GroupItem
              colCount={1}
              cssClass={"group-item-customize group-item-padding-children"}
              caption={t("I. NotifyPriceService")}
            >
              <SimpleItem
                label={{
                  text: t("IsHidenPhoneNumber"),
                  location: "right",
                  // alignment: "right",
                  // visible: false,
                }}
                dataField={"IsHidenPhoneNumber"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <CheckboxField
                      // width={400}
                      width={"auto" as any}
                      // label={t(
                      //   "Cho phép hiển thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán"
                      // )}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  location: "right",
                  text: t("IsAuthStockOut"),
                  // visible: false,
                }}
                dataField={"IsAuthStockOut"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <CheckboxField
                      // width={400}
                      width={"auto" as any}
                      // label={t(
                      //   "Cho phép hiển thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán"
                      // )}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  location: "right",
                  text: t("IsAuthInvoice"),
                  // visible: false,
                }}
                dataField={"IsAuthInvoice"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <CheckboxField
                      // width={400}
                      width={"auto" as any}
                      // label={t(
                      //   "Cho phép hiển thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán"
                      // )}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  location: "right",
                  text: t("IsAuthEditQuotation"),
                  // visible: false,
                }}
                dataField={"IsAuthEditQuotation"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <CheckboxField
                      // width={400}
                      width={"auto" as any}
                      // label={t(
                      //   "Cho phép hiển thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán"
                      // )}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem
              colCount={1}
              cssClass={
                "group-item-customize group-item-padding-children mst-param-option-II-storage-part"
              }
              caption={t("II. Storage, Part")}
            >
              <SimpleItem
                label={{
                  text: t("IsAuthSO"),
                  location: "right",
                  // visible: false,
                }}
                dataField={"IsAuthSO"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <CheckboxField
                      // width={400}
                      width={"auto" as any}
                      // label={t(
                      //   "Cho phép hiển thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán"
                      // )}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </GroupItem>

          <GroupItem
            colCount={1}
            cssClass={"group-item-customize group-item-padding-children"}
            caption={t("KPI")}
          >
            <GroupItem
              colCount={1}
              cssClass={"group-item-customize group-item-padding-children"}
              caption={t("III. LaborUnitPrice")}
            >
              <SimpleItem
                label={{
                  text: t("UnitPriceBDN"),
                  // visible: false,
                }}
                dataField={"UnitPriceBDN"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={200}
                      text={t("Đơn giá giờ công bảo dưỡng nhanh (VND / giờ)")}
                      // value={value}
                      format={",##0.###"}
                      min={0}
                      onContentReady={handleContentReady}
                      defaultValue={+value}
                      stylingMode="underlined"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("UnitPriceSCC"),
                  // visible: false,
                }}
                dataField={"UnitPriceSCC"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={200}
                      text={t("Đơn giá giờ công sửa chữa (VND / giờ)")}
                      // value={value}
                      format={",##0.###"}
                      min={0}
                      defaultValue={+value}
                      stylingMode="underlined"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("UnitPriceSCD"),
                  // visible: false,
                }}
                dataField={"UnitPriceSCD"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={200}
                      text={t("Đơn giá giờ công sửa chữa đồng (VND / giờ)")}
                      // value={value}
                      format={",##0.###"}
                      min={0}
                      defaultValue={+value}
                      stylingMode="underlined"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("UnitPriceSCS"),
                  // visible: false,
                }}
                dataField={"UnitPriceSCS"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={200}
                      text={t("Đơn giá giờ công sửa chữa sơn (VND / giờ)")}
                      // value={value}
                      format={"#,##0.##"}
                      min={0}
                      // format={{
                      //   formatter: (number: any) => {
                      //     // const parts = number?.toString().split(".");
                      //     // // Lấy phần nguyên và thêm dấu phẩy
                      //     // parts[0] = parts[0].replace(
                      //     //   /\B(?=(\d{3})+(?!\d))/g,
                      //     //   ","
                      //     // );
                      //     // // Kết hợp lại thành chuỗi định dạng
                      //     // return parts.join(".");
                      //     const a = new Intl.NumberFormat("en-US").format(
                      //       number
                      //     );
                      //     // const y = Globalize.formatNumber(number);
                      //     console.log("🟡 ~ number:", a);
                      //     return a;
                      //   },
                      // }}
                      defaultValue={+value}
                      stylingMode="underlined"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            <GroupItem
              colCount={1}
              cssClass={"group-item-customize group-item-padding-children"}
              caption={t("IV. ProfitRate")}
            >
              <SimpleItem
                label={{
                  text: t("SerProfitRate"),
                  // visible: false,
                }}
                dataField={"SerProfitRate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={200}
                      text={t("Tỉ lệ lợi nhuận gộp công lao động ( % ) ")}
                      // value={value}
                      format={",##0.###"}
                      min={0}
                      max={100}
                      defaultValue={+value}
                      stylingMode="underlined"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("PartProfitRate"),
                  // visible: false,
                }}
                dataField={"PartProfitRate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={200}
                      text={t("Tỉ lệ lợi nhuận gộp phụ tùng ( % )")}
                      // value={value}
                      format={",##0.###"}
                      min={0}
                      max={100}
                      defaultValue={+value}
                      stylingMode="underlined"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      elementAttr={{
                        class:
                          "customize-value-right-in-numberbox customize-box-numberbox-border-none padding-number-right",
                      }}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </GroupItem>

          <GroupItem
            colCount={1}
            cssClass={
              "group-item-customize group-item-padding-children flex-basis-0 mst-param-option-V-others"
            }
            caption={t("V. Others")}
          >
            <SimpleItem
              label={{
                text: t("Khac"),
                // visible: false,
              }}
              dataField={"Khac"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <></>
                  // <TextArea
                  //   onValueChanged={(ev: any) => {
                  //     formInstance.updateData(dataField, ev.value);
                  //   }}
                  //   readOnly
                  //   defaultValue={value}
                  //   width={"100%"}
                  // />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);
