import { AdminPage } from "@/pages";
import { BOMPage } from "@/pages/master/BOM/list/BOM";
import Mst_BieuMauIn from "@/pages/master/Mst_BieuMauIn/Mst_BieuMauIn";
import { Mst_CarModelStdPage } from "@/pages/master/Mst_CarModelStd/list/Mst_CarModelStd";
import { Mst_CompartmentPage } from "@/pages/master/Mst_Compartment/list/Mst_Compartment";
import { Mst_DeliveryFormPage } from "@/pages/master/Mst_DeliveryForm/Mst_DeliveryForm";
import { Mst_DeliveryLocationHTCPage } from "@/pages/master/Mst_DeliveryLocationHTC/Mst_DeliveryLocationHTC";
import { Mst_OrderComplainImageTypePage } from "@/pages/master/Mst_OrderComplainImageType/Mst_OrderComplainImageType";
import { Mst_OrderComplainTypePage } from "@/pages/master/Mst_OrderComplainType/Mst_OrderComplainType";
import { Mst_ParamPage } from "@/pages/master/Mst_Param/list/Mst_Param";
import { Mst_Param_OptionalPage } from "@/pages/master/Mst_Param_Optional/Mst_Param_Optional";
import { Mst_StaffPage } from "@/pages/master/Mst_Staff/list/Mst_Staff";
import { MST_UserManager } from "@/pages/master/Mst_UserManager/list/Mst_UserManager";
import InfomationImportStore from "@/pages/master/QRBox/NhapKho/Info";
import Manage from "@/pages/master/QRBox/NhapKho/Manage";
import { XuatKho } from "@/pages/master/QRBox/XuatKho/XuatKho";
import { CreateNew } from "@/pages/master/QRBox/XuatKho/create-new/create-new";
import { QuanLyAnhTrenPhieuTNGXPage } from "@/pages/master/QuanLyAnhTrenPhieuTNGX/list/QuanLyAnhTrenPhieuTNGX";
import { QuanLyVideoTuVanPage } from "@/pages/master/QuanLyVideoTuVan/list/QuanLyVideoTuVan";
import Ser_CampaignEdit from "@/pages/master/Ser_Campaign/edit/Ser_CampaignEdit";
import { Ser_CampaignPage } from "@/pages/master/Ser_Campaign/list/Ser_Campaign";
import Ser_CampaignDLPage from "@/pages/master/Ser_CampaignDL/Ser_CampaignDL";
import { Ser_CampaignDLNew } from "@/pages/master/Ser_CampaignDL/create-new/create-new";
import { Ser_CampaignDLView } from "@/pages/master/Ser_CampaignDL/view/view";
import { Ser_CavityPage } from "@/pages/master/Ser_Cavity/list/Ser_Cavity";
import { Ser_CustomerCarPage } from "@/pages/master/Ser_CustomerCar/list/Ser_CustomerCar";
import { Ser_CustomerGroupPage } from "@/pages/master/Ser_CustomerGroup/list/Ser_CustomerGroup";
import { Ser_EngineerPage } from "@/pages/master/Ser_Engineer/list/Ser_Engineer";
import { Ser_GroupRepairPage } from "@/pages/master/Ser_GroupRepair/list/Ser_GroupRepairPage";
import { Ser_InsurancePage } from "@/pages/master/Ser_Insurance/list/Ser_Insurance";
import { Ser_InsuranceContractPage } from "@/pages/master/Ser_InsuranceContract/list/Ser_InsuranceContract";
import { Ser_Inv_PartPricePage } from "@/pages/master/Ser_Inv_PartPrice/list/Ser_Inv_PartPrice";
import { Ser_Inv_StockPage } from "@/pages/master/Ser_Inv_Stock/list/Ser_Inv_Stock";
import { Ser_MST_CustomerTypePage } from "@/pages/master/Ser_MST_CustomerType";
import { Ser_MST_CustomerTypePageMST3 } from "@/pages/master/Ser_MST_CustomerType/Ser_MST_CustomerTypePageMST3";
import { Ser_MST_ModelPage } from "@/pages/master/Ser_MST_Model";
import { Ser_MST_PartPage } from "@/pages/master/Ser_MST_Part/list/Ser_MST_Part";
import { Ser_MST_PartGroupPage } from "@/pages/master/Ser_MST_PartGroup";
import { Ser_MST_PartTypePage } from "@/pages/master/Ser_MST_PartType/list/Ser_MST_PartType";
import { Ser_MST_ROComplaintDiagnosticErrorPage } from "@/pages/master/Ser_MST_ROComplaintDiagnosticError/list/Ser_MST_ROComplaintDiagnosticError";
import { Ser_MST_ROMaintanceSettingPage } from "@/pages/master/Ser_MST_ROMaintanceSetting/list/Ser_MST_ROMaintanceSetting";
import { Ser_MST_ROWarrantyPhotoTypePage } from "@/pages/master/Ser_MST_ROWarrantyPhotoType/List/Ser_MST_ROWarrantyPhotoType";
import { Ser_MST_ROWarrantyTypePage } from "@/pages/master/Ser_MST_ROWarrantyType/List/Ser_MST_ROWarrantyType";
import { Ser_MST_ROWarrantyWorkPage } from "@/pages/master/Ser_MST_ROWarrantyWork/list/Ser_MST_ROWarrantyWork";
import { Ser_MST_ServicePage } from "@/pages/master/Ser_MST_Service/list/Ser_MST_Service";
import { Ser_MST_ServiceTypeManagementPage } from "@/pages/master/Ser_MST_ServiceType/list/Ser_MST_ServiceType-management";
import { Ser_Mst_LocationPage } from "@/pages/master/Ser_Mst_Location/list/Ser_Mst_Location";
import { Ser_Mst_SupplierManagementPage } from "@/pages/master/Ser_Mst_Supplier/list/Ser_Mst_Supplier-management";
import { Ser_Mst_TradeMarkManagementPage } from "@/pages/master/Ser_Mst_TradeMark/list/Ser_Mst_TradeMark-management";
import { Ser_ServicePackagePage } from "@/pages/master/Ser_ServicePackage/list/Ser_ServicePackage";
import { TST_Mst_Exchange_UnitManagementPage } from "@/pages/master/TST_Mst_Exchange_Unit/list/TST_Mst_Exchange_Unit-management";
import { TST_Mst_PartPage } from "@/pages/master/TST_Mst_Part/list/TST_Mst_Part";
import { ThietLapNguonGocModelXePagePage } from "@/pages/master/ThietLapNguonGocModelXe";
// import { Rpt_DelayguaranteePaymentRealTimePage } from "@/pages/reports/Rpt_DelayguaranteePaymentRealTime";
import { RouteItem } from "@/types";

export const adminRoutes: RouteItem[] = [
  {
    key: "admin",
    path: "admin",
    mainMenuTitle: "admin",
    mainMenuKey: "admin",
    permissionCode: "MNU_ADMIN",
    getPageElement: () => <AdminPage />,
  },

  {
    key: "Ser_CustomerCar", //  Danh sách khách hàng
    path: "admin/Ser_CustomerCar",
    subMenuTitle: "Ser_CustomerCar -  Danh sách khách hàng",
    mainMenuKey: "admin",
    permissionCode: "",
    items: [
      {
        key: "Ser_CampaignDL",
        path: "admin/Ser_CampaignDL",
        subMenuTitle: "Ser_CampaignDLManage",
        mainMenuKey: "admin",
        getPageElement: () => <Ser_CampaignDLPage />,
        permissionCode: "",
      },
      {
        key: "Ser_CampaignDL",
        path: "admin/Ser_CampaignDL/new",
        subMenuTitle: "",
        mainMenuKey: "admin",
        getPageElement: () => <Ser_CampaignDLNew />,
        permissionCode: "",
      },
      {
        key: "Ser_CampaignDL",
        path: "admin/Ser_CampaignDL/:code",
        subMenuTitle: "",
        mainMenuKey: "admin",
        getPageElement: () => <Ser_CampaignDLView />,
        permissionCode: "",
      },
    ],
    getPageElement: () => <Ser_CustomerCarPage />,
  },
  {
    key: "QRBox",
    path: "",
    permissionCode: "",
    subMenuTitle: "QRBox",
    mainMenuKey: "admin",
    items: [
      {
        key: "QRBox/NhapKho",
        path: "admin/QRBox",
        subMenuTitle: "NhapKho",
        mainMenuKey: "admin",
        permissionCode: "",
        getPageElement: () => <Manage />,
      },
      {
        key: "QRBox/XuatKho",
        path: "admin/XuatKho",
        subMenuTitle: "XuatKho",
        mainMenuKey: "admin",
        permissionCode: "",
        getPageElement: () => <XuatKho />,
      },
      {
        key: "QRBox/XuatKho/Create",
        path: "admin/XuatKho/Create",
        subMenuTitle: "",
        mainMenuKey: "admin",
        permissionCode: "",
        getPageElement: () => <CreateNew />,
      },
    ],
  },
  // {
  //   // 03.Quản lý loại công việc
  //   key: "Ser_MST_ServiceType", //Tuệ
  //   path: "admin/Ser_MST_ServiceType",
  //   subMenuTitle: "Ser_MST_ServiceType - Quản lý loại công việc",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_MST_ServiceTypeManagementPage />,
  // },
  // {
  //   key: "Ser_MST_Service",
  //   path: "admin/Ser_MST_Service",
  //   subMenuTitle: "Ser_MST_Service - Quản lý danh sách công việc",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Ser_MST_ServicePage />,
  // },

  // {
  //   // 06.Quản lý hiệu xe
  //   key: "Ser_Mst_TradeMark", //Tuệ
  //   path: "admin/Ser_Mst_TradeMark",
  //   subMenuTitle: "Ser_Mst_TradeMark - Quản lý hiệu xe",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_Mst_TradeMarkManagementPage />,
  // },

  // {
  //   key: "Ser_MST_Model",
  //   path: "admin/Ser_MST_Model",
  //   subMenuTitle: "Ser_MST_Model - Quản lý Model",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Ser_MST_ModelPage />,
  // },

  // {
  //   key: "Ser_MST_PartGroup",
  //   path: "admin/Ser_MST_PartGroup",
  //   subMenuTitle: "Ser_MST_PartGroup - Quản lý loại vật tư",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Ser_MST_PartGroupPage />,
  // },

  // {
  //   key: "Ser_MST_PartType",
  //   path: "admin/Ser_MST_PartType",
  //   subMenuTitle: "Ser_MST_PartType - Quản lý loại hàng",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Ser_MST_PartTypePage />,
  // },

  // {
  //   key: "Ser_MST_Part",
  //   path: "admin/Ser_MST_Part",
  //   subMenuTitle: "Ser_MST_Part - Quản lý danh sách phụ tùng",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Ser_MST_PartPage />,
  // },

  // {
  //   key: "Ser_MST_ROWarrantyWorkPage", // Quản lý công việc bảo hành
  //   path: "admin/Ser_MST_ROWarrantyWorkPage",
  //   subMenuTitle: "Ser_MST_ROWarrantyWorkPage - Quản lý công việc bảo hành",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_MST_ROWarrantyWorkPage />,
  // },

  // {
  //   key: "Ser_MST_ROComplaintDiagnosticErrorPage", // Quản lý mã lỗi phàn nàn và chẩn đoán
  //   path: "admin/Ser_MST_ROComplaintDiagnosticErrorPage",
  //   subMenuTitle:
  //     "Ser_MST_ROComplaintDiagnosticErrorPage - Quản lý mã lỗi phàn nàn và chẩn đoán",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_MST_ROComplaintDiagnosticErrorPage />,
  // },

  // {
  //   key: "Ser_Mst_Location",
  //   path: "admin/Ser_Mst_Location",
  //   subMenuTitle: "Ser_Mst_Location - Quản lý vị trí",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Ser_Mst_LocationPage />,
  // },

  // {
  //   key: "Ser_Insurance", // Quản lý hãng bảo hiểm
  //   path: "admin/Ser_Insurance",
  //   subMenuTitle: "Ser_Insurance - Quản lý hãng bảo hiểm",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_InsurancePage />,
  // },

  // {
  //   key: "Ser_InsuranceContract", // Quản lý hợp đồng bảo hiểm
  //   path: "admin/Ser_InsuranceContract",
  //   subMenuTitle: "Ser_InsuranceContract - Quản lý hợp đồng bảo hiểm",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_InsuranceContractPage />,
  // },

  // {
  //   // 23.Quản lý nhà cung cấp
  //   key: "Ser_Mst_Supplier", //Tuệ
  //   path: "admin/Ser_Mst_Supplier",
  //   subMenuTitle: "Ser_Mst_Supplier - Quản lý nhà cung cấp",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_Mst_SupplierManagementPage />,
  // },

  // {
  //   key: "Ser_Campaign", // Quản lý chiến dịch
  //   path: "admin/Ser_Campaign",
  //   subMenuTitle: "Ser_Campaign - Quản lý chiến dịch",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_CampaignPage />,
  // },
  // {
  //   key: "Ser_Campaign", // Quản lý chiến dịch
  //   path: "admin/Ser_Campaign/:type?/:code?",
  //   subMenuTitle: "",
  //   subMenuKey: "Ser_Campaign",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_CampaignEdit />,
  // },

  // {
  //   key: "Mst_Param", // Quản lý tham số
  //   path: "admin/Mst_Param",
  //   subMenuTitle: "Mst_Param - Quản lý tham số",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_ParamPage />,
  // },

  // {
  //   key: "Ser_GroupRepair", // Quản lý tổ kỹ thuật
  //   path: "admin/Ser_GroupRepair",
  //   subMenuTitle: "Ser_GroupRepair - Quản lý tổ kỹ thuật",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_GroupRepairPage />,
  // },

  // {
  //   key: "Ser_Engineer", // Quản lý nhân viên
  //   path: "admin/Ser_Engineer",
  //   subMenuTitle: "Ser_Engineer - Quản lý nhân viên",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_EngineerPage />,
  // },

  // {
  //   key: "Mst_Staff", // Quản lý loại nhân viên
  //   path: "admin/Mst_Staff",
  //   subMenuTitle: "Mst_Staff - Quản lý loại nhân viên",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_StaffPage />,
  // },

  // {
  //   key: "Ser_Cavity", // Quản lý khoang sửa chữa
  //   path: "admin/Ser_Cavity",
  //   subMenuTitle: "Ser_Cavity - Quản lý khoang sửa chữa",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_CavityPage />,
  // },

  // {
  //   key: "Mst_Compartment", // Quản lý loại khoang sửa chữa
  //   path: "admin/Mst_Compartment",
  //   subMenuTitle: "Mst_Compartment - Quản lý loại khoang sửa chữa",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_CompartmentPage />,
  // },

  // {
  //   key: "Mst_Param_Optional",
  //   path: "admin/Mst_Param_Optional",
  //   subMenuTitle: "Mst_Param_Optional - Tùy chọn",
  //   mainMenuKey: "admin",
  //   permissionCode: "", //
  //   getPageElement: () => <Mst_Param_OptionalPage />,
  // },

  // {
  //   key: "TST_Mst_Part", // Quản lý phụ tùng chính hãng TST
  //   path: "admin/TST_Mst_Part",
  //   subMenuTitle: "TST_Mst_Part - QL phụ tùng chính hãng TST",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <TST_Mst_PartPage />,
  // },
  // {
  //   key: "Ser_ServicePackage", //  Quản lý gói dịch vụ
  //   path: "admin/Ser_ServicePackage",
  //   subMenuTitle: "Ser_ServicePackage - QL gói dịch vụ",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_ServicePackagePage />,
  // },
  // {
  //   key: "Ser_Inv_PartPrice", // Quản lý giá bán phụ tùng
  //   path: "admin/Ser_Inv_PartPrice",
  //   subMenuTitle: "Ser_Inv_PartPrice - QL giá bán phụ tùng",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_Inv_PartPricePage />,
  // },
  // {
  //   key: "Ser_Inv_Stock", // Quản lý danh sách kho
  //   path: "admin/Ser_Inv_Stock",
  //   subMenuTitle: "Ser_Inv_Stock - QL danh sách kho",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_Inv_StockPage />,
  // },
  // {
  //   key: "Ser_CustomerGroup", // Quản lý khách đoàn
  //   path: "admin/Ser_CustomerGroup",
  //   subMenuTitle: "Ser_CustomerGroup - QL khách đoàn",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_CustomerGroupPage />,
  // },
  // {
  //   key: "Mst_CarModelStd", //  Quản lý model tiêu chuẩn
  //   path: "admin/Mst_CarModelStd",
  //   subMenuTitle: "Mst_CarModzelStd - Quản lý model tiêu chuẩn",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_CarModelStdPage />,
  // },
  // {
  //   key: "Mst_DeliveryForm", //  Quản lý hình thức đặt hàng
  //   path: "admin/Mst_DeliveryForm",
  //   subMenuTitle: "Mst_DeliveryForm -Quản lý hình thức đặt hàng",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_DeliveryFormPage />,
  // },
  // {
  //   key: "Mst_DeliveryLocation", // Quản lý địa điểm giao hàng đại lý
  //   path: "admin/Mst_DeliveryLocation",
  //   subMenuTitle: "Mst_DeliveryLocation -Quản lý địa điểm giao hàng đại lý",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_DeliveryLocationHTCPage />,
  // },
  // {
  //   key: "Mst_OrderComplainImageType", //  Quản lý loại ảnh khiếu nại
  //   path: "admin/Mst_OrderComplainImageType",
  //   subMenuTitle: "Mst_OrderComplainImageType - Quản lý loại ảnh khiếu nại",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_OrderComplainImageTypePage />,
  // },
  // {
  //   key: "Mst_OrderComplainType", // Quản lý phân loại khiếu nại
  //   path: "admin/Mst_OrderComplainType",
  //   subMenuTitle: "Mst_OrderComplainType - Quản lý phân loại khiếu nại",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_OrderComplainTypePage />,
  // },

  // // ---- - -- - --

  // // --- HTV ----

  // {
  //   key: "Mst_BieuMauIn", // Thiết lập nguồn gốc model xe
  //   path: "admin/Mst_BieuMauIn",
  //   subMenuTitle: "Mst_BieuMauIn",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Mst_BieuMauIn />,
  // },

  // // {
  // //   key: "Ser_CampaignDLPage",
  // //   path: "",
  // //   subMenuTitle: "Ser_CampaignDLPage",
  // //   mainMenuKey: "admin",
  // //   permissionCode: "",
  // //   items: [
  // //     {
  // //       key: "Ser_CampaignDL",
  // //       path: "admin/Ser_CampaignDL",
  // //       subMenuTitle: "Ser_CampaignDLManage",
  // //       mainMenuKey: "admin",
  // //       getPageElement: () => <Ser_CampaignDLPage />,
  // //       permissionCode: "",
  // //     },
  // //     {
  // //       key: "Ser_CampaignDL",
  // //       path: "admin/Ser_CampaignDL/new",
  // //       subMenuTitle: "Ser_CampaignDLManage",
  // //       mainMenuKey: "admin",
  // //       getPageElement: () => <Ser_CampaignDLNew />,
  // //       permissionCode: "",
  // //     },
  // //   ],
  // // },
  // {
  //   key: "ThietLapNguonGocModelXePage", // Thiết lập nguồn gốc model xe
  //   path: "admin/ThietLapNguonGocModelXePage",
  //   subMenuTitle: "ThietLapNguonGocModelXePage",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <ThietLapNguonGocModelXePagePage />,
  // },
  // // {
  // //   key: "Mst_District", // Quận Huyện
  // //   path: "admin/Mst_District",
  // //   subMenuTitle: "Mst_District",
  // //   mainMenuKey: "admin",
  // //   permissionCode: "",
  // //   getPageElement: () => <Mst_DistrictPage />,
  // // },

  // // {
  // //   key: "provinceManagement",
  // //   path: "admin/Mst_Province",
  // //   subMenuTitle: "provinceManagement",
  // //   mainMenuKey: "admin",
  // //   permissionCode: "",
  // //   getPageElement: () => <ProvinceManagementPage />,
  // // },
  // // {
  // //   key: "provinceManagement",
  // //   path: "master/Mst_Province/:provinceId",
  // //   subMenuTitle: "",
  // //   mainMenuKey: "admin",
  // //   permissionCode: "",
  // //   getPageElement: () => <ProvinceManagementPage />,
  // // },

  // {
  //   // 12.Quy đổi đơn vị phụ tùng TST
  //   key: "TST_Mst_Exchange_Unit", //Tuệ
  //   path: "admin/TST_Mst_Exchange_Unit",
  //   subMenuTitle: "TST_Mst_Exchange_Unit - Quy đổi đơn vị phụ tùng TST",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <TST_Mst_Exchange_UnitManagementPage />,
  // },

  // // LinhPV

  // // LinhPV - Bàn giao của Quang

  // // LinhPV-End

  // // ======================= ThangPV START - Đừng đè vào đoạn dưới của ThangPV =========================

  // // chưa commit

  // // ======================= ThangPV END - Đừng đè vào đoạn trên của ThangPV =========================

  // {
  //   key: "BOM", // Quản lý BOM vật tư tối thiểu
  //   path: "admin/BOM",
  //   subMenuTitle: "BOM - Quản lý BOM vật tư tối thiểu",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <BOMPage />,
  // },
  // {
  //   key: "QuanLyVideoTuVan", // Quản lý Video tư vấn
  //   path: "admin/QuanLyVideoTuVan",
  //   subMenuTitle: "QuanLyVideoTuVan - Quản lý Video tư vấn",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <QuanLyVideoTuVanPage />,
  // },
  // {
  //   key: "QuanLyAnhTrenPhieuTNGX", // Quản lý Ảnh trên phiếu TN-GX
  //   path: "admin/QuanLyAnhTrenPhieuTNGX",
  //   subMenuTitle: "QuanLyAnhTrenPhieuTNGX - Quản lý Ảnh trên phiếu TN-GX",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <QuanLyAnhTrenPhieuTNGXPage />,
  // },
  // {
  //   key: "Ser_MST_ROMaintanceSetting", // Quản lý thiết lập bảo dưỡng
  //   path: "admin/Ser_MST_ROMaintanceSetting",
  //   subMenuTitle: "Ser_MST_ROMaintanceSetting - Quản lý thiết lập bảo dưỡng",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_MST_ROMaintanceSettingPage />,
  // },
  // {
  //   key: "Ser_MST_ROWarrantyTypePage", // Quản lý loại bảo hành
  //   path: "admin/Ser_MST_ROWarrantyTypePage",
  //   subMenuTitle: "Ser_MST_ROWarrantyTypePage - Quản lý loại bảo hành",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_MST_ROWarrantyTypePage />,
  // },

  // {
  //   key: "Ser_MST_ROWarrantyPhotoTypePage", // Quản lý công việc bảo hành
  //   path: "admin/Ser_MST_ROWarrantyPhotoTypePage",
  //   subMenuTitle:
  //     "Ser_MST_ROWarrantyPhotoTypePage - Quản lý thiết lập loại ảnh bảo hành",
  //   mainMenuKey: "admin",
  //   permissionCode: "",
  //   getPageElement: () => <Ser_MST_ROWarrantyPhotoTypePage />,
  // },
];

// Thăng End
