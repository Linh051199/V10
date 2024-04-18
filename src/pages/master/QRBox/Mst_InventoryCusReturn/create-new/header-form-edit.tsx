import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { SelectField } from "@/packages/components/select-field";
import { UploadFilesField } from "@/packages/components/uploadFile-field";
import { useClientgateApi } from "@packages/api";
import { TextField } from "@packages/components/text-field";
import { showErrorAtom } from "@packages/store";

import { format } from "date-fns";
import {
  CheckBox,
  DataGrid,
  FileUploader,
  NumberBox,
  TextArea,
} from "devextreme-react";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import { useSetAtom } from "jotai";
import {
  ForwardedRef,
  MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useVisibilityControl } from "@/packages/hooks";
import { usePermissions } from "@/packages/contexts/permission";
import { SearchUser } from "../search-user/search-user";

interface HeaderFormEditProps {
  code?: string;
  listDealerType?: any;
  calculateRef?: any;
  gridRef?: any;
}

export const HeaderFormEdit = forwardRef(
  (
    { code, listDealerType, gridRef, calculateRef }: HeaderFormEditProps,
    ref: any
  ) => {
    const { t } = useI18n("Dlr_Contract_form");
    const userPopupRef = useRef<any>(null);
    const [formData, setFormData] = useState<any>({
      DlrContractNo: code,
      CreatedDate: new Date(),
      DealerCode: "",
      PmtType: "1",
      Sale: 0,
      Total: 0,
      CusReturn: 0,
    });
    const showError = useSetAtom(showErrorAtom);

    useImperativeHandle(calculateRef, () => ({
      setTotal() {
        const dataGrid = gridRef.current.getData();

        // Sử dụng phương pháp map để nhân VinColorCode với VIN và tạo một mảng mới
        const multipliedValues = dataGrid.map(
          (item: any) => item.VinColorCode * item.VIN
        );

        // Sử dụng phương pháp reduce để tính tổng của mảng đã nhân
        const sumMoney = multipliedValues.reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        );

        const totalCusReturn = dataGrid.reduce(
          (accumulator: any, currentValue: any) => {
            if (!isNaN(parseFloat(currentValue.Total))) {
              return accumulator + parseFloat(currentValue.Total);
            } else {
              return accumulator;
            }
          },
          0
        );

        setFormData({
          ...formData,
          Total: sumMoney ?? 0,
          Sale: sumMoney - totalCusReturn ?? 0,
          CusReturn: totalCusReturn ?? 0,
        });
      },
    }));
    const api = useClientgateApi();
    const { t: validateMsg } = useI18n("Validate");

    const handleSalesGroupType = async (dataField: any, value: any) => {
      // ref?.current.instance.updateData(dataField, value);
      // const response = await api.DlrContract_GetActiveRetailBySalesGroupType(
      //   value
      // );
      // if (response.isSuccess) {
      //   setDataSalesType(response?.Data?.lst_Mst_DealerSalesType);
      // } else {
      //   showError({
      //     message: t(response._strErrCode),
      //     _strErrCode: response._strErrCode,
      //     _strTId: response._strTId,
      //     _strAppTId: response._strAppTId,
      //     _objTTime: response._objTTime,
      //     _strType: response._strType,
      //     _dicDebug: response._dicDebug,
      //     _dicExcs: response._dicExcs,
      //   });
      // }
    };
    const handleDropdownShowing = (e: any) => {
      const popup = e.component; // Access the popup instance

      popup.option("toolbarItems", [
        {
          widget: "dxButton",
          options: {
            location: "bottom",
            text: "Tìm kiếm thêm",
            icon: "plus", // Optional icon
            onClick: () => userPopupRef.current.setOpenPopup(),
          },
        },
      ]);
    };
    const handleSelectedUsers = () => {};
    return (
      <>
        <div className={"pt-[8px] pb-[12px] px-4"}>
          <Form
            ref={ref}
            formData={formData}
            labelLocation={"top"}
            validationGroup={"main"}
          >
            <GroupItem colCount={3} caption="Thông tin cơ bản">
              <GroupItem colCount={1}>
                <SimpleItem
                  label={{
                    text: t("Số phiếu khách hàng trả hàng"),
                  }}
                  dataField={"DlrContractNoUser"}
                  isRequired={true}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        className=""
                        formInstance={formInstance}
                        dataField={dataField}
                        defaultValue={value}
                        width={"100%"}
                        // validationRules={[
                        //   RequiredField(validateMsg("ContractNo")),
                        // ]}
                        // validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Khách hàng"),
                  }}
                  dataField={"SalesGroupType"}
                  isRequired={true}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <SelectField
                        width={"100%"}
                        items={listDealerType?.map((item: any) => {
                          return {
                            text: item?.SalesGroupTypeName,
                            value: item?.SalesGroupType,
                          };
                        })}
                        searchEnabled={true}
                        placeholder={t("Select")}
                        showClearButton={false}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        dropDownOptions={{
                          onShowing: (e: any) => handleDropdownShowing(e),
                          height: "auto",

                          // wrapperAttr: {
                          //   class: "demo-dropdown",
                          // },
                        }}
                        onValueChanged={(e: any) =>
                          handleSalesGroupType(dataField, e.value)
                        }
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Kho nhập"),
                  }}
                  dataField={"SalesType"}
                  isRequired={true}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <SelectField
                        width={"100%"}
                        items={[]}
                        searchEnabled={true}
                        placeholder={t("Select")}
                        showClearButton={false}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    );
                  }}
                ></SimpleItem>
              </GroupItem>
              <GroupItem colCount={1}>
                <SimpleItem
                  colSpan={1}
                  label={{
                    text: t("Số hóa đơn"),
                  }}
                  dataField={"DealerCode"}
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
                <SimpleItem
                  colSpan={1}
                  label={{
                    text: t("Số phiếu xuất"),
                  }}
                  isRequired={true}
                  dataField={"DealerCode"}
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

                <SimpleItem
                  colSpan={1}
                  label={{
                    text: t("Nội dung khách hàng trả hàng"),
                  }}
                  dataField={"remark"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return <TextArea height={97} />;
                  }}
                ></SimpleItem>
              </GroupItem>
              <GroupItem colCount={1}>
                <SimpleItem
                  colSpan={1}
                  label={{
                    text: t("Tổng tiền"),
                  }}
                  dataField={"Total"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <NumberBox
                        format="#,##0.00"
                        readOnly={true}
                        value={value}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  colSpan={1}
                  label={{
                    text: t("Giảm giá"),
                  }}
                  dataField={"Sale"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <NumberBox
                        format="#,##0.00"
                        readOnly={true}
                        value={value}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  colSpan={1}
                  label={{
                    text: t("Khách hàng trả nhà cung cấp"),
                  }}
                  dataField={"CusReturn"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <NumberBox
                        format="#,##0.00"
                        readOnly={true}
                        value={value}
                      />
                    );
                  }}
                ></SimpleItem>
              </GroupItem>
            </GroupItem>
          </Form>
        </div>
        <SearchUser
          ref={userPopupRef}
          container={".dx-viewport"}
          position={"left"}
          onSelectedCars={handleSelectedUsers}
        />
      </>
    );
  }
);
