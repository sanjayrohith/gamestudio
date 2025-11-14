import * as React from "react";

export const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

type ViewportInfo = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: "portrait" | "landscape";
  isTouch: boolean;
  prefersReducedMotion: boolean;
};

const DEFAULT_VIEWPORT: ViewportInfo = {
  width: TABLET_BREAKPOINT,
  height: TABLET_BREAKPOINT,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  orientation: "portrait",
  isTouch: false,
  prefersReducedMotion: false,
};

const attachMediaQueryListener = (mql: MediaQueryList | null, handler: () => void) => {
  if (!mql) {
    return () => undefined;
  }

  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }

  mql.addListener(handler);
  return () => mql.removeListener(handler);
};

const subscribeToViewport = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const opts: AddEventListenerOptions = { passive: true };
  window.addEventListener("resize", callback, opts);
  window.addEventListener("orientationchange", callback);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerQuery = window.matchMedia("(pointer: coarse)");
  const cleanupMotion = attachMediaQueryListener(motionQuery, callback);
  const cleanupPointer = attachMediaQueryListener(pointerQuery, callback);

  return () => {
    window.removeEventListener("resize", callback);
    window.removeEventListener("orientationchange", callback);
    cleanupMotion();
    cleanupPointer();
  };
};

const getViewportSnapshot = (): ViewportInfo => {
  if (typeof window === "undefined") {
    return DEFAULT_VIEWPORT;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
  const isDesktop = !isMobile && !isTablet;
  const orientation: ViewportInfo["orientation"] = width >= height ? "landscape" : "portrait";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    isTouch,
    prefersReducedMotion,
  };
};

export function useViewportInfo() {
  return React.useSyncExternalStore(subscribeToViewport, getViewportSnapshot, () => DEFAULT_VIEWPORT);
}

export function useIsMobile() {
  return useViewportInfo().isMobile;
}

export function useIsTablet() {
  return useViewportInfo().isTablet;
}

export function useIsDesktop() {
  return useViewportInfo().isDesktop;
}
