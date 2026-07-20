import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getWeddingsByUserId } from "@/lib/db/weddings";
import { getGuestsByWeddingId } from "@/lib/db/guests";
import { GuestsClient } from "@/features/guests/guests-client";

export const metadata: Metadata = constructMetadata({
  title: "Manajemen Tamu Undangan",
  noIndex: true,
});

export default async function GuestsPage() {
  const user = await requireAuth();

  const weddings = await getWeddingsByUserId(user.id);
  const activeWedding = weddings[0] ?? null;
  const guests = activeWedding ? await getGuestsByWeddingId(activeWedding.id) : [];

  return (
    <GuestsClient
      initialWedding={
        activeWedding
          ? {
              id: activeWedding.id,
              bride_name: activeWedding.bride_name,
              groom_name: activeWedding.groom_name,
              slug: activeWedding.slug,
            }
          : null
      }
      initialGuests={guests.map((g) => ({
        id: g.id,
        name: g.name,
        phone: g.phone,
        email: g.email,
        rsvp_status: g.rsvp_status,
        seat_number: g.seat_number,
        notes: g.notes,
      }))}
    />
  );
}
