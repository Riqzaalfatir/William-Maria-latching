import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";
import ResponsivePicture from "@/hooks/ResponsivePicture";
import { formatWeekdayMonth } from "@/lib/formatDate";

interface ProfileProps {
  data?: {
    groomFullName?: string;
    brideFullName?: string;
    groomParent?: string; // format: "Mr. X & Mrs. Y"
    brideParent?: string; // format: "Mr. X & Mrs. Y"
    date?: string; // ISO string

    venue?: string;
    address?: string;
  };
}

const Profile = ({ data }: ProfileProps) => {
  // Fallback dummy buat preview mode kalau data belum ada
  const groomFullName = data?.groomFullName ?? "CHRISTIAN TANUDJAJA";
  const brideFullName = data?.brideFullName ?? "LAWRENA";

  // groomParent/brideParent formatnya "Mr. X & Mrs. Y" -> pecah jadi 2 baris
  const [groomFather, groomMother] = (
    data?.groomParent ?? "MR. TOMI TANUDJAJA (†) & MRS. KO KOEY FAH"
  )
    .split("&")
    .map((s) => s.trim());

  const [brideFather, brideMother] = (
    data?.brideParent ?? "MR. EDIH SUTISNA & MRS. INA MARINA"
  )
    .split("&")
    .map((s) => s.trim());

  // const formattedDate = data?.date
  //   ? formatEventDate(data.date)
  //   : "SATURDAY, 19 SEPTEMBER 2026";

  const venue = data?.venue ?? "INTERCONTINENTAL HOTEL BANDUNG";
  const address = data?.address ?? "Jl. Resor Dago Pakar Raya 2B, Bandung";

  return (
    <section id="profile">
      <div className="relative w-full bg-[#F4F4F5] lg:min-h-[944px]">
        <ResponsivePicture
          mobileSrc="/images/profile/Layer-BM.png"
          desktopSrc="/images/profile/LayerBunga3.webp"
          alt="Decorative floral background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          unoptimized
        />
        <div className="relative pt-[25.5vw] pb-[25.64vw] lg:pt-[146px] lg:pb-[145px] flex flex-col items-center justify-center leading-none">
          <div className="flex flex-col items-center text-center justify-center leading-none">
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="font-athelas text-[3.08vw] lg:text-[18px] text-[#717071] leading-[3.46vw] lg:leading-[22px] tracking-[2%] uppercase"
            >
              {groomFather}
              <br />
              {groomMother}
            </motion.h3>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[4.62vw] lg:pt-[19px] font-athelas italic text-[3.08vw] lg:text-[15.9px] text-[#717071]"
            >
              together with
            </motion.p>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[4.62vw] lg:pt-[19px] font-athelas text-[3.08vw] lg:text-[18px] text-[#717071] leading-[3.59vw] lg:leading-[22px] tracking-[2%] uppercase"
            >
              {brideFather}
              <br />
              {brideMother}
            </motion.h3>
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="pt-[5.0vw] lg:pt-[40px] font-athelas italic text-[3.08vw] lg:text-[18px] text-[#717071] tracking-[2%]"
          >
            Cordially invite you to celebrate the wedding reception of
          </motion.p>

          <div className="pt-[1.79vw] lg:pt-[32px]  flex flex-col items-center text-center justify-center leading-none lg:-ml-[8px]">
            <div className="flex flex-col items-center text-center justify-center leading-none">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              >
                <Image
                  src="/images/profile/William.webp"
                  alt="William"
                  width={247}
                  height={92}
                  className="h-auto w-[63.33vw] lg:w-[291px]"
                  unoptimized
                />
                <h3
                  className="-mt-[2.7vw]  lg:-mt-[17px] ml-[3px] lg:ml-[15px] lg:pl-[22px] font-averne font-medium text-[4.62vw] lg:text-[24px] text-[#50473F] tracking-[3%] uppercase"
                  style={{ WebkitTextStroke: "0.3px #51483F" }}
                >
                  {groomFullName}
                </h3>
              </motion.div>
            </div>

            <div className="-mt-[0.51vw] flex flex-col items-center text-center justify-center leading-none">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              >
                <Image
                  src="/images/profile/Maria.webp"
                  alt="Maria"
                  width={247}
                  height={92}
                  className="pt-[0vw] lg:pt-[11px] h-auto w-[63.33vw] lg:w-[291px]"
                  unoptimized
                />
                <h3
                  className="-mt-[5.5vw] lg:pt-[58px] font-averne text-[4.62vw] lg:text-[24px] text-[#50473F] tracking-[3%] uppercase"
                  style={{ WebkitTextStroke: "0.3px #51483F" }}
                >
                  {brideFullName}
                </h3>
              </motion.div>
            </div>
          </div>

          <div className="pt-[7.44vw] lg:pt-[35px] flex flex-col items-center text-center justify-center leading-none">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="font-athelas text-[3.08vw] lg:text-[18.55px] text-[#717071] tracking-[2%]"
            >
              {data?.date ? (
                <>
                  {formatWeekdayMonth(data.date).weekday.toUpperCase()},{" "}
                  <span className="font-urw">
                    {formatWeekdayMonth(data.date).day}
                  </span>{" "}
                  {formatWeekdayMonth(data.date).month.toUpperCase()}{" "}
                  <span className="font-urw">
                    {formatWeekdayMonth(data.date).year}
                  </span>
                </>
              ) : (
                <>
                  SATURDAY, <span className="font-urw">19</span> SEPTEMBER{" "}
                  <span className="font-urw">2026</span>
                </>
              )}
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[4.1vw] lg:pt-[22px] font-athelas text-[3.08vw] lg:text-[19.88px] text-[#717071] leading-[4.10vw] lg:leading-[23px] tracking-[2%] uppercase max-w-[250px] lg:max-w-[400px]"
            >
              {venue}
              <br />
              <span className="italic lg:text-[15.9px] normal-case">{address}</span>
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[7.69vw] lg:pt-[59px] font-athelas italic text-[3.08vw] lg:text-[15.9px] text-[#717071] leading-[3.85vw] lg:leading-[23px] tracking-[3%]"
            >
              Our joy will be complete with your presence <br />
              and blessing at our celebration of love
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

// SEBELUM DINAMIS
// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { fadeUp, popIn } from "@/lib/animation";
// import ResponsivePicture from "@/hooks/ResponsivePicture";

// const Profile = () => {
//   return (
//     <section id="profile">
//       <div className="relative w-full bg-[#F4F4F5] lg:min-h-[944px]">
//         <ResponsivePicture
//           mobileSrc="/images/profile/Layer-BM.png"
//           desktopSrc="/images/profile/LayerBunga3.webp"
//           alt="Nicholas & Clara"
//           className="absolute inset-0 w-full h-full object-cover pointer-events-none"
//           unoptimized
//         />
//         <div className="relative pt-[25.5vw] pb-[25.64vw] lg:pt-[146px] lg:pb-[145px] flex flex-col items-center justify-center leading-none">
//           <div className="flex flex-col items-center text-center justify-center leading-none">
//             <motion.h3
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="font-athelas text-[3.08vw] lg:text-[18px] text-[#717071] leading-[3.46vw] lg:leading-[22px] tracking-[2%]"
//             >
//               MR. TOMI TANUDJAJA (†)
//               <br />
//               MRS. KO KOEY FAH
//             </motion.h3>
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[4.62vw] lg:pt-[19px] font-athelas italic text-[3.08vw] lg:text-[15.9px] text-[#717071]"
//             >
//               together with
//             </motion.p>
//             <motion.h3
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[4.62vw] lg:pt-[19px] font-athelas text-[3.08vw] lg:text-[18px] text-[#717071] leading-[3.59vw] lg:leading-[22px] tracking-[2%]"
//             >
//               MR. EDIH SUTISNA
//               <br />
//               MRS. INA MARINA
//             </motion.h3>
//           </div>
//           <motion.p
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//             className="pt-[5.0vw] lg:pt-[40px] font-athelas italic text-[3.08vw] lg:text-[18px] text-[#717071] tracking-[2%]"
//           >
//             Cordially invite you to celebrate the wedding reception of
//           </motion.p>

//           <div className="pt-[1.79vw] lg:pt-[32px]  flex flex-col items-center text-center justify-center leading-none lg:-ml-[8px]">
//             <div className="flex flex-col items-center text-center justify-center leading-none">
//               <motion.div
//                variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               >
//                 <Image
//                   src="/images/profile/William.webp"
//                   alt="William"
//                   width={247}
//                   height={92}
//                   className="h-auto w-[63.33vw] lg:w-[291px]"
//                   unoptimized
//                 />
//                 <h3
//                   className="-mt-[2.7vw]  lg:-mt-[17px] ml-[3px] lg:ml-[15px] lg:pl-[22px] font-averne font-medium text-[4.62vw] lg:text-[24px] text-[#50473F] tracking-[3%]"
//                   style={{ WebkitTextStroke: "0.3px #51483F" }}
//                 >
//                   CHRISTIAN TANUDJAJA
//                 </h3>
//               </motion.div>
//             </div>

//             <div className="-mt-[0.51vw] flex flex-col items-center text-center justify-center leading-none">
//               <motion.div
//                  variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               >
//                 <Image
//                   src="/images/profile/Maria.webp"
//                   alt="William"
//                   width={247}
//                   height={92}
//                   className="pt-[0vw] lg:pt-[11px] h-auto w-[63.33vw] lg:w-[291px]"
//                   unoptimized
//                 />
//                 <h3
//                   className="-mt-[5.5vw] lg:pt-[58px] font-averne text-[4.62vw] lg:text-[24px] text-[#50473F] tracking-[3%]"
//                   style={{ WebkitTextStroke: "0.3px #51483F" }}
//                 >
//                   LAWRENA
//                 </h3>
//               </motion.div>
//             </div>
//           </div>

//           <div className="pt-[7.44vw] lg:pt-[35px] flex flex-col items-center text-center justify-center leading-none">
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="font-athelas text-[3.08vw] lg:text-[18.55px] text-[#717071] tracking-[2%]"
//             >
//               SATURDAY, <span className="font-urw">19</span> SEPTEMBER{" "}
//               <span className="font-urw">2026</span>
//             </motion.p>
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[4.1vw] lg:pt-[22px] font-athelas text-[3.08vw] lg:text-[19.88px] text-[#717071] leading-[4.10vw] lg:leading-[23px] tracking-[2%]"
//             >
//               INTERCONTINENTAL HOTEL BANDUNG <br />
//               <span className="italic lg:text-[15.9px]">
//                 Jl. Resor Dago Pakar Raya 2B, Bandung
//               </span>
//             </motion.p>
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[7.69vw] lg:pt-[59px] font-athelas italic text-[3.08vw] lg:text-[15.9px] text-[#717071] leading-[3.85vw] lg:leading-[23px] tracking-[3%]"
//             >
//               Our joy will be complete with your presence <br />
//               and blessing at our celebration of love
//             </motion.p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Profile;
