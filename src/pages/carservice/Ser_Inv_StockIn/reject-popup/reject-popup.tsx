import { useI18n } from "@/i18n/useI18n";
import {
  RequiredDateBoxCompareToNow,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { useClientgateApi } from "@packages/api";
import { TextField } from "@packages/components/text-field";
import { SelectField } from "@/packages/components/select-field";
import { showErrorAtom } from "@packages/store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { permissionAtom } from "@/packages/store/permission-store";
import { formatDateFollowYM } from "@/packages/common/date_utils";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { Button, Popup, ScrollView } from "devextreme-react";
import { toast } from "react-toastify";
import { BButton } from "@/packages/components/buttons";
import ConfirmComponent from "@/packages/components/ConfirmComponent";

interface RejectPopupProps {
  ref: string;
  dataForm: any;
  onSaveForm: (data: any) => void;
  modifyData: any;
  curUser: any;
}
export const RejectPopup = forwardRef(
  (
    { dataForm, onSaveForm, modifyData, curUser }: RejectPopupProps,
    ref: any
  ) => {
    const { t } = useI18n("SerInvStockIn_RejectPopup");
    const { t: validateMsg } = useI18n("Validate");
    const [disabled, setDisabled] = useState(false);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const permissionStore = useAtomValue(permissionAtom);
    const showRejectPopup = useVisibilityControl({ defaultVisible: false });
    const RejectPopupRef = useRef<any>();
    // show/hide form
    useImperativeHandle(ref, () => ({
      isActive() {
        return showRejectPopup;
      },
      toggleActive() {
        return showRejectPopup.visible
          ? this.closeRejectPopup()
          : this.openRejectPopup();
      },
      getRejectPopupRef() {
        return RejectPopupRef;
      },
      openRejectPopup() {
        // set Trạng thái mở của popup
        showRejectPopup.open();
      },
      closeRejectPopup() {
        // set Trạng thái đóng của popup
        showRejectPopup.close();
      },
    }));

    const handleSaveForm = async () => {
      // const formRef = formModifyRef.current.getRejectPopupRef();
      //
      // const validate = formRef.current?.instance.validate();
      // if (!validate?.isValid) {
      //   return;
      // } else {
      ConfirmComponent({
        asyncFunction: async () => {
          // const gridRef = gridViewOneRef.current.getGridRef();
          // const formData = formRef?.current?._instance.option("formData");
          // const dataList = gridRef?.current
          //   ?.getDxInstance()
          //   .option("dataSource");
          const request = {
            DealerCode: curUser.DealerCode ?? "",
            StockInID: modifyData.lst_Ser_Inv_StockIn[0].StockInID ?? "",
            RejectBy: curUser.UserCode ?? "",
            // DealerCode: "",
            // StockInID: "",
            // RejectBy: "",
            RejectDate: format(new Date(), "yyyy-MM-dd") ?? "",
            RejectDescription: dataForm.RejectDescription ?? "",
          };
          const response = await api.Ser_Inv_StockIn_Reject(request);
          if (response.isSuccess) {
            toast.success(`${"CreateSuccessfully"}`);
          } else {
            showError({
              message: t(response._strErrCode),
              _strErrCode: response._strErrCode,
              _strTId: response._strTId,
              _strAppTId: response._strAppTId,
              _objTTime: response._objTTime,
              _strType: response._strType,
              _dicDebug: response._dicDebug,
              _dicExcs: response._dicExcs,
            });
          }
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
      // }
    };

    return (
      <div className={"p-2  "}>
        <Popup
          visible={showRejectPopup.visible}
          title={t("SerInvStockIn_RejectPopup")}
          showCloseButton={true}
          onHiding={() => {
            showRejectPopup.close();
          }}
          wrapperAttr={{
            id: "SearchInforPart_Popup",
          }}
          height={"50%"}
          // height={"auto"}
          width={"50%"}
          // fullScreen={true}
        >
          <Form
            visible={showRejectPopup.visible}
            ref={RejectPopupRef}
            colCount={1}
            formData={dataForm}
            readOnly={false}
            labelLocation={"left"}
            validationGroup={"main"}
          >
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("RejectBy"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(validateMsg("RejectBy")),
                ]}
                dataField={"RejectBy"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      readOnly
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("RejectDate"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(validateMsg("RejectDate")),
                ]}
                dataField={"RejectDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      readOnly
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("RejectDescription"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(validateMsg("RejectDescription")),
                ]}
                dataField={"RejectDescription"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                    />
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </Form>
          <div className="block text-center">
            <BButton
              className="text-center"
              label={`${t("Save")}`}
              onClick={handleSaveForm}
            />
          </div>
        </Popup>
      </div>
    );
  }
);
