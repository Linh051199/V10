import { Tid } from "@/utils/hash";
import { logger } from "@packages/logger";
import { ClientGateInfoResponse, IUser } from "@packages/types";
import axios from "axios";

const entryGateDomain: string = `${import.meta.env.VITE_API_ENTRY_CENTER_GATE_URL
  }`;
const Solution: string = `${import.meta.env.VITE_SOLUTION_CODE}`;

const entryGateApiBase = axios.create({
  baseURL: entryGateDomain,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    AppAgent: "Web-DMS Service",
    GwUserCode: "idocNet.idn.EntryCenterGate.Sv",
    GwPassword: "idocNet.idn.EntryCenterGate.Sv",
    AppLanguageCode: "en",
    UtcOffset: 7,
    DealerCode: "HTC",
    Tid: Tid(),
  },
});
export const entryGateApi = {
  getNetworkInfo: async (
    networkId: string,
    orgId: string,
    currentUser: IUser
  ) => {
    const token = localStorage.getItem("token");
    const response = await entryGateApiBase.post<ClientGateInfoResponse>(
      "/EntryCtMstNetwork/GetByNetwork",
      {
        SolutionCode: Solution,
        NetworkIdSearch: networkId,
      },
      {
        headers: {
          NetworkId: networkId,
          OrgId: orgId,
          Authorization: `Bearer ${token}`,
          AppLanguageCode: currentUser.Language,
          UtcOffset: currentUser.TimeZone,
        },
      }
    );
    logger.debug("response", response);
    // console.log(response);
    // debugger;
    if (
      response.status === 200 &&
      response.data.Data._objResult &&
      response.data.Data._objResult.length > 0
    ) {
      return response.data;
    } else {
      return null;
    }
  },
};
