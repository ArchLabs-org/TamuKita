import type { Metadata } from "next";
import { getWeddingBySlug } from "@/lib/db/weddings";
import { demoThemes, type DemoTheme } from "@/features/demo/data";
import { InvitationDemo } from "@/features/demo/invitation-demo";
import { constructMetadata } from "@/lib/helpers/metadata";
import type { Database } from "@/types/database";

type WeddingRow = Database["public"]["Tables"]["weddings"]["Row"];

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wedding = await getWeddingBySlug(slug);

  if (wedding) {
    return constructMetadata({
      title: `Undangan Pernikahan ${wedding.bride_name} & ${wedding.groom_name}`,
      description: `Momen bahagia pernikahan ${wedding.bride_name} & ${wedding.groom_name}`,
    });
  }

  const demoTheme = demoThemes.find((t) => t.id === slug);
  if (demoTheme) {
    return constructMetadata({
      title: `Undangan Pernikahan ${demoTheme.couple.bride} & ${demoTheme.couple.groom}`,
      description: `Momen bahagia pernikahan ${demoTheme.couple.bride} & ${demoTheme.couple.groom}`,
    });
  }

  return constructMetadata({
    title: "Undangan Pernikahan — TamuKita",
  });
}

export default async function RealWeddingInvitationPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { to } = await searchParams;
  const guestName = to || "Tamu Undangan Spesial";

  const wedding = await getWeddingBySlug(slug);

  let theme: DemoTheme;

  if (wedding) {
    const w = wedding as WeddingRow;
    const baseTheme = demoThemes.find((t) => t.id === (w.theme_id || "aurora")) ?? demoThemes[0];
    theme = {
      ...baseTheme,
      couple: {
        bride: w.bride_name || baseTheme.couple.bride,
        brideParents: w.bride_parents || baseTheme.couple.brideParents,
        groom: w.groom_name || baseTheme.couple.groom,
        groomParents: w.groom_parents || baseTheme.couple.groomParents,
        story: w.love_story || baseTheme.couple.story,
      },
      event: {
        akad: {
          date: w.akad_date || baseTheme.event.akad.date,
          time: w.akad_time || baseTheme.event.akad.time,
          venue: w.akad_venue || baseTheme.event.akad.venue,
          address: w.akad_address || baseTheme.event.akad.address,
        },
        reception: {
          date: w.reception_date || w.wedding_date || baseTheme.event.reception.date,
          time: w.reception_time || baseTheme.event.reception.time,
          venue: w.venue || baseTheme.event.reception.venue,
          address: w.reception_address || baseTheme.event.reception.address,
        },
        countdown: w.wedding_date ? `${w.wedding_date}T09:00:00` : baseTheme.event.countdown,
      },
      gifts:
        Array.isArray(w.gifts) && w.gifts.length > 0
          ? (w.gifts as DemoTheme["gifts"])
          : baseTheme.gifts,
      timeline:
        Array.isArray(w.timeline) && w.timeline.length > 0
          ? (w.timeline as DemoTheme["timeline"])
          : baseTheme.timeline,
    };
  } else {
    // Check if slug matches a demo theme ID
    const demoTheme = demoThemes.find((t) => t.id === slug);
    if (demoTheme) {
      theme = demoTheme;
    } else {
      // Fallback for custom user slug test
      const base = demoThemes[0];
      const parts = slug.split("-");
      const bride = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Sekar";
      const groom = parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : "Dimas";

      theme = {
        ...base,
        couple: {
          ...base.couple,
          bride,
          groom,
        },
      };
    }
  }

  return <InvitationDemo theme={theme} guestName={guestName} weddingId={wedding?.id} slug={slug} />;
}
