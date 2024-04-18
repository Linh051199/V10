import { match } from "ts-pattern";

// Finished: #298EF2, Cancelled: #A7A7A7, Reject: #F63E3E
export const StatusValue = ({ status }: any) => {
  const color = match(status)
    .with("A", () => "#0FBC2B") // đợi màu từ thiết kế
    .with("A1", () => "#E48203")
    .with("A2", () => "#0FBC2B")
    .with("R", () => "#A7A7A7")
    .with("P", () => "#00CF91") // #CFB929
    .with("F", () => "#298EF2")
    .with("C", () => "#A7A7A7")
    .with("U", () => "#E17715")
    .otherwise(() => "");
  return (
    <span
      className={`px-[10px] rounded-[2px] ml-[30px] py-[4px] text-white font-[400] text-[11px]`}
      style={{ backgroundColor: color }}
    >
      {status}
    </span>
  );
};
