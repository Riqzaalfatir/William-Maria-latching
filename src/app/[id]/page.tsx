// app/[id]/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useEventUrl } from "@/hooks/api/useEventUrl";
import { useCurrentGuest } from "@/hooks/api/useCurrentGuest";
import { useEventOpenInvitation } from "@/hooks/api/useEventOpenInvitation";
import { useEventContent } from "@/hooks/api/useEventContent";
import { useSmartRsvpQuestion } from "@/hooks/api/useSmartRsvpQuestion";
import { useEventSessionByPin } from "@/hooks/api/useEventSessionByPin";
import { usePreloader } from "@/hooks/usePreloader";
import LoadingScreen from "@/ui/LoadingScreen";
import Opening from "@/components/popup/Opening";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Pengantin from "@/components/sections/Pengantin";
import EventOrder from "@/components/sections/EventOrder";
import Gallery from "@/components/sections/Gallery";
import Quote from "@/components/sections/Quote";
import Rsvp from "@/components/sections/Rsvp";
import Wishes from "@/components/sections/Wishes";
import Thankyou from "@/components/sections/Thankyou";
import Faq from "@/components/sections/Faq";
import ResponsiveVideo from "@/hooks/ResponsiveVideo";

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const { getEventByUrl, eventByUrl, status, error } = useEventUrl();
  const {
    getEventGuestByPin,
    eventGuestByPin,
    status: guestStatus,
  } = useCurrentGuest();
  const { submitOpenInvitation } = useEventOpenInvitation();
  const {
    getEventContent,
    eventContentByEventId,
    status: contentStatus,
  } = useEventContent();
  const {
    getSmartRsvpQuestionByPin,
    smartRsvpQuestionByPin,
    status: rsvpDataStatus,
  } = useSmartRsvpQuestion();
  const {
    getEventSessionByPin,
    eventSessionByPin,
    eventSessionByPinStatus: sessionStatus,
  } = useEventSessionByPin();

  const [start, setStart] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [pin, setPin] = useState<string | null>(null);
  const { progress } = usePreloader();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (id) {
      getEventByUrl(id);
    }
  }, [id, getEventByUrl]);

  useEffect(() => {
    if (!id) return;

    const pinFromUrl = searchParams.get("pin");
    const storageKey = `${id}-pin`;

    let resolvedPin = pinFromUrl;
    if (resolvedPin) {
      localStorage.setItem(storageKey, resolvedPin);
    } else {
      resolvedPin = localStorage.getItem(storageKey);
    }

    if (resolvedPin) {
      setPin(resolvedPin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, searchParams]);

  // Effect terpisah: begitu `pin` state ke-set, baru fetch guest & RSVP data
  useEffect(() => {
    if (id && pin) {
      getEventGuestByPin(id, pin);
      getSmartRsvpQuestionByPin(id, pin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pin]);

  const dataEvent = eventByUrl as any;
  const dataGuest = eventGuestByPin as any;
  const dataContent = eventContentByEventId as any;
  const dataRsvp = smartRsvpQuestionByPin as any;
  const dataSession = eventSessionByPin as any;

  const receptionSession =
    dataSession?.find?.(
      (session: any) => session.name === "Cocktail & Reception"
    ) ?? dataSession?.[0];

  useEffect(() => {
    if (dataEvent?.id) {
      getEventContent(dataEvent.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEvent?.id]);

  useEffect(() => {
    if (pin && dataEvent?.id) {
      getEventSessionByPin(pin, dataEvent.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, dataEvent?.id]);

  useEffect(() => {
    if (!start) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [start]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (start) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [start]);

  const handleInvitationOpen = () => {
    if (dataEvent?.id && pin) {
      submitOpenInvitation(dataEvent.id, pin);
    }
  };

  if (status === "loading" || status === "idle") {
    return <LoadingScreen progress={progress} onDone={() => {}} />;
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-black">{error || "Undangan tidak ditemukan."}</p>
      </div>
    );
  }

  return (
    <>
      <main className="block">
        <div className="overflow-x-hidden">
          <Header data={dataEvent} />
          <Hero data={{ ...dataEvent, logoImage: dataContent?.logoImage }} />
          <Profile
            data={{
              ...dataEvent,
              venue: receptionSession?.address,
              address: receptionSession?.addressName,
            }}
          />
          <Pengantin data={dataEvent} />
          <EventOrder data={{ dataSession, logoImage: dataContent?.logoImage }} />
          <Gallery data={dataEvent} />
          <Quote data={dataEvent} />
          <Rsvp
            data={dataEvent}
            guest={dataGuest}
            sessions={dataSession}
            rsvpData={dataRsvp}
            url={id}
            pin={pin}
          />
          <Faq data={dataEvent} />
        </div>

        <div className="relative w-full">
          <div className="sticky top-0 h-dvh -z-10 -mb-[100dvh]">
            <ResponsiveVideo
              ref={videoRef}
              mobileSrc="/video/Wil-Maria-compressed.mp4"
              desktopSrc="/video/Wil-MariaD-compressed.mp4"
              className="w-full h-full object-cover"
            />
          </div>
          <Wishes eventId={dataEvent?.id} data={dataEvent} />
          <Thankyou data={dataEvent} />
        </div>
      </main>

      {!start && (
        <Opening
          setStart={setStart}
          namaTamu={dataGuest?.name ?? "Sela"}
          data={{ ...dataEvent, logoImage: dataContent?.logoImage }}
          onOpen={handleInvitationOpen}
        />
      )}

      {showLoading && (
        <LoadingScreen
          progress={progress}
          onDone={() => setShowLoading(false)}
        />
      )}
    </>
  );
}