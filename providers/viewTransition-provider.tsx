"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useBrowserNativeTransitions } from "@/hooks/viewTransition/useBrowserNativeTransitions";

/**
 * We store a "finish" callback that resolves the promise created inside startViewTransition().
 * The route component mount effect will call it.
 */
type FinishFn = null | (() => void);
const FinishContext = createContext<(fn: FinishFn) => void>(() => {});

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  const [finish, setFinish] = useState<FinishFn>(null);

  // When someone sets a finish fn, run it once then clear it.
  useEffect(() => {
    if (!finish) return;
    finish();
    setFinish(null);
  }, [finish]);

  // Handles back/forward
  useBrowserNativeTransitions();

  const setFinishOnce = useMemo(() => setFinish, []);
  return <FinishContext.Provider value={setFinishOnce}>{children}</FinishContext.Provider>;
}

export function useSetFinishViewTransition() {
  return useContext(FinishContext);
}
