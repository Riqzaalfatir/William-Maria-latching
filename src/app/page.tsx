"use client";

import { useState, useEffect, useRef } from "react";
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

export default function Home() {
  const [start, setStart] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const { progress } = usePreloader();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <>
      <main className="block">
        <div className="overflow-x-hidden">
          <Header />
          <Hero />
          <Profile />
          <Pengantin />
          <EventOrder />
          <Gallery />
          <Quote />
          <Rsvp />
          <Faq />
        </div>

        {/* Section video TIDAK dibungkus overflow-x-hidden, biar sticky-nya tetap ngerujuk ke viewport asli */}
        <div className="relative w-full">
          <div className="sticky top-0 h-dvh -z-10 -mb-[100dvh]">
            <ResponsiveVideo
              ref={videoRef}
              mobileSrc="/video/Wil-Maria-compressed.mp4"
              desktopSrc="/video/Wil-MariaD-compressed.mp4"
              className="w-full h-full object-cover"
            />
          </div>
          <Wishes />
          <Thankyou />
        </div>
      </main>

      {!start && <Opening setStart={setStart} namaTamu="Sela" />}

      {showLoading && (
        <LoadingScreen
          progress={progress}
          onDone={() => setShowLoading(false)}
        />
      )}
    </>
  );
}
