import { useSetAtom } from "jotai";
import { viewingDataAtom } from "./ser-mst-model";

export interface LinkCellProps<T extends string, E> {
  rowIndex: number;
  value: T;
  rowData: E;
  onClick?: (rowIndex: number, data: E) => void;
}
export const LinkCell = <T extends string, E>({
  rowIndex, // index of the row
  value, // key of the row
  rowData, // data of the row
  onClick, // handle onCLick show popup pass rowIndex and data
}: LinkCellProps<T, E>) => {
  // debugger;
  // thực hiện set data khi click vào link để show detail
  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: E) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
    onClick?.(rowIndex, data);
  };
  return (
    <a href={"#"} onClick={() => viewRow(rowIndex, rowData)}>
      {value}
    </a>
  );
};
