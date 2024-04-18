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
import { forwardRef, useState } from "react";
import { permissionAtom } from "@/packages/store/permission-store";
import { readOnlyAtom, selectMonth } from "./store";
import { formatDateFollowYM } from "@/packages/common/date_utils";
import { TextArea } from "devextreme-react";

interface HeaderFormEditProps {
  ref: string;
  dataForm: any;
  onUpdateDate: (e: any) => void;
}

export const HeaderFormEdit = forwardRef(
  ({ dataForm, onUpdateDate }: HeaderFormEditProps, ref: any) => {
    const readOnly = useAtomValue(readOnlyAtom);
    const { t } = useI18n("QuanLyDeNghiCungCapGia_Create");
    const { t: validateMsg } = useI18n("Validate");
    const [disabled, setDisabled] = useState(false);

    const permissionStore = useAtomValue(permissionAtom);
    const handleChangeOrderType = async (SOType: string) => {
      const flagTCG = permissionStore.sysUser?.md_FlagTCG;
      if (SOType) {
        // await api
        //   .HQ_DMS40_Ord_SalesOrderRoot_GetSeqForOrdSalesOrderRoot(
        //     SOType,
        //     flagTCG ?? "0"
        //   )
        await new Promise((resolve, reject) => { }).then((resp: any) => {
          if (resp.isSuccess) {
            if (SOType === "P") {
              ref.current?.instance?.updateData("SPCode", "CSC");
              setDisabled(true);
            } else if (SOType === "U") {
              ref.current?.instance?.updateData("SPCode", "");
              ref.current?.instance?.updateData("ExpectedMonth", null);
              setDisabled(false);
            }

            ref.current?.instance?.updateData("SORCode", resp.Data);
            ref.current?.instance?.repaint();
          } else {
            ref.current?.instance?.updateData("SORCode", null);
            showError({
              message: t(resp._strErrCode),
              _strErrCode: resp._strErrCode,
              _strTId: resp._strTId,
              _strAppTId: resp._strAppTId,
              _objTTime: resp._objTTime,
              _strType: resp._strType,
              _dicDebug: resp._dicDebug,
              _dicExcs: resp._dicExcs,
            });
          }
        });
      } else {
        ref.current?.instance?.updateData("SORCode", null);
      }
    };

    const orderType = [
      {
        label: "Kế hoạch",
        value: "P",
      },
      {
        label: "NgoàiKH",
        value: "U",
      },
    ];

    const api = useClientgateApi();

    const showError = useSetAtom(showErrorAtom);
    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={2}
          formData={dataForm}
          readOnly={readOnly}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("SoKhieuNai"),
              }}
              dataField={"SoKhieuNai"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly
                    width={"65%"}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NgayTao"),
              }}
              dataField={"NgayTao"}
              // isRequired={true}
              // validationRules={[
              //   {
              //     type: "required",
              //   },
              //   RequiredField(validateMsg("NhaCungCap")),
              // ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly
                    width={"65%"}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>

          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("DaiLy"),
              }}
              dataField={"DaiLy"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly
                    width={"65%"}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("PhanLoaiKhieuNai"),
              }}
              dataField={"PhanLoaiKhieuNai"}
              editorOptions={{
                validationMessageMode: "always",
              }}
              validationRules={[RequiredField(t("IsRequired"))]}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const readOnly = formInstance.option("readOnly");
                return (
                  <div className="">
                    <SelectField
                      width={"65%"}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={async (e: any) => {
                        await handleChangeOrderType(e.value);
                        formInstance.updateData(dataField, e.value);
                      }} items={[]}
                      dataField={dataField}
                      formInstance={formInstance}
                      validationGroup={formInstance.option("validationGroup")}
                      validationRules={[RequiredField(validateMsg("PhanLoaiKhieuNaiIsRequired"))]}
                    />
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);
