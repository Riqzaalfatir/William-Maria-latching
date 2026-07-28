"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fadeUp } from "@/lib/animation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import ResponsivePicture from "@/hooks/ResponsivePicture";

const Quote = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    // Slide 1 - Quote paragraph
    <p
      key="paragraph"
      className="font-athelas md:font-urw md:pt-[72px] text-[2.56vw] md:text-[20px] text-white leading-[3.85vw] md:leading-[34px] tracking-[2%] md:tracking-[0%]"
    >
      With joyful hearts and hopeful eyes, we’re stepping{" "}
      <br className="md:hidden" />
      into the next chapter. <br className="hidden md:block" />
      This wedding isn’t just a celebration of a day -{" "}
      <br className="md:hidden" />
      it’s a celebration of a journey, <br className="hidden md:block" />a
      promise, and the love we’re lucky <br />
      enough to call our own
    </p>,

    // Slide 2 - Numbers
    <div
      key="numbers"
      className="flex flex-col items-center -mt-[35px] md:mt-[20px]"
    >
      <ResponsivePicture
        mobileSrc="/images/quote/Item.webp"
        desktopSrc="/images/quote/Item1D.svg"
        alt="Love story milestones"
        width={247}
        height={92}
        fill={false}
        className="h-auto w-[248px] md:w-[620px] ml-[0px]"
      />
      <div className="flex items-start justify-center gap-[29px] -ml-[4.5px] md:gap-[65px] md:-ml-[16px] mt-[5px] md:mt-[20px]">
        <div className="flex flex-col items-center justify-center leading-none gap-[1px] md:gap-[20px]">
          <p className="font-urw text-[7.46px] md:text-[20px] text-white">26</p>
          <p className="text-[5.97px] md:text-[18px] text-white font-urw leading-[12px] md:leading-[26px]">
            ( 26.12.21 ) <br />
            <span className="font-athelas text-[6.72px] md:text-[18px]">
              William declared his love
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center leading-none gap-[1px] md:gap-[20px]">
          <p className="font-urw text-[7.46px] md:text-[20px] text-white">9</p>
          <p className="text-[5.97px] md:text-[18px] text-white font-urw leading-[8.96px] md:leading-[20px]">
            ( 9.1.22 ) <br />
            <span className="inline-block font-athelas text-[6.72px] md:text-[18px] md:leading-[20px] md:mt-[8px]">
              The true beginning, <br />
              When hearts aligned
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center leading-none gap-[1px] md:gap-[20px] ml-[7px] md:ml-[10px]">
          <p className="font-urw text-[7.46px] md:text-[20px] text-white">
            9,1,26
          </p>
          <p className="text-[5.97px] md:text-[18px] text-white font-urw leading-[8.96px] md:leading-[20px]">
            ( 9.1.22 to 19.9.26 )<br />
            <span className="inline-block font-athelas text-[6.72px] md:text-[18px] md:leading-[20px] md:mt-[8px]">
              The day love is sealed <br />
              in marriage
            </span>
          </p>
        </div>
      </div>
    </div>,

    // Slide 3 - Features
    <div
      key="features"
      className="flex flex-col items-center -mt-[10px] md:mt-[70px]"
    >
      <ResponsivePicture
        mobileSrc="/images/quote/Item2.webp"
        desktopSrc="/images/quote/Item2D.svg"
        alt="William"
        width={447}
        height={42}
        fill={false}
        className="h-auto w-[150px] md:w-[410px] mr-[18px] md:mr-[40px]"
      />

      <div className="flex items-start justify-center gap-[17px] md:gap-[70px]  pt-[5px]">
        <div className="flex flex-col items-center justify-center leading-none gap-[7px] md:gap-[17px]">
          <p className="font-athelas text-[8px] md:text-[20px] text-white">
            UPWARD FLOW
          </p>
          <p className="text-[6px] md:text-[18px] text-white font-athelas leading-[7px] md:leading-[20px] tracking-[2%]">
            Love that grows, <br />
            always connected
          </p>
        </div>
        <div className="flex flex-col items-center justify-center leading-none gap-[7px] md:gap-[17px]">
          <p className="font-urw text-[8px] md:text-[20px] text-white">
            MIRRORED INITIALS
          </p>
          <p className="text-[6px] md:text-[18px] text-white font-athelas leading-[7px] md:leading-[20px] tracking-[2%]">
            Reflect each other, just like the <br />
            mirrors that first brought us <br className="hidden md:block" />
            together
          </p>
        </div>
      </div>
    </div>,
  ];

  const goTo = (newIndex: number) => {
    const total = slides.length;
    const wrapped = (newIndex + total) % total;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(wrapped);
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) goTo(index + 1);
    else if (info.offset.x > swipeThreshold) goTo(index - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  },  [index, slides.length]); 

  return (
    <section style={{ overflowAnchor: "none" }}>
      <div className="relative w-full">
        <ResponsivePicture
          mobileSrc="/images/quote/Bg-Quotee.webp"
          desktopSrc="/images/quote/Quote.webp"
          alt="Background Quote"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          objectPositionMobile="top"
          objectPositionDesktop="center"
        />
        <div className="absolute inset-0 bg-[#C3D9E6]/[13%] pointer-events-none" />

        <div className="relative pt-[10.51vw] pb-[13.85vw] md:pt-[103px] md:pb-[155px] flex flex-col items-center text-center justify-center leading-none gap-[10.5vw] md:gap-[10px]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="font-averne text-[3.08vw] md:text-[32px] text-white tracking-[6%] [-webkit-text-stroke:0.2px_#FFFFFF] md:[-webkit-text-stroke:0.5px_#FFFFFF]"
          >
            GOD KNEW OUR HEARTS NEED EACH OTHER
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="relative w-full flex items-center justify-center h-[15vw] md:min-h-[180px]"
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={index}
                custom={direction}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ x: direction >= 0 ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: direction >= 0 ? "-100%" : "100%" }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                className="cursor-grab active:cursor-grabbing absolute w-full"
                                style={{ touchAction: "pan-y" }}

              >
                {slides[index]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Quote;