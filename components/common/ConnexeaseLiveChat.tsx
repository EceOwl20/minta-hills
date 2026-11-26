"use client";

import Script from "next/script";

import { siteConfig } from "@/data/site";

declare global {
  interface Window {
    ConnexeaseWebMessenger?: {
      Init: (id: string) => void;
    };
    __connexeaseInitialized?: boolean;
  }
}

export default function ConnexeaseLiveChat() {
  const messengerId = siteConfig.connexease.messengerId;

  function initializeChat() {
    if (window.__connexeaseInitialized) return;

    const messenger = window.ConnexeaseWebMessenger;

    if (!messenger) {
      console.error("Connexease messenger could not be loaded.");
      return;
    }

    try {
      messenger.Init(messengerId);
      window.__connexeaseInitialized = true;
    } catch (error) {
      console.error("Connexease initialization failed.", error);
    }
  }

  return (
    <Script
      id="connexease-live-chat"
      src="https://cdn.livechat.connexease.com/embed.js"
      strategy="afterInteractive"
      onReady={initializeChat}
      onError={() => {
        console.error("Connexease script failed to load.");
      }}
    />
  );
}
