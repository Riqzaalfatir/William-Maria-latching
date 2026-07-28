// src/hooks/api/usePMG.ts
"use client";

import { useState, useCallback } from "react";
import { submitPersonalGuestMessage } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function usePMG() {
  const [statusPMG, setStatusPMG] = useState<Status>("idle");
  const [errorPMG, setErrorPMG] = useState<string | null>(null);

  const submitPMG = useCallback(
    async (eventId: string, name: string, message: string) => {
      setStatusPMG("loading");
      setErrorPMG(null);

      const res = await submitPersonalGuestMessage({
        eventId,
        mediaFileId: null,
        name,
        message,
        status: 1,
        type: 1,
      });

      if (res.error) {
        setStatusPMG("error");
        setErrorPMG(res.error);
        return false;
      }

      setStatusPMG("success");
      return true;
    },
    []
  );

  return { submitPMG, statusPMG, errorPMG };
}