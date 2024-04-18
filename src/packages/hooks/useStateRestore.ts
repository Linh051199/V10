import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useMemo} from "react";
import {useNavigationType} from "react-router-dom";
import {logger} from "@packages/logger";
import {match, P} from "ts-pattern";

export const useStateRestore = <T extends unknown>(
  key: string,
  defaultValue: T
) => {
  const queryClient = useQueryClient();
  const naviType = useNavigationType();

  useEffect(() => {
    if (naviType === "PUSH") {
      logger.debug("clear the cache", key, naviType);
      // push action. clear the cache
      saveToStorage(defaultValue);
    }
  }, [naviType]);
  const loadFromStorage = (): T | undefined => {
    const data = localStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data, (key, value) => {
        return match(key)
          .with(P.string.endsWith("FromTo"), () => {
            console.log(value)
            return [
              new Date(value[0]),
              new Date(value[1])
            ]
          })
          .with(P.string.includes("Time")|| P.string.includes("Date"), () => {
            return new Date(value)
          })
          .otherwise(() => value)
      });

      // convert all values of properties to Date type
      // Object.keys(parsed).forEach((key) => {
      //   if (key.includes("Time") || key.includes("Date")) {
      //     logger.debug('value:', parsed[key])
      //     parsed[key] = parsed[key] ? new Date(parsed[key]) : undefined;
      //   }
      // });
      logger.debug("parsed", parsed);
      return parsed;
    }
    return undefined;
  };

  const saveToStorage = async (data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
    await queryClient.invalidateQueries({queryKey: ["formStorage", key]});
  };
  const {data, isLoading, isError} = useQuery(
    ["formStorage", key],
    loadFromStorage,
    {
      cacheTime: 60 * 60 * 1000,
    }
  );
  const mutation = useMutation({
    mutationFn: saveToStorage,
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({queryKey: ["formStorage", key]});
    },
  });

  const isChanged = useMemo(() => {
    // @ts-ignore
    Object.keys(defaultValue).forEach(key => defaultValue[key] === undefined ? delete defaultValue[key] : {});
    logger.debug('defaultValue:', defaultValue, data)
    return data !== defaultValue
  }, [data])

  return {
    data,
    isLoading,
    isError,
    isChanged,
    onSave: mutation.mutate,
  };
};
