"use client";

import Featured from "@/components/Featured";
import Story from "@/components/Story";
import Hero from "@/components/Hero/Hero";
import CollectionsContent from "@/components/CollectionsContent";
import CustomContent from "@/components/CustomContent";
import ContactContent from "@/components/ContactContent";
import CustomPage from "@/app/custom/page";
import ContactPage from "@/app/contact/page";
export default function Homepage() {
  return (
    <>
      <Hero />

      <Featured />
      <Story />

      {/* Reuse existing content sections (no new UI created here) */}
      <CollectionsContent />
      <CustomContent />
      <CustomPage />
      <ContactPage />
    </>
  );
}
