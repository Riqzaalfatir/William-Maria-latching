// app/[id]/[pin]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingScreen from "@/ui/LoadingScreen";
import { usePreloader } from "@/hooks/usePreloader";

export default function PinRedirectPage() {
  const { id, pin } = useParams<{ id: string; pin: string }>();
  const { progress } = usePreloader();

  useEffect(() => {
    if (id && pin) {
      localStorage.setItem(`${id}-pin`, pin);
      window.location.replace(`/${id}`);
    }
  }, [id, pin]);

  return <LoadingScreen progress={progress} onDone={() => {}} />;
}
