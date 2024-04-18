import { useI18n } from "@/i18n/useI18n";
import {
  RequiredDateBoxCompareToNow,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { useConfiguration } from "@/packages/hooks";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { useClientgateApi } from "@packages/api";
import { TextField } from "@packages/components/text-field";
import { SelectField } from "@/packages/components/select-field";
import { showErrorAtom } from "@packages/store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import { forwardRef, useEffect, useState } from "react";
import { permissionAtom } from "@/packages/store/permission-store";
import { readOnlyAtom, selectMonth } from "./store";
import { formatDateFollowYM } from "@/packages/common/date_utils";
import { usePermissions } from "@/packages/contexts/permission";
import { useParams } from "react-router-dom";

interface HeaderFormEditProps {
  dataUpdate: any;
  ref: string;
  StockInNoCode?: string;
  DealerCode?: string;
}

export const HeaderFormEdit = forwardRef(
  (
    { dataUpdate, StockInNoCode, DealerCode }: HeaderFormEditProps,
    ref: any
  ) => {
    const readOnly = useAtomValue(readOnlyAtom);
    const param = useParams();
    const { t } = useI18n("Ser_Inv_StockIn_Create");
    const { t: validateMsg } = useI18n("Validate");
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const permissionStore = useAtomValue(permissionAtom);

    const [formData, setFormData] = useState({
      SupplierID: "",
      DealerCode: DealerCode,
      StockInNo: StockInNoCode,
      StockInType: !param.code ? "1" : "",
      StockInDate: format(new Date(), "yyyy-MM-dd"),
      Description: "",
      BillNo: "",
      OrderPartId: "",
      OrderPartNo: "",
    });
    useEffect(() => {
      if (param.idUpdate) {
        setFormData((prev) => {
          return {
            ...prev,
            SupplierID: dataUpdate?.lst_Ser_Inv_StockIn[0]?.SupplierID,
            DealerCode: dataUpdate?.lst_Ser_Inv_StockIn[0]?.DealerCode,
            StockInNo: dataUpdate?.lst_Ser_Inv_StockIn[0]?.StockInNo,
            StockInType:
              dataUpdate?.lst_Ser_Inv_StockIn[0]?.StockInType.toString(),
            StockInDate: dataUpdate?.lst_Ser_Inv_StockIn[0]?.StockInDate,
            Description: dataUpdate?.lst_Ser_Inv_StockIn[0]?.Description,
            BillNo: dataUpdate?.lst_Ser_Inv_StockIn[0]?.BillNo,
            OrderPartId: dataUpdate?.lst_Ser_Inv_StockIn[0]?.OrderPartId,
            OrderPartNo: dataUpdate?.lst_Ser_Inv_StockIn[0]?.OrderPartNo,
          };
        });
      } else {
        return;
      }
    }, [param.idUpdate]);

    const { data: listSupplierName } = useQuery(
      ["listSupplierName", "Ser_Inv_StockIn_Create"],
      async () => {
        const resp = await api.Ser_Mst_Supplier_GetAllActive();
        if (resp.isSuccess) {
          return resp.DataList;
        } else {
          return [];
        }
      }
    );
    const listStockInType = [
      {
        label: "Nhập thường",
        value: "1",
      },
      {
        label: "Điều chỉnh",
        value: "2",
      },
      {
        label: "Trả hàng",
        value: "3",
      },
      {
        label: "Theo đơn hàng",
        value: "4",
      },
    ];

    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={3}
          formData={formData}
          readOnly={readOnly}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("StockInNo"),
              }}
              dataField={"StockInNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    // value={StockInNoCode}
                    readOnly
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("StockInDate"),
              }}
              dataField={"StockInDate"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];

                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={format(new Date(), "yyyy-MM-dd")}
                    // value={format(new Date(), "yyyy-MM-dd")}
                    readOnly={true}
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("OrderPartNo"),
              }}
              dataField={"OrderPartNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>

          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("SupplierID"),
              }}
              dataField={"SupplierID"}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(validateMsg("SupplierID")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const readOnly = formInstance.option("readOnly");

                return (
                  <SelectField
                    // readOnly={readOnly}
                    width={"100%"}
                    dataField={dataField}
                    defaultValue={formData?.[dataField]}
                    formInstance={formInstance}
                    items={listSupplierName}
                    displayExpr={"SupplierName"}
                    valueExpr={"SupplierID"}
                    onValueChanged={async (e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationGroup={formInstance.option("validationGroup")}
                    validationRules={[
                      RequiredField(validateMsg("SupplierID_Is_Required")),
                    ]}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("StockInType"),
              }}
              dataField={"StockInType"}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(validateMsg("StockInType")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const readOnly = formInstance.option("readOnly");

                return (
                  <SelectField
                    readOnly={param.idUpdate ? false : true}
                    width={"100%"}
                    dataField={dataField}
                    defaultValue={formData?.[dataField]}
                    formInstance={formInstance}
                    items={listStockInType}
                    displayExpr={"label"}
                    valueExpr={"value"}
                    onValueChanged={async (e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationGroup={formInstance.option("validationGroup")}
                    validationRules={[
                      RequiredField(validateMsg("StockInType_Is_Required")),
                    ]}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("BillNo"),
              }}
              dataField={"BillNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    // readOnly
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("SoYeCauXuatNCC"),
              }}
              dataField={"SoYeCauXuatNCC"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    // readOnly
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("KhoNhap"),
              }}
              dataField={"KhoNhap"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const readOnly = formInstance.option("readOnly");

                return (
                  <SelectField
                    // readOnly={readOnly}
                    width={"100%"}
                    dataField={dataField}
                    defaultValue={formData?.[dataField]}
                    formInstance={formInstance}
                    items={[]}
                    displayExpr={"label"}
                    valueExpr={"value"}
                    onValueChanged={async (e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("Description"),
              }}
              dataField={"Description"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    // readOnly
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem>
            {/* <SimpleItem
              label={{
                text: t("DealerCode"),
              }}
              dataField={"DealerCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    // defaultValue={DealerCode}
                    value={DealerCode}
                    readOnly
                    width={"100%"}
                  />
                );
              }}
            ></SimpleItem> */}
          </GroupItem>
        </Form>
      </div>
    );
  }
);
