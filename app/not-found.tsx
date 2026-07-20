import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-8xl font-bold text-brand-200 md:text-9xl" aria-hidden="true">
        404
      </div>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Halaman tidak ditemukan</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="brand" asChild>
          <Link href={ROUTES.home}>Kembali ke Beranda</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={ROUTES.dashboard}>Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
