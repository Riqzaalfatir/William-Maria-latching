// src/hooks/useEventUrl.ts
"use client";

import { useState, useCallback } from "react";
import { getEventByUrl } from "@/lib/api/twinklebook";

type Status = "idle" | "loading" | "success" | "error";

export function useEventUrl<T = any>() {
  const [eventByUrl, setEventByUrl] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const getEventByUrlFn = useCallback(async (url: string) => {
    setStatus("loading");
    setError(null);

    const res = await getEventByUrl<T>(url);

    if (res.error || !res.data) {
      setStatus("error");
      setError(res.error || "Event tidak ditemukan");
      return;
    }

    setEventByUrl(res.data);
    setStatus("success");
  }, []);

  const reset = useCallback(() => {
    setEventByUrl(null);
    setStatus("idle");
    setError(null);
  }, []);

  return {
    getEventByUrl: getEventByUrlFn,
    eventByUrl,
    status,
    error,
    reset,
  };
}