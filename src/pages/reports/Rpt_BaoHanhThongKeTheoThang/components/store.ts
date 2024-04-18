import {atom} from "jotai";
import {RptHRSalesManParamDto} from "@packages/types";

export const searchConditionAtom = atom<Partial<RptHRSalesManParamDto>>({})