import { useMemo } from "react";

export interface LinkCellProps<T extends string, E> {
  value: T;
  onClick: () => void;
}
export const LinkCell = <T extends string, E>({
  value,
  onClick,
}: LinkCellProps<T, E>) => {
  return useMemo(
    () => (
      <div
        className="code-cell hover:underline hover:text-[#00703c] hover:cursor-pointer text-[#0E223D] text-[13px]"
        onClick={onClick}
      >
        {value}
      </div>
    ),
    []
  );
};
