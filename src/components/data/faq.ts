export type FAQIsi = {
  pertanyaan: string;
  jawaban: string[];
};

export type FAQSection = {
  judul: string;
  items: FAQIsi[];
};

/**
 * CATATAN soal newline di dalam `jawaban`:
 *
 * - "\n\n" (double)  → HARD BREAK. Selalu jadi baris baru di SEMUA device
 *                      (mobile & desktop). Dirender jadi <br /> tunggal.
 *
 * - "\n"   (single)  → SOFT BREAK, device-dependent:
 *                        - Mobile / tablet (<lg): patah ke baris baru
 *                        - Desktop (>=lg): TIDAK patah, disambung jadi
 *                          satu baris (dikasih spasi biasa)
 *
 * Lihat implementasinya di komponen `Faq.tsx`, fungsi `renderWithBreaks`.
 *
 * ATURAN SEBELUM NAMBAH/EDIT TEKS DI BAWAH:
 * Sebelum pakai "\n" tunggal, cek dulu ke desain Figma —
 * apakah 2 potongan teks di kiri & kanan "\n" itu MEMANG didesain
 * nyambung jadi satu baris di versi DESKTOP?
 *   - Kalau YA (nyambung di desktop, patah cuma di mobile) → pakai "\n"
 *   - Kalau TIDAK (harus tetap misah walau di desktop juga)  → pakai "\n\n"
 *
 * Salah pilih salah satunya TIDAK akan bikin error — cuma hasil visualnya
 * beda dari desain. Jadi selalu cek manual di browser (resize mobile ke
 * desktop) tiap kali nambah/ubah entry yang pakai newline.
 */
export const faqData: FAQSection[] = [
  {
    judul: "ATTENDANCE & GUESTS",
    items: [
      {
        pertanyaan: "Can I bring a plus one?",
        jawaban: [
          "We are keeping our celebration intimate and can only accomodate the guests specifically named on your invitation and the number of guests (pax). We appreciate your understanding!",
        ],
      },
      {
        pertanyaan: "What is the dress code?",
        jawaban: [
          // "\n" pertama: "Holy Matrimony (Garden Ceremony)" nyambung ke kalimat
          //   berikutnya jadi 1 baris di desktop, patah baris di mobile.
          // "\n\n" kedua: paragraf baru ("We also recommend...") — selalu patah
          //   di semua device.
          "Holy Matrimony (Garden Ceremony)\nFor our Holy Matrimony, we kindly encourage guests to wear neutral or earth-tone colors, such as beige, nude, brown, cream, or similar shades. Comfortable, casual attire with a relaxed resort feel is perfect for the garden setting.\n\nWe also recommend avoiding high heels, as the ceremony will be held on the lawn. Feel free to wear sunglasses during the ceremony if you'd like.",
          // "\n": "Reception (Evening Celebration)" nyambung ke kalimat berikutnya
          //   jadi 1 baris di desktop, patah baris di mobile.
          "Reception (Evening Celebration)\nFor the Reception, we kindly encourage ladies to wear a long black or navy evening dress, while gentlemen are requested to wear a formal suit. If you don't have a suit, a black dress shirt with formal trousers is absolutely welcome.",
          // "\n": "Kindly Note," nyambung ke kalimat berikutnya jadi 1 baris
          //   di desktop, patah baris di mobile.
          "Kindly Note,\nWe kindly request that guests do not wear batik for both the Holy Matrimony and Reception. Thank you!",
        ],
      },
      {
        pertanyaan: "Where will the Holy Matrimony take place?",
        jawaban: [
          "Holy Matrimony will be held at Putting Garden, at outdoor garden venue within Intercontinental Bandung Dago Pakar. The venue is located next to the hotel's swimming pool, making it easy to find once you arrive.",
        ],
      },
    ],
  },
  {
    judul: "GIFT",
    items: [
      {
        pertanyaan: "I can't attend. How can I send a wedding gift?",
        jawaban: [
          "Your presence is the greatest gift we could ask for. However, if you'd still like to bless us with a wedding gift, please feel free to contact the Groom or Bride directly via WhatsApp or Instagram.",
          // "\n": baris "Groom" nyambung ke baris "Bride" jadi 1 baris
          //   di desktop, patah baris di mobile.
          "Groom: @william___23\nBride: @marlawrena",
          "Thank you for celebrating with us in your own special way. We truly appreciate your love and support.",
        ],
      },
    ],
  },
  {
    judul: "TRAVEL",
    items: [
      {
        pertanyaan: "Do you have any stay recommendation?",
        jawaban: [
          "We recommend staying at Intercontinental Dago Pakar, Hotel Indigo Bandung, Swiss-Belresort Dago Heritage, or The Cartel Hotel, all conveniently located near our venue. We're also happy to offer our guests a special room rate at Intercontinental Bandung Dago Pakar. If you're interested, please let our RSVP team know.",
          "If you plan to stay at Intercontinental, kindly inform our RSVP team in advance so we can prepare a Welcome Gift waiting for you in your room!",
        ],
      },
    ],
  },
];
