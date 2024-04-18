import Button from "devextreme-react/button";
import TextBox from "devextreme-react/text-box";
import { atom, useAtom } from "jotai";
import { useI18n } from "@/i18n/useI18n";
import { useLayoutEffect, useState } from "react";
// import "./header-form.scss";
import { Icon } from "@packages/ui/icons";
import PermissionContainer, {
  checkPermision,
} from "@/components/PermissionContainer";

const keywordAtom = atom("");

export interface HeaderFormProps {
  onSearch: (keyword: string) => void;
  cssClass?: any;
  selectedItems?: string[];
  placeholder?: string;
  permissionSearch?: string;
}

export const HeaderForm = ({
  onSearch,
  selectedItems,
  placeholder,
  cssClass,
  permissionSearch,
}: HeaderFormProps) => {
  const { t } = useI18n("Common");
  const [keyword, setKeyword] = useAtom(keywordAtom);
  const handleSearch = () => {
    onSearch(keyword);
  };
  useLayoutEffect(() => {}, [selectedItems]);
  return (
    <div className={`headerform w-full new-header-form`}>
      <PermissionContainer
        children={
          <div className="headerform__search w-1/3">
            <TextBox
              className={"search-field flex-row-reverse"}
              showClearButton
              stylingMode={"outlined"}
              value={keyword}
              onFocusOut={handleSearch}
              onEnterKey={handleSearch}
              onPaste={handleSearch}
              onValueChanged={(e) => setKeyword(e.value)}
              placeholder={placeholder}
              inputAttr={{
                class: "search-field__input",
              }}
            >
              <Button
                hoverStateEnabled={false}
                activeStateEnabled={false}
                focusStateEnabled={false}
                className={"border-none"}
                stylingMode={"outlined"}
              >
                <Icon name={"search"} size={14} className={"search-icon"} />
              </Button>
            </TextBox>
          </div>
        }
        permission={permissionSearch}
      />
      <div className="headerform__button"></div>
      <div className={`${cssClass} headerform__menu `}></div>
    </div>
  );
};
