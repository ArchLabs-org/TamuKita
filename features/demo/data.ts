export interface DemoTheme {
  id: string;
  name: string;
  tagline: string;
  description: string;
  style: string;
  palette: {
    bg: string;
    bgSecondary: string;
    text: string;
    textMuted: string;
    accent: string;
    accentLight: string;
    border: string;
    card: string;
  };
  couple: {
    bride: string;
    brideParents: string;
    groom: string;
    groomParents: string;
    story?: string; // optional — if empty, section is hidden
    coupleOrder?: "bride_first" | "groom_first";
  };
  event: {
    akad: { date: string; time: string; venue: string; address: string; mapsUrl?: string };
    reception: { date: string; time: string; venue: string; address: string; mapsUrl?: string };
    countdown: string; // ISO date for countdown target — should target reception date
  };
  gallery: string[]; // gradient descriptions for visual placeholders
  timeline: { year: string; title: string; desc: string }[];
  gifts: { bank: string; account: string; name: string }[];
}

export const demoThemes: DemoTheme[] = [
  {
    id: "aurora",
    name: "Aurora",
    tagline: "Soft Romantic",
    description: "Hangat, lembut, dan elegan. Terinspirasi dari cahaya fajar yang menghangatkan.",
    style: "Romantic · Warm · Gold",
    palette: {
      bg: "hsl(36,40%,97%)",
      bgSecondary: "hsl(36,35%,93%)",
      text: "hsl(22,40%,18%)",
      textMuted: "hsl(22,25%,45%)",
      accent: "hsl(43,72%,42%)",
      accentLight: "hsl(48,90%,88%)",
      border: "hsl(43,50%,82%)",
      card: "hsl(0,0%,100%)",
    },
    couple: {
      bride: "Sekar Ayu",
      brideParents: "Putri dari Bpk. H. Slamet & Ibu Hj. Winarti",
      groom: "Dimas Prasetyo",
      groomParents: "Putra dari Bpk. Ir. Bambang & Ibu Dr. Retno",
      story:
        "Kami pertama kali bertemu di sebuah pameran seni di Jakarta, November 2021. Sekar sedang mengagumi sebuah lukisan, dan Dimas memberanikan diri untuk menyapa. Dari satu percakapan tentang seni, tumbuh sebuah cerita cinta yang indah.",
    },
    event: {
      akad: {
        date: "Sabtu, 8 November 2025",
        time: "08.00 — 10.00 WIB",
        venue: "Masjid Al-Azhar Jakarta",
        address: "Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan",
      },
      reception: {
        date: "Sabtu, 8 November 2025",
        time: "12.00 — 15.00 WIB",
        venue: "Ayana Resort & Spa Bali",
        address: "Jl. Karang Mas Sejahtera, Jimbaran, Bali 80364",
      },
      countdown: "2025-11-08T08:00:00",
    },
    gallery: [
      "from-amber-100 to-orange-200",
      "from-rose-100 to-pink-200",
      "from-yellow-100 to-amber-200",
      "from-orange-100 to-red-200",
      "from-amber-200 to-yellow-100",
      "from-rose-200 to-orange-100",
    ],
    timeline: [
      { year: "2021", title: "Pertama Bertemu", desc: "Pameran seni di Jakarta, November 2021" },
      { year: "2022", title: "Mulai Berpacaran", desc: "Setelah 8 bulan pertemanan yang indah" },
      { year: "2023", title: "Liburan Bersama", desc: "Road trip pertama kami ke Yogyakarta" },
      { year: "2024", title: "Lamaran", desc: "Dimas melamar di tepi pantai Uluwatu, Bali" },
      { year: "2025", title: "Hari Bahagia", desc: "Kami resmi bersatu selamanya" },
    ],
    gifts: [
      { bank: "BCA", account: "1234567890", name: "Sekar Ayu" },
      { bank: "Mandiri", account: "0987654321", name: "Dimas Prasetyo" },
    ],
  },
  {
    id: "aster",
    name: "Aster",
    tagline: "Minimal Luxury",
    description: "Bersih, modern, dan penuh kelas. Keindahan dalam kesederhanaan.",
    style: "Minimal · Clean · Luxury",
    palette: {
      bg: "hsl(0,0%,99%)",
      bgSecondary: "hsl(220,14%,97%)",
      text: "hsl(220,14%,12%)",
      textMuted: "hsl(220,10%,50%)",
      accent: "hsl(220,14%,22%)",
      accentLight: "hsl(220,14%,94%)",
      border: "hsl(220,14%,88%)",
      card: "hsl(0,0%,100%)",
    },
    couple: {
      bride: "Nadira Kusuma",
      brideParents: "Putri dari Bpk. Prof. Kusuma & Ibu Dr. Indah",
      groom: "Arya Wibowo",
      groomParents: "Putra dari Bpk. Drs. Wibowo & Ibu Sri Mulyani",
      story:
        "Keduanya bertemu dalam sebuah seminar arsitektur di Singapura. Nadira adalah arsitek muda yang sedang presentasi proyeknya, dan Arya hadir sebagai tamu pembicara. Mereka menemukan kesamaan selera dalam desain, musik, dan perjalanan.",
    },
    event: {
      akad: {
        date: "Sabtu, 12 April 2026",
        time: "09.00 — 11.00 WIB",
        venue: "Kediaman Mempelai Wanita",
        address: "Jl. Kemang Raya No. 12, Jakarta Selatan 12730",
      },
      reception: {
        date: "Sabtu, 12 April 2026",
        time: "18.00 — 21.00 WIB",
        venue: "The Ritz-Carlton Pacific Place Jakarta",
        address: "Sudirman Central Business District, Jl. Jend. Sudirman Kav. 52-53, Jakarta",
      },
      countdown: "2026-04-12T09:00:00",
    },
    gallery: [
      "from-slate-100 to-gray-200",
      "from-zinc-100 to-slate-200",
      "from-gray-100 to-zinc-200",
      "from-stone-100 to-gray-200",
      "from-slate-200 to-gray-100",
      "from-neutral-100 to-stone-200",
    ],
    timeline: [
      {
        year: "2022",
        title: "Pertemuan Pertama",
        desc: "Seminar arsitektur internasional di Singapura",
      },
      { year: "2022", title: "Teman Dekat", desc: "Bertukar inspirasi dan ide desain" },
      {
        year: "2023",
        title: "Bersama Resmi",
        desc: "Hubungan yang dimulai dengan saling menghargai",
      },
      { year: "2025", title: "Lamaran", desc: "Di sebuah galeri seni privat di Tokyo" },
      { year: "2026", title: "Pernikahan", desc: "Menyatukan dua jiwa yang serasi" },
    ],
    gifts: [
      { bank: "BNI", account: "2233445566", name: "Nadira Kusuma" },
      { bank: "BCA", account: "6655443322", name: "Arya Wibowo" },
    ],
  },
  {
    id: "senja",
    name: "Senja",
    tagline: "Warm Earth",
    description: "Seperti cahaya senja — hangat, alami, dan penuh kenangan.",
    style: "Rustic · Earthy · Natural",
    palette: {
      bg: "hsl(30,45%,95%)",
      bgSecondary: "hsl(28,38%,90%)",
      text: "hsl(24,40%,18%)",
      textMuted: "hsl(24,28%,42%)",
      accent: "hsl(16,58%,40%)",
      accentLight: "hsl(30,60%,88%)",
      border: "hsl(28,35%,78%)",
      card: "hsl(36,50%,98%)",
    },
    couple: {
      bride: "Ratih Purnama",
      brideParents: "Putri dari Bpk. Sugeng & Ibu Sari",
      groom: "Galih Saputra",
      groomParents: "Putra dari Bpk. Waluyo & Ibu Endang",
      story:
        "Ratih dan Galih tumbuh di kota yang sama namun baru bertemu di usia 25, dalam sebuah komunitas berkebun organik. Cinta mereka tumbuh perlahan seperti tanaman — berakar kuat dan mekar indah.",
    },
    event: {
      akad: {
        date: "Sabtu, 3 Januari 2026",
        time: "08.00 — 10.00 WIB",
        venue: "Pendopo Keluarga Besar",
        address: "Desa Tegalmulyo, Klaten, Jawa Tengah 57486",
      },
      reception: {
        date: "Sabtu, 3 Januari 2026",
        time: "11.00 — 14.00 WIB",
        venue: "Villa Padi Ubud",
        address: "Jl. Raya Sanggingan No.18, Kedewatan, Ubud, Gianyar, Bali",
      },
      countdown: "2026-01-03T08:00:00",
    },
    gallery: [
      "from-amber-200 to-orange-300",
      "from-lime-100 to-green-200",
      "from-orange-100 to-amber-300",
      "from-green-100 to-lime-200",
      "from-yellow-200 to-orange-200",
      "from-emerald-100 to-teal-200",
    ],
    timeline: [
      { year: "2020", title: "Pertama Jumpa", desc: "Workshop berkebun organik di Yogyakarta" },
      { year: "2021", title: "Sering Berkomunikasi", desc: "Bertukar tips berkebun dan memasak" },
      { year: "2022", title: "Jatuh Cinta", desc: "Tanpa disadari, benih cinta telah tumbuh" },
      {
        year: "2024",
        title: "Dilamar",
        desc: "Di kebun sendiri, di antara tanaman yang mereka rawat",
      },
      { year: "2026", title: "Menikah", desc: "Bersatu dalam ikatan yang alami dan tulus" },
    ],
    gifts: [
      { bank: "BRI", account: "3344556677", name: "Ratih Purnama" },
      { bank: "Mandiri", account: "7766554433", name: "Galih Saputra" },
    ],
  },
  {
    id: "sagara",
    name: "Sagara",
    tagline: "Dark Elegant",
    description: "Berani, kontras, dan mewah. Seperti laut dalam yang penuh misteri.",
    style: "Dark · Bold · Sophisticated",
    palette: {
      bg: "hsl(215,28%,9%)",
      bgSecondary: "hsl(215,24%,13%)",
      text: "hsl(36,50%,96%)",
      textMuted: "hsl(36,20%,65%)",
      accent: "hsl(43,78%,58%)",
      accentLight: "hsl(43,50%,22%)",
      border: "hsl(215,20%,20%)",
      card: "hsl(215,26%,12%)",
    },
    couple: {
      bride: "Laila Maharani",
      brideParents: "Putri dari Bpk. H. Rajasa & Ibu Hj. Fatimah",
      groom: "Reza Firmansyah",
      groomParents: "Putra dari Bpk. Firmansyah & Ibu Dewi Sartika",
      story:
        "Reza adalah seorang fotografer perjalanan yang bertemu Laila dalam sebuah pameran foto di Bali. Laila hadir karena tertarik dengan tema pameran — laut dalam. Mereka menghabiskan malam itu berdiskusi tentang kedalaman samudra dan makna kehidupan.",
    },
    event: {
      akad: {
        date: "Minggu, 21 Juni 2026",
        time: "09.00 — 11.00 WITA",
        venue: "Masjid Agung Bali",
        address: "Jl. Gunung Agung No.1, Denpasar, Bali 80116",
      },
      reception: {
        date: "Minggu, 21 Juni 2026",
        time: "19.00 — 22.00 WITA",
        venue: "W Hotel Seminyak",
        address: "Jl. Petitenget No.8, Seminyak, Kuta Utara, Badung, Bali 80361",
      },
      countdown: "2026-06-21T09:00:00",
    },
    gallery: [
      "from-slate-700 to-blue-900",
      "from-gray-700 to-slate-800",
      "from-zinc-700 to-gray-900",
      "from-blue-800 to-indigo-900",
      "from-slate-800 to-gray-700",
      "from-gray-800 to-zinc-700",
    ],
    timeline: [
      {
        year: "2022",
        title: "Pameran Foto",
        desc: "Bertemu di pameran 'Samudra' di Bali Art Center",
      },
      { year: "2022", title: "Perjalanan Pertama", desc: "Diving bersama di Raja Ampat" },
      {
        year: "2023",
        title: "Bersama Resmi",
        desc: "Membangun kenangan di berbagai penjuru dunia",
      },
      {
        year: "2025",
        title: "Lamaran",
        desc: "Di atas kapal saat matahari terbenam di Labuan Bajo",
      },
      {
        year: "2026",
        title: "Bersatu Selamanya",
        desc: "Dua jiwa yang bertemu di kedalaman yang sama",
      },
    ],
    gifts: [
      { bank: "BCA", account: "4455667788", name: "Laila Maharani" },
      { bank: "BNI", account: "8877665544", name: "Reza Firmansyah" },
    ],
  },
  {
    id: "lumine",
    name: "Lumine",
    tagline: "Modern White",
    description: "Cerah, segar, dan penuh semangat. Merayakan cinta dengan kegembiraan.",
    style: "Modern · Fresh · Joyful",
    palette: {
      bg: "hsl(0,0%,100%)",
      bgSecondary: "hsl(330,30%,98%)",
      text: "hsl(330,25%,18%)",
      textMuted: "hsl(330,15%,50%)",
      accent: "hsl(340,58%,58%)",
      accentLight: "hsl(340,60%,95%)",
      border: "hsl(330,30%,88%)",
      card: "hsl(0,0%,100%)",
    },
    couple: {
      bride: "Putri Maharani",
      brideParents: "Putri dari Bpk. dr. Hendra & Ibu Wulandari, M.Psi",
      groom: "Andi Kurniawan",
      groomParents: "Putra dari Bpk. Kurniawan & Ibu Lestari, S.E",
      story:
        "Putri dan Andi bertemu di sebuah konser musik indie di Bandung. Putri hadir bersama teman-temannya, Andi datang sendirian. Satu lagu yang sama membuat mereka saling bercerita, dan cerita itu belum selesai sampai hari ini.",
    },
    event: {
      akad: {
        date: "Sabtu, 14 Februari 2026",
        time: "10.00 — 11.30 WIB",
        venue: "KUA Kecamatan Mlati",
        address: "Jl. Monjali No.14, Sinduadi, Mlati, Sleman, Yogyakarta",
      },
      reception: {
        date: "Sabtu, 14 Februari 2026",
        time: "13.00 — 16.00 WIB",
        venue: "Plataran Borobudur",
        address: "Desa Tuksongo, Kec. Borobudur, Kab. Magelang, Jawa Tengah 56553",
      },
      countdown: "2026-02-14T10:00:00",
    },
    gallery: [
      "from-pink-100 to-rose-200",
      "from-fuchsia-100 to-pink-200",
      "from-rose-100 to-pink-100",
      "from-pink-200 to-fuchsia-100",
      "from-red-100 to-rose-200",
      "from-pink-100 to-red-100",
    ],
    timeline: [
      { year: "2022", title: "Konser di Bandung", desc: "Satu lagu yang menjadi awal segalanya" },
      { year: "2022", title: "Nonton Bersama", desc: "Dari film ke film, dan semakin akrab" },
      { year: "2023", title: "Pacaran Resmi", desc: "Tepat di ulang tahun Putri" },
      { year: "2025", title: "Lamaran Manis", desc: "Surprise proposal di kebun bunga Lembang" },
      { year: "2026", title: "Our Day", desc: "Hari yang paling ditunggu-tunggu" },
    ],
    gifts: [
      { bank: "BCA", account: "5566778899", name: "Putri Maharani" },
      { bank: "Mandiri", account: "9988776655", name: "Andi Kurniawan" },
    ],
  },
  {
    id: "eterna",
    name: "Eterna",
    tagline: "Classic Gold",
    description: "Abadi, mewah, dan penuh tradisi. Untuk pernikahan yang akan dikenang selamanya.",
    style: "Classic · Traditional · Gold",
    palette: {
      bg: "hsl(46,40%,96%)",
      bgSecondary: "hsl(44,35%,92%)",
      text: "hsl(22,35%,14%)",
      textMuted: "hsl(22,22%,42%)",
      accent: "hsl(38,65%,38%)",
      accentLight: "hsl(46,80%,88%)",
      border: "hsl(44,45%,80%)",
      card: "hsl(48,50%,98%)",
    },
    couple: {
      bride: "Amira Zahra",
      brideParents: "Putri dari Bpk. KH. Ahmad Zahra & Ibu Hj. Maryam",
      groom: "Farhan Abdullah",
      groomParents: "Putra dari Bpk. H. Abdullah & Ibu Hj. Khadijah",
      story:
        "Amira dan Farhan dipertemukan oleh keluarga mereka dalam sebuah silaturahmi yang penuh keberkahan. Dari perkenalan yang sederhana, tumbuh rasa saling hormat dan kasih sayang yang dalam.",
    },
    event: {
      akad: {
        date: "Minggu, 29 Maret 2026",
        time: "08.00 — 09.30 WIB",
        venue: "Masjid Istiqlal Jakarta",
        address: "Jl. Taman Wijaya Kusuma, Ps. Baru, Sawah Besar, Jakarta Pusat 10710",
      },
      reception: {
        date: "Minggu, 29 Maret 2026",
        time: "11.00 — 14.00 WIB",
        venue: "Grand Hyatt Jakarta",
        address: "Jl. M.H. Thamrin Kav. 28-30, Jakarta Pusat 10350",
      },
      countdown: "2026-03-29T08:00:00",
    },
    gallery: [
      "from-yellow-100 to-amber-200",
      "from-amber-100 to-yellow-200",
      "from-orange-100 to-amber-100",
      "from-yellow-200 to-orange-100",
      "from-amber-200 to-yellow-100",
      "from-orange-200 to-amber-200",
    ],
    timeline: [
      { year: "2023", title: "Perkenalan", desc: "Silaturahmi keluarga yang penuh berkah" },
      {
        year: "2023",
        title: "Ta'aruf",
        desc: "Mengenal satu sama lain dengan cara yang bermartabat",
      },
      { year: "2024", title: "Khitbah", desc: "Lamaran resmi dengan prosesi adat yang indah" },
      { year: "2025", title: "Persiapan", desc: "Mempersiapkan hari yang paling sakral" },
      {
        year: "2026",
        title: "Akad Nikah",
        desc: "Ijab kabul yang mengikat dua hati dalam satu ikatan suci",
      },
    ],
    gifts: [
      { bank: "BRI Syariah", account: "6677889900", name: "Amira Zahra" },
      { bank: "BSI", account: "0099887766", name: "Farhan Abdullah" },
    ],
  },
];

export function getThemeById(id: string): DemoTheme | undefined {
  return demoThemes.find((t) => t.id === id);
}
