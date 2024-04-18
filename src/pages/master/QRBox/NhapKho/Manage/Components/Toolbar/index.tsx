import { Button } from "devextreme-react";
import React from "react";
import DropDownButton, {
  Item as DropDownButtonItem,
} from "devextreme-react/drop-down-button";
import { GridCustomToolBarItem } from "@/packages/ui/gridview-one/grid-custom-toolbar";
interface Props {
  onCreate: Function;
  onApprove: Function;
  onCancel: Function;
  onDelete: Function;
  onExportExcel: Function;
  onPrint: Function;
}

const useToolbar = ({
  onCancel,
  onApprove,
  onCreate,
  onDelete,
  onExportExcel,
  onPrint,
}: Props) => {
  const listButtonMoreWhenCheck = (ref: any) => {
    const listData: any[] = ref.current?.instance?.getSelectedRowsData?.();

    let listButton = [
      { text: "Tạo Mới", action: onCreate },
      { text: "Duyệt", action: onApprove },
      { text: "Hủy", action: onCancel },
      { text: "Xóa", action: onDelete },
      { text: "Xuất Excel", action: onExportExcel },
      { text: "In Phiếu", action: onPrint },
    ];

    let buttonOutside: any[] = [];
    let buttonInside: any[] = [];

    if (listData.length === 1) {
      buttonOutside = listButton.slice(0, 4);
      buttonInside = listButton.slice(4);
    } else {
      listButton = listButton.filter((item) => {
        const list = ["Duyệt", "Hủy", "Xóa"];
        return !list.includes(item.text);
      });

      buttonOutside = listButton;
      buttonInside = [];
    }

    if (!buttonInside.length) {
      return (
        <div className="flex align-items-center justify-start">
          {buttonOutside.map((buttonInside, index: number) => {
            return (
              <Button
                stylingMode={"contained"}
                type={"default"}
                style={{ paddingLeft: 10, paddingRight: 10 }}
                key={"Button inside " + index}
                onClick={() => {
                  buttonInside.action(listData);
                }}
              >
                {`${buttonInside.text}`}
              </Button>
            );
          })}
        </div>
      );
    }

    return (
      <div className="flex align-items-center justify-start">
        {buttonOutside.map((buttonInside, index: number) => {
          return (
            <Button
              stylingMode={"contained"}
              style={{ paddingLeft: 10, paddingRight: 10 }}
              type={"default"}
              key={"Button inside " + index}
              onClick={() => {
                buttonInside.action(listData);
              }}
            >
              {`${buttonInside.text}`}
            </Button>
          );
        })}

        <DropDownButton
          showArrowIcon={false}
          keyExpr={"id"}
          className="menu-items"
          displayExpr={"text"}
          wrapItemText={false}
          dropDownOptions={{
            width: 150,
            wrapperAttr: {
              class: "headerform__menuitems",
            },
          }}
          icon="/images/icons/more.svg"
        >
          {buttonInside.map((item: any, index: number) => {
            return (
              <DropDownButtonItem
                key={"Button Inside " + index}
                // onClick={item.onclick(listData)}
                // text={`$`}
                render={(itemRe: any) => {
                  return (
                    <Button onClick={() => item.onclick(listData)}>
                      {`${item.text}`}
                    </Button>
                  );
                }}
              />
            );
          })}
        </DropDownButton>
      </div>
    );
  };

  return [
    {
      text: "",
      onClick: () => {},
      shouldShow: (ref: any) => {
        return true;
      },
      widget: "customize",
      customize: (ref: any) => listButtonMoreWhenCheck(ref),
    },
  ] as GridCustomToolBarItem[];
};

export default useToolbar;
