"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { motion, PanInfo } from "framer-motion";
import ResponsivePicture from "@/hooks/ResponsivePicture";

type GalleryProps = { data?: any };

// Fallback hardcode kalau data.dataContent.galleryImageData kosong/null/gagal
const FALLBACK_IMAGES = [
  { mobile: "/images/gallery/Pengantin.webp", desktop: "/images/gallery/PengantinD.webp" },
  { mobile: "/images/gallery/Pengantin2.webp", desktop: "/images/gallery/PengantinD2.webp" },
  { mobile: "/images/gallery/Pengantin3.webp", desktop: "/images/gallery/PengantinD3.webp" },
  { mobile: "/images/gallery/Pengantin4.webp", desktop: "/images/gallery/PengantinD4.webp" },
  { mobile: "/images/gallery/Pengantin5.webp", desktop: "/images/gallery/PengantinD5.webp" },
  { mobile: "/images/gallery/Pengantin6.webp", desktop: "/images/gallery/PengantinD.webp" },
  { mobile: "/images/gallery/Pengantin7.webp", desktop: "/images/gallery/PengantinD2.webp" },
];

const AUTO_SLIDE_INTERVAL = 4000; // ms

function normalizeGalleryData(
  raw: any
): { mobile: string; desktop: string }[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const urls: string[] = raw
    .map((item) => {
      let url: string | null = null;
      if (typeof item === "string") url = item;
      else if (item && typeof item === "object") {
        url = item.url ?? item.image ?? item.imageUrl ?? item.src ?? null;
      }
      if (!url) return null;

      return url.startsWith("http")
        ? url
        : `https://media.twinklebook.com/${url}`;
    })
    .filter((url): url is string => Boolean(url));

  if (urls.length === 0) return null;

  // API cuma nyediain 1 URL per foto (bukan versi mobile/desktop terpisah),
  // jadi 1 URL dipakai buat dua-duanya, cropping tetap diatur CSS object-position
  return urls.map((url) => ({ mobile: url, desktop: url }));
}

const Gallery = ({ data }: GalleryProps) => {
  const galleryImages =
    normalizeGalleryData(data?.dataContent?.galleryImageData) ?? FALLBACK_IMAGES;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const wasDragging = useRef(false);
  const total = galleryImages.length;

  useEffect(() => {
    const measure = () => {
      if (viewportRef.current) setTrackWidth(viewportRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Deteksi breakpoint desktop (samain sama breakpoint `lg:` Tailwind = 1024px)
  // buat nentuin slide mana yang dipake di Lightbox
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (lightboxOpen) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [lightboxOpen, current, total]);

  const goTo = useCallback(
    (i: number) => {
      setCurrent(((i % total) + total) % total);
    },
    [total],
  );

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = trackWidth * 0.2;
    if (info.offset.x < -swipeThreshold) {
      goTo(current + 1);
      wasDragging.current = true;
    } else if (info.offset.x > swipeThreshold) {
      goTo(current - 1);
      wasDragging.current = true;
    }
    setTimeout(() => {
      wasDragging.current = false;
    }, 0);
  };

  const handleContainerClick = () => {
    if (wasDragging.current) return;
    setLightboxOpen(true);
  };

  return (
    <>
      <section
        id="gallery"
        className="w-full bg[#F4F4F5] flex justify-center py-[25.64vw] lg:py-[138px]"
      >
        <div
          className="relative w-full flex items-center justify-center"
          onClick={handleContainerClick}
        >
          <div
            ref={viewportRef}
            className="relative w-[87.18vw] lg:w-[1098px] overflow-hidden aspect-[340/700] lg:aspect-[1098/746]"
          >
            <motion.div
              className="flex h-full"
              style={{ willChange: "transform", touchAction: "pan-y", cursor: "grab" }}
              drag="x"
              dragConstraints={{ left: -trackWidth * (total - 1), right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${current * 100}%` }}
              transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            >
              {galleryImages.map((img, i) => (
                <div key={i} className="relative w-full h-full shrink-0">
                  <ResponsivePicture
                    mobileSrc={img.mobile}
                    desktopSrc={img.desktop}
                    alt={`Gallery ${i + 1}`}
                    fill={true}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={current}
        slides={galleryImages.map((img) => ({
          src: isDesktop ? img.desktop : img.mobile,
        }))}
        plugins={[Zoom, Counter]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        noScroll={{ disabled: true }}
      />
    </>
  );
};

export default Gallery;