"use client";

import { useEffect, useState } from "react";

const BREAKPOINT = 1024;

const IMAGES_MOBILE = [
  "/images/opening/OpeningBackground.webp",
  "/images/hero/Pengantin-Wm3.webp",
  "/images/profile/Layer-BM.png",
  "/images/pengantin/Sl-Wima.webp",
  "/images/gallery/Pengantin.webp",
  "/images/gallery/Pengantin2.webp",
  "/images/gallery/Pengantin3.webp",
  "/images/gallery/Pengantin4.webp",
  "/images/gallery/Pengantin5.webp",
  "/images/gallery/Pengantin6.webp",
  "/images/gallery/Pengantin7.webp",
  "/images/quote/Bg-Quotee.webp",
  "/images/quote/Item.webp",
  "/images/quote/Item2.webp",
];

const IMAGES_DESKTOP = [
  "/images/opening/OpeningBackgroundD.webp",
  "/images/hero/PengantinD.webp",
  "/images/profile/LayerBunga3.webp",
  "/images/pengantin/SL-WIMAD.webp",
  "/images/gallery/PengantinD.webp",
  "/images/gallery/PengantinD2.webp",
  "/images/gallery/PengantinD3.webp",
  "/images/gallery/PengantinD4.webp",
  "/images/gallery/PengantinD5.webp",
  "/images/quote/Quote.webp",
  "/images/quote/Item1D.svg",
  "/images/quote/Item2D.svg",
];

const IMAGES_COMMON = [
  "/images/opening/Wil-Mar.webp",
  "/images/hero/Logo-WmD.png",
  "/images/profile/William.webp",
  "/images/profile/Maria.webp",
  "/images/eventorder/LogoD.webp",
  "/images/popup/TandaCeklisBg.svg",
  "/images/popup/TandaSeru.svg",
  "/images/popup/TandaTanya.svg",
];

const VIDEO_MOBILE = "/video/Wil-Maria-compressed.mp4";
const VIDEO_DESKTOP = "/video/Wil-MariaD-compressed.mp4";

export function usePreloader(extraReady: boolean = true) {
  const [assetsProgress, setAssetsProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= BREAKPOINT;
    const imagesToLoad = [
      ...(isDesktop ? IMAGES_DESKTOP : IMAGES_MOBILE),
      ...IMAGES_COMMON,
    ];
    const videoToLoad = isDesktop ? VIDEO_DESKTOP : VIDEO_MOBILE;

    const total = imagesToLoad.length + 1;

    if (total === 0) {
      const timer = setTimeout(() => {
        setAssetsLoaded(true);
        setAssetsProgress(100);
      }, 0);
      return () => clearTimeout(timer);
    }

    let count = 0;

    imagesToLoad.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        count++;
        setAssetsProgress(Math.round((count / total) * 100));
        if (count === total) setAssetsLoaded(true);
      };
    });

    fetch(videoToLoad)
      .then(() => {
        count++;
        setAssetsProgress(Math.round((count / total) * 100));
        if (count === total) setAssetsLoaded(true);
      })
      .catch(() => {
        count++;
        setAssetsProgress(Math.round((count / total) * 100));
        if (count === total) setAssetsLoaded(true);
      });
  }, []);

  const progress = assetsLoaded && !extraReady ? 99 : assetsProgress;
  const loaded = assetsLoaded && extraReady;

  return { loaded, progress };
}