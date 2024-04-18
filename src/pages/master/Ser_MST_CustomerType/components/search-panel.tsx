import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { IItemProps } from "devextreme-react/form";
import { useEffect } from "react";
import { SearchPanel as CommonSearchPanel } from "@/packages/ui/search-panel";

interface SearchPanelProps {
  conditionFields?: IItemProps[];
  onSearch?: (values: any) => void;
  data?: any;
}

export const SearchPanel = ({
  conditionFields = [],
  onSearch,
  data, // chính là cái searchCondition truyền vào header khi call api search
}: SearchPanelProps) => {
  const { t } = useI18n("Ser_MST_CustomerType");
  const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom); // atom định nghĩa true false toggle search layout
  const onToggleSettings = () => {};
  const api = useClientgateApi();
  let formData = {};

  const listIsActive = [
    {
      value: "",
      text: t("All"),
    },
    {
      value: "1",
      text: t("Active"),
    },
    {
      value: "0",
      text: t("Inactive"),
    },
  ];

  useEffect(() => {
    formData = {
      ...formData,
      ...data,
    };
  }, []);
  const handleSearch = () => {
    onSearch?.(formData);
  };
  const onClose = () => {
    setSearchPanelVisible(false);
  };

  const formItems: IItemProps[] = [
    ...conditionFields,
    {
      caption: t("AccountNo"),
      dataField: "AccountNo",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      // editorType: "dxTextBox",
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: (item: any) =>
          item ? `${item.DealerCode} - ${item.DealerName}` : "",
        valueExpr: "DealerCode",
        searchEnabled: true,
        items: [],
        // validationMessageMode: "always",
      },
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: listIsActive,
      },
    },
    {
      itemType: "button",
      cssClass: "w-full flex items-center justify-center",
      buttonOptions: {
        text: t("Search"),
        stylingMode: "contained",
        type: "default",
        width: "100%",
        onClick: handleSearch,
      },
    },
  ];
  return (
    <CommonSearchPanel
      onClose={onClose}
      data={data} // chính là cái searchCondition truyền vào header khi call api search
      items={formItems}
      onToggleSettings={onToggleSettings}
    />
  );
};
