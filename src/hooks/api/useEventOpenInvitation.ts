// src/hooks/api/useEventOpenInvitation.ts
"use client";

import { useState, useCallback } from "react";
import { openInvitation } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function useEventOpenInvitation<T = any>() {
  const [statusSubmitOpenInvitation, setStatusSubmitOpenInvitation] = useState<Status>("idle");
  const [errorSubmitOpenInvitation, setErrorSubmitOpenInvitation] = useState<string | null>(null);

  const submitOpenInvitation = useCallback(
    async (eventId: string, pin: string) => {
      setStatusSubmitOpenInvitation("loading");
      setErrorSubmitOpenInvitation(null);

      const res = await openInvitation<T>(eventId, pin);

      if (res.error) {
        setStatusSubmitOpenInvitation("error");
        setErrorSubmitOpenInvitation(res.error);
        return;
      }

      setStatusSubmitOpenInvitation("success");
    },
    []
  );

  return { submitOpenInvitation, statusSubmitOpenInvitation, errorSubmitOpenInvitation };
}