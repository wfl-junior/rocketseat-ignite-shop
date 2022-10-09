import { useEffect, useRef } from "react";

export const useUpdateEffect: typeof useEffect = (effect, dependencies) => {
  const isInitialRenderRef = useRef(true);

  useEffect(() => {
    if (!isInitialRenderRef.current) {
      return effect();
    }

    isInitialRenderRef.current = false;
  }, dependencies);
};
