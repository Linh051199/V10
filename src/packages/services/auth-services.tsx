import React, { useCallback } from "react";
import { signIn as sendSignInRequest } from "@packages/api/auth";
import { ccsApi, entryGateApi } from "src/packages/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@packages/contexts/auth";
import { logger } from "@packages/logger";

const ssoDomain = import.meta.env.VITE_ACC_BASE_URL;
const client_id = import.meta.env.VITE_SOLUTION_CODE;

export const useAuthService = () => {
  const navigate = useNavigate();
  const { logout, login, setClientGateInfo } = useAuth();

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      // setUser(result.data);
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    logout();
    window.open(
      `${ssoDomain}/account/signout/${client_id}`,
      "_self",
      "noreferrer"
    );
    window.close();
  }, [logout]);

  const loginIgoss = useCallback(async (networkId: string) => {
    const resp = await ccsApi.getSessionInfo(networkId);
    if (resp.Success) {
      // get client gate
      const clientGate = await entryGateApi.getNetworkInfo(
        networkId,
        resp.Data.OrgId,
        resp.Data.CurrentUser
      );
      logger.debug("client gate:", clientGate);
      if (clientGate) {
        // setClientGateInfo(clientGate.Data._objResult[0])
        login(
          localStorage.getItem("token") as string,
          resp.Data.CurrentUser,
          resp.Data.OrgData,
          clientGate.Data._objResult?.[0]
        );
      } else {
        login(
          localStorage.getItem("token") as string,
          resp.Data.CurrentUser,
          resp.Data.OrgData
        );
      }
    } else {
      logout();
      navigate("/login");
    }
  }, []);

  return {
    signIn,
    signOut,
    loginIgoss,
  };
};
