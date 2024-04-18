import { SearchParam } from "../clientgate";

type ParamType = "Optional";

export interface Search_Mst_Param_Optional extends SearchParam {
  ParamCode: string;
  ParamType: ParamType;
  DealerCode: string;
  ParamValue: string;
}
export interface Mst_Param_Optional {
  ParamCode: string;
  DealerCode: string;
  ParamValue: string;
  LogLUDateTime: string;
  ParamType: string;
  LogLUBy: string;
}

export interface Mst_Param_Save {
  IsHidenPhoneNumber: string;
  IsAuthStockOut: string;
  IsAuthInvoice: string;
  IsAuthEditQuotation: string;
  IsAuthSO: string;
  UnitPriceBDN: string;
  UnitPriceSCC: string;
  UnitPriceSCD: string;
  UnitPriceSCS: string;
  SerProfitRate: string;
  PartProfitRate: string;
}

// =================================================
// IsHidenPhoneNumber: "Cho phép hiện thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán";
// IsAuthStockOut:  "Cho phép phân quyền 'Nút tạo phiếu xuất(Y/C)' màn hình y/c xuất dịch vụ";
// IsAuthInvoice: "Cho phép phân quyền ở màn hình quyết toán"
// IsAuthEditQuotation: "Cho phép 1 CVDV có thể sửa báo giá của cố vấn dịch vụ khác";

// IsAuthSO: "Cho phép phân quyền màn hình xuất kho dịch vụ";

// UnitPriceBDN: đơn giá giờ công bảo dưỡng nhanh
// UnitPriceSCC: đơn giá giờ công sửa chữa chung
// UnitPriceSCD: đơn giá giờ công sửa chữa đồng
// UnitPriceSCS: đơn giá giờ công sửa chữa sơn

// SerProfitRate: tỉ lệ lợi nhuận gộp công lao động
// PartProfitRate: tỉ lệ lợi nhuận gộp phụ tùng

// =================================================

// chkIsModifyInvoiceFinished.Properties.Caption = "Cho phép sửa báo giá, quyết toán sau khi kết thúc";
// chkAdIsModifyOther.Properties.Caption = "Cho phép 1 CVDV có thể sửa báo giá của cố vấn dịch vụ khác";
// - chkIsAuthInvoice.Properties.Caption = "Cho phép phân quyền ở màn hình quyết toán";
// chkIsAuthStockOut.Properties.Caption = "Cho phép phân quyền 'Nút tạo phiếu xuất(Y/C)' màn hình y/c xuất dịch vụ";
// chkIsHidenPhoneNumber.Properties.Caption = "Cho phép hiện thị số điện thoại CVDV khi in báo giá, xuất excel báo giá - In quyết toán, xuất excel quyết toán";
// chkIsAuthSO.Properties.Caption = "Cho phép phân quyền màn hình xuất kho dịch vụ";

// =================================================

// "ParamCode": "DKSC",
// "DealerCode": "VS058",
// "ParamValue": " - Báo giá này chỉ có giá trị 7 ngày.\r\n - Những chi phí phát sinh ngoài phần báo giá sẽ được thông báo sau khi đã kiểm tra trực tiếp.\r\n - Quý khách xin vui lòng đặt cọc trước 50% giá trị phụ tùng khi đặt hàng.\r\n - Thu phí 5% trên tổng số tiền báo giá. Số tiền này sẽ được hoàn trả khi Quý khách đồng ý sửa chữa theo báo giá này.\r\n - Bảo hành 01 năm đ/v xe sơn toàn bộ và 06 tháng đ/v các xe không sơn toàn bộ.",
// "LogLUDateTime": "2021-05-27T12:01:20",
// "ParamType": "DKSC",
// "LogLUBy": "phuongtt"
