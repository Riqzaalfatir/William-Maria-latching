"use client";
import { formatEventDate } from "@/lib/formatDate";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ResponsivePicture from "@/hooks/ResponsivePicture";

type OpeningProps = {
  setStart: (v: boolean) => void;
  namaTamu?: string;
  data?: {
    dataEvent?: {
      date?: string;
      groomFullName?: string;
      brideFullName?: string;
    };
    dataContent?: {
      logoImage?: string;
    };
  };
  onOpen?: () => void;
};

const bgVariants = {
  exit: {
    opacity: 0,
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const cardVariants = {
  exit: {
    opacity: 0,
    scale: 0.93,
    y: 30,
    transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] as const, delay: 0.1 },
  },
};

const Opening = ({
  setStart,
  namaTamu = "Sela",
  data,
  onOpen,
}: OpeningProps) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOpen = (): void => {
    onOpen?.();
    setOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => {
      setStart(true);
    }, 900);
  };

  const eventDate = formatEventDate(data?.dataEvent?.date);
  const groomFullName = data?.dataEvent?.groomFullName ?? "Nama";
  const brideFullName = data?.dataEvent?.brideFullName ?? "Partner";

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center px-4">
          <motion.div
            variants={bgVariants}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit="exit"
            className="absolute inset-0 z-0"
          >
            <ResponsivePicture
              mobileSrc="/images/opening/OpeningBackground.webp"
              desktopSrc="/images/opening/OpeningBackgroundD.webp"
              alt="background"
              className="absolute inset-0 w-full h-full object-cover object-top"
              priority
            />
          </motion.div>

          {/* CONTENT CARD */}
          <motion.div
            variants={cardVariants}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit="exit"
            className="relative rounded-[20px] md:rounded-4xl overflow-hidden w-[290px] md:w-[452px] flex flex-col z-[100] bg-[#463931C2]/70 [box-shadow:0px_8px_11.6px_0px_rgba(0,0,0,0.54)]"
          >
            <div className="bg-[#463931]/76 flex flex-col items-center text-center px-4 pt-[56px] md:pt-[87px] flex-1 leading-none">
              <p className="text-[12px] md:text-[18px] text-white font-athelas italic tracking-[5%]">
                we invite you to celebrate
              </p>
              {data?.dataContent?.logoImage ? (
                <img
                  src={data.dataContent.logoImage}
                  alt="Wedding Logo"
                  className="w-[181px] h-[76px] md:w-[281px] md:h-[118px] pt-[4px] md:mt-[9px] object-contain"
                />
              ) : (
                <Image
                  src="/images/opening/Wil-Mar.webp"
                  alt="Provite Logo"
                  width={290}
                  height={120}
                  className="w-[181px] h-[76px] md:w-[281px] md:h-[118px] pt-[4px] md:mt-[9px]"
                  priority
                />
              )}
              <p className="text-[12px] md:text-[18px] text-white font-averne pt-[10px] md:pt-[11px] tracking-[2%] [-webkit-text-stroke:0.2px_#FFFFFF">
                {eventDate}
              </p>
              <p className="text-[12px] md:text-[18px] text-white font-athelas font-bold italic mt-[36px] md:pt-[14px] tracking-[2%]">
                Mr. /Mrs. / Ms.
              </p>
              <p className="text-[16px] md:text-[24px] text-white font-athelas font-bold pt-[7px] md:pt-[6px] break-words max-w-full uppercase leading-[15px] md:leading-[23px]">
                {groomFullName} & {brideFullName}
              </p>
              <p className="text-[12px] md:text-[18px] text-white/90 font-athelas leading-[20px] md:leading-[31px] pt-[14px] md:pt-[21px] tracking-[5%] italic">
                we sincerely apologize <br />
                for any misspelling of names or titles
              </p>
              <div className="mb-[41px] md:mb-[67px]">
                <button
                  onClick={handleOpen}
                  className="bg-[#878787] flex items-center justify-center text-[#FFFFFF] w-[162px] h-[22px] md:w-[253px] md:h-[31px] rounded-[6px] md:rounded-[9px] uppercase font-athelas italic text-[12px] md:text-[18px] mt-[18px] md:mt-[34px]"
                >
                  <span>OPEN</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Opening;

