"use client";

import { motion } from "framer-motion";

type PesanItem = {
  id: string | number;
  nama: string;
  pesan: string;
};

type WishesCardProps = {
  data: PesanItem | null;
  onClose: () => void;
};

const WishesCard = ({ data, onClose }: WishesCardProps) => {
  if (!data) return null;

  const initials = data.nama
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[4px] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-hidden rounded-[24px] border border-[#51483F]/15 bg-[#F9FBFA] shadow-lg w-full max-w-[360px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorasi bar atas */}
        <div className="h-1.5 bg-gradient-to-r from-[#51483F] via-[#51483F] to-[#51483F]/80" />

        {/* Content */}
        <div className="px-8 py-10 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-7">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#51483F]/20 to-[#51483F]/10 border border-[#51483F]/15 flex items-center justify-center">
              <span className="text-[24px] font-athelas font-bold text-[#51483F]/80">
                {initials}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#51483F]/10 rounded-full" />
          </div>

          <h3 className="text-[20px] font-athelas font-bold text-[#51483F] mb-1 tracking-tight uppercase break-words max-w-[85%]">
            {data.nama}
          </h3>

          <div className="w-12 h-0.5 bg-[#51483F]/20 rounded-full" />

          <p className="font-duende -ml-[30px] text-[88px] text-[#51483F]/20 leading-none">
            "
          </p>

          {/* Pesan */}
          <p className="text-[13px] -mt-[25px] font-athelas italic leading-[1.8] text-[#51483F]/85 line-clamp-6 text-center mb-7 break-words max-w-[85%]">
            {data.pesan}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-[#51483F] hover:bg-[#51483F]/85 active:scale-95 transition-all duration-300 text-white px-6 py-3.5 rounded-full text-[12px] font-athelas font-bold tracking-[0.5px] uppercase shadow-sm hover:shadow-md"
          >
            Close
          </button>
        </div>

        {/* Decorasi bar bawah */}
        <div className="h-1 bg-gradient-to-r from-[#51483F]/80 via-[#51483F] to-[#51483F]" />
      </motion.div>
    </motion.div>
  );
};

export default WishesCard;