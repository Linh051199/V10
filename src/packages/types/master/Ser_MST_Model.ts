import { SearchParam } from "../clientgate";

export interface Search_Ser_MST_Model extends SearchParam {
  TradeMarkCode: string;
  ModelName: string;
}
export interface Ser_MST_Model {
  ModelID: string;
  DealerCode: string;
  TradeMarkCode: string; // Mã hiệu xe
  ProductionCode: string; // Mã sản phẩm
  ModelName: string; // Tên mô tả xe
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
  ModelCode: string; // Mã model
}

// "ModelID": 19579,
// "DealerCode": "VS058",
// "TradeMarkCode": "HYUNDAI",
// "ProductionCode": "AA",
// "ModelName": "PORTER",
// "IsActive": "1",
// "LogLUDateTime": "2020-02-08T12:00:00",
// "LogLUBy": "sys.20200208.1200",
// "CreatedDate": null,
// "CreatedBy": null,
// "ModelCode": "AA"
