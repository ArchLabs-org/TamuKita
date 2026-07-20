import type { Metadata } from "next";
import { constructMetadata } from "@/lib/helpers/metadata";
import { DemoGallery } from "@/features/demo/demo-gallery";

export const metadata: Metadata = constructMetadata({
  title: "Demo Tema Undangan",
  description:
    "Jelajahi koleksi tema undangan pernikahan digital TamuKita. Lihat preview lengkap sebelum membuat akun.",
  path: "/demo",
});

export default function DemoPage() {
  return <DemoGallery />;
}
