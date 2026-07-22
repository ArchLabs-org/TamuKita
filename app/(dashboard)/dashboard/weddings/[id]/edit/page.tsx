export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { constructMetadata } from "@/lib/helpers/metadata";
import { requireAuth } from "@/lib/auth/helpers";
import { getWeddingById } from "@/lib/db/weddings";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { EditWeddingWizard } from "@/features/dashboard/edit-wedding-wizard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return constructMetadata({
    title: `Edit Undangan — ${id}`,
    noIndex: true,
  });
}

export default async function EditWeddingPage({ params }: PageProps) {
  const user = await requireAuth();
  const { id } = await params;

  // Fetch wedding data with ownership validation
  const wedding = await getWeddingById(id, user.id);

  if (!wedding) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
          <h1 className="font-display text-lg font-semibold text-destructive">
            Undangan Tidak Ditemukan
          </h1>
          <p className="mt-1 font-sans text-xs text-destructive/80">
            Undangan dengan ID {id} tidak ditemukan atau Anda tidak memiliki akses.
          </p>
          <Link href={ROUTES.weddings}>
            <Button variant="outline" size="sm" className="mt-4 gap-1.5 rounded-full text-xs">
              <ArrowLeft size={14} /> Kembali ke Daftar
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <Link href={`${ROUTES.weddings}/${id}`}>
          <Button variant="ghost" size="sm" className="mb-4 gap-1.5 rounded-full text-xs">
            <ArrowLeft size={14} /> Kembali ke Detail Undangan
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Edit Undangan</h1>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            {wedding.bride_name} &amp; {wedding.groom_name}
          </p>
        </div>
      </div>

      <EditWeddingWizard weddingId={id} initialWeddingData={wedding} />
    </div>
  );
}
