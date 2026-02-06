"use client";

import { startTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
// import { useLoading } from "@/providers/loading-provider";
import { useSetFinishViewTransition } from "@/providers/viewTransition-provider";

type TransitionOptions = {
  onTransitionReady?: () => void;
};

export function useNavigation() {
  const router = useRouter();
  // const { startLoadingTransition } = useLoading();
  const setFinish = useSetFinishViewTransition();

  const trigger = useCallback(
    (navigate: () => void, opts?: TransitionOptions) => {
      const canVT =
        typeof document !== "undefined" && "startViewTransition" in document;

      if (!canVT) {
        navigate();
        return;
      }

      const vt = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // Make the navigation a transition update.
            startTransition(() => {
              navigate();
              // startLoadingTransition();
              // Resolve when the new route is mounted (via provider effect)
              setFinish(() => resolve);
            });
          })
      );

      if (opts?.onTransitionReady) {
        vt.ready.then(opts.onTransitionReady);
      }
    },
    [setFinish]
  );

  const push = useCallback(
    (href: string, opts?: TransitionOptions) => {
      trigger(() => router.push(href), opts);
    },
    [router, trigger]
  );

  const replace = useCallback(
    (href: string, opts?: TransitionOptions) => {
      trigger(() => router.replace(href), opts);
    },
    [router, trigger]
  );

  const back = useCallback(
    (opts?: TransitionOptions) => {
      trigger(() => router.back(), opts);
    },
    [router, trigger]
  );

  const forward = useCallback(
    (opts?: TransitionOptions) => {
      trigger(() => router.forward(), opts);
    },
    [router, trigger]
  );

  return { push, replace, back, forward };
}
