import React from "react";
import ResponsivePicture from "@/hooks/ResponsivePicture";

type PengantinProps = { data?: any };

const Pengantin = ({ data }: PengantinProps) => {
  return (
    <section className="relative w-full bgb h-[360px] lg:h-[942px]">
      <ResponsivePicture
        mobileSrc="/images/pengantin/Sl-Wima.webp"
        desktopSrc="/images/pengantin/SL-WIMAD.webp"
        alt="Pengantin"
        className="w-full h-full object-cover pointer-events-none"
        unoptimized
      />
    </section>
  );
};

export default Pengantin;
