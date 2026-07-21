"use client";

import { WhatsAppShare } from "./whatsapp-share";
import type { Database } from "@/types/database";

type PlanType = Database["public"]["Tables"]["profiles"]["Row"]["plan"];

interface WeddingDetailsClientProps {
  wedding: {
    id: string;
    slug: string;
    bride_name: string;
    groom_name: string;
  };
  userPlan: PlanType;
  invitationUrl: string;
}

export function WeddingDetailsClient({
  wedding,
  userPlan,
  invitationUrl,
}: WeddingDetailsClientProps) {
  return <WhatsAppShare wedding={wedding} userPlan={userPlan} invitationUrl={invitationUrl} />;
}
