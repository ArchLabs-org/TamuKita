"use client";

import * as React from "react";
import { FadeIn } from "../../animations/FadeIn";
import { SectionFloralDivider } from "../../assets/SectionFloralDivider";
import type { HeritageRoyaleConfig } from "../../config/ThemeConfig";

interface GiftProps {
  config: HeritageRoyaleConfig;
}

export function Gift({ config }: GiftProps) {
  const [copiedAccount, setCopiedAccount] = React.useState<string | null>(null);
  if (!config.gifts || config.gifts.length === 0) return null;

  const handleCopy = (account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(account);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <>
      <section className="py-20 text-center sm:py-28" style={{ backgroundColor: "#FBF9F5" }}>
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn direction="down">
            <p
              className="font-serif text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#4A6984" }}
            >
              Tanda Kasih
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "#1E3A5F" }}
            >
              Hadiah Digital
            </h2>
            <p
              className="mx-auto mt-3 max-w-md font-sans text-xs leading-relaxed"
              style={{ color: "#4A6984" }}
            >
              Doa restu Anda merupakan hadiah terindah bagi kami. Namun jika Anda ingin memberi
              hadiah, dapat menggunakannya melalui rekening berikut:
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {config.gifts.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <div
                  className="flex flex-col gap-3 rounded-3xl p-6 text-left shadow-md"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)" }}
                >
                  <p
                    className="font-sans text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: "#4A6984" }}
                  >
                    {item.bank}
                  </p>
                  <p
                    className="font-mono text-2xl font-black tracking-wider"
                    style={{ color: "#1E3A5F" }}
                  >
                    {item.account}
                  </p>
                  <p className="font-sans text-xs" style={{ color: "#4A6984" }}>
                    a.n. {item.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.account)}
                    className="mt-2 w-full rounded-full py-2 font-sans text-xs font-bold transition-all hover:opacity-80"
                    style={{
                      border: "2px solid #1E3A5F",
                      color: copiedAccount === item.account ? "#FFFFFF" : "#1E3A5F",
                      backgroundColor: copiedAccount === item.account ? "#1E3A5F" : "transparent",
                    }}
                  >
                    {copiedAccount === item.account ? "✓ Tersalin!" : "Salin Nomor Rekening"}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <SectionFloralDivider variant="center" />
    </>
  );
}
