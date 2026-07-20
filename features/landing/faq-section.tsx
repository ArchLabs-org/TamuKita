"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Apakah TamuKita benar-benar gratis?",
    a: "Ya. Paket gratis kami memungkinkan kalian membuat 1 undangan aktif untuk hingga 50 tamu, selamanya — tanpa trial, tanpa kartu kredit. Jika kebutuhan lebih besar, ada paket berbayar dengan harga yang wajar.",
  },
  {
    q: "Apakah tampilannya bagus di semua perangkat?",
    a: "Tentu. Semua tema TamuKita dirancang responsif — terlihat indah di smartphone, tablet, maupun desktop. Tamu cukup klik link, tidak perlu install aplikasi apapun.",
  },
  {
    q: "Bisakah saya menggunakan domain sendiri?",
    a: "Bisa. Di paket Starter ke atas, kalian bisa menghubungkan domain personal seperti arya-nadira.com. Kami juga menyediakan subdomain gratis di format nama.tamukita.id.",
  },
  {
    q: "Bagaimana cara kerja RSVP digital?",
    a: "Setiap tamu menerima link unik. Saat mereka mengklik 'Konfirmasi Kehadiran', data otomatis masuk ke dashboard. Kalian bisa melihat siapa yang hadir, jumlah orang, dan catatan khusus dari tamu.",
  },
  {
    q: "Apakah saya bisa import daftar tamu dari Excel?",
    a: "Ya, di paket Starter ke atas kalian bisa import daftar tamu dari file Excel atau CSV. Format template tersedia untuk diunduh dari dashboard.",
  },
  {
    q: "Seberapa lama undangan tetap aktif?",
    a: "Undangan tetap aktif selama akun kalian aktif. Di paket gratis, undangan aktif selama 1 tahun. Di paket berbayar, tidak ada batasan waktu.",
  },
  {
    q: "Apakah data tamu saya aman?",
    a: "Ya. Data disimpan dengan enkripsi dan tidak pernah dibagikan ke pihak ketiga. Kalian juga bisa mengekspor atau menghapus data kapan saja.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className={cn(
        "group rounded-xl border transition-colors duration-200",
        open ? "border-brand-200 bg-brand-50/50" : "border-border bg-card hover:border-brand-100",
      )}
    >
      <button
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${index}`}
      >
        <span className="font-sans text-sm font-medium text-foreground">{q}</span>
        <span className="mt-0.5 flex-shrink-0">
          {open ? (
            <Minus size={14} className="text-brand-600" aria-hidden="true" />
          ) : (
            <Plus size={14} className="text-muted-foreground group-hover:text-brand-500 transition-colors" aria-hidden="true" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${index}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 font-sans text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <Section id="faq" className="bg-warm-50/40">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-600"
          >
            Pertanyaan Umum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display text-display-md font-light tracking-tight"
          >
            Ada yang ingin{" "}
            <em className="not-italic text-gradient">kalian tanyakan?</em>
          </motion.h2>
        </div>

        {/* FAQ list */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-xl border border-border bg-card p-5 text-center"
        >
          <p className="font-sans text-sm text-muted-foreground">
            Masih ada pertanyaan?{" "}
            <a
              href="mailto:hello@tamukita.id"
              className="font-medium text-brand-600 hover:underline"
            >
              Hubungi kami
            </a>{" "}
            — kami biasanya membalas dalam 1 jam kerja.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
