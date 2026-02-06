"use client";

import { useEffect, useRef, useState, use } from "react";
import { usePathname } from "next/navigation";

/**
 * Why usePathname? In the App Router we don't have router.events.
 * So we observe pathname changes to know when new route mounted.
 */

function canVT() {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

type Pending = null | [startPromise: Promise<void>, finish: () => void];

export function useBrowserNativeTransitions() {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const [pending, setPending] = useState<Pending>(null);

  useEffect(() => {
    if (!canVT()) return;

    const onPopState = () => {
      let finish!: () => void;
      const waitForNewRoute = new Promise<void>((resolve) => {
        finish = resolve;
      });

      // Start VT now, but keep it "open" until the new route has mounted.
      const startPromise = new Promise<void>((resolveStart) => {
        document.startViewTransition(() => {
          resolveStart();
          return waitForNewRoute;
        });
      });

      setPending([startPromise, finish]);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // If a popstate happened AND pathname is changing,
  // block rendering until VT has *started* (so old snapshot is correct).
  if (pending && prevPathnameRef.current !== pathname) {
    use(pending[0]);
  }

  // Once the new route is mounted (pathname updated), finish the VT.
  const pendingRef = useRef(pending);
  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  useEffect(() => {
    prevPathnameRef.current = pathname;

    if (pendingRef.current) {
      pendingRef.current[1](); // resolve waitForNewRoute
      pendingRef.current = null;
      setPending(null);
    }
  }, [pathname]);
}
