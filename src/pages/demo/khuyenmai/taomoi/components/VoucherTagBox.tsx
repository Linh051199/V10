import { TagBox } from "devextreme-react";
import { useMemo, useRef } from "react";

const VoucherTagBox = ({ field }) => {
  const { onChange, ref, ...rest } = field;

  const tagRef = useRef<any>(null);

  console.log(field);

  const dataSource = [
    { id: 1, value: "Voucher 1" },
    { id: 2, value: "Voucher 2" },
    { id: 3, value: "Voucher 3" },
    { id: 4, value: "Voucher 3" },
    { id: 5, value: "Voucher 4" },
  ];

  const onValueChange = async (e) => {
    await onChange({
      target: {
        name: rest.name,
        value: e,
      },
    });
  };

  const renderTagBox = useMemo(() => {
    return (
      <TagBox
        ref={tagRef}
        {...ref}
        dataSource={dataSource}
        valueExpr={"id"}
        displayExpr={"value"}
        onValueChange={onValueChange}
        value={field.value}
        // minSearchLength={4}
        // searchEnabled
        // searchExpr={"value"}
        // showDataBeforeSearch={false}
      />
    );
  }, [dataSource, field, onValueChange]);

  return <div>{renderTagBox}</div>;
};

export default VoucherTagBox;
