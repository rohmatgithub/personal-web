"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const sections = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "latar-belakang", label: "Latar Belakang" },
  { id: "tujuan", label: "Tujuan" },
  { id: "solusi", label: "Solusi" },
  { id: "preview", label: "Preview UI" },
  { id: "kontak", label: "Kontak" },
];

const previewShots = [
  {
    src: "/proposal/fhi/screenshots/company-profile.webp",
    title: "Landing Page Website FHI",
    desc: "Beranda resmi dengan highlight berita, agenda, dan hero identitas organisasi.",
    link: "/project/fhi",
  },
  {
    src: "/proposal/fhi/screenshots/official-site-news.webp",
    title: "Halaman Berita / CMS",
    desc: "Layout manajemen konten untuk publikasi artikel, rilis resmi, dan update kegiatan.",
    link: "/project/fhi/blog",
  },
  {
    src: "/proposal/fhi/screenshots/detail-site-news.webp",
    title: "Detail Berita",
    desc: "Detail berita dengan gambar, judul, dan konten utama.",
    link: "/project/fhi/blog/liga-nasional-hockey-2026-resmi-dibuka",
  },
  {
    src: "/proposal/fhi/screenshots/fhi-admin-panel.webp",
    title: "Admin Panel",
    desc: "Layout admin panel untuk mengelola artikel, rilis resmi, dan update kegiatan.",
    link: "",
  },
  {
    src: "/proposal/fhi/screenshots/tournament-dashboard.webp",
    title: "Dashboard Tournament",
    desc: "Panel ringkasan turnamen untuk panitia: jadwal, status pertandingan, dan statistik utama.",
    link: "",
  },
  {
    src: "/proposal/fhi/screenshots/match-settings.webp",
    title: "Match Center Publik",
    desc: "Tampilan untuk mengatur turnamen, melalui dashboard dan admin panel.",
    link: "",
  },
  {
    src: "/proposal/fhi/screenshots/match-result.webp",
    title: "Match Center Publik",
    desc: "Tampilan hasil pertandingan, melalui dashboard dan admin panel.",
    link: "",
  },
  {
    src: "/proposal/fhi/screenshots/match-standing.webp",
    title: "Match Center Publik",
    desc: "Tampilan standings turnamen, melalui dashboard dan admin panel.",
    link: "",
  },
];

export default function ProposalPage() {
  const [activeSection, setActiveSection] = useState("ringkasan");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<{
    src: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const offset = 120;
      let currentSection = sections[0]?.id ?? "ringkasan";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (window.scrollY + offset >= element.offsetTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealElements =
      document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activePreview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePreview(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePreview]);

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerOffset = 96;
    const top =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white font-sans">
      {/* Background Grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0E1A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#C8A84B] to-[#E8C96D] flex items-center justify-center">
              <span className="text-[#0A0E1A] text-xs font-bold">FHI</span>
            </div>
            <div>
              <p className="text-xs text-white/40 tracking-widest uppercase">
                Proposal Penawaran
              </p>
              <p className="text-sm font-semibold text-white leading-tight">
                Federasi Hockey Indonesia
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(s.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSection === s.id
                    ? "bg-[#C8A84B]/20 text-[#C8A84B]"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-xs text-white/30 border border-white/10 px-2 py-1 rounded">
              v1.0
            </span>
            <span className="hidden sm:block text-xs text-white/30">
              26 Februari 2026
            </span>
            <button
              type="button"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white/80"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-3">
            <div className="grid gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(s.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm transition-all ${
                    activeSection === s.id
                      ? "bg-[#C8A84B]/20 text-[#C8A84B]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full border border-[#C8A84B]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-[#C8A84B]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-[#C8A84B]/15" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#C8A84B]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 border border-[#C8A84B]/30 bg-[#C8A84B]/10 px-4 py-2 rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-[#C8A84B] animate-pulse" />
                <span className="text-[#C8A84B] text-xs font-medium tracking-wide uppercase">
                  Proposal Penawaran · Versi 1.0
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight">
                <span className="text-white">Pengembangan</span>
                <br />
                <span className="text-[#C8A84B]">Digital Resmi</span>
                <br />
                <span className="text-white/40">FHI</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-2xl mb-10">
                Website Profil Resmi & Aplikasi Tournament Management untuk
                Federasi Hockey Indonesia — solusi digital terintegrasi yang
                menggantikan proses manual dan membangun identitas digital
                profesional.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#solusi"
                  className="group inline-flex items-center gap-2 bg-[#C8A84B] text-[#0A0E1A] px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#E8C96D] transition-all"
                >
                  Lihat Solusi Lengkap
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href="#ringkasan"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-6 py-3 rounded-xl font-medium text-sm hover:border-white/40 hover:text-white transition-all"
                >
                  Baca Ringkasan
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Solusi Terintegrasi", value: "2", unit: "Produk" },
                { label: "Fitur Website", value: "9+", unit: "Halaman" },
                { label: "Fitur Tournament", value: "12+", unit: "Fitur" },
                {
                  label: "Waktu Pengerjaan",
                  value: "Est.",
                  unit: "8–12 Minggu",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-white/10 rounded-2xl p-5 bg-white/2 backdrop-blur-sm"
                >
                  <p className="text-3xl font-black text-[#C8A84B]">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-white/80">
                    {stat.unit}
                  </p>
                  <p className="text-xs text-white/30 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Section 1 - Ringkasan */}
        <section
          id="ringkasan"
          data-reveal
          className="reveal-section py-24 max-w-7xl mx-auto px-6"
        >
          <SectionLabel number="01" label="Ringkasan Penawaran" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="col-span-full mb-4">
              <p className="text-white/60 text-lg leading-relaxed max-w-3xl">
                Federasi Hockey Indonesia (FHI) saat ini belum memiliki website
                profil resmi sebagai pusat informasi organisasi. Pengelolaan
                turnamen masih dilakukan secara manual menggunakan Excel, yang
                berpotensi menimbulkan kendala konsistensi dan keterlambatan
                informasi bagi publik.
              </p>
            </div>
            <OfferingCard
              icon="🌐"
              title="Website Company Profile Resmi FHI"
              description="Website resmi lengkap dengan management blog/news agar FHI dapat mempublikasikan informasi, berita, dan kegiatan secara mandiri dan profesional."
              accent="#C8A84B"
            />
            <OfferingCard
              icon="🏑"
              title="Aplikasi Tournament Management"
              description="Menggantikan proses manual Excel, sehingga panitia dapat mengelola jadwal, hasil, dan informasi pertandingan dengan lebih cepat, rapi, dan live kepada publik."
              accent="#4B9EFF"
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Section 2 - Latar Belakang */}
        <section
          id="latar-belakang"
          data-reveal
          className="reveal-section py-24 max-w-7xl mx-auto px-6"
        >
          <SectionLabel number="02" label="Latar Belakang & Tantangan" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <ChallengeCard
              title="Branding & Informasi Resmi"
              icon="📣"
              items={[
                "Belum tersedia website profil resmi sebagai rujukan utama publik, atlet, klub, sponsor, dan media.",
                "Informasi organisasi dan kegiatan belum terpusat dalam satu kanal resmi yang mudah diakses.",
              ]}
            />
            <ChallengeCard
              title="Operasional Turnamen"
              icon="⚙️"
              items={[
                "Pengelolaan masih manual via Excel — rawan perbedaan versi file.",
                "Keterlambatan update jadwal & hasil pertandingan.",
                "Kesulitan publik untuk melihat informasi turnamen secara real-time dan konsisten.",
              ]}
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Section 3 - Tujuan */}
        <section
          id="tujuan"
          data-reveal
          className="reveal-section py-24 max-w-7xl mx-auto px-6"
        >
          <SectionLabel number="03" label="Tujuan" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏛️",
                title: "Identitas Digital Resmi",
                desc: "Membangun identitas digital resmi FHI melalui website profil yang profesional dan terpercaya.",
              },
              {
                icon: "⚡",
                title: "Efisiensi Operasional",
                desc: "Meningkatkan efisiensi dan akurasi pengelolaan turnamen, menggantikan proses manual yang rentan error.",
              },
              {
                icon: "📊",
                title: "Pengalaman Publik",
                desc: "Memberikan pengalaman informasi yang lebih baik bagi publik melalui akses jadwal, hasil, dan info live.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group border border-white/10 rounded-2xl p-8 bg-white/2 hover:border-[#C8A84B]/30 hover:bg-[#C8A84B]/5 transition-all"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Section 4 - Solusi */}
        <section
          id="solusi"
          data-reveal
          className="reveal-section py-24 max-w-7xl mx-auto px-6"
        >
          <SectionLabel number="04" label="Ruang Lingkup Solusi" />

          {/* Product A */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#C8A84B]/20 border border-[#C8A84B]/30 flex items-center justify-center">
                <span className="text-[#C8A84B] font-bold text-sm">A</span>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest">
                  Solusi Pertama
                </p>
                <h3 className="text-xl font-bold text-white">
                  Website Company Profile FHI + Blog/News Management
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  feature: "Beranda",
                  desc: "Highlight berita terbaru, agenda/kegiatan, link turnamen aktif",
                },
                {
                  feature: "Tentang FHI",
                  desc: "Sejarah, visi misi, mandat organisasi",
                },
                {
                  feature: "Struktur Organisasi",
                  desc: "Profil pengurus dan komisi",
                },
                {
                  feature: "Blog / Berita (CMS)",
                  desc: "Admin dapat membuat, mengedit, dan mempublikasikan artikel & press release",
                },
                {
                  feature: "Galeri",
                  desc: "Foto dan video dokumentasi kegiatan",
                },
                { feature: "Kontak", desc: "Form kontak dan kanal resmi FHI" },
                {
                  feature: "Responsive Design",
                  desc: "Optimal untuk mobile & desktop",
                },
                {
                  feature: "SEO Dasar & Analytics",
                  desc: "Mudah ditemukan di Google + monitoring traffic",
                },
                {
                  feature: "Admin Panel",
                  desc: "Panel mandiri untuk kelola konten tanpa developer",
                },
              ].map((item) => (
                <FeatureItem key={item.feature} {...item} accent="#C8A84B" />
              ))}
            </div>

            <OutputBox
              items={[
                "Website resmi siap tayang (live)",
                "Admin panel untuk kelola konten berita/blog",
                "Panduan singkat penggunaan (admin guide)",
              ]}
            />
          </div>

          {/* Divider */}
          <div className="my-16 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Product B */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm">B</span>
              </div>
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest">
                  Solusi Kedua
                </p>
                <h3 className="text-xl font-bold text-white">
                  Aplikasi Tournament Management
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">
                  Fitur Untuk Publik (Viewer)
                </p>
                <div className="space-y-3">
                  {[
                    {
                      feature: "Halaman Turnamen",
                      desc: "Daftar event/turnamen yang tersedia",
                    },
                    {
                      feature: "Jadwal Pertandingan",
                      desc: "Filter per hari, kategori, dan venue",
                    },
                    {
                      feature: "Hasil Pertandingan",
                      desc: "Score dan status pertandingan",
                    },
                    {
                      feature: "Live Info",
                      desc: "Status upcoming / ongoing / finished, diperbarui real-time",
                    },
                    {
                      feature: "Klasemen & Statistik",
                      desc: "Standing, top scorer, dll (opsional)",
                    },
                  ].map((item) => (
                    <FeatureItem
                      key={item.feature}
                      {...item}
                      accent="#4B9EFF"
                      compact
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#C8A84B] uppercase tracking-widest mb-4">
                  Fitur Untuk Admin/Panitia
                </p>
                <div className="space-y-3">
                  {[
                    {
                      feature: "Manajemen Turnamen",
                      desc: "Buat event: nama, periode, lokasi, kategori",
                    },
                    {
                      feature: "Manajemen Tim",
                      desc: "Daftar tim per kategori",
                    },
                    {
                      feature: "Manajemen Pertandingan",
                      desc: "Buat match, assign tim, venue, tanggal/jam",
                    },
                    {
                      feature: "Input Hasil",
                      desc: "Score, status, catatan pertandingan",
                    },
                    {
                      feature: "Publikasi Otomatis",
                      desc: "Update sekali, publik langsung melihat",
                    },
                    {
                      feature: "Export Laporan",
                      desc: "Excel/PDF untuk dokumentasi (opsional)",
                    },
                  ].map((item) => (
                    <FeatureItem
                      key={item.feature}
                      {...item}
                      accent="#C8A84B"
                      compact
                    />
                  ))}
                </div>
              </div>
            </div>

            <OutputBox
              items={[
                "Aplikasi tournament management siap pakai (admin + halaman publik)",
                "Dokumentasi penggunaan panitia/operator",
                "Sesi training singkat untuk operator/panitia",
              ]}
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Section 5 - Preview UI */}
        <section
          id="preview"
          data-reveal
          className="reveal-section py-24 max-w-7xl mx-auto px-6"
        >
          <SectionLabel number="05" label="Preview Rancangan UI" />
          <div className="mt-6 rounded-2xl border border-[#C8A84B]/20 bg-[#C8A84B]/7 p-4 text-sm text-white/70">
            Tempatkan screenshot final di folder{" "}
            <span className="text-[#C8A84B]">
              public/proposal/fhi/screenshots
            </span>{" "}
            lalu ganti file SVG ini dengan PNG/JPG kamu.
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {previewShots.map((shot) => {
              const hasLink = Boolean(shot.link?.trim());

              return (
                <article
                  key={shot.src}
                  className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all ${hasLink ? "hover:border-[#C8A84B]/40" : "opacity-90"}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActivePreview({ src: shot.src, title: shot.title })
                    }
                    className="relative block aspect-16/10 w-full overflow-hidden bg-[#111827]"
                    aria-label={`Lihat penuh ${shot.title}`}
                  >
                    <Image
                      src={shot.src}
                      alt={shot.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="absolute right-3 bottom-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
                      Lihat Full
                    </span>
                  </button>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-white">
                      {shot.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      {shot.desc}
                    </p>
                    {hasLink ? (
                      <a
                        href={shot.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-xs font-medium text-[#C8A84B]"
                      >
                        Buka Halaman ↗
                      </a>
                    ) : (
                      <p className="mt-3 text-xs font-medium text-white/45">
                        Link belum tersedia
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* CTA / Kontak Section */}
        <section
          id="kontak"
          data-reveal
          className="reveal-section py-24 max-w-7xl mx-auto px-6"
        >
          <div className="relative rounded-3xl overflow-hidden border border-[#C8A84B]/20 bg-linear-to-br from-[#C8A84B]/10 via-transparent to-blue-500/5 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[#0A0E1A]/50" />
            <div className="relative">
              <p className="text-xs text-[#C8A84B] uppercase tracking-widest font-semibold mb-4">
                Langkah Selanjutnya
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Siap Memajukan
                <br />
                <span className="text-[#C8A84B]">Digitalisasi FHI?</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
                Mari diskusikan detail kebutuhan dan timeline pengerjaan. Kami
                siap membantu FHI membangun ekosistem digital yang profesional.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:email@example.com"
                  className="inline-flex items-center gap-2 bg-[#C8A84B] text-[#0A0E1A] px-8 py-4 rounded-xl font-bold hover:bg-[#E8C96D] transition-all"
                >
                  Hubungi Kami
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <a
                  href="#ringkasan"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-xl font-medium hover:border-white/40 hover:text-white transition-all"
                >
                  Kembali ke Atas
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#C8A84B] to-[#E8C96D] flex items-center justify-center">
                <span className="text-[#0A0E1A] text-xs font-bold">FHI</span>
              </div>
              <p className="text-white/30 text-sm">
                Proposal Penawaran · Federasi Hockey Indonesia
              </p>
            </div>
            <div className="flex items-center gap-6 text-white/20 text-xs">
              <span>Rohmatullah</span>
              <span>·</span>
              <span>v1.0</span>
              <span>·</span>
              <span>26 Februari 2026</span>
            </div>
          </div>
        </footer>
      </main>
      {activePreview && (
        <div
          className="fixed inset-0 z-140 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActivePreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${activePreview.title}`}
        >
          <div
            className="relative h-[85vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#0B1220]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePreview(null)}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white"
              aria-label="Tutup preview"
            >
              ×
            </button>
            <Image
              src={activePreview.src}
              alt={activePreview.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
      <style jsx global>{`
        .reveal-section {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 700ms ease,
            transform 700ms ease;
          will-change: opacity, transform;
        }

        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Sub Components ───────────────────────────────────────────────────────────

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-6xl font-black text-white/5">{number}</span>
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">
          Bagian
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white">{label}</h2>
      </div>
    </div>
  );
}

function OfferingCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div
      className="border rounded-2xl p-8 bg-white/2 transition-all hover:bg-white/4"
      style={{ borderColor: `${accent}30` }}
    >
      <div className="text-4xl mb-6">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ChallengeCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: string[];
}) {
  return (
    <div className="border border-red-500/20 rounded-2xl p-8 bg-red-500/3">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-base font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="text-red-400 mt-1 text-xs">✕</span>
            <p className="text-white/50 text-sm leading-relaxed">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureItem({
  feature,
  desc,
  accent,
  compact = false,
}: {
  feature: string;
  desc: string;
  accent: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-start gap-3">
        <div
          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
          style={{ backgroundColor: accent }}
        />
        <div>
          <p className="text-sm font-semibold text-white">{feature}</p>
          <p className="text-xs text-white/40">{desc}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="border border-white/10 rounded-xl p-5 bg-white/1 hover:border-white/20 transition-all">
      <div className="flex items-start gap-3">
        <div
          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: accent }}
        />
        <div>
          <p className="text-sm font-semibold text-white mb-1">{feature}</p>
          <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function OutputBox({ items }: { items: string[] }) {
  return (
    <div className="mt-8 border border-[#C8A84B]/20 rounded-2xl p-6 bg-[#C8A84B]/5">
      <p className="text-xs text-[#C8A84B] uppercase tracking-widest font-semibold mb-4">
        Output yang Diterima FHI
      </p>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 border border-[#C8A84B]/20 bg-[#C8A84B]/10 rounded-lg px-3 py-2"
          >
            <span className="text-[#C8A84B] text-xs">✓</span>
            <span className="text-white/70 text-xs">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
