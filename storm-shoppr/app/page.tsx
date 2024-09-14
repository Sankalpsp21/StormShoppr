"use client";

import HeroSection from "@/components/HeroSection";
import useStoreUserEffect from "./useStoreUserEffect";

export default function Home() {
  const userId = useStoreUserEffect();
  return (
    <main>
      <HeroSection/>
    </main>
  );
}
