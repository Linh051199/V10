import { useI18n } from "@/i18n/useI18n";
import { faker } from "@faker-js/faker";
import { SelectBox } from "devextreme-react";
import { nanoid } from "nanoid";

const FindProduct = ({ field, errors, options, watch, setValue }) => {
  const { t } = useI18n("Ticket_Add");

  const getData = () => {
    const records = [];
    for (let i = 0; i < 20; i++) {
      records.push({
        value: faker.hacker.abbreviation(),
        key: nanoid(),
        label: faker.name.fullName(),
      });
    }

    return records;
  };

  const dataSource = getData();

  const listSanPham = watch("ListSanPham");

  const handleChange = async (e) => {
    await field.onChange({
      target: {
        name: field.name,
        value: e.value,
      },
    });

    const result = [
      ...listSanPham,
      {
        ProductNo: faker.finance.account(),
        ProductName: faker.name.fullName(),
        Quantity: faker.random.numeric(),
        Price: faker.random.numeric(),
        Amount: faker.random.numeric(),
        SellPrice: faker.random.numeric(),
        SellAmount: faker.random.numeric(),
      },
    ];

    setValue("ListSanPham", result);
  };

  return (
    <div
      className={`relative flex w-full my-[6px] required  ${errors && "mb-2"} ${
        options.direction == "vertical" ? "flex-col" : "items-center"
      }`}
    >
      <label className={"w-[160px] min-w-[160px] pr-[10px]"}>
        {t("Tìm sản phẩm")}
      </label>
      <SelectBox
        showClearButton
        searchEnabled
        dataSource={dataSource}
        displayExpr="label"
        valueExpr="value"
        onValueChanged={handleChange}
        value={field?.value}
        className="w-full"
      ></SelectBox>
    </div>
  );
};

export default FindProduct;
