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

const galleryImages = [
  { mobile: "/images/gallery/Pengantin.webp", desktop: "/images/gallery/PengantinD.webp" },
  { mobile: "/images/gallery/Pengantin2.webp", desktop: "/images/gallery/PengantinD2.webp" },
  { mobile: "/images/gallery/Pengantin3.webp", desktop: "/images/gallery/PengantinD3.webp" },
  { mobile: "/images/gallery/Pengantin4.webp", desktop: "/images/gallery/PengantinD4.webp" },
  { mobile: "/images/gallery/Pengantin5.webp", desktop: "/images/gallery/PengantinD5.webp" },
  { mobile: "/images/gallery/Pengantin6.webp", desktop: "/images/gallery/PengantinD.webp" },
  { mobile: "/images/gallery/Pengantin7.webp", desktop: "/images/gallery/PengantinD2.webp" },
];

const AUTO_SLIDE_INTERVAL = 4000; // ms

const Gallery = ({ data }: GalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false); // ⬅️ tambahan baru

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
            className="relative w-[87.18vw] lg:w-[1098px] overflow-hidden aspect-[340/700] lg:aspect-[1098/746]"          >
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
          src: isDesktop ? img.desktop : img.mobile, // ⬅️ fix: pilih sesuai viewport
        }))}
        plugins={[Zoom, Counter]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        noScroll={{ disabled: true }}
      />
    </>
  );
};

export default Gallery;

// sebelum slideshow mobile dekstop
// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Counter from "yet-another-react-lightbox/plugins/counter";
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/counter.css";
// import { motion, PanInfo } from "framer-motion";
// import ResponsivePicture from "@/hooks/ResponsivePicture";

// type GalleryProps = { data?: any };

// const galleryImages = [
//   { mobile: "/images/gallery/Pengantin.webp", desktop: "/images/gallery/PengantinD.webp" },
//   { mobile: "/images/gallery/Pengantin2.webp", desktop: "/images/gallery/PengantinD2.webp" },
//   { mobile: "/images/gallery/Pengantin3.webp", desktop: "/images/gallery/PengantinD3.webp" },
//   { mobile: "/images/gallery/Pengantin4.webp", desktop: "/images/gallery/PengantinD4.webp" },
//   { mobile: "/images/gallery/Pengantin5.webp", desktop: "/images/gallery/PengantinD5.webp" },
//   { mobile: "/images/gallery/Pengantin6.webp", desktop: "/images/gallery/PengantinD.webp" },
//   { mobile: "/images/gallery/Pengantin7.webp", desktop: "/images/gallery/PengantinD2.webp" },
// ];

// const AUTO_SLIDE_INTERVAL = 4000; // ms

// const Gallery = ({ data }: GalleryProps) => {
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [current, setCurrent] = useState(0);
//   const [trackWidth, setTrackWidth] = useState(0);

//   const viewportRef = useRef<HTMLDivElement | null>(null);
//   const wasDragging = useRef(false); // buat nolak klik palsu abis drag
//   const total = galleryImages.length;

//   // ukur lebar viewport buat drag constraint
//   useEffect(() => {
//     const measure = () => {
//       if (viewportRef.current) setTrackWidth(viewportRef.current.offsetWidth);
//     };
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, []);

//   // Autoplay. Dependency `current` = kunci utamanya:
//   // tiap `current` berubah (auto ATAU manual drag/klik), interval lama di-clear
//   // dan interval baru mulai dari 0 lagi. Jadi gak ada kasus "geser manual detik ke-3,
//   // eh 1 detik kemudian keslide otomatis lagi" -- karena timer selalu fresh 6 detik
//   // dihitung dari perpindahan slide TERAKHIR, bukan dari mount pertama.
//   useEffect(() => {
//     if (lightboxOpen) return;
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % total);
//     }, AUTO_SLIDE_INTERVAL);
//     return () => clearInterval(timer);
//   }, [lightboxOpen, current, total]);

//   const goTo = useCallback(
//     (i: number) => {
//       setCurrent(((i % total) + total) % total);
//     },
//     [total],
//   );

//   const handleDragEnd = (
//     _e: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo,
//   ) => {
//     const swipeThreshold = trackWidth * 0.2;
//     if (info.offset.x < -swipeThreshold) {
//       goTo(current + 1);
//       wasDragging.current = true;
//     } else if (info.offset.x > swipeThreshold) {
//       goTo(current - 1);
//       wasDragging.current = true;
//     }
//     // reset flag abis 1 tick, biar klik normal berikutnya tetep bisa buka lightbox
//     setTimeout(() => {
//       wasDragging.current = false;
//     }, 0);
//   };

//   const handleContainerClick = () => {
//     if (wasDragging.current) return; // klik ini hasil dari drag, bukan tap asli -> jangan buka lightbox
//     setLightboxOpen(true);
//   };

//   return (
//     <>
//       <section
//         id="gallery"
//         className="w-full bg[#F4F4F5] flex justify-center py-[25.64vw] lg:py-[138px]"
//       >
//         <div
//           className="relative w-full flex items-center justify-center"
//           onClick={handleContainerClick}
//         >
//           <div
//             ref={viewportRef}
//             className="relative w-[87.18vw] lg:w-[1098px] overflow-hidden aspect-[340/700] lg:aspect-[1098/746]"          >
//             <motion.div
//               className="flex h-full"
//               style={{ willChange: "transform", touchAction: "pan-y", cursor: "grab" }}
//               drag="x"
//               dragConstraints={{ left: -trackWidth * (total - 1), right: 0 }}
//               dragElastic={0.15}
//               onDragEnd={handleDragEnd}
//               animate={{ x: `-${current * 100}%` }}
//               transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
//             >
//               {galleryImages.map((img, i) => (
//                 <div key={i} className="relative w-full h-full shrink-0">
//                   <ResponsivePicture
//                     mobileSrc={img.mobile}
//                     desktopSrc={img.desktop}
//                     alt={`Gallery ${i + 1}`}
//                     fill={true}
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       <Lightbox
//         open={lightboxOpen}
//         close={() => setLightboxOpen(false)}
//         index={current}
//         slides={galleryImages.map((img) => ({ src: img.mobile }))}
//         plugins={[Zoom, Counter]}
//         counter={{ container: { style: { top: "unset", bottom: 0 } } }}
//         noScroll={{ disabled: true }}
//       />
//     </>
//   );
// };

// export default Gallery;

// "use client";

// import React, { useState, useEffect } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Counter from "yet-another-react-lightbox/plugins/counter";
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/counter.css";
// import { motion } from "framer-motion";
// import ResponsivePicture from "@/hooks/ResponsivePicture";

// const galleryImages = [
//   { mobile: "/images/gallery/Pengantin.webp", desktop: "/images/gallery/PengantinD.webp" },
//   { mobile: "/images/gallery/Pengantin2.webp", desktop: "/images/gallery/Pengantin2D.webp" },
//   { mobile: "/images/gallery/Pengantin3.webp", desktop: "/images/gallery/Pengantin3D.webp" },
//   { mobile: "/images/gallery/Pengantin4.webp", desktop: "/images/gallery/Pengantin4D.webp" },
// ];

// const AUTO_SLIDE_INTERVAL = 6000; // ms

// const Gallery = () => {
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     if (lightboxOpen) return;
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % galleryImages.length);
//     }, AUTO_SLIDE_INTERVAL);
//     return () => clearInterval(timer);
//   }, [lightboxOpen]);

//   return (
//     <>
//       <section
//         id="gallery"
//         className="w-full bg[#F4F4F5] flex justify-center py-[25.64vw] lg:py-[138px]"
//       >
//         <div
//           className="relative w-full flex items-center justify-center"
//           onClick={() => setLightboxOpen(true)}
//         >
//           <div
//             className="relative w-[87.18vw] lg:w-[1098px] overflow-hidden"
//             style={{ aspectRatio: "340 / 700" }}
//           >
//             <motion.div
//               animate={{ x: `-${current * 100}%` }}
//               transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
//               className="flex h-full"
//               style={{ willChange: "transform" }}
//             >
//               {galleryImages.map((img, i) => (
//                 <div key={i} className="relative w-full h-full shrink-0">
//                   <ResponsivePicture
//                     mobileSrc={img.mobile}
//                     desktopSrc={img.desktop}
//                     alt={`Gallery ${i + 1}`}
//                     fill={true}
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       <Lightbox
//         open={lightboxOpen}
//         close={() => setLightboxOpen(false)}
//         index={current}
//         slides={galleryImages.map((img) => ({ src: img.mobile }))}
//         plugins={[Zoom, Counter]}
//         counter={{ container: { style: { top: "unset", bottom: 0 } } }}
//         noScroll={{ disabled: true }}
//       />
//     </>
//   );
// };

// export default Gallery;







// "use client";

// import React, { useState } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/styles.css";
// import { motion, AnimatePresence, PanInfo } from "framer-motion";
// import { fadeUp } from "@/lib/animation";
// import ResponsivePicture from "@/hooks/ResponsivePicture";

// const galleryImages = [
//   { mobile: "/images/gallery/Pengantin.webp", desktop: "/images/gallery/PengantinD.webp" },
//   { mobile: "/images/gallery/Pengantin2.webp", desktop: "/images/gallery/Pengantin2D.webp" },
//   { mobile: "/images/gallery/Pengantin3.webp", desktop: "/images/gallery/Pengantin3D.webp" },
//   { mobile: "/images/gallery/Pengantin4.webp", desktop: "/images/gallery/Pengantin4D.webp" },
// ];

// const SWIPE_THRESHOLD = 50; // px

// const Gallery = () => {
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [current, setCurrent] = useState(0);

//   const handleDragEnd = (
//     _: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo
//   ) => {
//     if (info.offset.x < -SWIPE_THRESHOLD) {
//       setCurrent((prev) => (prev + 1) % galleryImages.length);
//     } else if (info.offset.x > SWIPE_THRESHOLD) {
//       setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
//     }
//   };

//   return (
//     <>
//       <section
//         id="gallery"
//         className="w-full bg[#F4F4F5] flex justify-center py-[25.64vw] lg:py-[138px]"
//       >
//         <div className="relative w-full flex items-center justify-center">
//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
//           >
//             <motion.div
//               drag="x"
//               dragConstraints={{ left: 0, right: 0 }}
//               dragElastic={0}
//               onDragEnd={handleDragEnd}
//               onClick={() => setLightboxOpen(true)}
//               className="relative w-[87.18vw] lg:w-[1098px]"
//               style={{ aspectRatio: "340 / 700" }}
//             >
//               <AnimatePresence>
//                 <motion.div
//                   key={current}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.25, ease: "easeOut" }}
//                   className="absolute inset-0"
//                 >
//                   <ResponsivePicture
//                     mobileSrc={galleryImages[current].mobile}
//                     desktopSrc={galleryImages[current].desktop}
//                     alt="Gallery"
//                     fill={true}
//                     className="object-cover"
//                     unoptimized
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       <Lightbox
//         open={lightboxOpen}
//         close={() => setLightboxOpen(false)}
//         index={current}
//         slides={galleryImages.map((img) => ({ src: img.mobile }))}
//         plugins={[Zoom]}
//         noScroll={{ disabled: true }}
//       />
//     </>
//   );
// };

// export default Gallery;

// // "use client";

// // import React, { useState } from "react";
// // import Image from "next/image";
// // import Lightbox from "yet-another-react-lightbox";
// // import Zoom from "yet-another-react-lightbox/plugins/zoom";
// // import "yet-another-react-lightbox/styles.css";
// // import { motion } from "framer-motion";
// // import { fadeUp } from "@/lib/animation";
// // import ResponsivePicture from "@/hooks/ResponsivePicture";

// // const galleryImage = "/images/gallery/Pengantin.webp";

// // const Gallery = () => {
// //   const [lightboxOpen, setLightboxOpen] = useState(false);

// //   return (
// //     <>
// //       <section
// //         id="gallery"
// //         className="w-full bg[#F4F4F5] flex justify-center py-[25.64vw] lg:py-[138px]"
// //       >
// //         <div
// //           className="relative w-full flex items-center justify-center"
// //           onClick={() => setLightboxOpen(true)}
// //         >
// //           <motion.div
// //             variants={fadeUp}
// //             initial="hidden"
// //             whileInView="show"
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
// //           >
// //             <ResponsivePicture
// //               mobileSrc={galleryImage}
// //               desktopSrc="/images/gallery/PengantinD.webp"
// //               alt="Gallery"
// //               fill={false}
// //               width={1200}
// //               height={1600}
// //               className="w-[87.18vw] h-auto object-cover lg:w-[1098px]"
// //               unoptimized
// //             />
// //           </motion.div>
// //         </div>
// //       </section>

// //       <Lightbox
// //         open={lightboxOpen}
// //         close={() => setLightboxOpen(false)}
// //         slides={[{ src: galleryImage }]}
// //         plugins={[Zoom]}
// //         noScroll={{ disabled: true }}
// //       />
// //     </>
// //   );
// // };

// // export default Gallery;