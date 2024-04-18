import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";

interface useStateSearchProps {
  storeKey: string;
}
export const useStateSearch = ({ storeKey }: useStateSearchProps) => {
  const {
    auth: { currentUser },
  } = useAuth();

  const STORE_KEY = `${currentUser?.Email}_${storeKey}`;
  const saveState = (currentCondition: any) => {
    if (storeKey) {
      localStorage.setItem(STORE_KEY, JSON.stringify(currentCondition));
    }
  };
  const clearState = (storeKey: any) => {
    if (storeKey) {
      localStorage.removeItem(`${currentUser?.Email}_${storeKey}`);
    }
  };

  return {
    saveState,
    data: storeKey
      ? JSON.parse(localStorage.getItem(STORE_KEY) as any) || null
      : {},
    clearState,
  };
};
