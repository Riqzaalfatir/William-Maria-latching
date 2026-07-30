//  CATATAN ⚠️ Dipakai sementara biar section RSVP tetep bisa di-build & tampil di Vercel,
// karena SmartRsvpForm.tsx progress/belum 100%.
// Kalau SmartRsvpForm udah fix, tinggal uncomment blok "VERSI OFFICIAL" di bawah
// dan hapus/komen blok ini.
"use client";

import { useState } from "react";
import Image from "next/image";
import NotifModal from "@/components/popup/NotifModal";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";

type Pilihan = "hadir" | "maybe" | "tidak_hadir" | null;
type ModalType = string | null;

type RsvpProps = {
  data?: {
    dataEvent?: {
      id?: string;
      url?: string;
      closeRSVPDate?: string;
      invitationWAUrl?: string;
    };
  };
  paramUrl?: string;
  guestName?: string;
  guestPhone?: string;
  pin?: string | null;
};

type RsvpQuestionAnswer = {
  id: string;
  answer: string;
  optionAnswer: string;
  parentId: string | null;
  parentIndex: number | null;
};

type RsvpSessionPayload = {
  eventSessionId: string;
  guestInvitation: number;
  questions: RsvpQuestionAnswer[];
  guestAttendances: RsvpQuestionAnswer[];
};

type RsvpSubmitPayload = {
  eventId: string;
  url: string;
  pin: string;
  name: string;
  phone: string;
  status: number;
  maybeDate: string;
  maybeNote: string;
  questionList: RsvpSessionPayload[];
};

function mapPilihanToStatus(pilihan: Pilihan): number {
  if (pilihan === "hadir") return 0;
  if (pilihan === "maybe") return 1;
  if (pilihan === "tidak_hadir") return 2;
  return 0;
}

function formatDeadlineDate(dateString?: string): string {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${weekday}, ${day} ${month} ${year}`;
}

function formatWaHref(waUrl?: string): string {
  const fallback = "6281234567890";
  if (!waUrl) return fallback;
  return waUrl.replace(/\D/g, "");
}

const Rsvp = ({ data, paramUrl, guestName, guestPhone, pin }: RsvpProps) => {
    const [pilihan, setPilihan] = useState<Pilihan>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

const deadlineText = formatDeadlineDate(data?.dataEvent?.closeRSVPDate);
const waHref = formatWaHref(data?.dataEvent?.invitationWAUrl);
const waNumberForModal = data?.dataEvent?.invitationWAUrl ?? "6281234567890";

  const handleConfirm = (): void => {
    if (!pilihan) {
      setModalType("incomplete_rsvp");
      return;
    }
    setModalType("confirm_rsvp");
  };

  const submitRsvp = async (): Promise<void> => {
    const payload: RsvpSubmitPayload = {
    eventId: data?.dataEvent?.id ?? "",
url: data?.dataEvent?.url ?? "",
      pin: pin ?? "",
      name: guestName ?? "",
      phone: guestPhone ?? "",
      status: mapPilihanToStatus(pilihan),
      maybeDate: "",
      maybeNote: "",
      questionList: [],
    };

    console.log("RSVP payload (draft, belum dikirim):", payload);

    // await fetch(`${BASE_URL}InputRSVP`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
  };

  const handleFinalConfirm = (): void => {
    setModalType(null);
    if (pilihan === "hadir") {
      setModalType("rsvp_confirmed_hadir");
    } else if (pilihan === "maybe") {
      setModalType("rsvp_confirmed_maybe");
    } else {
      setModalType("rsvp_confirmed_tidak_hadir");
    }
  };

  return (
    <>
      <section id="rsvp" className="bg[#F4F4F5]">
        <div className="pt-[23vw] pb-[24vw] lg:pt-[130px] lg:pb-[120px]">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            className="font-averne text-[8.21vw] lg:text-[48px] text-[#51483F] flex justify-center [-webkit-text-stroke:0.2px_#51483F] lg:[-webkit-text-stroke:0.7px_#51483F]"
          >
            RSVP
          </motion.h1>
          <div className="flex flex-col items-center text-center justify-center leading-none">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[1.4vw] lg:pt-[18px] font-athelas font-bold italic text-[3.08vw] lg:text-[16px] text-[#51483F] tracking-[2%] break-words px-6 max-w-full lg:max-w-[350px] lg:px-0"
            >
              Mr./Mrs./Ms.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[1.6vw] lg:pt-[10px] font-athelas font-bold text-[4.10vw] lg:text-[20px] text-[#51483F]  break-words max-w-[90%] tracking-[2%]"
            >
              {guestName ?? "NAMA & PARTNER"}
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[5.2vw] lg:pt-[17.5px] font-athelas italic text-[3.08vw] lg:text-[18px] text-[#51483F] leading-[3.85vw] lg:leading-[23px] tracking-[2%]"
            >
              Please confirm your attendance before <br />
              <span className="font-bold">{deadlineText}</span>
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[4.62vw] lg:pt-[29px] flex items-center justify-center gap-[2.05vw] lg:gap-[11.52px]"
            >
              <button
                onClick={() => setPilihan(pilihan === "hadir" ? null : "hadir")}
                className={`h-[5.13vw] w-[18.97vw] lg:h-[30px] lg:w-[113px] flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] lg:text-[18px] lg:rounded-[7px] transition-colors duration-200 ${
                  pilihan === "hadir"
                    ? "bg-[#878787] text-white"
                    : "border border-[0.5px] border-[#878787] bg-[#E2DEDF] text-white"
                }`}
              >
                ATTEND
              </button>

              <button
                onClick={() =>
                  setPilihan(pilihan === "tidak_hadir" ? null : "tidak_hadir")
                }
                className={`h-[5.13vw] w-[34.62vw] lg:h-[30px] lg:w-[208px] flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] lg:text-[18px] lg:rounded-[7px] transition-colors duration-200 ${
                  pilihan === "tidak_hadir"
                    ? "bg-[#878787] text-white"
                    : "border border-[0.5px] border-[#878787] bg-[#E2DEDF] text-white"
                }`}
              >
                UNABLE TO ATTEND
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[11.5vw] lg:pt-[70px] font-athelas text-[3.08vw] lg:text-[18px] text-[#51483F]"
            >
              {pilihan === "tidak_hadir"
                ? "ARE YOU SURE?"
                : "Confirm your selection?"}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            >
              <button
                onClick={handleConfirm}
                className="h-[5.3vw] w-[38.21vw] lg:h-[31px] lg:w-[214px] bg-[#878787] hover:bg-[#51483F] active:scale-95 transition-all duration-200 text-white flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] lg:text-[18px] lg:rounded-[7px] mt-[4.87vw] lg:mt-[32px]"
              >
                CONFIRM
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className="pt-[6.8vw] lg:pt-[41px] font-athelas italic text-[2.56vw] lg:text-[16px] text-[#51483F]"
            >
              having trouble with RSVP?
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            >
              <a
                href={`https://wa.me/${waHref}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[5.5vw] w-[38.21vw] lg:h-[30px] lg:w-[214px] bg-[#12877B] hover:bg-[#0F6B61] text-white flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] gap-[1.28vw] lg:gap-[7px] lg:text-[18px] lg:rounded-[7px] mt-[5.6vw] lg:mt-[35px] transition-colors duration-200"
              >
                <Image
                  src="/images/rsvp/Wa.png"
                  alt="WhatsApp icon"
                  width={550}
                  height={550}
                  className="object-contain w-[3.33vw] h-[3.33vw] lg:w-[19px] lg:h-[19px] tracking-wide"
                />
                CHAT SUPPORT
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {modalType && (
        <NotifModal
          type={modalType}
          onClose={() => setModalType(null)}
          onConfirm={handleFinalConfirm}
          waNumber={waNumberForModal}
        />
      )}
    </>
  );
};

export default Rsvp;


























// CODE MENGIKUTI ARAHAN POSTMAN // VERSI OFFICIAL
// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { fadeUp } from "@/lib/animation";
// import { SmartRsvpForm, useSmartRsvp } from "@/components/rsvp/SmartRsvpForm";
// import moment from "moment";

// type RsvpProps = {
//   data?: any;
//   paramUrl?: string;
//   onSubmitRSVP?: () => void;
// };

// export default function Rsvp({ data, paramUrl, onSubmitRSVP }: RsvpProps) {
//   return (
//     <SmartRsvpForm data={data} paramUrl={paramUrl} onSubmitRSVP={onSubmitRSVP}>
//       <RSVPSectionDesign data={data} />
//     </SmartRsvpForm>
//   );
// }

// const RSVPSectionDesign = ({ data }: { data: any }) => {
//   // guestData, attendStatus (0 = belum pilih, 1 = ATTEND, 2 = NOT ATTEND),
//   // invitationUrl, paramUrl semuanya dari state internal SmartRsvpForm
//   const { guestData, attendStatus, invitationUrl, paramUrl } = useSmartRsvp();

//   const deadlineText = data === null
//     ? moment(new Date().toISOString()).format("dddd, D MMMM YYYY")
//     : moment(
//         guestData?.closeRSVPDate ??
//           new Date(data?.dataEvent?.closeRSVPDate).toISOString() ??
//           new Date().toISOString()
//       ).format("dddd, D MMMM YYYY");

//   return (
//     <>
//       {/* Popup bawaan: loader, confirm, incomplete, closed, confirmed */}
//       <SmartRsvpForm.Modals />

//       <section id="rsvp" className="bg[#F4F4F5]">
//         <div className="pt-[23vw] pb-[24vw] lg:pt-[130px] lg:pb-[120px]">
//           <motion.h1
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//             className="font-averne text-[8.21vw] lg:text-[48px] text-[#51483F] flex justify-center [-webkit-text-stroke:0.2px_#51483F] lg:[-webkit-text-stroke:0.7px_#51483F]"
//           >
//             RSVP
//           </motion.h1>

//           <div className="flex flex-col items-center text-center justify-center leading-none">
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[1.4vw] lg:pt-[18px] font-athelas font-bold italic text-[3.08vw] lg:text-[16px] text-[#51483F] tracking-[2%] break-words px-6 max-w-full lg:max-w-[350px] lg:px-0"
//             >
//               Mr./Mrs./Ms.
//             </motion.p>

//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[1.6vw] lg:pt-[10px] font-athelas font-bold text-[4.10vw] lg:text-[20px] text-[#51483F] break-words max-w-[90%] tracking-[2%]"
//             >
//               {paramUrl !== "" ? paramUrl : guestData?.name ?? "NAMA & PARTNER"}
//             </motion.p>

//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[5.2vw] lg:pt-[17.5px] font-athelas italic text-[3.08vw] lg:text-[18px] text-[#51483F] leading-[3.85vw] lg:leading-[23px] tracking-[2%]"
//             >
//               Please confirm your attendance before <br />
//               <span className="font-bold">{deadlineText}</span>
//             </motion.p>

//             {/* ATTEND / UNABLE TO ATTEND — logic-nya udah di-handle SmartRsvpForm,
//                 di sini tinggal styling className aja */}
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[4.62vw] lg:pt-[29px] flex items-center justify-center gap-[2.05vw] lg:gap-[11.52px]"
//             >
//               <SmartRsvpForm.AttendToggle
//                 className={`h-[5.13vw] w-[18.97vw] lg:h-[30px] lg:w-[113px] flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] lg:text-[18px] lg:rounded-[7px] transition-colors duration-200 ${
//                   attendStatus === 1
//                     ? "bg-[#878787] text-white"
//                     : "border border-[0.5px] border-[#878787] bg-[#E2DEDF] text-white"
//                 }`}
//               />
//               <SmartRsvpForm.NotAttendToggle
//                 className={`h-[5.13vw] w-[34.62vw] lg:h-[30px] lg:w-[208px] flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] lg:text-[18px] lg:rounded-[7px] transition-colors duration-200 ${
//                   attendStatus === 2
//                     ? "bg-[#878787] text-white"
//                     : "border border-[0.5px] border-[#878787] bg-[#E2DEDF] text-white"
//                 }`}
//               />
//             </motion.div>

//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[11.5vw] lg:pt-[70px] font-athelas text-[3.08vw] lg:text-[18px] text-[#51483F]"
//             >
//               {attendStatus === 0
//                 ? "Kindly select your attendance status"
//                 : attendStatus === 2
//                 ? "ARE YOU SURE?"
//                 : "Confirm your selection?"}
//             </motion.p>

//             {/* Accordion sesi — TIDAK dipakai di desain ini (cuma opsi ATTEND/NOT ATTEND
//                 doang, gak ada per-sesi/pertanyaan tambahan). Tetep ditulis di sini
//                 sesuai "aturan main" dokumentasi, tapi dikomen: */}
//             {/* <SmartRsvpForm.Accordion className="w-full mt-[36px]" bgActiveColor="#41261A" /> */}

//             {attendStatus !== 0 && (
//               <motion.div
//                 variants={fadeUp}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               >
//                 <SmartRsvpForm.SubmitButton
//                   className="h-[5.3vw] w-[38.21vw] lg:h-[31px] lg:w-[214px] bg-[#878787] hover:bg-[#51483F] active:scale-95 transition-all duration-200 text-white flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] lg:text-[18px] lg:rounded-[7px] mt-[4.87vw] lg:mt-[32px]"
//                 />
//               </motion.div>
//             )}

//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//               className="pt-[6.8vw] lg:pt-[41px] font-athelas italic text-[2.56vw] lg:text-[16px] text-[#51483F]"
//             >
//               having trouble with RSVP?
//             </motion.p>

//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
//             >

//               <a
// href={invitationUrl || `https://wa.me/${(data?.dataEvent?.invitationWAUrl ?? "6281234567890").replace(/\D/g, "")}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="h-[5.5vw] w-[38.21vw] lg:h-[30px] lg:w-[214px] bg-[#12877B] hover:bg-[#0F6B61] text-white flex items-center justify-center font-athelas text-[3.08vw] rounded-[5px] gap-[1.28vw] lg:gap-[7px] lg:text-[18px] lg:rounded-[7px] mt-[5.6vw] lg:mt-[35px] transition-colors duration-200"
//               >
//                 <Image
//                   src="/images/rsvp/Wa.png"
//                   alt="WhatsApp icon"
//                   width={550}
//                   height={550}
//                   className="object-contain w-[3.33vw] h-[3.33vw] lg:w-[19px] lg:h-[19px] tracking-wide"
//                 />
//                 CHAT SUPPORT
//               </a>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
