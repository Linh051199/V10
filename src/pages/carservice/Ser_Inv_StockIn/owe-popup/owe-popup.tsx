import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useClientgateApi } from "@packages/api";
import { TextField } from "@packages/components/text-field";
import { showErrorAtom } from "@packages/store";
import { format, previousDay } from "date-fns";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from "react";
import { permissionAtom } from "@/packages/store/permission-store";
import { NumberBox, Popup } from "devextreme-react";
import { toast } from "react-toastify";
import { BButton } from "@/packages/components/buttons";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useParams } from "react-router-dom";
import { match } from "ts-pattern";
import "./owe-popup.scss";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
interface OwePopupProps {
  ref: string;
  dataForm?: any;
  onSaveForm?: (data: any) => void;
  modifyData?: any;
  curUser?: any;
  SerCusDebitGetDL?: any;
  onRefetch: Function;
}
const reducer = (state: any, action: any) => {
  return action;
};
export const OwePopup = forwardRef(
  (
    {
      // dataForm, SerCusDebitGetDL,
      modifyData,
      onRefetch,
    }: OwePopupProps,
    ref: any
  ) => {
    const { t } = useI18n("SerInvStockIn_OwePopup");
    const paramUrl = useParams();
    const { t: validateMsg } = useI18n("Validate");
    const api = useClientgateApi();
    const [loadingKey, setDispatch] = useReducer(reducer, "0");
    const showError = useSetAtom(showErrorAtom);
    const permissionStore = useAtomValue(permissionAtom);
    const showOwePopup = useVisibilityControl({ defaultVisible: false });
    const OwePopupRef = useRef<any>();
    const [formData, setFormData] = useState({
      // CusDebitID: SerCusDebitGetDL?.lst_Ser_CusDebit[0]?.CusDebitID,
      // SupplierID: modifyData?.lst_Ser_Inv_StockIn[0]?.SupplierID,
      // SupplierName: modifyData?.lst_Ser_Inv_StockIn[0]?.SupplierName,
      // DebitAmount: SerCusDebitGetDL?.lst_Ser_CusDebit[0]?.DebitAmount,
      // DebitDate: format(new Date(), "yyyy-MM-dd"),
      // Note: !!SerCusDebitGetDL?.lst_Ser_CusDebit[0]?.CusDebitID
      //   ? SerCusDebitGetDL?.lst_Ser_CusDebit[0]?.Note
      //   : "",
      CusDebitID: "",
      SupplierID: "",
      SupplierName: "",
      DebitAmount: "",
      DebitDate: "",
      Note: "",
    });
    // GET DATA
    useEffect(() => {
      const getData = async () => {
        const request = {
          DealerCode: permissionStore?.sysUser?.DealerCode,
          StockInID: paramUrl.idUpdate,
        };
        const response = await api.Ser_Inv_StockIn_SerCusDebitGetDL(request);
        if (response.isSuccess) {
          // return response?.Data;
          setFormData((prev: any) => {
            return {
              ...prev,
              CusDebitID: response?.Data?.lst_Ser_CusDebit[0]?.CusDebitID,
              SupplierID: modifyData?.lst_Ser_Inv_StockIn[0]?.SupplierID,
              SupplierName: modifyData?.lst_Ser_Inv_StockIn[0]?.SupplierName,
              DebitAmount: response?.Data?.lst_Ser_CusDebit[0]?.DebitAmount,
              DebitDate: format(new Date(), "yyyy-MM-dd"),
              Note: !!response?.Data?.lst_Ser_CusDebit[0]?.CusDebitID
                ? response?.Data?.lst_Ser_CusDebit[0]?.Note
                : "",
            };
          });
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
      };
      getData();
    }, [loadingKey]);

    // show/hide form
    useImperativeHandle(ref, () => ({
      isActive() {
        return showOwePopup;
      },
      toggleActive() {
        return showOwePopup.visible
          ? this.closeOwePopup()
          : this.openOwePopup();
      },
      getOwePopupRef() {
        return OwePopupRef;
      },
      openOwePopup() {
        // set Trạng thái mở của popup
        showOwePopup.open();
      },
      closeOwePopup() {
        // set Trạng thái đóng của popup
        showOwePopup.close();
      },
    }));
    // handle
    const handleSaveForm = async () => {
      const isValidate = OwePopupRef.current?.instance.validate().isValid;
      if (isValidate) {
        ConfirmComponent({
          asyncFunction: async () => {
            const request = {
              DealerCode: permissionStore?.sysUser?.DealerCode ?? "",
              DebitAmount: formData.DebitAmount ?? "",
              DebitDate: formData.DebitDate ?? "",
              Note: formData.Note ?? "",
              StockInID: paramUrl.idUpdate,
              SupplierID: formData.SupplierID,
            };
            const response = await match(!!formData.CusDebitID)
              .with(true, async () => {
                const response = await api.Ser_Inv_StockIn_SerCusDebitUpdate({
                  ...request,
                  CusDebitID: formData.CusDebitID,
                });
                return response;
              })
              .otherwise(async () => {
                const response = await api.Ser_Inv_StockIn_SerCusDebitCreate(
                  request
                );
                return response;
              });
            if (response.isSuccess) {
              toast.success(`${"SaveOweSuccessfully"}`);
              // onRefetch(nanoid());
              setDispatch(nanoid());
              // refetchSerCusDebitGetDL();
              showOwePopup.close();
              // OwePopupRef?.current?.instance().repaint();
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
      } else {
        return;
      }
    };
    const handleDelete = async () => {
      ConfirmComponent({
        asyncFunction: async () => {
          const response = await api.Ser_Inv_StockIn_SerCusDebitDelete(
            formData.CusDebitID
          );
          if (response.isSuccess) {
            toast.success(`${"DeleteOweSuccessfully"}`);
            // OwePopupRef?.current?.instance().repaint();
            // onRefetch(nanoid());
            setDispatch(nanoid());
            showOwePopup.close();
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
        title: t("Delete"),
        contentConfirm: t("Do you want to delete ?"),
      });
    };

    return (
      <>
        {showOwePopup.visible && (
          <div className={"p-2"}>
            <Popup
              visible={showOwePopup.visible}
              title={t("SerInvStockIn_OwePopup")}
              showCloseButton={true}
              onHiding={() => {
                showOwePopup.close();
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
                visible={showOwePopup.visible}
                ref={OwePopupRef}
                colCount={1}
                // formData={dataForm}
                formData={formData}
                readOnly={false}
                labelLocation={"left"}
                validationGroup={"main"}
              >
                <GroupItem colCount={1}>
                  <SimpleItem
                    label={{
                      text: t("SupplierName"),
                    }}
                    isRequired={true}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(validateMsg("SupplierName")),
                    ]}
                    dataField={"SupplierName"}
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
                      text: t("DebitAmount"),
                    }}
                    isRequired={true}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(validateMsg("DebitAmount")),
                    ]}
                    dataField={"DebitAmount"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className={"owe-number-field flex flex-row"}>
                          <NumberBox
                            // readOnly
                            onValueChanged={(e: any) => {
                              formInstance.updateData(dataField, e.value);
                            }}
                            // formInstance={formInstance}
                            // dataField={dataField}
                            defaultValue={value}
                            width={"100%"}
                            format={",##0.###"}
                          >
                            {/* <Validator>
                          <CustomRule
                            ignoreEmptyValue={true}
                            type="custom"
                            // reevaluate={true}
                            message={t("AmountOweOver")}
                            validationCallback={(e: any) => {
                              return e.value > dataForm.DebitAmount;
                            }}
                          />
                        </Validator> */}
                          </NumberBox>
                        </div>
                      );
                    }}
                  ></SimpleItem>

                  <SimpleItem
                    label={{
                      text: t("DebitDate"),
                    }}
                    isRequired={true}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(validateMsg("DebitDate")),
                    ]}
                    dataField={"DebitDate"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <DateField
                          // readOnly
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
                      text: t("Note"),
                    }}
                    isRequired={true}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(validateMsg("Note")),
                    ]}
                    dataField={"Note"}
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
                  label={
                    !!formData.CusDebitID ? `${t("Update")}` : `${t("Create")}`
                  }
                  onClick={handleSaveForm}
                />
                {!!formData.CusDebitID ? (
                  <BButton
                    className="text-center"
                    label={`${t("Delete")}`}
                    onClick={handleDelete}
                  />
                ) : (
                  <></>
                )}
              </div>
            </Popup>
          </div>
        )}
      </>
    );
  }
);
