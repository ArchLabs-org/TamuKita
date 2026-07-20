import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getThemeById } from "@/features/demo/data";
import { InvitationDemo } from "@/features/demo/invitation-demo";

interface Props {
  params: Promise<{ theme: string }>;
}

export async function generateStaticParams() {
  return ["aurora", "aster", "senja", "sagara", "lumine", "eterna"].map((theme) => ({
    theme,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme: themeId } = await params;
  const theme = getThemeById(themeId);
  if (!theme) return {};

  return {
    title: `${theme.couple.bride} & ${theme.couple.groom} — Demo Tema ${theme.name} | TamuKita`,
    description: `Preview tema ${theme.name} (${theme.tagline}). ${theme.description}`,
  };
}

export default async function DemoThemePage({ params }: Props) {
  const { theme: themeId } = await params;
  const theme = getThemeById(themeId);
  if (!theme) notFound();

  return <InvitationDemo theme={theme} />;
}
