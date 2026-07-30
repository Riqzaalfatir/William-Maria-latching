// app/[id]/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEventUrl } from "@/hooks/api/useEventUrl";
import { useEventContent } from "@/hooks/api/useEventContent";
import EventTemplate from "@/components/template";

export default function EventPage() {
  const { id } = useParams<{ id: string }>();

  const { getEventByUrl, eventByUrl, status, error } = useEventUrl();
  const {
    getEventContent,
    eventContentByEventId,
    status: contentStatus,
  } = useEventContent();

  useEffect(() => {
    if (id) {
      getEventByUrl(id);
    }
  }, [id, getEventByUrl]);

  const dataEvent = eventByUrl as any;

  useEffect(() => {
    if (dataEvent?.id) {
      getEventContent(dataEvent.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEvent?.id]);

  const dataContent = eventContentByEventId as any;

  if (
    status === "loading" ||
    status === "idle" ||
    contentStatus === "loading"
  ) {
    return <div className="fixed inset-0 bg-[#F9FBFA]" />;
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-black">{error || "Undangan tidak ditemukan."}</p>
      </div>
    );
  }

  const dataFix = {
    dataContent: dataContent,
    dataEvent: dataEvent,
  };

  return (
    <EventTemplate data={dataFix} isPreview={false} dataValidation={null} />
  );
}
