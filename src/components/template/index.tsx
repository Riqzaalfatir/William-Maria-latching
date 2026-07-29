"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCurrentGuest } from "@/hooks/api/useCurrentGuest";
import { useEventOpenInvitation } from "@/hooks/api/useEventOpenInvitation";
import { useSmartRsvpQuestion } from "@/hooks/api/useSmartRsvpQuestion";
import { useEventSessionByPin } from "@/hooks/api/useEventSessionByPin";
import LoadingScreen from "@/ui/LoadingScreen";
import { usePreloader } from "@/hooks/usePreloader";
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

type TemplateProps = {
  data: {
    dataEvent?: any;
    dataContent?: any;
  };
  isPreview?: boolean;
  dataValidation?: any;
};

export default function EventTemplate({ data }: TemplateProps) {
  const searchParams = useSearchParams();

  const dataEvent = data?.dataEvent;
  const dataContent = data?.dataContent;

  const {
    getEventGuestByPin,
    eventGuestByPin,
    status: guestStatus,
  } = useCurrentGuest();
  const { submitOpenInvitation } = useEventOpenInvitation();
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

  // Baca PIN: dari searchParams (fallback link lama ?pin=xxx) ATAU dari localStorage
  // (yang udah kesimpen duluan oleh app/[id]/[pin]/page.tsx)
  useEffect(() => {
    if (!dataEvent?.url) return;

    const pinFromUrl = searchParams.get("pin");
    const storageKey = `${dataEvent.url}-pin`;

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
  }, [dataEvent?.url, searchParams]);

  useEffect(() => {
    if (dataEvent?.id && pin) {
      getEventGuestByPin(dataEvent.id, pin);
      getSmartRsvpQuestionByPin(dataEvent.id, pin);
      getEventSessionByPin(pin, dataEvent.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEvent?.id, pin]);

  const dataGuest = eventGuestByPin as any;
  const dataRsvp = smartRsvpQuestionByPin as any;
  const dataSession = eventSessionByPin as any;

  const receptionSession =
    dataSession?.find?.(
      (session: any) => session.name === "Cocktail & Reception"
    ) ?? dataSession?.[0];

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
            guestName={dataGuest?.name}
            guestPhone={dataGuest?.phone}
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