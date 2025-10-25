"use client";
import dynamic from "next/dynamic";

const WhatsAppFloating = dynamic(() => import("@/components/WhatsAppFloating"), {
  ssr: false,
  loading: () => null,
});

const Bot = dynamic(() => import("@/components/Bot"), {
  ssr: false,
  loading: () => null,
});

export default function ClientFABs() {
  return (
    <>
      <WhatsAppFloating />
      <Bot />
    </>
  );
}
