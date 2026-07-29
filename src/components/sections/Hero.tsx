import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { popIn } from "@/lib/animation";
import ResponsivePicture from "@/hooks/ResponsivePicture";

type HeroProps = {
  data?: any;
};

const Hero = ({ data }: HeroProps) => {
  const groomFullName = data?.groomFullName ?? "Groom";
  const brideFullName = data?.brideFullName ?? "Bride";

  return (
    <div id="hero">
      <div className="relative w-full overflow-hidden [aspect-ratio:390/844] lg:h-screen lg:aspect-[1512/945]">
        <ResponsivePicture
  mobileSrc={data?.bannerImage || "/images/hero/Pengantin-Wm3.webp"}
  desktopSrc={data?.bannerImage || "/images/hero/PengantinD.webp"}
  alt={`${groomFullName} & ${brideFullName}`}
  objectPositionMobile="center"
  objectPositionDesktop="top"
  priority
/>

        <div className="absolute inset-0 z-10 flex flex-col items-center text-center pt-[20.77vw] lg:pt-0 lg:justify-center">
          <motion.p
            variants={popIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-white font-athelas text-[10px] lg:text-[18px] uppercase"
          >
            The Wedding of
          </motion.p>

          <motion.div
            className="absolute top-[25.9vw] left-1/2 -translate-x-1/2 w-[255px] h-auto z-30 lg:static lg:translate-x-0 lg:w-[411px] lg:mt-[20px]"
          >
            <motion.div
              variants={popIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {data?.logoImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.logoImage}
                  alt={`${groomFullName} & ${brideFullName} Logo`}
                  className="w-full object-contain"
                />
              ) : (
                <Image
                  src="/images/hero/Logo-WmD.png"
                  alt="Provite Logo"
                  width={450}
                  height={450}
                  className="w-full"
                  priority
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

