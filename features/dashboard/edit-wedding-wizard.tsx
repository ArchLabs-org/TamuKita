"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/routes";
import { updateWeddingAction } from "@/lib/actions/wedding-actions";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type Wedding = Database["public"]["Tables"]["weddings"]["Row"];

interface EditWeddingWizardProps {
  weddingId: string;
  initialWeddingData: Wedding;
}

type GiftItem = { bank: string; account: string; name: string };
type TimelineItem = { year: string; title: string; desc: string };

export function EditWeddingWizard({ weddingId, initialWeddingData }: EditWeddingWizardProps) {
  const router = useRouter();
  const [saving, setSaving] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    brideName: initialWeddingData.bride_name || "",
    brideParents: initialWeddingData.bride_parents || "",
    groomName: initialWeddingData.groom_name || "",
    groomParents: initialWeddingData.groom_parents || "",
    coupleOrder:
      (initialWeddingData.couple_order as "bride_first" | "groom_first") || "bride_first",
    weddingDate: initialWeddingData.wedding_date || "",
    akadDate: initialWeddingData.akad_date || "",
    akadTime: initialWeddingData.akad_time || "08.00 - 10.00 WIB",
    akadVenue: initialWeddingData.akad_venue || "",
    akadAddress: initialWeddingData.akad_address || "",
    akadMapsUrl: initialWeddingData.akad_maps_url || "",
    receptionDate: initialWeddingData.reception_date || "",
    receptionTime: initialWeddingData.reception_time || "12.00 - 15.00 WIB",
    venue: initialWeddingData.venue || "",
    receptionAddress: initialWeddingData.reception_address || "",
    receptionMapsUrl: initialWeddingData.reception_maps_url || "",
    loveStory: initialWeddingData.love_story || "",
    timeline: (initialWeddingData.timeline as TimelineItem[]) || ([] as TimelineItem[]),
    gifts: (initialWeddingData.gifts as GiftItem[]) || ([] as GiftItem[]),
  });

  const set = (key: string, val: unknown) => setFormData((prev) => ({ ...prev, [key]: val }));

  const handleAddTimeline = () => {
    set("timeline", [...formData.timeline, { year: "", title: "", desc: "" }]);
  };

  const handleRemoveTimeline = (idx: number) => {
    set(
      "timeline",
      formData.timeline.filter((_, i) => i !== idx),
    );
  };

  const handleUpdateTimeline = (idx: number, field: string, value: string) => {
    const updated = [...formData.timeline];
    updated[idx] = { ...updated[idx], [field]: value };
    set("timeline", updated);
  };

  const handleAddGift = () => {
    set("gifts", [...formData.gifts, { bank: "", account: "", name: "" }]);
  };

  const handleRemoveGift = (idx: number) => {
    set(
      "gifts",
      formData.gifts.filter((_, i) => i !== idx),
    );
  };

  const handleUpdateGift = (idx: number, field: string, value: string) => {
    const updated = [...formData.gifts];
    updated[idx] = { ...updated[idx], [field]: value };
    set("gifts", updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setServerError(null);

    const result = await updateWeddingAction(weddingId, formData);

    if ("error" in result && result.error) {
      setServerError(result.error);
      toast.error(result.error);
      setSaving(false);
      return;
    }

    toast.success("Undangan berhasil diperbarui!");
    setSaving(false);
    router.push(`${ROUTES.weddings}/${weddingId}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {serverError && (
        <div className="flex gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">Terjadi Kesalahan</h3>
            <p className="mt-1 font-sans text-xs text-destructive/80">{serverError}</p>
          </div>
        </div>
      )}

      {/* Section 1: Mempelai */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
          Informasi Mempelai
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="brideName">Nama Mempelai Wanita</Label>
            <Input
              id="brideName"
              placeholder="Sekar Indah"
              value={formData.brideName}
              onChange={(e) => set("brideName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groomName">Nama Mempelai Pria</Label>
            <Input
              id="groomName"
              placeholder="Dimas Pratama"
              value={formData.groomName}
              onChange={(e) => set("groomName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brideParents">Orang Tua Mempelai Wanita (Opsional)</Label>
            <Input
              id="brideParents"
              placeholder="Bapak ... & Ibu ..."
              value={formData.brideParents}
              onChange={(e) => set("brideParents", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groomParents">Orang Tua Mempelai Pria (Opsional)</Label>
            <Input
              id="groomParents"
              placeholder="Bapak ... & Ibu ..."
              value={formData.groomParents}
              onChange={(e) => set("groomParents", e.target.value)}
            />
          </div>
          <div className="space-y-2 border-t border-border/50 pt-2 sm:col-span-2">
            <Label className="text-sm font-semibold text-foreground">
              Urutan Penulisan Nama Mempelai
            </Label>
            <div className="mt-1 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => set("coupleOrder", "bride_first")}
                className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                  formData.coupleOrder === "bride_first"
                    ? "border-brand-600 bg-brand-50/40 font-semibold text-brand-700 ring-2 ring-brand-500"
                    : "border-border bg-card text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <span className="text-xs">Wanita &amp; Pria</span>
                <span className="mt-0.5 font-mono text-[10px] opacity-75">
                  {formData.brideName ? formData.brideName.split(" ")[0] : "Wanita"} &amp;{" "}
                  {formData.groomName ? formData.groomName.split(" ")[0] : "Pria"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => set("coupleOrder", "groom_first")}
                className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                  formData.coupleOrder === "groom_first"
                    ? "border-brand-600 bg-brand-50/40 font-semibold text-brand-700 ring-2 ring-brand-500"
                    : "border-border bg-card text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <span className="text-xs">Pria &amp; Wanita</span>
                <span className="mt-0.5 font-mono text-[10px] opacity-75">
                  {formData.groomName ? formData.groomName.split(" ")[0] : "Pria"} &amp;{" "}
                  {formData.brideName ? formData.brideName.split(" ")[0] : "Wanita"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Acara & Lokasi */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
          Jadwal Acara & Lokasi
        </h2>

        {/* Akad */}
        <div className="mb-6 border-b border-border pb-6">
          <h3 className="mb-4 font-display text-base font-semibold text-foreground">Akad Nikah</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="akadDate">Tanggal Akad</Label>
              <Input
                id="akadDate"
                type="date"
                value={formData.akadDate}
                onChange={(e) => set("akadDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="akadTime">Waktu Akad</Label>
              <Input
                id="akadTime"
                placeholder="08.00 - 10.00 WIB"
                value={formData.akadTime}
                onChange={(e) => set("akadTime", e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="akadVenue">Gedung / Tempat Akad</Label>
              <Input
                id="akadVenue"
                placeholder="misal: Masjid Agung"
                value={formData.akadVenue}
                onChange={(e) => set("akadVenue", e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="akadAddress">Alamat Lengkap Akad</Label>
              <Input
                id="akadAddress"
                placeholder="Jalan ..."
                value={formData.akadAddress}
                onChange={(e) => set("akadAddress", e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="akadMapsUrl">Link Google Maps Akad (Opsional)</Label>
              <Input
                id="akadMapsUrl"
                placeholder="https://maps.google.com/..."
                value={formData.akadMapsUrl}
                onChange={(e) => set("akadMapsUrl", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resepsi */}
        <div>
          <h3 className="mb-4 font-display text-base font-semibold text-foreground">
            Resepsi Pernikahan
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="receptionDate">Tanggal Resepsi</Label>
              <Input
                id="receptionDate"
                type="date"
                value={formData.receptionDate}
                onChange={(e) => set("receptionDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receptionTime">Waktu Resepsi</Label>
              <Input
                id="receptionTime"
                placeholder="12.00 - 15.00 WIB"
                value={formData.receptionTime}
                onChange={(e) => set("receptionTime", e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="venue">Gedung / Venue Resepsi</Label>
              <Input
                id="venue"
                placeholder="misal: Grand Ballroom Hotel Indonesia"
                value={formData.venue}
                onChange={(e) => set("venue", e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="receptionAddress">Alamat Lengkap Resepsi</Label>
              <Input
                id="receptionAddress"
                placeholder="Jalan ..."
                value={formData.receptionAddress}
                onChange={(e) => set("receptionAddress", e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="receptionMapsUrl">Link Google Maps Resepsi (Opsional)</Label>
              <Input
                id="receptionMapsUrl"
                placeholder="https://maps.google.com/..."
                value={formData.receptionMapsUrl}
                onChange={(e) => set("receptionMapsUrl", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Cerita Cinta */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
          Kisah Cinta & Perjalanan
        </h2>

        <div className="mb-6 space-y-4">
          <div className="space-y-2">
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
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground">
                Garis Waktu Perjalanan Cinta
              </h3>
              <p className="font-sans text-[11px] text-muted-foreground">
                Edit momen berharga sesuai Bulan / Tahun.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddTimeline}
              className="gap-1.5 rounded-full text-xs"
            >
              + Tambah Momen
            </Button>
          </div>

          <div className="space-y-3">
            {formData.timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-xl border border-border/80 bg-muted/20 p-4 sm:flex-row sm:items-start"
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
                    className="self-end text-xs text-muted-foreground hover:text-destructive sm:self-center"
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4: Hadiah Angpao */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
          Rekening Angpao Digital
        </h2>

        <div className="space-y-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-sans text-xs text-muted-foreground">
              Tambahkan rekening tamu untuk mengirimkan hadiah digital
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddGift}
              className="gap-1.5 rounded-full text-xs"
            >
              + Tambah Rekening
            </Button>
          </div>

          <div className="space-y-3">
            {formData.gifts.map((gift, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-xl border border-border/80 bg-muted/20 p-4 sm:flex-row"
              >
                <div className="w-full space-y-1 sm:w-1/3">
                  <Label className="text-[10px]">Bank / E-Wallet</Label>
                  <Input
                    value={gift.bank}
                    onChange={(e) => handleUpdateGift(idx, "bank", e.target.value)}
                    placeholder="BCA / Mandiri / GoPay"
                    className="text-xs"
                  />
                </div>
                <div className="w-full space-y-1 sm:w-1/3">
                  <Label className="text-[10px]">Nomor Rekening</Label>
                  <Input
                    value={gift.account}
                    onChange={(e) => handleUpdateGift(idx, "account", e.target.value)}
                    placeholder="123456789"
                    className="text-xs"
                  />
                </div>
                <div className="w-full space-y-1 sm:w-1/3">
                  <Label className="text-[10px]">Atas Nama</Label>
                  <Input
                    value={gift.name}
                    onChange={(e) => handleUpdateGift(idx, "name", e.target.value)}
                    placeholder="Nama Penerima"
                    className="text-xs"
                  />
                </div>
                {formData.gifts.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveGift(idx)}
                    className="self-end text-xs text-muted-foreground hover:text-destructive sm:self-start"
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="rounded-full text-xs"
        >
          Batal
        </Button>
        <Button
          type="submit"
          variant="brand"
          disabled={saving}
          className="gap-2 rounded-full text-xs"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Menyimpan...
            </>
          ) : (
            <>
              <Save size={14} /> Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
