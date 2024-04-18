import { DataGrid } from "devextreme-react";
import Button from "devextreme-react/button";
import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface GridCustomToolBarItem {
  text: string;
  onClick: any;
  shouldShow: any;
  widget?: "customize" | "dxTextBox";
  customize?: (ref: any) => ReactNode;
  permissionCode?: string;
  visible?: boolean;
}

export const GridCustomToolbar = forwardRef(({ items }: any, ref: any) => {
  let dataGridRef = useRef<DataGrid | null>(ref.current);
  const [stats, setStats] = useState(0);
  useImperativeHandle(ref, () => ({
    refresh(gridRef: DataGrid) {
      dataGridRef.current = gridRef;
      setStats((old) => {
        return old + 1;
      });
    },
  }));

  if (!items || !items.length || !dataGridRef || !dataGridRef.current)
    return null;

  return (
    <div className="flex items-center">
      {items.map((item: GridCustomToolBarItem, idx: number) => {
        if (item?.widget === "customize") {
          if (item.shouldShow(dataGridRef)) {
            return (
              (
                <div key={`button-toolbar-${idx}`}>
                  {item?.customize ? item.customize(dataGridRef) : <></>}
                </div>
              ) ?? <div key={`button-toolbar-${idx}`}></div>
            );
          } else {
            return null;
          }
        } else if (item?.widget === "dxTextBox") {
          return (
            <span className="font-bold px-2" key={`button-toolbar-${idx}`}>
              {item.text}
            </span>
          );
        } else if (item?.permissionCode) {
          if (item?.permissionCode) {
            return (
              <Button
                key={`button-toolbar-${idx}`}
                text={item.text}
                onClick={(e) => {
                  item.onClick(e, dataGridRef);
                }}
                visible={item.shouldShow(dataGridRef)}
              />
            );
          } else {
            return (
              <Button
                key={`button-toolbar-${idx}`}
                text={item.text}
                onClick={(e) => {
                  item.onClick(e, dataGridRef);
                }}
                visible={item.shouldShow(dataGridRef)}
              />
            );
          }
        } else {
          return (
            <Button
              className="ToolbarButton"
              key={`button-toolbar-${idx}`}
              text={item.text}
              onClick={(e) => {
                item.onClick(e, dataGridRef);
              }}
              visible={item.shouldShow(dataGridRef)}
            />
          );
        }
      })}
    </div>
  );
});
