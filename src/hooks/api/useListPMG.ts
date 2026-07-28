// src/hooks/api/useListPMG.ts
"use client";

import { useState, useCallback } from "react";
import { getAllPersonalGuestMessages } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

// TODO: sesuaikan field ini begitu response asli GetAllPersonalGuestMessages udah dicek
// src/hooks/api/useListPMG.ts — update bagian type-nya aja

export type PersonalGuestMessage = {
  id: string;
  eventId: string;
  guestId: string;
  mediaFileId: string;
  mediaFile: string | null;
  createdDate: string;
  mediaType: number;
  mediaFileUrl: string;
  contentType: string | null;
  guestName: string;
  name: string;
  message: string;
  status: number;
  type: number;
};

export function useListPMG() {
  const [listPMG, setListPMG] = useState<PersonalGuestMessage[]>([]);
  const [statusListPMG, setStatusListPMG] = useState<Status>("idle");
  const [errorListPMG, setErrorListPMG] = useState<string | null>(null);

  const getListPMG = useCallback(async (eventId: string) => {
    setStatusListPMG("loading");
    setErrorListPMG(null);

    const res = await getAllPersonalGuestMessages<PersonalGuestMessage[]>(eventId);

    if (res.error || !res.data) {
      setStatusListPMG("error");
      setErrorListPMG(res.error || "Gagal ambil daftar ucapan");
      return;
    }

    setListPMG(res.data);
    setStatusListPMG("success");
  }, []);

  return { getListPMG, listPMG, statusListPMG, errorListPMG };
}