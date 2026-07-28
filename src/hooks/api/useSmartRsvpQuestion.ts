// src/hooks/api/useSmartRsvpQuestion.ts
"use client";

import { useState, useCallback } from "react";
import { getSmartRsvpQuestionByPin as fetchSmartRsvpQuestionByPin } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function useSmartRsvpQuestion<T = any>() {
  const [smartRsvpQuestionByPin, setSmartRsvpQuestionByPin] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const getSmartRsvpQuestionByPin = useCallback(async (url: string, pin: string) => {
    setStatus("loading");
    setError(null);

    const res = await fetchSmartRsvpQuestionByPin<T>(url, pin);

    if (res.error || !res.data) {
      setStatus("error");
      setError(res.error || "Data RSVP tidak ditemukan");
      return;
    }

    setSmartRsvpQuestionByPin(res.data);
    setStatus("success");
  }, []);

  return { getSmartRsvpQuestionByPin, smartRsvpQuestionByPin, status, error };
}