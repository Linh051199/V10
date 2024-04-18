import { SearchParam } from "../clientgate";



export interface Ser_MST_ROComplaintDiagnosticError {
  ErrorCode: string,
  ErrorName: string,
  ErrorTypeCode: string
  ErrorDesc: string
  Trangthai: string
  GhiChu: string
}

export interface Ser_MST_ROComplaintDiagnosticErrorParams extends SearchParam {
  ErrorCode?: string;
  ErrorName: string
  ErrorTypeCode: string
}