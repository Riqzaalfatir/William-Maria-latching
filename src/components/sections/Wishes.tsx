"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import WishesCard from "@/components/popup/WishesCard";
import NotifModal from "@/components/popup/NotifModal";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animation";
import { useListPMG, type PersonalGuestMessage } from "@/hooks/api/useListPMG";
import { usePMG } from "@/hooks/api/usePMG";
import { dummyPesan } from "@/components/data/wishes"; 

type ModalType = string | null;

type WishesProps = {
  eventId?: string;
  data?: {
    invitationWAUrl?: string;   
  };
};

const dummyAsPersonalGuestMessage: PersonalGuestMessage[] = dummyPesan.map((item) => ({
  id: String(item.id),
  name: item.nama,
  message: item.pesan,
} as PersonalGuestMessage));

const Wishes = ({ eventId, data }: WishesProps) => {
  const [nama, setNama] = useState<string>("");
  const [pesan, setPesan] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<PersonalGuestMessage | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const { getListPMG, listPMG, statusListPMG } = useListPMG();
  const { submitPMG, statusPMG } = usePMG();

  useEffect(() => {
    if (eventId) {
      getListPMG(eventId);
    }
  }, [eventId, getListPMG]);

  const handleSubmit = async (): Promise<void> => {
    if (!nama || !pesan) {
      setModalType("incomplete_wishes");
      return;
    }
    if (!eventId) return;

    const success = await submitPMG(eventId, nama, pesan);

    if (success) {
      setShowPopup(true);
      setNama("");
      setPesan("");
      getListPMG(eventId);
    } else {
      setModalType("submit_failed"); 
    }
  };

  const safeListPMG: PersonalGuestMessage[] =
    listPMG && listPMG.length > 0 ? listPMG : dummyAsPersonalGuestMessage;

  return (
    <>
      <section
        id="wishes"
        className="w-full flex flex-col items-center pt-[26vw] pb-[18.72vw] lg:pt-[124px] lg:pb-[25px] leading-none"
      >
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
          className="font-averne text-[8.21vw] lg:text-[48px] text-white"
        >
          YOUR WISHES
        </motion.h2>

        <div className="w-full max-w-[72.82vw] lg:max-w-[368px] mx-auto mt-[7.5vw] lg:mt-[28px]">
          <div className="flex flex-col gap-[20px]">
            {/* INPUT NAMA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            >
              <input
                type="text"
                value={nama}
                placeholder="Desy (Tester)"
                onChange={(e) => setNama(e.target.value)}
                className="w-full text-[#51483F] font-athelas text-[3.08vw] lg:text-[14.5px] bg-[#F9FBFA] border border-white px-[2.56vw] lg:px-[15px] h-[8.46vw] lg:h-[40px] rounded-[5px] lg:rounded-[7px] outline-none placeholder:text-[#51483F]/50"
              />
            </motion.div>

            {/* INPUT PESAN */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            >
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="w-full text-[#51483F] font-athelas text-[3.08vw] lg:text-[14.5px] bg-[#F9FBFA] border border-white px-[2.56vw] lg:px-[15px] py-[1.28vw] lg:py-[10px] h-[28.97vw] lg:h-[140px] rounded-[5px] lg:rounded-[7px] outline-none placeholder:text-[#51483F]/50"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            >
              <button
                onClick={handleSubmit}
                disabled={statusPMG === "loading"}
                className="bg-[#535353] hover:bg-[#51483F] active:scale-95 transition-all duration-200 w-full rounded-[5px] lg:rounded-[7px] h-[8.46vw] lg:h-[40px] text-[3.08vw] lg:text-[14.5px] font-athelas uppercase flex items-center justify-center gap-1.5 lg:gap-2 text-[#FFFFFF] disabled:opacity-60"
              >
                <Image
                  src="/images/wishes/Panah.png"
                  alt="Kirim"
                  width={20}
                  height={20}
                  className="object-contain w-[4.62vw] lg:w-[20px] transition-all duration-200"
                />
                {statusPMG === "loading" ? "SENDING..." : "Send"}
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
              className={`w-full rounded-[5px] lg:rounded-[7px] h-[81.79vw] lg:h-[380px] overflow-y-auto scrollbar-hide ${
                showAll ? "bg-transparent rounded-none" : "bg-[#535353]"
              }`}
            >
              {statusListPMG === "loading" && (
                <p className="text-white text-center py-4 font-athelas">Memuat ucapan...</p>
              )}

              {/* KOTAK LIST PESAN  */}
              {!showAll ? (
                <div>
                  <div className="sticky top-0 w-full h-[3.08vw] lg:h-[15px] bg-[#535353] z-10" />

                  <div className="px-[3.2vw] lg:px-[26px]">
                    {safeListPMG.map((item, index, array) => (
                      <div key={item.id}>
                        {/* LIST NAMA PENGIRIM PESAN */}
                        <p className="text-white font-athelas text-[3.08vw] mb-[2.56vw] lg:text-[14.5px] lg:mb-[9px] font-bold">
                          {item.name}
                        </p>

                        {/* LIST PESAN DIBAWAH NAMA */}
                        <p className="text-white font-athelas text-[3vw] lg:text-[14px] tracking-wide mb-[3.1vw] lg:mb-[9px] break-words leading-[15px] md:leading-[23.24px] lg:leading-[18.24px]">
                          {item.message}
                        </p>

                        {index !== array.length - 1 && (
                          <div className="border-t border-white mb-[4.7vw] lg:mb-[19px]" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="sticky bottom-0 w-full h-[3.08vw] lg:h-[5px] bg-[#535353] z-10" />
                </div>
              ) : (
                <div className="w-full px-[1.28vw] lg:px-[10px] py-[20px] lg:py-[20px]">
                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-[2.56vw] lg:gap-[18px]">
                    {safeListPMG.map((item) => {
                      const initials = item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);

                      return (
                        // KETIKA DI VIEW ALL MESSAGE MUNCUL CARD CARD PESAN
                        <div
                          key={item.id}
                          onClick={() => setSelectedMessage(item)}
                          className="group relative overflow-hidden rounded-[15px] border border-[#51483F]/15 bg-[#F9FBFA] flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-[#51483F]/30 active:scale-95"
                        >
                          {/* Decorative top accent */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#51483F]/60 via-[#51483F]/30 to-transparent" />

                          {/* Content area */}
                          <div className="p-[2vw] lg:p-[20px] flex-1 flex flex-col justify-between">
                            {/* Quotation mark */}
                            <p className="text-[21vw] lg:text-[56px] font-duende text-[#51483F]/20 leading-none group-hover:text-[#51483F]/30 transition-colors -ml-[10px]">
                              "
                            </p>

                            {/* Pesan */}
                            <p className="font-athelas italic text-[3.08vw] lg:text-[15px] text-[#51483F]/85 text-left line-clamp-4 leading-[4.36vw] lg:leading-[22px] -mt-[30px] lg:-mt-[20px] mb-4">
                              {item.message}
                            </p>

                            {/* Accent line */}
                            <div className="w-8 h-0.5 bg-[#51483F]/20 rounded-full" />
                          </div>

                          {/* Avatar + NamA footer */}
                          <div className="bg-[#51483F] px-[3.08vw] lg:px-[16px] py-[2.56vw] lg:py-[14px] flex items-center gap-[2.05vw] lg:gap-[12px]">
                            <div className="w-[6.15vw] h-[6.15vw] lg:w-[36px] lg:h-[36px] rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 border border-white/20">
                              <p className="text-white text-[2.56vw] lg:text-[13px] font-athelas font-bold">
                                {initials}
                              </p>
                            </div>

                            <p className="text-white text-[2.56vw] lg:text-[14px] font-athelas uppercase truncate flex-1 tracking-wide">
                              {item.name}
                            </p>
                          </div>

                          {/* Hover effect overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            <WishesCard
              data={
                selectedMessage
                  ? { id: selectedMessage.id, nama: selectedMessage.name, pesan: selectedMessage.message }
                  : null
              }
              onClose={() => setSelectedMessage(null)}
            />
            {/* TODO: cek prop `data` yang diharapkan WishesCard.tsx — kalau propnya
                udah pake nama field { id, name, message } juga, hapus mapping di atas
                dan langsung pass `selectedMessage` aja */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-[#535353] hover:bg-[#51483F] active:scale-95 transition-all duration-200 w-full rounded-[5px] lg:rounded-[7px] h-[8.46vw] lg:h-[40px] text-[3.08vw] lg:text-[14.5px] font-athelas uppercase flex items-center justify-center gap-2 lg:gap-[10px] text-white tracking-widest"
              >
                <Image
                  src="/images/wishes/Pesan.png"
                  alt="Pesan"
                  width={20}
                  height={20}
                  className="object-cover w-[5.13vw] lg:w-[20px] group-hover:invert transition-all duration-200"
                />
                {showAll ? "BACK" : "VIEW ALL MESSAGES"}
              </button>
            </motion.div>
          </div>
        </div>
        {showPopup && (
          // CARD MUNCUL KETIKA USER TELAH MENGIRIM NAMA DAN PESAN
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-[4px] px-[24px]">
            <div className="relative overflow-hidden rounded-[28px] border border-[#51483F]/20 bg-[#F9FBFA] shadow-lg w-full max-w-[84.62vw] lg:max-w-[420px]">
              <div className="absolute top-0 left-0 w-full h-[1.54vw] lg:h-[8px] bg-[#51483F]" />

              <div className="px-[7.18vw] lg:px-[40px] pt-[9.23vw] lg:pt-[48px] pb-[7.18vw] lg:pb-[40px] flex flex-col items-center text-center">
                <div className="w-[18.46vw] h-[18.46vw] lg:w-[96px] lg:h-[96px] rounded-full bg-[#51483F] border border-[#51483F]/15 flex items-center justify-center mb-[5.13vw] lg:mb-[28px]">
                  <Image
                    src="/images/wishes/Pesan.png"
                    alt="Success"
                    width={34}
                    height={34}
                    className="object-contain w-[10.72vw] h-[10.72vw] lg:w-[44px] lg:h-[44px]"
                  />
                </div>

                <h3 className="font-duende text-[8.21vw] lg:text-[40px] text-[#51483F]">
                  Thank You
                </h3>

                <div className="w-[17.95vw] lg:w-[90px] h-[1px] bg-[#51483F]/30 my-[4.10vw] lg:my-[22px]" />

                <p className="font-athelas italic text-[3.08vw] lg:text-[16px] leading-[5.64vw] lg:leading-[26px] text-[#51483F]/85 max-w-[61.54vw] lg:max-w-[320px]">
                  Your wishes and prayers mean so much to us. Thank you for
                  sharing your kind words on our special day.
                </p>

                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-[7.18vw] lg:mt-[36px] bg-[#51483F] hover:bg-[#51483F]/85 active:scale-95 transition-all duration-300 text-white font-athelas uppercase text-[2.82vw] lg:text-[14px] tracking-[0.13vw] lg:tracking-[0.6px] px-[8.21vw] lg:px-[40px] h-[9.74vw] lg:h-[48px] rounded-full"
                >
                  Close
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[1.28vw] lg:h-[6px] bg-[#51483F]" />
            </div>
          </div>
        )}
      </section>

  {modalType && (
  <NotifModal
    type={modalType}
    onClose={() => setModalType(null)}
    onConfirm={() => setModalType(null)}
    waNumber={data?.invitationWAUrl ?? "6281234567890"}   
  />
)}
    </>
  );
};

export default Wishes;



