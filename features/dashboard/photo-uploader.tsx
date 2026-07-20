"use client";

import * as React from "react";
import { X, ImageIcon, Loader2 } from "lucide-react";
import { uploadPhotoAction } from "@/lib/actions/upload-actions";

interface PhotoUploaderProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder: "bride" | "groom" | "cover" | "gallery";
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function PhotoUploader({
  label,
  value,
  onChange,
  folder,
  className = "",
  aspectRatio = "portrait",
}: PhotoUploaderProps) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const result = await uploadPhotoAction(fd, folder);
      if ("error" in result) {
        setError(result.error);
      } else {
        onChange(result.url);
      }
    } catch {
      setError("Upload gagal. Coba lagi.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "landscape"
        ? "aspect-video"
        : "aspect-[3/4]";

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all ${aspectClass} ${
          value
            ? "border-brand-300 bg-brand-50/30"
            : "cursor-pointer border-border hover:border-brand-300 hover:bg-brand-50/20"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !value && inputRef.current?.click()}
      >
        {value ? (
          <div className="relative h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Uploaded" className="h-full w-full object-cover" />
            {/* Vignette overlay — blends photo dengan tema */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 100%)",
              }}
            />
            {/* Edge blur fade */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 40px 8px rgba(0,0,0,0.18)",
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              aria-label="Hapus foto"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            {uploading ? (
              <Loader2 size={24} className="animate-spin text-brand-500" />
            ) : (
              <>
                <ImageIcon size={24} className="text-muted-foreground/50" />
                <p className="font-sans text-xs text-muted-foreground">
                  Klik atau seret foto ke sini
                </p>
                <p className="font-sans text-[10px] text-muted-foreground/60">
                  JPG, PNG, WebP — maks 5MB
                </p>
              </>
            )}
          </div>
        )}
        {error && (
          <p className="absolute inset-x-0 bottom-2 text-center font-sans text-[10px] text-destructive">
            {error}
          </p>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
    </div>
  );
}
