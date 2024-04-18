import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { faker } from "@faker-js/faker";
import { Button } from "devextreme-react";
import { forwardRef } from "react";

const TabListVoucher = forwardRef(({}, ref) => {
  const ds = Array.from({ length: 100 }, (_, i) => {
    return {
      VoucherNo: faker.helpers.unique(faker.name.firstName),
      Receiver: faker.random.alphaNumeric(),
      Status: faker.random.alphaNumeric(),
      ReleaseDTime: faker.random.alphaNumeric(),
      ExpireDTime: faker.random.alphaNumeric(),
      EffDTime: faker.random.alphaNumeric(),
      OrderNo: faker.random.alphaNumeric(),
    };
  });

  const columns = [
    {
      caption: "STT",
      dataField: "STT",
      cellRender: ({ rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
      },
      visible: true,
      alignment: "center",
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "VoucherNo",
      visible: true,
      caption: "Mã voucher",
    },

    {
      dataField: "Receiver",
      visible: true,
      caption: "Người nhận",
    },
    {
      dataField: "Status",
      visible: true,
      caption: "Trạng thái",
    },
    {
      dataField: "ReleaseDTime",
      visible: true,
      caption: "Ngày phát hành",
    },
    {
      dataField: "ExpireDTime",
      visible: true,
      caption: "Ngày hết hạn",
    },
    {
      dataField: "EffDTime",
      visible: true,
      caption: "Ngày sử dụng",
    },
    {
      dataField: "OrderNo",
      visible: true,
      caption: "Số đơn hàng",
    },
  ];

  const onRelease = () => {
    const selected = ref.current.getSelectedRowsData();

    const result = selected?.map((item: any) => item.VoucherNo);
    alert(`Phát hành: ${result}`);
  };

  const onRecall = () => {
    const selected = ref.current.getSelectedRowsData();

    const result = selected?.map((item: any) => item.VoucherNo);
    alert(`Thu hồi: ${result}`);
  };

  const onCancel = () => {
    const selected = ref.current.getSelectedRowsData();

    const result = selected?.map((item: any) => item.VoucherNo);
    alert(`Hủy: ${result}`);
  };

  const onExport = () => {
    const selected = ref.current.getSelectedRowsData();

    const result = selected?.map((item: any) => item.VoucherNo);
    alert(`Xuất excel: ${result}`);
  };

  return (
    <div className="p-[10px] flex flex-col">
      <div className="flex items-center gap-[10px]">
        <Button
          style={{
            padding: 10,
          }}
          type="default"
          onClick={onRelease}
        >
          Phát hành
        </Button>
        <Button
          style={{
            padding: 10,
          }}
          type="default"
          onClick={onRecall}
        >
          Thu hồi
        </Button>
        <Button
          style={{
            padding: 10,
          }}
          type="default"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          style={{
            padding: 10,
          }}
          type="default"
          onClick={onExport}
        >
          Xuất excel
        </Button>
      </div>

      <div>
        <GridViewOne
          columns={columns}
          ref={ref}
          dataSource={ds}
          allowSelection
          storeKey="hanghoa-grid"
          customHeight={400}
          keyExpr={"VoucherNo"}
        />
      </div>
    </div>
  );
});

export default TabListVoucher;
