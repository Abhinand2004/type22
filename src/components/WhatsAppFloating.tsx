"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function WhatsAppFloating() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    function onOpen() { setDisabled(true); }
    function onClose() { setDisabled(false); }
    if (typeof window !== 'undefined') {
      window.addEventListener('chatbot:open', onOpen as EventListener);
      window.addEventListener('chatbot:close', onClose as EventListener);
      return () => {
        window.removeEventListener('chatbot:open', onOpen as EventListener);
        window.removeEventListener('chatbot:close', onClose as EventListener);
      };
    }
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className={`fixed z-[9999] transition-all duration-500 ${
          isVisible && !disabled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{
          right: "calc(env(safe-area-inset-right, 0px) + 1rem)",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
          pointerEvents: disabled ? 'none' : 'auto',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-16 h-16 rounded-full bg-green-500/30 animate-ping"
            style={{ animationDuration: "2s" }}
          ></div>
          <div
            className="absolute w-20 h-20 rounded-full bg-green-500/20 animate-ping"
            style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
          ></div>
        </div>

        <a
          href="https://wa.me/918590521956"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-300 to-green-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <svg
            className="w-9 h-9 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </a>

        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl">
            Chat with us on WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .group:hover .animate-bounce {
          animation: subtle-bounce 1s ease-in-out infinite;
        }
      `,
        }}
      ></style>
    </>,
    document.body
  );
}