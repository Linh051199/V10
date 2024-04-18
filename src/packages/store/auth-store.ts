import { AuthState } from "@/types";
import { atom } from "jotai";
import { atomWithLocalStorage } from "./utils";

const emptyState: AuthState = {
  token: localStorage.getItem("token") || undefined,
  networkId: localStorage.getItem("networkId") || '0',
  clientGateUrl: localStorage.getItem("clientGateUrl") || undefined,
  currentUser: undefined,
  clientGate: undefined,
  permissions: undefined,
  
};
export const authAtom = atomWithLocalStorage<AuthState>('auth', emptyState);
export const loggedInAtom = atom((get) => {
  return !!get(authAtom).token;
});

