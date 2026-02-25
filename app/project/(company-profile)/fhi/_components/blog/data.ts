import type { BlogCategory, BlogPost } from "./types";

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "timnas-hockey-indoor-menang-emas-sea-games",
    title: "Timnas Hockey Indoor Putra Raih Emas SEA Games",
    excerpt:
      "Tim nasional Indonesia menutup turnamen dengan kemenangan dramatis dan membawa pulang medali emas setelah penantian panjang.",
    contentHtml: `
      <p>Timnas Hockey Indoor Putra Indonesia mencatat sejarah baru dengan menjuarai SEA Games setelah menaklukkan lawan kuat di partai final.</p>
      <h2>Perjalanan Turnamen</h2>
      <p>Sejak fase grup, Indonesia tampil konsisten dengan pressing tinggi, transisi cepat, dan disiplin dalam bertahan.</p>
      <p>Pada laga final, gol penentu lahir di kuarter terakhir melalui skema penalty corner yang dieksekusi sempurna.</p>
      <h3>Dampak untuk Pembinaan</h3>
      <p>Keberhasilan ini memperkuat fondasi program pembinaan berjenjang FHI serta membuka jalan untuk target kompetisi Asia berikutnya.</p>
    `,
    author: "Rendra Pratama",
    authorRole: "Redaktur FHI",
    date: "20 Jan 2026",
    readTime: "6 min",
    category: "prestasi",
    categoryName: "Prestasi",
    categoryColor: "#c01020",
    imageUrl:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1400&q=80",
    tags: ["Timnas", "SEA Games", "Indoor"],
    featured: true,
  },
  {
    id: 2,
    slug: "liga-nasional-hockey-2026-resmi-dibuka",
    title: "Liga Nasional Hockey 2026 Resmi Dibuka",
    excerpt:
      "Kompetisi nasional musim baru dimulai dengan format baru yang memberi lebih banyak menit bermain untuk atlet muda.",
    contentHtml: `
      <p>Liga Nasional Hockey 2026 dibuka secara resmi di Jakarta dengan partisipasi klub dari berbagai provinsi.</p>
      <h2>Format Kompetisi</h2>
      <p>Format kandang-tandang parsial diterapkan untuk meningkatkan kualitas laga dan pengalaman pertandingan atlet.</p>
      <p>Setiap klub wajib menurunkan minimal dua pemain U-21 dalam setiap pertandingan.</p>
    `,
    author: "Putri Anggraini",
    authorRole: "Media Officer FHI",
    date: "15 Jan 2026",
    readTime: "5 min",
    category: "kompetisi",
    categoryName: "Kompetisi",
    categoryColor: "#0f2a5e",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80",
    tags: ["Liga Nasional", "Kompetisi", "Klub"],
    featured: true,
  },
  {
    id: 3,
    slug: "program-talent-scouting-fhi-dimulai",
    title: "Program Talent Scouting FHI Dimulai di 12 Provinsi",
    excerpt:
      "FHI meluncurkan program pencarian bakat untuk memperluas basis atlet muda dari level sekolah dan klub daerah.",
    contentHtml: `
      <p>Program talent scouting 2026 menyasar atlet usia 13-18 tahun melalui rangkaian seleksi daerah.</p>
      <h2>Fokus Program</h2>
      <ul>
        <li>Identifikasi kemampuan teknik dasar dan kecerdasan bermain.</li>
        <li>Pemetaan potensi fisik dan mental kompetitif.</li>
        <li>Integrasi talenta ke pusat latihan regional.</li>
      </ul>
    `,
    author: "Ari Wibowo",
    authorRole: "Kabid Pembinaan",
    date: "10 Jan 2026",
    readTime: "7 min",
    category: "pembinaan",
    categoryName: "Pembinaan",
    categoryColor: "#16a34a",
    imageUrl:
      "https://images.unsplash.com/photo-1541981592144-26a5604740be?q=80&w=1470",
    tags: ["Pembinaan", "Talenta Muda", "Daerah"],
  },
  {
    id: 4,
    slug: "fhi-jalin-kemitraan-dengan-kampus-olahraga",
    title: "FHI Jalin Kemitraan dengan Kampus Olahraga",
    excerpt:
      "Kolaborasi baru dengan perguruan tinggi untuk riset sport science dan penguatan kurikulum pelatih nasional.",
    contentHtml: `
      <p>FHI menandatangani kerja sama strategis dengan sejumlah kampus olahraga untuk mendukung ekosistem prestasi.</p>
      <h2>Ruang Lingkup</h2>
      <p>Program meliputi riset performa, magang kepelatihan, dan workshop periodisasi latihan modern.</p>
    `,
    author: "Dina Maharani",
    authorRole: "Sekretaris Program",
    date: "06 Jan 2026",
    readTime: "4 min",
    category: "organisasi",
    categoryName: "Organisasi",
    categoryColor: "#d97706",
    imageUrl:
      "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=1470",
    tags: ["Kemitraan", "Pendidikan", "Sport Science"],
  },
  {
    id: 5,
    slug: "persiapan-asia-cup-fokus-mental-taktik",
    title: "Persiapan Asia Cup: Fokus Mental dan Taktik",
    excerpt:
      "Pelatih kepala menekankan kesiapan mental dan fleksibilitas taktik sebagai kunci menghadapi lawan level Asia.",
    contentHtml: `
      <p>Menu latihan tim nasional kini menambahkan sesi khusus pengambilan keputusan di bawah tekanan.</p>
      <h2>Evaluasi Tim</h2>
      <p>Staf pelatih melakukan evaluasi detail per posisi untuk mempercepat adaptasi skema permainan.</p>
    `,
    author: "Rendra Pratama",
    authorRole: "Redaktur FHI",
    date: "02 Jan 2026",
    readTime: "5 min",
    category: "timnas",
    categoryName: "Timnas",
    categoryColor: "#7c3aed",
    imageUrl:
      "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&w=1400&q=80",
    tags: ["Asia Cup", "Timnas", "Taktik"],
  },
  {
    id: 6,
    slug: "standar-baru-sertifikasi-pelatih-fhi",
    title: "Standar Baru Sertifikasi Pelatih FHI 2026",
    excerpt:
      "Sistem sertifikasi diperbarui untuk memastikan kualitas pelatih sejalan dengan kebutuhan kompetisi modern.",
    contentHtml: `
      <p>FHI merilis kerangka sertifikasi baru yang mencakup modul taktik, sport science, dan manajemen tim.</p>
      <h2>Target Implementasi</h2>
      <p>Seluruh pelatih aktif di liga nasional ditargetkan menyelesaikan pembaruan lisensi sebelum akhir musim.</p>
    `,
    author: "Putri Anggraini",
    authorRole: "Media Officer FHI",
    date: "28 Des 2025",
    readTime: "6 min",
    category: "edukasi",
    categoryName: "Edukasi",
    categoryColor: "#0ea5e9",
    imageUrl:
      "https://images.unsplash.com/photo-1585757318177-0570a997dc3a?q=80&w=1470",
    tags: ["Pelatih", "Sertifikasi", "Edukasi"],
  },
];

const blogCategories: BlogCategory[] = [
  { slug: "prestasi", name: "Prestasi", color: "#c01020" },
  { slug: "kompetisi", name: "Kompetisi", color: "#0f2a5e" },
  { slug: "pembinaan", name: "Pembinaan", color: "#16a34a" },
  { slug: "organisasi", name: "Organisasi", color: "#d97706" },
  { slug: "timnas", name: "Timnas", color: "#7c3aed" },
  { slug: "edukasi", name: "Edukasi", color: "#0ea5e9" },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogCategories(): BlogCategory[] {
  return blogCategories;
}

export function getBlogBySlug(slug: string): BlogPost | null {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
