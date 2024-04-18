import { useI18n } from "@/i18n/useI18n";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { showErrorAtom } from "@/packages/store";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@layouts/content-searchpanel-layout";
import { useClientgateApi } from "@packages/api";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ScrollView } from "devextreme-react";
import Form, { IItemProps } from "devextreme-react/form";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useMemo, useReducer, useRef, useState } from "react";
import { PageHeader } from "../components";
import TreeA from "../components/TreeA";
import TreeB from "../components/TreeB";
import { exportTreeList } from "../components/exportExcel";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const XemBaoCaoKPIVer2 = () => {
  const { t } = useI18n("XemBaoCaoKPIVer2");

  const dataSourceTreeA = [
    {
      Title: "A. Thông tin chung",
      Value: "",
      Head_ID: -1,
      ID: 999,
    },

    // = = = = = =

    {
      Title: "I. Nhân sự bộ phận dịch vụ, phụ tùng",
      Value: 0,
      Head_ID: 999,
      ID: 1,
      Key: "EmployeeNumber",
    },
    {
      Title: "1. Số lượng cố vấn dịch vụ",
      Value: 0,
      Head_ID: 1,
      ID: 6,
      Key: "AdvisoryNumber",
    },
    {
      Title: "2. Số lượng Kỹ Thuật Viên bảo dưỡng nhanh",
      Value: 0,
      Head_ID: 1,
      ID: 7,
      Key: "ServiceTechnicianQty",
    },
    {
      Title: "3. Số lượng kỹ thuật viên sửa chữa chung",
      Value: 0,
      Head_ID: 1,
      ID: 8,
      Key: "EnginerNumber",
    },
    {
      Title: "4. Số lượng kỹ thuật viên đồng",
      Value: 0,
      Head_ID: 1,
      ID: 9,
      Key: "EnginerBP",
    },
    {
      Title: "5. Số lượng kỹ thuật viên sơn",
      Value: 0,
      Head_ID: 1,
      ID: 10,
      Key: "PaintingTechnicianQty",
    },
    {
      Title: "6. Nhân viên phụ tùng",
      Value: 0,
      Head_ID: 1,
      ID: 11,
      Key: "SparePartsStaff",
    },
    {
      Title: "7. Nhân viên khác (Rửa xe, thu ngân,…)",
      Value: 0,
      Head_ID: 1,
      ID: 12,
      Key: "StaffOrther",
    },

    // = = = = = =

    {
      Title: "II. Tổng số khoang",
      Value: 0,
      Head_ID: 999,
      ID: 2,
      Key: "CavityNumber",
    },
    {
      Title: "1. Tổng số khoang bảo dưỡng nhanh",
      Value: 0,
      Head_ID: 2,
      ID: 13,
      Key: "CavityMaintainNumber",
    },
    {
      Title: "2. Tổng số khoang sửa chữa chung",
      Value: 0,
      Head_ID: 2,
      ID: 14,
      Key: "CavityRONumber",
    },
    {
      Title: "3. Tổng số khoang khác (kiểm tra cuối, thử phanh)",
      Value: 0,
      Head_ID: 2,
      ID: 15,
      Key: "CavityOtherNumber",
    },
    {
      Title: "4. Tổng số khoang đồng",
      Value: 0,
      Head_ID: 2,
      ID: 16,
      Key: "CavityCopperNumber",
    },
    {
      Title: "5. Tổng số khoang sơn",
      Value: 0,
      Head_ID: 2,
      ID: 17,
      Key: "CavityBPNumber",
    },
    {
      Title: "6. Tổng số buồng sơn",
      Value: 0,
      Head_ID: 2,
      ID: 18,
      Key: "CabinetPaintNumber",
    },
    {
      Title: "7. Tổng số khoang Tiếp nhận, giao xe, đậu xe",
      Value: 0,
      Head_ID: 2,
      ID: 19,
      Key: "CavityParkingNumber",
    },

    // = = = = = =

    {
      Title: "III. Đơn giá nhân công",
      Value: 0,
      Head_ID: 999,
      ID: 3,
      Key: "UnitPrice",
    },

    {
      Title: "1. Đơn giá giờ công Bảo Dưỡng Nhanh (VND / giờ)",
      Value: 0,
      Head_ID: 3,
      ID: 20,
      Key: "UnitPriceBDN",
    },
    {
      Title: "2. Đơn giá giờ công Sửa Chữa Chung (VND / giờ)",
      Value: 0,
      Head_ID: 3,
      ID: 21,
      Key: "UnitPriceSCC",
    },
    {
      Title: "3. Đơn giá giờ công Sửa chữa Đồng (VND / giờ)",
      Value: 0,
      Head_ID: 3,
      ID: 22,
      Key: "UnitPriceSCD",
    },
    {
      Title: "4. Đơn giá giờ công Sửa chữa sơn (VND / giờ)",
      Value: 0,
      Head_ID: 3,
      ID: 23,
      Key: "UnitPriceSCS",
    },

    // = = = = = =

    {
      Title: "IV. Số giờ làm việc của KTV",
      Value: 0,
      Head_ID: 999,
      ID: 4,
      Key: "WorkHourKTV",
    },
    {
      Title: "1. Tổng số ngày làm việc",
      Value: 0,
      Head_ID: 4,
      ID: 24,
      Key: "WorkDayQty",
    },
    {
      Title: "2. Tổng số giờ công hành chính của KTV",
      Value: 0,
      Head_ID: 4,
      ID: 25,
      Key: "WorkHourQty",
    },
    {
      Title: "3. Tổng số giờ công có tính phí",
      Value: 0,
      Head_ID: 4,
      ID: 26,
      Key: "WorkHourFeeQty",
    },
    {
      Title: "3.1. Tổng giờ công Bảo Dưỡng Nhanh",
      Value: 0,
      Head_ID: 26,
      ID: 27,
      Key: "WorkHourBDNQty",
    },
    {
      Title: "3.2. Tổng giờ công Sửa chữa chung",
      Value: 0,
      Head_ID: 26,
      ID: 28,
      Key: "WorkHourSCCQty",
    },
    {
      Title: "3.3. Tổng giờ công Sửa chữa Đồng",
      Value: 0,
      Head_ID: 26,
      ID: 29,
      Key: "WorkHourSCDQty",
    },
    {
      Title: "3.4. Tổng giờ công Sửa chữa Sơn",
      Value: 0,
      Head_ID: 26,
      ID: 30,
      Key: "WorkHourSCSQty",
    },
    {
      Title: "4. Tổng số giờ công lao động thực tế (giờ)  ",
      Value: 0,
      Head_ID: 4,
      ID: 31,
      Key: "WorkHourActualQty",
    },

    // = = = = = =

    {
      Title: "V. Tỷ lệ lợi nhuận gộp",
      Value: 0,
      Head_ID: 999,
      ID: 5,
      Key: "ProfitRate",
    },
    {
      Title: "1. Tỷ lệ lợi nhuận gộp công lao động (%)",
      Value: 0,
      Head_ID: 5,
      ID: 32,
      Key: "SerProfitRate",
    },
    {
      Title: "2. Tỷ lệ lợi nhuận gộp phụ tùng (%)",
      Value: 0,
      Head_ID: 5,
      ID: 33,
      Key: "PartProfitRate",
    },

    // = = = = = =

    {
      Title: "B. Số liệu thu thập từ hoạt động",
      Value: "",
      Head_ID: -1,
      ID: 998,
    },

    // = = = = = =
    {
      Title: "I. Tổng số lượt xe dịch vụ",
      Value: 0,
      Head_ID: 998,
      ID: 34,
      Key: "CountCarService",
    },
    {
      Title: "1. Tổng số lượt Bảo dưỡng",
      Value: 0,
      Head_ID: 34,
      ID: 35,
      Key: "CountBDD",
    },
    {
      Title: "1.1. Tổng số lượt khách hàng trả tiền",
      Value: 0,
      Head_ID: 35,
      ID: 36,
      Key: "CountBDDRoRepair",
    },
    {
      Title: "1.2. Tổng lượt nội bộ",
      Value: 0,
      Head_ID: 35,
      ID: 37,
      Key: "CountBDDLocal",
    },
    {
      Title: "1.2.1. Số lượt sửa chữa lại",
      Value: 0,
      Head_ID: 37,
      ID: 38,
      Key: "CountBDDLocal_SCL",
    },
    {
      Title: "1.2.2. Khác (PDI, Xe lưu kho, Xe lái thử,...)",
      Value: 0,
      Head_ID: 37,
      ID: 39,
      Key: "CountBDDLocal_Khac",
    },
    {
      Title: "2. Tổng số lượt sửa chữa chung",
      Value: 0,
      Head_ID: 34,
      ID: 40,
      Key: "CountSCC",
    },
    {
      Title: "2.1 Tổng số lượt khách hàng trả tiền",
      Value: 0,
      Head_ID: 40,
      ID: 41,
      Key: "CountSCCRoRepair",
    },
    {
      Title: "2.2. Tổng số lượt bảo hành",
      Value: 0,
      Head_ID: 40,
      ID: 42,
      Key: "CountSCCRoWarranty",
    },
    {
      Title: "2.3. Tổng lượt bảo hiểm trả tiền",
      Value: 0,
      Head_ID: 40,
      ID: 43,
      Key: "CountSCCRoInsurance",
    },
    {
      Title: "2.4. Tổng số lượt nội bộ",
      Value: 0,
      Head_ID: 40,
      ID: 44,
      Key: "CountSCCLocal",
    },
    {
      Title: "2.4.1. Số lượt sửa chữa lại",
      Value: 0,
      Head_ID: 44,
      ID: 45,
      Key: "CountSCCLocal_SCL",
    },
    {
      Title: "2.4.2. Khác (PDI, xe lưu kho, xe lái thử...)",
      Value: 0,
      Head_ID: 44,
      ID: 46,
      Key: "CountSCCLocal_Khac",
    },
    {
      Title: "3. Tổng số lượt Sửa Chữa Đồng",
      Value: 0,
      Head_ID: 34,
      ID: 47,
      Key: "CountSCD",
    },
    {
      Title: "3.1. Tổng số lượt khách hàng trả tiền",
      Value: 0,
      Head_ID: 47,
      ID: 48,
      Key: "CountSCDRoRepair",
    },
    {
      Title: "3.2. Tổng số lượt bảo hành",
      Value: 0,
      Head_ID: 47,
      ID: 49,
      Key: "CountSCDRoWarranty",
    },
    {
      Title: "3.3. Tổng lượt bảo hiểm trả tiền",
      Value: 0,
      Head_ID: 47,
      ID: 50,
      Key: "CountSCDRoInsurance",
    },
    {
      Title: "3.4. Tổng số lượt nội bộ",
      Value: 0,
      Head_ID: 47,
      ID: 51,
      Key: "CountSCDLocal",
    },
    {
      Title: "3.4.1. Số lượt sửa chữa lại",
      Value: 0,
      Head_ID: 51,
      ID: 52,
      Key: "CountSCDLocal_SCL",
    },
    {
      Title: "3.4.2. Khác (PDI, xe lưu kho, xe lái thử...)",
      Value: 0,
      Head_ID: 51,
      ID: 53,
      Key: "CountSCDLocal_Khac",
    },
    {
      Title: "4. Tổng số lượt Sửa Chữa Sơn",
      Value: 0,
      Head_ID: 34,
      ID: 54,
      Key: "CountSCS",
    },
    {
      Title: "4.1. Tổng số lượt khách hàng trả tiền",
      Value: 0,
      Head_ID: 54,
      ID: 55,
      Key: "CountSCSRoRepair",
    },
    {
      Title: "4.2. Tổng số lượt bảo hành",
      Value: 0,
      Head_ID: 54,
      ID: 56,
      Key: "CountSCSRoWarranty",
    },
    {
      Title: "4.3. Tổng lượt bảo hiểm trả tiền",
      Value: 0,
      Head_ID: 54,
      ID: 57,
      Key: "CountSCSRoInsurance",
    },
    {
      Title: "4.4. Tổng số lượt nội bộ",
      Value: 0,
      Head_ID: 54,
      ID: 58,
      Key: "CountSCSLocal",
    },
    {
      Title: "4.4.1. Số lượt sửa chữa lại",
      Value: 0,
      Head_ID: 58,
      ID: 59,
      Key: "CountSCSLocal_SCL",
    },
    {
      Title: "4.4.2. Khác (PDI, xe lưu kho, xe lái thử...)",
      Value: 0,
      Head_ID: 58,
      ID: 60,
      Key: "CountSCSLocal_Khac",
    },
    {
      Title: "5. Tổng số lượt PDI",
      Value: 0,
      Head_ID: 34,
      ID: 61,
      Key: "CountPDI",
    },
    {
      Title: "5.1. Tổng số lượt khách hàng trả tiền",
      Value: 0,
      Head_ID: 61,
      ID: 62,
      Key: "CountPDIRoRepair",
    },
    {
      Title: "5.2. Tổng số lượt nội bộ",
      Value: 0,
      Head_ID: 61,
      ID: 63,
      Key: "CountPDILocal",
    },
    {
      Title: "6. Tổng số lượt phụ kiện",
      Value: 0,
      Head_ID: 34,
      ID: 64,
      Key: "CountSPK",
    },
    {
      Title: "6.1. Tổng số lượt khách hàng trả tiền",
      Value: 0,
      Head_ID: 64,
      ID: 65,
      Key: "CountSPKRoRepair",
    },
    {
      Title: "6.2. Tổng số lượt nội bộ",
      Value: 0,
      Head_ID: 64,
      ID: 66,
      Key: "CountSPKLocal",
    },

    // = = = = =  = =

    {
      Title: "II. Tổng doanh thu tiền công dịch vụ",
      Value: 0,
      Head_ID: 998,
      ID: 67,
      Key: "ServiceAmount",
    },
    {
      Title: "1. Tổng doanh thu tiền công Bảo Dưỡng",
      Value: 0,
      Head_ID: 67,
      ID: 68,
      Key: "ServiceAmountBDD",
    },
    {
      Title: "1.1. Tổng doanh thu khách hàng trả tiền",
      Value: 0,
      Head_ID: 68,
      ID: 69,
      Key: "ServiceAmountBDDRoRepair",
    },
    {
      Title: "1.2. Tổng doanh thu nội bộ",
      Value: 0,
      Head_ID: 68,
      ID: 70,
      Key: "ServiceAmountBDDLocal",
    },
    {
      Title: "1.2.1. Doanh Thu lượt sửa chữa lại",
      Value: 0,
      Head_ID: 70,
      ID: 71,
      Key: "ServiceAmountBDDLocal_SCL",
    },
    {
      Title: "1.2.2. Doanh Thu Khác(PDI, xe lưu kho, xe lái thử...)",
      Value: 0,
      Head_ID: 70,
      ID: 72,
      Key: "ServiceAmountBDDLocal_Khac",
    },
    {
      Title: "2. Tổng doanh thu tiền công Sửa Chữa Chung",
      Value: 0,
      Head_ID: 67,
      ID: 73,
      Key: "ServiceAmountSCC",
    },
    {
      Title: "2.1. Tổng doanh thu khách hàng trả tiền",
      Value: 0,
      Head_ID: 73,
      ID: 74,
      Key: "ServiceAmountSCCRoRepair",
    },
    {
      Title: "2.2. Tổng doanh thu bảo hành",
      Value: 0,
      Head_ID: 73,
      ID: 75,
      Key: "ServiceAmountSCCRoWarranty",
    },
    {
      Title: "2.3. Tổng doanh thu bảo hiểm trả tiền",
      Value: 0,
      Head_ID: 73,
      ID: 76,
      Key: "ServiceAmountSCCRoInsurance",
    },
    {
      Title: "2.4. Tổng doanh thu nội bộ",
      Value: 0,
      Head_ID: 73,
      ID: 77,
      Key: "ServiceAmountSCCLocal",
    },
    {
      Title: "2.4.1. Doanh thu sửa chữa lại",
      Value: 0,
      Head_ID: 77,
      ID: 78,
      Key: "ServiceAmountSCCLocal_SCL",
    },
    {
      Title: "2.4.2 Khác",
      Value: 0,
      Head_ID: 77,
      ID: 79,
      Key: "ServiceAmountSCCLocal_Khac",
    },
    {
      Title: "3. Tổng doanh thu tiền công Sửa Chữa Đồng",
      Value: 0,
      Head_ID: 67,
      ID: 80,
      Key: "ServiceAmountSCD",
    },
    {
      Title: "3.1. Tổng doanh thu khách hàng trả tiền",
      Value: 0,
      Head_ID: 80,
      ID: 81,
      Key: "ServiceAmountSCDRoRepair",
    },
    {
      Title: "3.2. Tổng số doanh thu bảo hành",
      Value: 0,
      Head_ID: 80,
      ID: 82,
      Key: "ServiceAmountSCDRoWarranty",
    },
    {
      Title: "3.3. Tổng doanh thu bảo hiểm trả tiền",
      Value: 0,
      Head_ID: 80,
      ID: 83,
      Key: "ServiceAmountSCDRoInsurance",
    },
    {
      Title: "3.4. Tổng doanh thu nội bộ",
      Value: 0,
      Head_ID: 80,
      ID: 84,
      Key: "ServiceAmountSCDLocal",
    },
    {
      Title: "3.4.1. Doanh thu sửa chữa lại",
      Value: 0,
      Head_ID: 84,
      ID: 85,
      Key: "ServiceAmountSCDLocal_SCL",
    },
    {
      Title: "3.4.2. Khác",
      Value: 0,
      Head_ID: 84,
      ID: 86,
      Key: "ServiceAmountSCDLocal_Khac",
    },
    {
      Title: "4. Tổng doanh thu tiền công Sửa Chữa Sơn",
      Value: 0,
      Head_ID: 67,
      ID: 87,
      Key: "ServiceAmountSCS",
    },
    {
      Title: "4.1. Tổng doanh thu khách hàng trả tiền",
      Value: 0,
      Head_ID: 87,
      ID: 88,
      Key: "ServiceAmountSCSRoRepair",
    },
    {
      Title: "4.2. Tổng doanh thu xe bảo hành",
      Value: 0,
      Head_ID: 87,
      ID: 89,
      Key: "ServiceAmountSCSRoWarranty",
    },
    {
      Title: "4.3. Tổng doanh thu bảo hiểm trả tiền",
      Value: 0,
      Head_ID: 87,
      ID: 90,
      Key: "ServiceAmountSCSRoInsurance",
    },
    {
      Title: "4.4. Tổng doanh thu nội bộ",
      Value: 0,
      Head_ID: 87,
      ID: 91,
      Key: "ServiceAmountSCSLocal",
    },
    {
      Title: "4.4.1. Doanh thu sửa chữa lại",
      Value: 0,
      Head_ID: 91,
      ID: 92,
      Key: "ServiceAmountSCSLocal_SCL",
    },
    {
      Title: "4.4.2. Khác",
      Value: 0,
      Head_ID: 91,
      ID: 93,
      Key: "ServiceAmountSCSLocal_Khac",
    },
    {
      Title: "5. Tổng doanh thu tiền công DPI",
      Value: 0,
      Head_ID: 67,
      ID: 94,
      Key: "ServiceAmountPDI",
    },
    {
      Title: "5.1. Tổng doanh thu khách hàng trả tiền",
      Value: 0,
      Head_ID: 94,
      ID: 95,
      Key: "ServiceAmountPDIRoRepair",
    },
    {
      Title: "5.2. Tổng doanh thu xe nội bộ",
      Value: 0,
      Head_ID: 94,
      ID: 96,
      Key: "ServiceAmountPDILocal",
    },
    {
      Title: "6. Tổng doanh thu tiền công phụ kiện",
      Value: 0,
      Head_ID: 67,
      ID: 97,
      Key: "ServiceAmountSPK",
    },
    {
      Title: "6.1. Tổng doanh thu khách hàng trả tiền",
      Value: 0,
      Head_ID: 97,
      ID: 98,
      Key: "ServiceAmountSPKRoRepair",
    },
    {
      Title: "6.2. Tổng doanh thu khách hàng nội bộ",
      Value: 0,
      Head_ID: 97,
      ID: 99,
      Key: "ServiceAmountSPKLocal",
    },
    {
      Title: "III. Tổng doanh thu phụ tùng, dầu nhớt",
      Value: 0,
      Head_ID: 998,
      ID: 100,
      Key: "AllPartAmount",
    },
    {
      Title: "1. Doanh thu phụ tùng phục vụ sửa chữa",
      Value: 0,
      Head_ID: 100,
      ID: 101,
      Key: "PartAmountNotShell",
    },
    {
      Title: "1.1. Khách hàng thanh toán",
      Value: 0,
      Head_ID: 101,
      ID: 102,
      Key: "PartAmountRoRepair",
    },
    {
      Title: "1.2. Khách hàng bảo hành",
      Value: 0,
      Head_ID: 101,
      ID: 103,
      Key: "PartAmountRoWarranty",
    },
    {
      Title: "1.3. Bảo hiểm thanh toán",
      Value: 0,
      Head_ID: 101,
      ID: 104,
      Key: "PartAmountRoInsurance",
    },
    {
      Title: "1.4. Nội bộ",
      Value: 0,
      Head_ID: 101,
      ID: 105,
      Key: "PartAmountLocal",
    },
    {
      Title: "2. Doanh thu phục vụ sửa chữa",
      Value: 0,
      Head_ID: 100,
      ID: 106,
      Key: "PartAmountShell",
    },
    {
      Title: "3. Doanh thu phụ kiện",
      Value: 0,
      Head_ID: 100,
      ID: 107,
      Key: "AccessoryAmountAfterVAT",
    },
    {
      Title: "4. Doanh thu phụ tùng bán ngoài",
      Value: 0,
      Head_ID: 100,
      ID: 108,
      Key: "PartAmountOut",
    },
    {
      Title: "5. Doanh thu dầu nhớt bán ngoài",
      Value: 0,
      Head_ID: 100,
      ID: 109,
      Key: "ShellAmountOut",
    },
    {
      Title: "6. Doanh thu phụ kiện bán ra ngoài",
      Value: 0,
      Head_ID: 100,
      ID: 110,
      Key: "AccessoryAmountOut",
    },
    {
      Title: "IV. Quản lý hoạt động xưởng dịch vụ",
      Value: 0,
      Head_ID: 998,
      ID: 111,
      Key: "CountWorkTime",
    },
    {
      Title: "1. Tổng giờ công bảo dưỡng",
      Value: 0,
      Head_ID: 111,
      ID: 112,
      Key: "CountWorkTime_DBD",
    },
    {
      Title: "2. Tổng giờ bảo dưỡng chung",
      Value: 0,
      Head_ID: 111,
      ID: 113,
      Key: "CountWorkTime_SCC",
    },
    {
      Title: "3. Tổng giờ công sửa chữa đồng",
      Value: 0,
      Head_ID: 111,
      ID: 114,
      Key: "CountWorkTime_SCD",
    },
    {
      Title: "4. Tổng giờ công sửa chữa sơn",
      Value: 0,
      Head_ID: 111,
      ID: 115,
      Key: "CountWorkTime_SCS",
    },
    {
      Title: "5. Tổng lượt xe / CVDV / ngày",
      Value: 0,
      Head_ID: 111,
      ID: 116,
      Key: "CarPerAdviserDay",
    },
    {
      Title: "6. Thời gian làm việc TB / RO",
      Value: 0,
      Head_ID: 111,
      ID: 117,
      Key: "WorkHourPerCarRO",
    },
    {
      Title: "7. Số khoang LV SCC / Số KTV SCC",
      Value: 0,
      Head_ID: 111,
      ID: 118,
      Key: "CavityQtyPerEngineerBDNSCC",
    },
    {
      Title: "8. Lượt xe BDN / Khoang BDN / Ngày",
      Value: 0,
      Head_ID: 111,
      ID: 119,
      Key: "CountBDDPerCavityMaintain",
    },
    {
      Title: "9. Lượt xe SCC / Khoang SCC / Ngày",
      Value: 0,
      Head_ID: 111,
      ID: 120,
      Key: "CountSCCPerCavityRO",
    },
    {
      Title: "10. Lượt xe SCĐ / Khoang Đồng / Ngày",
      Value: 0,
      Head_ID: 111,
      ID: 121,
      Key: "CountSCDPerCavityCopper",
    },
    {
      Title: "11. Lượt xe SCS / Khoang Sơn / Ngày",
      Value: 0,
      Head_ID: 111,
      ID: 122,
      Key: "CountSCSPerCavityBP",
    },
    {
      Title: "12. Lượt xe SCS / Buồng sơn / Ngày",
      Value: 0,
      Head_ID: 111,
      ID: 123,
      Key: "CountSCSPerCabinetPaint",
    },
    {
      Title: "13. Doanh Thu / CVDV / Tháng",
      Value: 0,
      Head_ID: 111,
      ID: 124,
      Key: "RevenuePerAdviser",
    },
    {
      Title: "14. Doanh thu CLĐ BDN / KTV BDN/ Tháng",
      Value: 0,
      Head_ID: 111,
      ID: 125,
      Key: "RevenuePerKTVBDN",
    },
    {
      Title: "15. Doanh thu CLĐ SCC / KTV SCC / Tháng",
      Value: 0,
      Head_ID: 111,
      ID: 126,
      Key: "RevenuePerKTVSCC",
    },
    {
      Title: "16. Doanh thu CLĐ SCĐ / KTV Đồng / Tháng",
      Value: 0,
      Head_ID: 111,
      ID: 126,
      Key: "RevenuePerKTVSCD",
    },
    {
      Title: "17. Doanh thu CLĐ SCS / KTV Sơn / Tháng",
      Value: 0,
      Head_ID: 111,
      ID: 126,
      Key: "RevenuePerKTVSCS",
    },
    {
      Title: "18. Hiệu suất lao động (%)",
      Value: 0,
      Head_ID: 111,
      ID: 127,
      Key: "LaborProductivity",
    },
    {
      Title: "19. Tổng năng suất xưởng DV (%)",
      Value: 0,
      Head_ID: 111,
      ID: 128,
      Key: "ServiceProductivity",
    },
    {
      Title: "20. Tỷ lệ sử dụng lao động (%)",
      Value: 0,
      Head_ID: 111,
      ID: 129,
      Key: "EmploymentRate",
    },
  ];

  const [searchCondition, setSearchCondition] = useState({
    DealerCode: "VS058",
    DateReport: "2023-02",
  });

  const [data, setData] = useState({
    DealerCode: null,
    DataSource: dataSourceTreeA,
  });

  const treeRef = useRef<any>(null);

  const windowSize = useWindowSize();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    reloading();
  };

  const { data: listDealer } = useQuery(["getListDealer"], async () => {
    const resp = await api.Dealer_GetAllActive();

    return resp.DataList ?? [];
  });

  const exportToExcel = () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("ReportKPI");

    if (treeRef.current !== null) {
      exportTreeList({
        component: treeRef.current.instance,
        worksheet,
      })
        .then(() => {
          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "ReportKPI.xlsx"
              );
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  };

  const getReportData = async (searchParam: any) => {
    const resp = await api.ReportKPI_SearchHQ(searchParam);

    const reportKPIData = resp?.Data?.Report_KPI;

    if (reportKPIData) {
      const reportData = dataSourceTreeA.map((item: any) => {
        const objReportKPI = Object.entries(reportKPIData).find(
          ([key, value]) => key == item.Key
        );

        if (objReportKPI) {
          const value = objReportKPI[1];
          return {
            ...item,
            Value: numberWithCommas(value),
          };
        }

        return item;
      });

      setData({
        DataSource: reportData,
        DealerCode: searchParam?.DealerCode,
      });
    }

    setSearchCondition({
      DealerCode: searchParam?.DealerCode,
      DateReport: searchParam?.DateReport,
    });
  };

  const handleSearch = async (searchParam: any) => {
    if (searchParam.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      await getReportData(searchParam);
    }
  };

  const showError = useSetAtom(showErrorAtom);

  const searchFields: IItemProps[] = [
    {
      dataField: "DealerCode",
      caption: t("DaiLy"),
      label: { text: t("DaiLy") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];

        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={listDealer}
            valueExpr={"DealerCode"}
            displayExpr={"DealerName"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={true}
            placeholder={t("Select")}
          />
        );
      },
    },
    {
      dataField: "DateReport",
      caption: t("DateReport"),
      label: { text: t("DateReport") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];

        return (
          <DateField
            formInstance={formComponent}
            showClearButton={true}
            width={"100%"}
            dataField={dataField}
            defaultValue={value ? new Date(value) : new Date()}
            onValueChanged={(e: any) => {
              formComponent.updateData(
                dataField,
                e.value ? format(e.value, "yyyy-MM") : null
              );
            }}
            displayFormat={"yyyy-MM"}
            calendarOptions={{
              maxZoomLevel: "year",
            }}
          ></DateField>
        );
      },
    },
  ];

  const renderTree = useMemo(() => {
    return (
      <TreeA
        dataSource={data.DataSource}
        dealerCode={data.DealerCode}
        ref={treeRef}
      />
    );
  }, [data, dataSourceTreeA]);

  const renderTreeB = useMemo(() => {
    return <TreeB dataSource={data.DataSource} ref={treeRef} />;
  }, [data, dataSourceTreeA]);

  const exportByYear = () => {};

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExport={exportToExcel}
          onExportByYear={exportByYear}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"ReportKPI_Search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            {/* <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isLoading || gettingData}
              showIndicator={true}
              showPane={true}
            /> */}

            <ScrollView
              height={useWindowSize().height - 120} 
              showScrollbar="always"
            >
              {renderTree}
            </ScrollView>

            {/* <ScrollView
              height={useWindowSize().height - 120}
              showScrollbar="always"
            >
              {renderTreeB}
            </ScrollView> */}

            <GetDataWH
              onSearch={handleSearchWH}
              formRef={formRef}
              checkBoxRef={checkBoxRef}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
