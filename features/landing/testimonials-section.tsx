"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const testimonials = [
  {
    name: "Anisa & Budi",
    role: "Pasangan dari Jakarta",
    content:
      "TamuKita benar-benar membantu kami mengelola 400 tamu. Proses check-in dengan QR code sangat cepat, tidak ada antrean panjang di pintu masuk.",
    rating: 5,
    date: "Februari 2025",
  },
  {
    name: "Putri Maharani",
    role: "Wedding Organizer",
    content:
      "Sebagai WO, saya sudah pakai TamuKita untuk lebih dari 30 event. Platform ini menghemat waktu saya berjam-jam dalam mengelola data tamu.",
    rating: 5,
    date: "Maret 2025",
  },
  {
    name: "Rizky & Siti",
    role: "Pasangan dari Surabaya",
    content:
      "Template-nya sangat cantik dan elegan. Banyak tamu kami yang memuji undangan digital kami. Proses pembuatannya juga mudah banget.",
    rating: 5,
    date: "April 2025",
  },
  {
    name: "Fajar Santoso",
    role: "Event Coordinator",
    content:
      "Dashboard analitiknya sangat membantu untuk tracking RSVP. Saya bisa tahu berapa tamu yang hadir secara real-time.",
    rating: 5,
    date: "Mei 2025",
  },
  {
    name: "Diana & Michael",
    role: "Pasangan dari Bali",
    content:
      "Kami pilih TamuKita karena tampilannya premium dan profesional. Sangat sesuai untuk pernikahan kami yang bertema luxury.",
    rating: 5,
    date: "Juni 2025",
  },
  {
    name: "Hendra Wijaya",
    role: "Wedding Planner",
    content:
      "Support tim TamuKita sangat responsif. Setiap pertanyaan dijawab dengan cepat dan solusi yang tepat.",
    rating: 5,
    date: "Juli 2025",
  },
];

export function TestimonialsSection() {
  return (
    <Section className="bg-warm-50/50" id="testimonials">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          Testimoni
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-display-md font-bold tracking-tight"
        >
          Dipercaya Ribuan Pasangan
        </motion.h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Card variant="default" className="h-full">
              <CardContent className="p-6">
                <div className="flex gap-0.5 mb-3" aria-label={`Rating: ${t.rating} dari 5`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-gold-400 text-gold-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.content}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
