"use client";

import * as React from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { uploadPhotoAction } from "@/lib/actions/upload-actions";

interface GalleryUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxPhotos?: number;
}

export function GalleryUploader({ value, onChange, maxPhotos = 20 }: GalleryUploaderProps) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setError(null);
    const remaining = maxPhotos - value.length;
    if (remaining <= 0) {
      setError(`Maksimal ${maxPhotos} foto.`);
      return;
    }

    const toUpload = Array.from(files).slice(0, remaining);
    setUploading(true);

    const results = await Promise.allSettled(
      toUpload.map(async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        const result = await uploadPhotoAction(fd, "gallery");
        if ("error" in result) throw new Error(result.error);
        return result.url;
      }),
    );

    const newUrls: string[] = [];
    const errors: string[] = [];

    results.forEach((r) => {
      if (r.status === "fulfilled") {
        newUrls.push(r.value);
      } else {
        errors.push(r.reason?.message ?? "Upload gagal");
      }
    });

    onChange([...value, ...newUrls]);
    if (errors.length > 0) setError(`${errors.length} foto gagal diupload.`);
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }

  function removePhoto(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {/* Upload trigger area */}
      {value.length < maxPhotos && (
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-center transition-all hover:border-brand-300 hover:bg-brand-50/20"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 size={22} className="animate-spin text-brand-500" />
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-500">
                <Plus size={20} />
              </div>
              <p className="font-sans text-xs font-medium text-foreground">Tambah Foto Galeri</p>
              <p className="font-sans text-[11px] text-muted-foreground">
                Pilih beberapa foto sekaligus — JPG, PNG, WebP, maks 5MB/foto
              </p>
              <p className="font-sans text-[10px] text-brand-500">
                {value.length}/{maxPhotos} foto diunggah
              </p>
            </>
          )}
        </div>
      )}

      {error && <p className="font-sans text-xs text-destructive">{error}</p>}

      {/* Photo grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {value.map((url, index) => (
            <div
              key={url}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Foto galeri ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
                }}
              />
              {/* Inner shadow blur edge */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: "inset 0 0 30px 6px rgba(0,0,0,0.2)" }}
              />
              {/* Delete button */}
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Hapus foto"
              >
                <X size={12} />
              </button>
              {/* Index badge */}
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 px-1.5 py-0.5 font-mono text-[9px] text-white">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
          }
        }}
      />
    </div>
  );
}
