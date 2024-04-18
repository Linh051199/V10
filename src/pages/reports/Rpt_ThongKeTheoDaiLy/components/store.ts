import { Rpt_PivotRetailContractParam } from "@/packages/api/clientgate/Rpt_PivotRetailContractApi";
import {atom} from "jotai";


export const searchConditionAtom = atom<Partial<Rpt_PivotRetailContractParam>>({})