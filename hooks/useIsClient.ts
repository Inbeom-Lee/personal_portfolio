"use client";

import { useEffect, useState } from "react";

/**
 * True only after mount. Use for GSAP/Three or any client-only logic
 * that should run after hydration.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}
