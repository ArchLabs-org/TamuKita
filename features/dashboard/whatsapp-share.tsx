"use client";

import * as React from "react";
import { MessageCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type PlanType = Database["public"]["Tables"]["profiles"]["Row"]["plan"];

interface WhatsAppShareProps {
  wedding: {
    id: string;
    slug: string;
    bride_name: string;
    groom_name: string;
  };
  userPlan: PlanType;
  invitationUrl: string;
}

// Plan limits untuk WhatsApp shares per day
const PLAN_LIMITS: Record<PlanType, number | null> = {
  free: 5, // 5 shares per hari
  starter: 20, // 20 shares per hari
  professional: 999, // Unlimited (999 = virtually unlimited)
  enterprise: 999, // Unlimited
};

export function WhatsAppShare({ wedding, userPlan, invitationUrl }: WhatsAppShareProps) {
  const [copied, setCopied] = React.useState(false);
  const [shareCount, setShareCount] = React.useState(0);
  const [hasExceeded, setHasExceeded] = React.useState(false);

  const planLimit = PLAN_LIMITS[userPlan];
  const isLimitExceeded = planLimit !== null && shareCount >= planLimit;

  React.useEffect(() => {
    // Load share count from localStorage (per day)
    const today = new Date().toDateString();
    const stored = localStorage.getItem(`wa_shares_${wedding.id}_${today}`);
    const count = stored ? parseInt(stored) : 0;
    setShareCount(count);
    setHasExceeded(planLimit !== null && count >= planLimit);
  }, [wedding.id, planLimit]);

  const handleWhatsAppShare = () => {
    // Check if limit exceeded
    if (isLimitExceeded) {
      toast.error(
        `Batas share WhatsApp hari ini sudah habis (${planLimit}). Upgrade ke plan lain untuk unlimited shares.`,
      );
      return;
    }

    const message = `Assalamu'alaikum! 👋

Undangan Pernikahan
💕 ${wedding.bride_name} & ${wedding.groom_name}

Silakan buka undangan di link berikut:
${invitationUrl}

Terima kasih telah menjadi bagian dari momen istimewa kami! 🎉`;

    // WhatsApp Web/API URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Update share count
    const today = new Date().toDateString();
    const newCount = shareCount + 1;
    localStorage.setItem(`wa_shares_${wedding.id}_${today}`, newCount.toString());
    setShareCount(newCount);
    setHasExceeded(planLimit !== null && newCount >= planLimit);

    toast.success("Link WhatsApp sudah disiapkan! 💬");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    toast.success("Link undangan sudah disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div>
        <h3 className="font-display text-sm font-semibold text-foreground">Bagikan Undangan</h3>
        <p className="text-xs text-muted-foreground">
          Bagikan link undangan melalui WhatsApp atau salin link
        </p>
      </div>

      {/* Share count info */}
      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
        <span className="text-xs font-medium text-muted-foreground">
          {planLimit === null ? "Unlimited" : `${shareCount}/${planLimit}`} shares
        </span>
        {isLimitExceeded && (
          <span className="text-[10px] font-semibold text-orange-600">Limit tercapai</span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleWhatsAppShare}
          disabled={isLimitExceeded}
          className={`flex-1 gap-2 ${
            isLimitExceeded ? "cursor-not-allowed opacity-50" : "hover:bg-green-600 active:scale-95"
          }`}
          style={{
            background: isLimitExceeded ? "#ccc" : "#25D366",
          }}
        >
          <MessageCircle size={16} />
          <span className="text-xs font-medium">WhatsApp</span>
        </Button>

        <Button onClick={handleCopyLink} variant="outline" size="sm" className="gap-2">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="text-xs">{copied ? "Disalin" : "Salin Link"}</span>
        </Button>
      </div>

      {/* Plan info */}
      <div className="text-[10px] text-muted-foreground">
        <p>
          Plan <span className="font-semibold capitalize">{userPlan}</span>:{" "}
          {planLimit === null ? "Unlimited" : `${planLimit} shares/hari`}
        </p>
      </div>
    </div>
  );
}
