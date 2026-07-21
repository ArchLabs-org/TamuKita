"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Music,
  Camera,
  Loader2,
  Plus,
  Trash2,
  Upload,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoThemes } from "@/features/demo/data";
import { ROUTES } from "@/constants/routes";
import { createWeddingAction } from "@/lib/actions/wedding-actions";
import { PhotoUploader } from "@/features/dashboard/photo-uploader";
import { GalleryUploader } from "@/features/dashboard/gallery-uploader";
import { TEMPLATE_MUSIC } from "@/config/template-music";
import { uploadPhotoAction } from "@/lib/actions/upload-actions";

const WIZARD_STEPS = [
  { id: 1, name: "Mempelai", icon: Heart },
  { id: 2, name: "Tema", icon: Sparkles },
  { id: 3, name: "Lokasi", icon: MapPin },
  { id: 4, name: "Cerita & Hadiah", icon: Calendar },
  { id: 5, name: "Foto & Musik", icon: Camera },
  { id: 6, name: "Selesai", icon: CheckCircle2 },
];

type GiftItem = { bank: string; account: string; name: string };
type TimelineItem = { year: string; title: string; desc: string };

export default function CreateWeddingWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [saving, setSaving] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Custom audio upload state
  const [uploadingAudio, setUploadingAudio] = React.useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [formData, setFormData] = React.useState({
    brideName: "",
    brideParents: "",
    groomName: "",
    groomParents: "",
    themeId: "aurora",
    weddingDate: "",
    akadDate: "",
    akadTime: "08.00 - 10.00 WIB",
    akadVenue: "",
    akadAddress: "",
    akadMapsUrl: "",
    receptionDate: "",
    receptionTime: "12.00 - 15.00 WIB",
    receptionVenue: "",
    receptionAddress: "",
    receptionMapsUrl: "",
    loveStory: "",
    timeline: [
      {
        year: "Januari 2021",
        title: "Pertama Kali Bertemu",
        desc: "Tak sengaja bertemu di perpustakaan kampus dan saling bertegur sapa.",
      },
      {
        year: "Maret 2023",
        title: "Lamaran & Pertunangan",
        desc: "Memutuskan untuk mengikat janji suci di hadapan keluarga besar.",
      },
    ] as TimelineItem[],
    bridePhotoUrl: null as string | null,
    groomPhotoUrl: null as string | null,
    coverPhotoUrl: null as string | null,
    galleryUrls: [] as string[],
    musicType: "template" as "template" | "custom",
    musicCustomUrl: "",
    gifts: [{ bank: "BCA", account: "", name: "" }] as GiftItem[],
  });

  const set = (key: string, val: unknown) => setFormData((prev) => ({ ...prev, [key]: val }));

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, WIZARD_STEPS.length));
  const handleBack = () => setCurrentStep((p) => Math.max(p - 1, 1));

  // Handle Dynamic Timeline Items
  const handleAddTimeline = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { year: "", title: "", desc: "" }],
    }));
  };

  const handleUpdateTimeline = (index: number, field: keyof TimelineItem, value: string) => {
    const updated = [...formData.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, timeline: updated }));
  };

  const handleRemoveTimeline = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  // Handle Custom MP3 Upload
  const handleCustomAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAudio(true);
    setServerError(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const result = await uploadPhotoAction(fd, "music");
      if ("error" in result) {
        setServerError(result.error);
      } else {
        setFormData((prev) => ({
          ...prev,
          musicType: "custom",
          musicCustomUrl: result.url,
        }));
      }
    } catch {
      setServerError("Gagal mengunggah file musik MP3.");
    } finally {
      setUploadingAudio(false);
    }
  };

  const toggleAudioPreview = (url: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
    }

    if (isPlayingPreview) {
      audioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioRef.current.src = url;
      audioRef.current.play().catch(() => {});
      setIsPlayingPreview(true);
    }
  };

  const handlePublish = async () => {
    setSaving(true);
    setServerError(null);
    const result = await createWeddingAction({
      brideName: formData.brideName,
      brideParents: formData.brideParents,
      groomName: formData.groomName,
      groomParents: formData.groomParents,
      themeId: formData.themeId,
      weddingDate:
        formData.weddingDate || formData.akadDate || new Date().toISOString().slice(0, 10),
      akadDate: formData.akadDate,
      akadTime: formData.akadTime,
      akadVenue: formData.akadVenue,
      akadAddress: formData.akadAddress,
      akadMapsUrl: formData.akadMapsUrl,
      receptionDate: formData.receptionDate,
      receptionTime: formData.receptionTime,
      venue: formData.receptionVenue,
      receptionAddress: formData.receptionAddress,
      receptionMapsUrl: formData.receptionMapsUrl,
      loveStory: formData.loveStory,
      timeline: formData.timeline.filter((t) => t.year && t.title),
      bridePhotoUrl: formData.bridePhotoUrl ?? undefined,
      groomPhotoUrl: formData.groomPhotoUrl ?? undefined,
      coverPhotoUrl: formData.coverPhotoUrl ?? undefined,
      galleryUrls: formData.galleryUrls,
      musicType: formData.musicType,
      musicCustomUrl: formData.musicCustomUrl,
      gifts: formData.gifts.filter((g) => g.bank && g.account),
    });
    setSaving(false);

    if ("error" in result && result.error) {
      setServerError(result.error);
      return;
    }

    if ("success" in result && result.success) {
      // Redirect ke halaman kelola undangan
      router.push(`${ROUTES.weddings}/${result.weddingId}`);
    }
  };

  const selectedTheme = demoThemes.find((t) => t.id === formData.themeId) ?? demoThemes[0];
  const activeTemplateMusic = TEMPLATE_MUSIC[formData.themeId] || TEMPLATE_MUSIC["aurora"];

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Buat Undangan Digital Baru
          </h1>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Lengkapi data di bawah untuk membuat undangan pernikahan premium kalian.
          </p>
        </div>
        <Link href={ROUTES.dashboard}>
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-full text-xs">
            <ArrowLeft size={14} /> Ke Dashboard
          </Button>
        </Link>
      </div>

      {/* Step Indicator Progress Bar */}
      <div className="mb-10 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {WIZARD_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => isDone && setCurrentStep(step.id)}
                  className={`flex flex-col items-center gap-1.5 transition-all ${
                    isDone ? "cursor-pointer" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-brand-600 text-white shadow-md ring-4 ring-brand-100"
                        : isDone
                          ? "bg-emerald-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`hidden font-sans text-[11px] font-medium sm:inline-block ${
                      isActive ? "font-bold text-brand-600" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {idx < WIZARD_STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-all ${
                      currentStep > step.id ? "bg-emerald-500" : "bg-muted"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {serverError && (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 font-sans text-xs text-destructive">
          {serverError}
        </div>
      )}

      {/* Step Content Box */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        {/* STEP 1: Mempelai */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Informasi Mempelai
              </h2>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Masukkan nama lengkap serta orang tua dari kedua calon pengantin.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Mempelai Wanita */}
              <div className="space-y-4 rounded-2xl border border-rose-100 bg-rose-50/30 p-5">
                <h3 className="font-display text-sm font-semibold text-rose-900">
                  Mempelai Wanita
                </h3>
                <div className="space-y-1.5">
                  <Label htmlFor="brideName">Nama Lengkap &amp; Gelar</Label>
                  <Input
                    id="brideName"
                    placeholder="misal: Sekar Ayuningtyas, S.Ked"
                    value={formData.brideName}
                    onChange={(e) => set("brideName", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="brideParents">Nama Orang Tua / Wali</Label>
                  <Input
                    id="brideParents"
                    placeholder="misal: Putri dari Bapak H. Ahmad &amp; Ibu Hj. Siti"
                    value={formData.brideParents}
                    onChange={(e) => set("brideParents", e.target.value)}
                  />
                </div>
              </div>

              {/* Mempelai Pria */}
              <div className="space-y-4 rounded-2xl border border-sky-100 bg-sky-50/30 p-5">
                <h3 className="font-display text-sm font-semibold text-sky-900">Mempelai Pria</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="groomName">Nama Lengkap &amp; Gelar</Label>
                  <Input
                    id="groomName"
                    placeholder="misal: Dimas Pratama, S.T."
                    value={formData.groomName}
                    onChange={(e) => set("groomName", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="groomParents">Nama Orang Tua / Wali</Label>
                  <Input
                    id="groomParents"
                    placeholder="misal: Putra dari Bapak Drs. Bambang &amp; Ibu Ratna"
                    value={formData.groomParents}
                    onChange={(e) => set("groomParents", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Tema */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Pilih Tema Undangan
              </h2>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Pilih gaya estetika yang menggambarkan keindahan pernikahan kalian.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {demoThemes.map((theme) => {
                const isSelected = formData.themeId === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => set("themeId", theme.id)}
                    className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all ${
                      isSelected
                        ? "border-brand-600 bg-brand-50/20 shadow-md ring-2 ring-brand-500"
                        : "border-border hover:border-brand-200 hover:bg-muted/30"
                    }`}
                  >
                    <div
                      className="flex aspect-[4/3] flex-col items-center justify-center p-4 text-center"
                      style={{ background: theme.palette.bg }}
                    >
                      <span
                        className="font-display text-xl font-light"
                        style={{ color: theme.palette.accent }}
                      >
                        {theme.name}
                      </span>
                      <p
                        className="mt-1 font-sans text-[10px] opacity-70"
                        style={{ color: theme.palette.textMuted }}
                      >
                        {theme.tagline}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/40 p-3">
                      <span className="font-sans text-xs font-semibold text-foreground">
                        {theme.name}
                      </span>
                      <span className="font-sans text-[10px] capitalize text-muted-foreground">
                        {theme.style}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Lokasi */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Waktu &amp; Lokasi Acara
              </h2>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Atur jadwal Akad Nikah dan Resepsi Pernikahan secara presisi.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Akad */}
              <div className="space-y-4 rounded-2xl border border-amber-100 bg-amber-50/30 p-5">
                <h3 className="font-display text-sm font-semibold text-amber-900">Akad Nikah</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="akadDate">Tanggal Akad</Label>
                  <Input
                    id="akadDate"
                    type="date"
                    value={formData.akadDate}
                    onChange={(e) => set("akadDate", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="akadTime">Waktu Akad</Label>
                  <Input
                    id="akadTime"
                    value={formData.akadTime}
                    onChange={(e) => set("akadTime", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="akadVenue">Tempat / Masjid</Label>
                  <Input
                    id="akadVenue"
                    placeholder="misal: Masjid Agung Sunda Kelapa"
                    value={formData.akadVenue}
                    onChange={(e) => set("akadVenue", e.target.value)}
                  />
                </div>
              </div>

              {/* Resepsi */}
              <div className="space-y-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5">
                <h3 className="font-display text-sm font-semibold text-emerald-900">
                  Resepsi Pernikahan
                </h3>
                <div className="space-y-1.5">
                  <Label htmlFor="receptionDate">Tanggal Resepsi</Label>
                  <Input
                    id="receptionDate"
                    type="date"
                    value={formData.receptionDate}
                    onChange={(e) => set("receptionDate", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="receptionTime">Waktu Resepsi</Label>
                  <Input
                    id="receptionTime"
                    value={formData.receptionTime}
                    onChange={(e) => set("receptionTime", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="receptionVenue">Gedung / Resort</Label>
                  <Input
                    id="receptionVenue"
                    placeholder="misal: Grand Ballroom Hotel Indonesia"
                    value={formData.receptionVenue}
                    onChange={(e) => set("receptionVenue", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Cerita Cinta (Timeline) & Hadiah */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Perjalanan Cinta &amp; Hadiah Digital
              </h2>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Tulis cerita perjalanan cinta sesuai bulan/tahun dan sertakan rekening angpao.
              </p>
            </div>

            {/* Kisah Singkat */}
            <div className="space-y-1.5">
              <Label htmlFor="loveStory">Kisah Singkat Pasangan</Label>
              <textarea
                id="loveStory"
                rows={3}
                placeholder="Bagikan kata sambutan romantis atau kutipan favorit kalian..."
                value={formData.loveStory}
                onChange={(e) => set("loveStory", e.target.value)}
                className="w-full rounded-2xl border border-input p-3 text-xs outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Timeline Perjalanan Cinta (Bulan/Tahun) */}
            <div className="space-y-4 rounded-2xl border border-border bg-muted/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Garis Waktu Perjalanan Cinta
                  </h3>
                  <p className="font-sans text-[11px] text-muted-foreground">
                    Tambahkan momen berharga sesuai Bulan / Tahun.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddTimeline}
                  className="gap-1.5 rounded-full text-xs"
                >
                  <Plus size={14} /> Tambah Momen
                </Button>
              </div>

              <div className="space-y-3">
                {formData.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card p-4 sm:flex-row sm:items-start"
                  >
                    <div className="w-full space-y-1 sm:w-1/4">
                      <Label className="text-[10px]">Bulan / Tahun</Label>
                      <Input
                        value={item.year}
                        onChange={(e) => handleUpdateTimeline(idx, "year", e.target.value)}
                        placeholder="misal: Januari 2021"
                        className="text-xs"
                      />
                    </div>
                    <div className="w-full space-y-1 sm:w-1/3">
                      <Label className="text-[10px]">Judul Momen</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => handleUpdateTimeline(idx, "title", e.target.value)}
                        placeholder="misal: Pertama Bertemu"
                        className="text-xs"
                      />
                    </div>
                    <div className="w-full space-y-1 sm:w-1/3">
                      <Label className="text-[10px]">Cerita Momen</Label>
                      <Input
                        value={item.desc}
                        onChange={(e) => handleUpdateTimeline(idx, "desc", e.target.value)}
                        placeholder="Penjelasan singkat..."
                        className="text-xs"
                      />
                    </div>
                    {formData.timeline.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTimeline(idx)}
                        className="self-end text-muted-foreground hover:text-destructive sm:self-center"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Gift Bank Accounts */}
            <div className="space-y-3 rounded-2xl border border-border p-5">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Rekening Angpao Digital &amp; Kado
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Nama Bank / E-Wallet</Label>
                  <Input
                    value={formData.gifts[0]?.bank || ""}
                    onChange={(e) => {
                      const updated = [...formData.gifts];
                      updated[0] = {
                        ...(updated[0] || { bank: "", account: "", name: "" }),
                        bank: e.target.value,
                      };
                      set("gifts", updated);
                    }}
                    placeholder="BCA / Mandiri / GoPay"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Nomor Rekening</Label>
                  <Input
                    value={formData.gifts[0]?.account || ""}
                    onChange={(e) => {
                      const updated = [...formData.gifts];
                      updated[0] = {
                        ...(updated[0] || { bank: "", account: "", name: "" }),
                        account: e.target.value,
                      };
                      set("gifts", updated);
                    }}
                    placeholder="1234567890"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Nama Pemilik Rekening</Label>
                  <Input
                    value={formData.gifts[0]?.name || ""}
                    onChange={(e) => {
                      const updated = [...formData.gifts];
                      updated[0] = {
                        ...(updated[0] || { bank: "", account: "", name: "" }),
                        name: e.target.value,
                      };
                      set("gifts", updated);
                    }}
                    placeholder="a.n. Mempelai"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Upload Foto & Musik */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Upload Foto &amp; Musik Latar
              </h2>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Unggah foto pengantin dengan efek radial vignette dan pilih musik mp3 romantis.
              </p>
            </div>

            {/* Single Photo Uploaders */}
            <div className="grid gap-4 sm:grid-cols-3">
              <PhotoUploader
                label="Foto Mempelai Wanita"
                value={formData.bridePhotoUrl}
                onChange={(url) => set("bridePhotoUrl", url)}
                folder="bride"
              />
              <PhotoUploader
                label="Foto Mempelai Pria"
                value={formData.groomPhotoUrl}
                onChange={(url) => set("groomPhotoUrl", url)}
                folder="groom"
              />
              <PhotoUploader
                label="Foto Sampul Undangan"
                value={formData.coverPhotoUrl}
                onChange={(url) => set("coverPhotoUrl", url)}
                folder="cover"
                aspectRatio="landscape"
              />
            </div>

            {/* Gallery Photo Uploader */}
            <div className="space-y-2 rounded-2xl border border-border p-5">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Galeri Foto Pernikahan
              </h3>
              <GalleryUploader
                value={formData.galleryUrls}
                onChange={(urls) => set("galleryUrls", urls)}
              />
            </div>

            {/* Music Preference & Custom Upload */}
            <div className="space-y-4 rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Musik Latar Latar Undangan
                  </h3>
                  <p className="font-sans text-[11px] text-muted-foreground">
                    Gunakan musik instrumental preset tema atau unggah file MP3 kalian sendiri.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div
                  onClick={() => set("musicType", "template")}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    formData.musicType === "template"
                      ? "border-brand-600 bg-brand-50/20 ring-2 ring-brand-500"
                      : "border-border hover:bg-muted/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-foreground">
                      Preset Musik Tema ({activeTemplateMusic.title})
                    </span>
                    <Music size={16} className="text-brand-600" />
                  </div>
                  <p className="mt-1 font-sans text-[11px] text-muted-foreground">
                    Musik piano instrumental khusus tema {selectedTheme.name}.
                  </p>
                </div>

                <div
                  onClick={() => set("musicType", "custom")}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    formData.musicType === "custom"
                      ? "border-brand-600 bg-brand-50/20 ring-2 ring-brand-500"
                      : "border-border hover:bg-muted/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-foreground">
                      Upload File MP3 Sendiri
                    </span>
                    <Upload size={16} className="text-brand-600" />
                  </div>
                  <p className="mt-1 font-sans text-[11px] text-muted-foreground">
                    Unggah lagu MP3 favorit kalian (Maks 20MB).
                  </p>
                </div>
              </div>

              {formData.musicType === "custom" && (
                <div className="space-y-3 rounded-xl border border-brand-200 bg-brand-50/30 p-4">
                  <Label className="text-xs">Upload File MP3 Musik</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="audio/mp3,audio/mpeg,audio/*"
                      onChange={handleCustomAudioUpload}
                      disabled={uploadingAudio}
                      className="text-xs"
                    />
                    {uploadingAudio && (
                      <Loader2 size={18} className="animate-spin text-brand-600" />
                    )}
                  </div>

                  {formData.musicCustomUrl && (
                    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                      <div className="flex items-center gap-2">
                        <Music size={16} className="text-brand-600" />
                        <span className="max-w-xs truncate font-mono text-xs text-foreground">
                          {formData.musicCustomUrl}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAudioPreview(formData.musicCustomUrl)}
                        className="gap-1 rounded-full text-xs"
                      >
                        {isPlayingPreview ? <Pause size={14} /> : <Play size={14} />}
                        {isPlayingPreview ? "Stop" : "Putar Audio"}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: Selesai & Terbitkan */}
        {currentStep === 6 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Undangan Siap Diterbitkan!
              </h2>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                Semua informasi pernikahan kalian telah tersusun lengkap.
              </p>
            </div>

            <div className="mx-auto max-w-md space-y-3 rounded-2xl border border-border bg-muted/40 p-5 text-left">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  Mempelai
                </span>
                <span className="font-display text-sm font-medium text-foreground">
                  {(formData.brideName || "Sekar").split(" ")[0]} &amp;{" "}
                  {(formData.groomName || "Dimas").split(" ")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  Tema Dipilih
                </span>
                <span className="font-display text-sm font-medium capitalize text-brand-600">
                  {selectedTheme.name} ({selectedTheme.style})
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-2">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  Momen Cerita
                </span>
                <span className="font-sans text-xs text-foreground">
                  {formData.timeline.length} Peristiwa Terdaftar
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-sans text-xs font-semibold text-muted-foreground">
                  Foto Galeri
                </span>
                <span className="font-sans text-xs text-foreground">
                  {formData.galleryUrls.length} Foto Diunggah
                </span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                variant="brand"
                size="lg"
                onClick={handlePublish}
                disabled={saving}
                className="h-12 gap-2 rounded-full px-8 text-sm font-medium shadow-xl"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Menerbitkan Undangan...
                  </>
                ) : (
                  <>
                    Terbitkan Undangan Sekarang <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-full px-5 text-xs"
          >
            <ArrowLeft size={14} className="mr-1.5" /> Kembali
          </Button>

          {currentStep < WIZARD_STEPS.length && (
            <Button
              variant="brand"
              size="sm"
              onClick={handleNext}
              className="rounded-full px-6 text-xs"
            >
              Lanjut <ChevronRight size={14} className="ml-1.5" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
