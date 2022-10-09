import { useEffect, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

export function useLocalStorageState<T>(
  key: string,
  initialState: T | (() => T),
) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const existingState = localStorage.getItem(key);

    if (existingState) {
      return setState(JSON.parse(existingState));
    }

    setState(initialState instanceof Function ? initialState() : initialState);
  }, []);

  useUpdateEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
