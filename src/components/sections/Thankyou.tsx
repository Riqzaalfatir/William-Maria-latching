import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";

type ThankyouProps = {
  data?: {
    dataContent?: {
      footerNote?: string;
      footerImage?: string;
    };
  };
};

const Thankyou = ({ data }: ThankyouProps) => {
  const footerNote: string =
    data?.dataContent?.footerNote &&
    data.dataContent.footerNote.trim().length > 0
      ? data.dataContent.footerNote
      : "Having you with us on our special day would\nmake our celebration even more meaningful.";

  return (
    <section className="">
      <div className="pt-[656px] pb-[31px] lg:pt-[673px] lg:pb-[50px]">
        <div className="flex flex-col items-center justify-center leading-none">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="font-duende text-[16.41vw] lg:text-[96px] text-white"
          >
            Thank You
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="pt-[16px] lg:pt-[23px] font-athelas italic text-[3.08vw] lg:text-[17px] text-white leading-[4.10vw] lg:leading-[22px] tracking-wide"
          >
            {footerNote.split("\n").map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="pt-[31px] lg:pt-[48px] flex items-center justify-center gap-[20px] lg:gap-[25px]"
          >
            <div className="flex items-center justify-center gap-[4px]">
              <p className="font-athelas text-white text-[6.89px] lg:text-[9.87px]">
                Specially Design by
              </p>
              <Image
                src="/images/thankyou/Peletin.png"
                alt="Peletin"
                width={250}
                height={252}
                className="h-auto w-[44px] lg:w-[62px]"
              />
            </div>
            <div className="flex items-center justify-center gap-[4px]">
              <p className="font-athelas text-white text-[6.89px] lg:text-[9.87px]">
                Reservation System by
              </p>
              <Image
                src="/images/thankyou/Provite.png"
                alt="Provite"
                width={250}
                height={252}
                className="mt-[4.5px] lg:mt-[5px] h-auto w-[62px] lg:w-[89px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Thankyou;
