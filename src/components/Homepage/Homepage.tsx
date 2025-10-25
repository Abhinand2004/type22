"use client";

import dynamic from 'next/dynamic';
import Hero from "@/components/Hero/Hero";
import CollectionsContent from "@/components/CollectionsContent";

// Load app pages as client-only dynamic imports to avoid bundling browser globals into the server bundle
const ContactPage = dynamic(() => import('@/app/contact/page'), { ssr: false });


export default function Homepage() {
  return (
    <>
      <Hero />

      <CollectionsContent />

      <ContactPage />
    </>
  );
}
