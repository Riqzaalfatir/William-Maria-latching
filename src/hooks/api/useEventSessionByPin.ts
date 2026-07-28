// src/hooks/useEventSessionByPin.ts
"use client";

import { useState, useCallback } from "react";
import { getEventSessionByPin as fetchEventSessionByPin } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function useEventSessionByPin<T = any>() {
  const [eventSessionByPin, setEventSessionByPin] = useState<T | null>(null);
  const [eventSessionByPinStatus, setEventSessionByPinStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const getEventSessionByPin = useCallback(async (pin: string, eventId: string) => {
    setEventSessionByPinStatus("loading");
    setError(null);

    const res = await fetchEventSessionByPin<T>(pin, eventId);

    if (res.error || !res.data) {
      setEventSessionByPinStatus("error");
      setError(res.error || "Sesi tamu tidak ditemukan");
      return;
    }

    setEventSessionByPin(res.data);
    setEventSessionByPinStatus("success");
  }, []);

  return { getEventSessionByPin, eventSessionByPin, eventSessionByPinStatus, error };
}