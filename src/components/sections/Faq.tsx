"use client";
import React from "react";
import { useState } from "react";
import { faqData } from "../data/faq";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";

type FaqProps = { data?: any };

const Faq = ({ data }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const renderWithBreaks = (text: string) => {
    const parts = text.split(/(\n\n|\n)/);
    return parts.map((part, i) => {
      if (part === "\n\n") {
        return <br key={i} />; 
      }
      if (part === "\n") {
        return (
          <React.Fragment key={i}>
            <br className="lg:hidden" />
            <span className="hidden lg:inline"> </span>
          </React.Fragment>
        ); 
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <>
      <section id="faq" className="w-full bg[#F4F4F5]">
        <div className="max-w-[311px] md:max-w-[465px] lg:max-w-[565px] mx-auto pb-[93px] lg:pt-[40px] lg:pb-[120px]">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="uppercase text-center text-[#51483F] font-averne text-[32px] md:text-[46px] md:text-[48px] -mb-[5px] md:-mb-[20px] [-webkit-text-stroke:0.2px_#51483F] md:[-webkit-text-stroke:0.7px_#51483F]"
          >
            FAQ
          </motion.h2>

          <div className=" md:max-h-none  md:overflow-visible">
            {/* RENDER FAQ */}
            {faqData.map((section, sIndex) => (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
                key={sIndex}
                className="mt-[15px] md:mt-[30px]"
              >
                {/* JUDUL FAQ */}
                <h3 className="text-center text-[#51483F] font-athelas text-[16px] md:text-[22px] md:text-[24px] uppercase tracking-[4%]">
                  {section.judul}
                </h3>

                <div className="border-t border-t-[1px] border-[#707071] mt-[12px] md:mt-[35px]">
                  {section.items.map((item, iIndex) => {
                    const key = `${sIndex}-${iIndex}`;
                    const isOpen = openIndex === key;

                    return (
                      <div
                        key={key}
                        className="border-[#707071] border-b-[1px]"
                      >
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex justify-between items-center py-[2px] md:py-[13px] text-left text-[#51483F]"
                        >

                          {/* PERTANYAAN FAQ */}
                          <span className="text-[12px] md:text-[18px] md:text-[18px] text-[#707071] font-athelas  font-normal pr-4">
                            {item.pertanyaan}
                          </span>

                          <span className="text-[24px] md:text-[28px] font-athelas text-[#717071] shrink-0">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="pb-3 md:pb-6 space-y-3 md:space-y-4 max-w-[292px] md:max-w-[520px]">
                            {item.jawaban.map((paragraf, pIndex) => (
                              // JAWABAN FAQ
                              <p
                                key={pIndex}
                                className="text-[12px] md:text-[17px] md:text-[18px] pt-[3.5px] font-athelas text-[#707071] md:leading-relaxed"
                              >
                                {renderWithBreaks(paragraf)}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;