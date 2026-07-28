// src/hooks/useEventContent.ts
"use client";

import { useState, useCallback } from "react";
import { getEventContent } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function useEventContent<T = any>() {
  const [eventContentByEventId, setEventContentByEventId] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const getEventContentFn = useCallback(async (eventId: string) => {
    setStatus("loading");
    setError(null);

    const res = await getEventContent<T>(eventId);

    if (res.error || !res.data) {
      setStatus("error");
      setError(res.error || "Konten event tidak ditemukan");
      return;
    }

    setEventContentByEventId(res.data);
    setStatus("success");
  }, []);

  return {
    getEventContent: getEventContentFn,
    eventContentByEventId,
    status,
    error,
  };
}