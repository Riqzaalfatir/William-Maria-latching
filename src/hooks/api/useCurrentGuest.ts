// src/hooks/useCurrentGuest.ts
"use client";

import { useState, useCallback } from "react";
import { getEventGuestByPin } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function useCurrentGuest<T = any>() {
  const [eventGuestByPin, setEventGuestByPin] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const getEventGuestByPinFn = useCallback(async (url: string, pin: string) => {
    setStatus("loading");
    setError(null);

    const res = await getEventGuestByPin<T>(url, pin);

    if (res.error || !res.data) {
      setStatus("error");
      setError(res.error || "Tamu tidak ditemukan");
      return;
    }

    setEventGuestByPin(res.data);
    setStatus("success");
  }, []);

  return {
    getEventGuestByPin: getEventGuestByPinFn,
    eventGuestByPin,
    status,
    error,
  };
}