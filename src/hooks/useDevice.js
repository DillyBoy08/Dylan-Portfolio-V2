import { useState, useEffect } from "react";

let cachedIsTouch = null;
let cachedReducedMotion = null;

function detect() {
  if (cachedIsTouch === null) {
    cachedIsTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
  }
  if (cachedReducedMotion === null) {
    cachedReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }
}

export function useDevice() {
  const [device, setDevice] = useState({
    isTouch: false,
    reducedMotion: false,
  });

  useEffect(() => {
    detect();
    setDevice({ isTouch: cachedIsTouch, reducedMotion: cachedReducedMotion });
  }, []);

  return device;
}
