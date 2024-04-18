import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { requiredType } from "@/packages/common/Validation_Rules";
import { showErrorAtom } from "@/packages/store";
import { TST_Mst_Part } from "@/packages/types/master/TST_Mst_Part";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("Ser_InsuranceContract");
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: TST_Mst_Part) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const { data: ListInsuranceCode, isLoading: isGettingListInsuranceCode } =
    useQuery({
      queryKey: ["serinsurancelistcode"],
      queryFn: async () => {
        const response = await api.Ser_InsuranceAPI_GetAllActive();
        if (response.isSuccess) {
          return response.DataList;
        }
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
        return null;
      },
    });

  const columns: ColumnOptions[] = [
    {
      dataField: "InContractCode",
      caption: t("InContractCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "InContractNo",
      caption: t("InContractNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      validationRules: [requiredType],
    },
    {
      dataField: "InsNo",
      caption: t("InsNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxSelectBox",
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Select"),
        dataSource: ListInsuranceCode ?? [],
        displayExpr: (item: any) => (item ? ` ${item.InsVieName}` : ""),
        valueExpr: "InsNo",
      },
    },
    {
      dataField: "StartDate",
      caption: t("StartDate"),
      // visible: true,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      // editorType: "dxTextBox",
      editorType: "dxDateBox",
      visible: true,
      validationRules: [requiredType],
      format: "yyyy-MM-dd",
      editorOptions: {
        type: "date",
        placeholder: "yyyy-MM-dd",
        openOnFieldClick: true,
        showClearButton: true,
        // useMaskBehavior: true,
      },
    },
    {
      dataField: "FinishDate",
      caption: t("FinishDate"),
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxDateBox",
      visible: true,
      // validationRules: [requiredType],
      format: "yyyy-MM-dd",
      editorOptions: {
        type: "date",
        placeholder: "yyyy-MM-dd",
        // useMaskBehavior: true,
        openOnFieldClick: true,
        showClearButton: true,
      },
    },
    {
      dataField: "TypePayment",
      caption: t("TypePayment"),
      visible: true,
      validationRules: [requiredType],
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "PaymentLimit",
      caption: t("PaymentLimit"),
      visible: false,
      columnIndex: 2,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxNumberBox",
      editorOptions: {
        format: "#,##0",
      },
    },
  ];
  // return array of the first item only

  return columns;
};
