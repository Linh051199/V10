import { SearchParam } from "../clientgate"

export interface Ser_MST_ROMaintanceSetting {
  SoKm: string
  CSBH: string
}

export interface Ser_MST_ROMaintanceSetting_Params extends SearchParam {
  Km: any
  ROMSID: any
}