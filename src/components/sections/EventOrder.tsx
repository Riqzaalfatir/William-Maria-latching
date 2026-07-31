import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";
import ResponsivePicture from "@/hooks/ResponsivePicture";

interface SessionItem {
  id: string;
  name: string;
  date: string;
  address?: string;
  addressName?: string;
  latLong?: string;
  description?: string;
}

interface EventOrderProps {
  data?: {
    dataContent?: {
      logoImage?: string;
    };
    dataSession?: SessionItem[];
  };
}

function formatSessionTime(isoDate?: string): {
  value: string;
  meridiem: string;
} {
  if (!isoDate) return { value: "9.00", meridiem: "AM" };
  const match = isoDate.match(/T(\d{2}):(\d{2})/);
  if (!match) return { value: "9.00", meridiem: "AM" };
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return { value: `${hour}.${minute}`, meridiem };
}

function buildMapsLink(venueName?: string, latLong?: string): string {
  if (venueName) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}`;
  }
  if (latLong) {
    const [lat, lng] = latLong.split(",").map((s) => s.trim());
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  return "https://maps.app.goo.gl/itNvPF8tGYZR4Whq9";
}

const EventOrder = ({ data }: EventOrderProps) => {
  const sessions = data?.dataSession ?? [];
  const logoImage = data?.dataContent?.logoImage;

  const ceremonySession =
    sessions.find((item) => item.name?.toLowerCase().includes("ceremony")) ??
    sessions[0];

  const receptionSession =
    sessions.find((item) => item.name?.toLowerCase().includes("dinner")) ??
    sessions.find((item) => item.name?.toLowerCase().includes("reception")) ??
    sessions.find((item) => item.name?.toLowerCase().includes("cocktail")) ??
    sessions[1];

  const ceremonyTime = formatSessionTime(ceremonySession?.date);
  const receptionTime = formatSessionTime(receptionSession?.date);

  const ceremonyVenue = "Putting Garden";
  const receptionVenue = "Intercontinental Hotel Bandung";

  const receptionHall = "GRAND BALLROOM";

const mapsLink = buildMapsLink(receptionVenue, receptionSession?.latLong);
  return (
    <section id="eventorder" className="">
      <div className="pt-[20.51vw] lg:pt-[116px]">
        <div className="relative left-1/2 -translate-x-1/2 w-[28.46vw] lg:w-[189px] h-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
          >
            {logoImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoImage}
                alt="Wedding Logo"
                className="w-full h-auto object-contain"
              />
            ) : (
              <img
                src="/images/eventorder/LogoD.webp"
                alt="Provite Logo"
                className="w-full h-auto"
              />
            )}
          </motion.div>
        </div>

        <div className="pt-[10.51vw] lg:pt-[45px] flex flex-col items-center justify-center leading-none">
          {/* HOLY MATRIMONY / CEREMONY */}
          <div className="flex flex-col items-center text-center justify-center leading-none">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="font-averne text-[8.21vw] lg:text-[48px] text-[#51483F] leading-[7.18vw] lg:leading-none [-webkit-text-stroke:0.3px_#51483F] lg:[-webkit-text-stroke:0.8px_#51483F]"
            >
              HOLY <br className="lg:hidden" />
              MATRIMONY
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[2.5vw] lg:pt-[29px] font-athelas text-[3.59vw] lg:text-[20px] text-[#717071] tracking-wide"
            >
              <span className="italic">at</span>{" "}
              <span className="font-urw italic">{ceremonyTime.value}</span>{" "}
              {ceremonyTime.meridiem}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[2.2vw] lg:pt-[21px] font-duende text-[10.77vw] lg:text-[64px] text-[#51483F] max-w-[250px] lg:max-w-[550px]"
            >
              {ceremonyVenue}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[3.5vw] lg:pt-[19px] font-athelas text-[3.59vw] lg:text-[20px] text-[#717071]"
            >
              DRESS CODE
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[0.7vw] lg:pt-[6px] font-athelas italic text-[3.59vw] lg:text-[18px] text-[#717071] leading-[4.87vw] lg:leading-[23px]"
            >
              Neutral Colors <br />( No Batik )
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
            >
              <ResponsivePicture
                mobileSrc="/images/eventorder/Dresscode1.webp"
                desktopSrc="/images/eventorder/DresscodeD.png"
                alt="Ceremony dress code example"
                fill={false}
                width={250}
                height={92}
                className="mt-[4.87vw] h-auto w-[58.97vw] lg:mt-[23px] lg:w-[308px]"
              />
            </motion.div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[3.59vw] lg:pt-[21.5px] font-athelas italic text-[3.08vw] lg:text-[18px] text-[#717071]"
            >
              don't forget your sunnies!
            </motion.p>
          </div>

          {/* DINNER RECEPTION */}
          <div className="pt-[15.90vw] lg:pt-[62px] flex flex-col items-center text-center justify-center leading-none">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="font-averne text-[8.21vw] lg:text-[48px] text-[#51483F] leading-[7.18vw] lg:leading-none tracking-wide lg:tracking-normal [-webkit-text-stroke:0.3px_#51483F] lg:[-webkit-text-stroke:0.8px_#51483F]"
            >
              DINNER <br className="lg:hidden" />
              RECEPTION
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[2.5vw] lg:pt-[31px] font-athelas text-[3.59vw] lg:text-[20px] text-[#717071] tracking-wide"
            >
              <span className="italic">at</span>{" "}
              <span className="font-urw italic">{receptionTime.value}</span>{" "}
              {receptionTime.meridiem}
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[2.8vw] lg:pt-[18px] font-athelas text-[3.59vw] lg:text-[14px] text-[#717071] tracking-wide"
            >
              {receptionHall}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[1.3vw] lg:pt-[2px] font-duende text-[10.26vw] lg:text-[64px] text-[#51483F] leading-[7.95vw] lg:leading-none max-w-[250px] lg:max-w-[550px]"
            >
              {receptionVenue}
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
            >
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[6.15vw] w-[45.64vw] lg:h-[31px] lg:w-[268px] bg-[#878787] hover:bg-[#51483F] active:scale-95 transition-all duration-200 text-white flex items-center justify-center text-[2.31vw] lg:text-[17.5px] rounded-[5px] lg:rounded-[7px] font-averne gap-[0.7vw] lg:gap-[8px] mt-[6.41vw] lg:mt-[18px] lg:italic lg:font-athelas lg:pt-[1.5px] tracking-wide"
              >
                <Image
                  src="/images/eventorder/Peta.png"
                  alt="Map Peta"
                  width={550}
                  height={550}
                  className="object-contain w-[5.13vw] h-[4.62vw] lg:w-[29px] lg:h-[26px]"
                />
                NAVIGATE TO LOCATION
              </a>
            </motion.div>
          </div>

          {/* DRESS CODE  */}
          <div
            id="dresscode"
            className="pt-[11vw] lg:pt-[65px] flex flex-col items-center text-center justify-center leading-none"
          >
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="font-averne text-[8.21vw] lg:text-[48px] text-[#51483F] [-webkit-text-stroke:0.3px_#51483F] lg:[-webkit-text-stroke:0.8px_#51483F]"
            >
              DRESS CODE
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[3vw] lg:pt-[25px] font-athelas italic text-[3.08vw] lg:text-[16px] text-[#717071] leading-[3.85vw] lg:leading-[20px] tracking-[3%]"
            >
              We kindly encourage our guest to dress <br />
              as follows on our special day
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[7.18vw] lg:pt-[25px] flex flex-col items-center justify-center leading-none"
            >
              <p className="font-athelas text-[4.62vw] lg:text-[24px] text-[#717071]">
                GENTLEMEN
              </p>
              <p className="pt-[1vw] lg:pt-[1.5px] font-athelas italic text-[3.59vw] lg:text-[18px] text-[#717071] leading-[4.62vw] lg:leading-[23px]">
                Black Suits & Tie <br />( No Batik )
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
              className="pt-[4vw] lg:pt-[16px] flex flex-col items-center justify-center leading-none"
            >
              <p className="font-athelas text-[4.62vw] lg:text-[24px] text-[#717071]">
                WOMAN
              </p>
              <p className="pt-[1vw] lg:pt-[2px] font-athelas italic text-[3.59vw] lg:text-[18px] text-[#717071] leading-[4.87vw] lg:leading-[23px] tracking-[3%]">
                Formal Long Dresses <br />
                in Shades of Navy or Black
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
            >
              <ResponsivePicture
                mobileSrc="/images/eventorder/Dresscode2.webp"
                desktopSrc="/images/eventorder/DCHBD.png"
                alt="Reception dress code example"
                fill={false}
                width={250}
                height={92}
                className="mt-[5.13vw] h-auto w-[23.59vw] lg:mt-[23px] lg:w-[172px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventOrder;
