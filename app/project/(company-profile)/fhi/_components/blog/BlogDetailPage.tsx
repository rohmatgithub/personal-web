"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CompanyNavbar from "../company-profile/CompanyNavbar";
import ThemeSwitchButton from "../company-profile/ThemeSwitchButton";
import { useTranslation } from "../company-profile/i18n-context";
import { getBlogBySlug, getBlogPosts } from "./data";
import type { BlogPost } from "./types";

function useInView(threshold = 0.12, fallbackMs = 600) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const timer = window.setTimeout(() => setInView(true), fallbackMs);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [fallbackMs, threshold]);

  return [ref, inView] as const;
}

function CategoryBadge({ post }: { post: BlogPost }) {
  return (
    <span
      style={{
        background: `${post.categoryColor || "#c01020"}18`,
        color: post.categoryColor || "#c01020",
        border: `1px solid ${post.categoryColor || "#c01020"}45`,
      }}
      className="inline-block rounded-full px-4 py-1 text-[12px] font-bold tracking-widest uppercase"
    >
      {post.categoryName || post.category}
    </span>
  );
}

function AuthorAvatar({
  author,
  size = "md",
}: {
  author: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "size-[60px] text-[22px]"
      : size === "md"
        ? "size-10 text-[15px]"
        : "size-7 text-[11px]";

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-(--primary-main) to-(--primary-dark) font-black text-white shadow-[0_4px_16px_rgba(192,16,32,0.35)]`}
    >
      {author.charAt(0)}
    </div>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation("blog");

  return (
    <Link
      href={`/project/fhi/blog/${post.slug}`}
      className="group block no-underline"
    >
      <div className="overflow-hidden rounded-[14px] border border-(--border-light) bg-(--bg-secondary) transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-(--shadow-md)">
        <div className="relative h-37.5 overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="block h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.07]"
          />
        </div>
        <div className="px-4.5 pt-4 pb-5">
          <CategoryBadge post={post} />
          <h4 className="mt-2.5 mb-1.5 font-['Barlow_Condensed',sans-serif] text-[16px] leading-snug font-black text-(--text-primary)">
            {post.title}
          </h4>
          <div className="text-[12px] text-(--text-secondary)">
            {post.date} · {post.readTime} {t("detail.readSuffix")}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ShareButton({
  icon,
  label,
  color,
  onClick,
}: {
  icon: string;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `2px solid ${color}30`,
        background: `${color}10`,
        color,
      }}
      className="group flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold transition-all duration-200"
      onMouseEnter={(event) => {
        event.currentTarget.style.background = color;
        event.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.background = `${color}10`;
        event.currentTarget.style.color = color;
      }}
    >
      {icon} {label}
    </button>
  );
}

export default function BlogDetailPage({ slug }: { slug: string }) {
  const { t } = useTranslation("blog");
  const [posts] = useState(() => getBlogPosts());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [headerObserveRef, headerVisible] = useInView(0.1);
  const [contentObserveRef, contentVisible] = useInView(0.05);
  const [relatedObserveRef, relatedVisible] = useInView(0.1);

  const post = useMemo(
    () => getBlogBySlug(slug) ?? posts[0] ?? null,
    [posts, slug],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const element = contentRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const totalHeight = element.offsetHeight;
      const scrolledPx = -rect.top + window.innerHeight * 0.5;
      const progress = Math.min(
        100,
        Math.max(0, (scrolledPx / totalHeight) * 100),
      );
      setReadProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  const relatedPosts = useMemo(() => {
    if (!post) return [];

    const related = posts
      .filter((item) => item.id !== post.id && item.category === post.category)
      .slice(0, 3);
    const fallback = posts
      .filter((item) => item.id !== post.id && item.category !== post.category)
      .slice(0, 3 - related.length);

    return [...related, ...fallback].slice(0, 3);
  }, [post, posts]);

  if (!post) return null;

  const shareLinks = [
    { icon: "📘", label: t("detail.share.facebook"), color: "#1877F2" },
    { icon: "🐦", label: t("detail.share.twitter"), color: "#1DA1F2" },
    { icon: "💬", label: t("detail.share.whatsapp"), color: "#25D366" },
  ];

  return (
    <div className="min-h-screen bg-(--bg-primary) font-['Barlow',sans-serif] text-(--text-primary)">
      <ThemeSwitchButton />
      <div
        className="fixed top-0 left-0 z-200 h-0.75 bg-linear-to-r from-(--primary-main) to-(--secondary-main) transition-[width] duration-100 linear"
        style={{ width: `${readProgress}%` }}
      />

      <CompanyNavbar
        menuOpen={menuOpen}
        scrolled={scrolled}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        sectionHrefPrefix="/project/fhi"
        activeLinkLabel={t("navbar.links.blog")}
      />

      <div className="relative flex min-h-130 items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="block h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,8,24,0.3)_0%,rgba(2,8,24,0.7)_50%,rgba(2,8,24,0.95)_100%)]" />
        </div>

        <div
          ref={headerObserveRef}
          className="relative z-10 mx-auto w-full max-w-300 px-6 pt-35 pb-16"
        >
          <div className="max-w-195">
            <div
              className={`mb-6 flex items-center gap-2 text-[13px] text-white/55 transition-all duration-500 ease-out ${
                headerVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <Link
                href="/project/fhi"
                className="text-white/55 no-underline transition-colors duration-200 hover:text-white/90"
              >
                {t("detail.breadcrumb.home")}
              </Link>
              <span>/</span>
              <Link
                href="/project/fhi/blog"
                className="text-white/55 no-underline transition-colors duration-200 hover:text-white/90"
              >
                {t("detail.breadcrumb.blog")}
              </Link>
              <span>/</span>
              <span className="text-white/80">
                {post.categoryName || post.category}
              </span>
            </div>

            <div
              className={`mb-5 flex flex-wrap items-center gap-2.5 transition-all delay-100 duration-500 ease-out ${
                headerVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <CategoryBadge post={post} />
              {post.featured && (
                <span className="rounded-full bg-(--secondary-main) px-3.5 py-1 text-[12px] font-black tracking-widest text-white uppercase">
                  ⭐ {t("detail.featuredBadge")}
                </span>
              )}
            </div>

            <h1
              className={`mb-6 font-['Bebas_Neue',cursive] text-[clamp(38px,6vw,70px)] leading-none tracking-[0.03em] text-white transition-all delay-150 duration-600 ease-out ${
                headerVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {post.title}
            </h1>

            <div
              className={`flex flex-wrap items-center gap-5 transition-all delay-250 duration-500 ease-out ${
                headerVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <AuthorAvatar author={post.author} size="md" />
                <div>
                  <div className="text-[14px] font-bold text-white">
                    {post.author}
                  </div>
                  <div className="text-[12px] text-white/55">
                    {post.authorRole}
                  </div>
                </div>
              </div>

              <div className="h-7 w-px bg-white/20" />

              <div className="flex gap-4 text-[13px] text-white/65">
                <span>📅 {post.date}</span>
                <span>
                  ⏱ {post.readTime} {t("detail.readSuffix")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-300 px-6">
        <div className="grid grid-cols-1 items-start gap-14 pt-15 pb-20 lg:grid-cols-[1fr_320px]">
          <div ref={contentObserveRef}>
            <div
              className={`mb-10 rounded-2xl border-l-4 border-(--primary-main) bg-[linear-gradient(135deg,rgba(192,16,32,0.06),rgba(192,16,32,0.02))] px-8 py-7 transition-all duration-500 ease-out ${
                contentVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <p className="text-[18px] leading-[1.75] font-medium italic text-(--text-primary)">
                {post.excerpt}
              </p>
            </div>

            <div ref={contentRef} className="max-w-190">
              <div
                className={`wrap-break-word text-[17px] leading-[1.85] text-(--text-secondary)
                  [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:font-['Barlow_Condensed',sans-serif] [&_h1]:text-[36px] [&_h1]:leading-[1.15] [&_h1]:text-(--text-primary)
                  [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:font-['Barlow_Condensed',sans-serif] [&_h2]:text-[30px] [&_h2]:leading-[1.2] [&_h2]:text-(--text-primary)
                  [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-['Barlow_Condensed',sans-serif] [&_h3]:text-[24px] [&_h3]:leading-tight [&_h3]:text-(--text-primary)
                  [&_p]:mb-6
                  [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6
                  [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6
                  [&_li]:mb-1.5
                  [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-(--primary-main) [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-(--text-primary)
                  [&_a]:text-(--primary-main) [&_a]:underline [&_a]:underline-offset-2
                  [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl
                  [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-(--bg-secondary) [&_pre]:p-4
                  [&_code]:font-mono [&_code]:text-[0.92em]
                  transition-all duration-500 ease-out ${
                    contentVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-0 opacity-100"
                  }`}
                dangerouslySetInnerHTML={{ __html: post.contentHtml ?? "" }}
              />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-2.5 border-t-2 border-(--border-light) pt-8">
              <span className="text-[13px] font-bold tracking-wide text-(--text-secondary)">
                🏷️ {t("detail.tagsLabel")}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-full border border-(--border-main) bg-(--bg-secondary) px-3.5 py-1 text-[13px] font-semibold text-(--text-secondary) transition-all duration-200 hover:border-(--primary-main) hover:bg-(--primary-main) hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5 rounded-2xl border border-(--border-light) bg-(--bg-secondary) px-7 py-7">
              <span className="text-[14px] font-bold tracking-[0.04em] text-(--text-primary)">
                {t("detail.shareArticle")}
              </span>
              <div className="flex gap-2.5">
                {shareLinks.map((link) => (
                  <ShareButton
                    key={link.label}
                    icon={link.icon}
                    label={link.label}
                    color={link.color}
                    onClick={() =>
                      window.alert(
                        t("detail.shareTo", { platform: link.label }),
                      )
                    }
                  />
                ))}
                <button
                  onClick={handleCopy}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-lg border-2 px-4 py-2 text-[13px] font-bold transition-all duration-200 ${
                    copied
                      ? "border-(--success) bg-(--success) text-white"
                      : "border-(--border-main) bg-(--bg-primary) text-(--text-secondary) hover:border-(--primary-main) hover:text-(--primary-main)"
                  }`}
                >
                  {copied
                    ? `✅ ${t("detail.copied")}`
                    : `🔗 ${t("detail.copyLink")}`}
                </button>
              </div>
            </div>

            <div className="mt-9 flex items-start gap-5 rounded-2xl border border-(--border-light) bg-(--bg-secondary) px-8 py-7">
              <AuthorAvatar author={post.author} size="lg" />
              <div>
                <div className="mb-1 font-['Barlow_Condensed',sans-serif] text-[18px] font-black text-(--text-primary)">
                  {post.author}
                </div>
                <div className="mb-2.5 text-[13px] font-bold tracking-[0.04em] text-(--primary-main)">
                  {post.authorRole}
                </div>
                <p className="text-[14px] leading-[1.65] text-(--text-secondary)">
                  {t("detail.authorBio")}
                </p>
              </div>
            </div>
          </div>

          <aside className="sticky top-22.5 flex flex-col gap-7">
            <div className="overflow-hidden rounded-2xl bg-linear-to-br from-(--primary-dark) to-(--primary-main) px-6 py-7 text-white">
              <div className="mb-3 font-['Bebas_Neue',cursive] text-[22px] tracking-[0.06em]">
                {t("detail.aboutFhi.title")}
              </div>
              <p className="mb-5 text-[13px] leading-[1.7] text-white/75">
                {t("detail.aboutFhi.description")}
              </p>
              <Link
                href="/project/fhi#tentang"
                className="block rounded-lg bg-white/15 py-2.5 text-center text-[13px] font-bold tracking-widest text-white no-underline uppercase transition-colors duration-200 hover:bg-white/25"
              >
                {t("detail.aboutFhi.cta")} →
              </Link>
            </div>

            <div className="rounded-2xl border border-(--border-light) bg-(--bg-secondary) px-5.5 py-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[13px] font-bold tracking-[0.04em] text-(--text-secondary)">
                  {t("detail.readProgress")}
                </span>
                <span className="text-[13px] font-black text-(--primary-main)">
                  {Math.round(readProgress)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-(--bg-tertiary)">
                <div
                  className="h-full rounded-full bg-linear-to-r from-(--primary-main) to-(--secondary-main) transition-[width] duration-200 linear"
                  style={{ width: `${readProgress}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-(--border-light) bg-(--bg-secondary) px-5.5 py-5">
              <div className="mb-4.5 border-b-2 border-(--border-light) pb-3.5 font-['Barlow_Condensed',sans-serif] text-[15px] font-black tracking-[0.06em] text-(--text-primary) uppercase">
                {t("detail.otherArticles")}
              </div>
              <div className="flex flex-col gap-3.5">
                {posts
                  .filter((item) => item.id !== post.id)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={`/project/fhi/blog/${item.slug}`}
                      className="flex gap-3 rounded-[10px] p-2.5 no-underline transition-colors duration-200 hover:bg-(--bg-tertiary)"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="56px"
                          className="block h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 line-clamp-2 text-[13px] leading-snug font-bold text-(--text-primary)">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-(--text-disabled)">
                          {item.date}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <Link
                href="/project/fhi/blog"
                className="mt-4 block rounded-lg bg-(--primary-main) py-2.5 text-center text-[13px] font-bold tracking-[0.06em] text-white no-underline uppercase transition-colors duration-200 hover:bg-(--primary-hover)"
              >
                {t("detail.viewAllBlog")}
              </Link>
            </div>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <div
            ref={relatedObserveRef}
            className="border-t border-(--border-light) pt-15 pb-20"
          >
            <div
              className={`mb-10 flex items-center gap-4 transition-all duration-500 ease-out ${
                relatedVisible ? "opacity-100" : "opacity-100"
              }`}
            >
              <div className="h-px flex-1 bg-(--border-light)" />
              <h2 className="font-['Bebas_Neue',cursive] text-[30px] tracking-[0.06em] whitespace-nowrap text-(--text-primary)">
                {t("detail.relatedArticles")}
              </h2>
              <div className="h-px flex-1 bg-(--border-light)" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((item, index) => (
                <div
                  key={item.id}
                  className={`transition-all duration-500 ease-out ${
                    relatedVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-0 opacity-100"
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <RelatedCard post={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-white/6 bg-[#020818] px-6 py-8 text-white/50">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-3">
          <Link
            href="/project/fhi"
            className="flex items-center gap-2 font-bold text-white/70 no-underline transition-colors duration-200 hover:text-white"
          >
            <span>🏑</span> FHI - {t("detail.footerBrand")}
          </Link>
          <span className="text-[13px]">{t("detail.footerCopyright")}</span>
          <div className="flex gap-4">
            <Link
              href="/project/fhi/blog"
              className="text-[13px] font-semibold text-(--primary-light) no-underline hover:underline"
            >
              ← {t("detail.allArticles")}
            </Link>
            <Link
              href="/project/fhi"
              className="text-[13px] font-semibold text-(--primary-light) no-underline hover:underline"
            >
              🏠 {t("detail.home")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
