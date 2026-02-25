"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CompanyNavbar from "../company-profile/CompanyNavbar";
import ThemeSwitchButton from "../company-profile/ThemeSwitchButton";
import { useTranslation } from "../company-profile/i18n-context";
import { getBlogCategories, getBlogPosts } from "./data";
import type { BlogPost } from "./types";

type CategoryFilter = BlogPost["category"] | "all";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

function CategoryBadge({
  post,
  size = "sm",
}: {
  post: BlogPost;
  size?: "sm" | "md";
}) {
  return (
    <span
      style={{
        background: `${post.categoryColor || "#c01020"}18`,
        color: post.categoryColor || "#c01020",
        border: `1px solid ${post.categoryColor || "#c01020"}40`,
      }}
      className={`inline-block rounded-full font-bold uppercase tracking-widest ${
        size === "sm" ? "px-3 py-0.5 text-[11px]" : "px-4 py-1 text-[13px]"
      }`}
    >
      {post.categoryName || post.category}
    </span>
  );
}

function AuthorAvatar({
  author,
  size = "sm",
}: {
  author: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={`shrink-0 rounded-full bg-[linear-gradient(135deg,var(--primary-main),var(--secondary-main))] text-white font-black flex items-center justify-center ${
        size === "sm" ? "size-7 text-[11px]" : "size-9 text-[13px]"
      }`}
    >
      {author.charAt(0)}
    </div>
  );
}

function FeaturedCard({ post, index }: { post: BlogPost; index: number }) {
  const { t } = useTranslation("blog");
  const [observeRef, isVisible] = useInView();

  return (
    <div
      ref={observeRef}
      className={`group grid grid-cols-1 overflow-hidden rounded-[20px] border border-(--border-light) bg-(--bg-secondary) transition-all duration-500 ease-out hover:border-(--border-dark) hover:shadow-(--shadow-lg) lg:grid-cols-2 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative min-h-80 overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-black/50" />
        <div className="absolute top-5 left-5">
          <span className="rounded-md bg-(--primary-main) px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase shadow-[0_2px_8px_rgba(192,16,32,0.5)]">
            ⭐ {t("list.featuredBadge")}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center px-10 py-10">
        <CategoryBadge post={post} size="md" />

        <h2 className="mt-4 mb-4 font-['Barlow_Condensed',sans-serif] text-2xl leading-tight font-black tracking-tight text-(--text-primary)">
          {post.title}
        </h2>

        <p className="mb-6 text-[15px] leading-relaxed text-(--text-secondary)">
          {post.excerpt}
        </p>

        <div className="mb-7 flex items-center gap-3">
          <AuthorAvatar author={post.author} size="md" />
          <div>
            <div className="text-[13px] font-bold text-(--text-primary)">
              {post.author}
            </div>
            <div className="text-[12px] text-(--text-secondary)">
              {post.date} · {post.readTime} {t("list.readSuffix")}
            </div>
          </div>
        </div>

        <Link
          href={`/project/fhi/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[14px] font-bold tracking-wide text-(--primary-main) no-underline transition-all duration-200 hover:gap-3.5"
        >
          {t("list.readMore")} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { t } = useTranslation("blog");
  const [observeRef, isVisible] = useInView();

  return (
    <div
      ref={observeRef}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-(--border-light) bg-(--bg-secondary) transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-(--border-dark) hover:shadow-(--shadow-md) ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative h-50 shrink-0 overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        <div className="absolute top-3.5 left-3.5">
          <CategoryBadge post={post} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-6 pb-7">
        <h3 className="mb-2.5 font-['Barlow_Condensed',sans-serif] text-[19px] leading-snug font-black tracking-tight text-(--text-primary)">
          {post.title}
        </h3>

        <p className="mb-5 line-clamp-3 flex-1 text-[14px] leading-[1.65] text-(--text-secondary)">
          {post.excerpt}
        </p>

        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AuthorAvatar author={post.author} size="sm" />
            <div>
              <div className="text-[12px] leading-tight font-bold text-(--text-primary)">
                {post.author}
              </div>
              <div className="text-[11px] text-(--text-secondary)">
                {post.date}
              </div>
            </div>
          </div>
          <div className="text-[11px] font-semibold text-(--text-disabled)">
            ⏱ {post.readTime}
          </div>
        </div>

        <Link
          href={`/project/fhi/blog/${post.slug}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-(--border-main) bg-(--primary-light) py-2.5 text-[13px] font-bold tracking-wide text-(--primary-main) no-underline transition-all duration-200 hover:border-(--primary-main) hover:bg-(--primary-main) hover:text-white"
        >
          {t("list.readArticle")} →
        </Link>
      </div>
    </div>
  );
}

export default function BlogListPage() {
  const { t } = useTranslation("blog");
  const [posts] = useState(() => getBlogPosts());
  const [categories] = useState(() => getBlogCategories());
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroObserveRef, heroVisible] = useInView(0.1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredPosts = useMemo(
    () => posts.filter((post) => post.featured),
    [posts],
  );

  const filters: { value: CategoryFilter; label: string }[] = useMemo(
    () => [
      { value: "all", label: t("list.filterAll") },
      ...categories.map((category) => ({
        value: category.slug as CategoryFilter,
        label: category.name,
      })),
    ],
    [categories, t],
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        activeFilter === "all" || post.category === activeFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [activeFilter, posts, searchQuery]);

  return (
    <div className="min-h-screen bg-(--bg-primary) font-['Barlow',sans-serif] text-(--text-primary)">
      <ThemeSwitchButton />
      <CompanyNavbar
        menuOpen={menuOpen}
        scrolled={scrolled}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        sectionHrefPrefix="/project/fhi"
        activeLinkLabel={t("navbar.links.blog")}
      />

      <section className="relative overflow-hidden px-6 pt-35 pb-22.5 [background:var(--hero-bg)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[15%] right-[8%] size-105 rounded-full bg-[radial-gradient(circle,rgba(15,42,94,0.35)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-[18%] size-80 rounded-full bg-[radial-gradient(circle,rgba(192,16,32,0.15)_0%,transparent_70%)]" />
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.05] text-(--text-on-primary)"
            viewBox="0 0 1200 500"
            preserveAspectRatio="xMidYMid slice"
          >
            {[...Array(13)].map((_, index) => (
              <line
                key={`v${index}`}
                x1={index * 100}
                y1={0}
                x2={index * 100}
                y2={500}
                stroke="currentColor"
                strokeWidth={1}
              />
            ))}
            {[...Array(6)].map((_, index) => (
              <line
                key={`h${index}`}
                x1={0}
                y1={index * 100}
                x2={1200}
                y2={index * 100}
                stroke="currentColor"
                strokeWidth={1}
              />
            ))}
          </svg>
          <div className="absolute top-0 right-[20%] h-full w-0.5 -skew-x-15 bg-[linear-gradient(to_bottom,transparent,rgba(192,16,32,0.5),transparent)]" />
        </div>

        <div
          ref={heroObserveRef}
          className="relative z-10 mx-auto max-w-300 text-center"
        >
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(192,16,32,0.35)] bg-[rgba(192,16,32,0.15)] px-4 py-1 transition-all duration-500 ${
              heroVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="size-1.5 animate-[pulse-glow_2s_infinite] rounded-full bg-(--primary-main)" />
            <span className="text-[13px] font-semibold tracking-widest text-(--text-on-primary-80) uppercase">
              📰 {t("list.heroKicker")}
            </span>
          </div>

          <h1
            className={`mb-6 font-['Bebas_Neue',cursive] text-[clamp(52px,8vw,88px)] leading-[0.95] tracking-[0.04em] text-(--text-on-primary) transition-all delay-100 duration-600 ease-out ${
              heroVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Blog{" "}
            <span className="text-(--primary-main) drop-shadow-[0_2px_12px_rgba(192,16,32,0.6)]">
              {t("list.heroTitleLine2")}
            </span>
            <br />
            {t("list.heroTitleLine3")}
          </h1>

          <p
            className={`mx-auto mb-10 max-w-130 text-[17px] leading-[1.7] text-(--text-on-primary-60) transition-all delay-200 duration-600 ease-out ${
              heroVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {t("list.heroDescription")}
          </p>

          <div
            className={`relative mx-auto max-w-130 transition-all delay-300 duration-600 ease-out ${
              heroVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <span className="pointer-events-none absolute top-1/2 left-4.5 -translate-y-1/2 select-none text-[18px]">
              🔍
            </span>
            <input
              type="text"
              placeholder={t("list.searchPlaceholder")}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-[14px] border-2 border-(--text-on-primary-25) bg-(--bg-primary-55) py-4 pr-5 pl-12.5 text-[15px] font-['Barlow',sans-serif] text-(--text-on-primary) outline-none backdrop-blur-[10px] transition-all duration-200 placeholder:text-(--text-on-primary-60) focus:border-(--primary-main)"
            />
          </div>
        </div>
      </section>

      <section className="bg-(--bg-primary) px-6 pt-17.5 pb-25">
        <div className="mx-auto max-w-300">
          {!searchQuery &&
            activeFilter === "all" &&
            featuredPosts.length > 0 && (
              <div className="mb-17.5">
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-(--border-light)" />
                  <h2 className="font-['Bebas_Neue',cursive] text-[28px] tracking-[0.06em] whitespace-nowrap text-(--text-primary)">
                    ⭐ {t("list.featuredSectionTitle")}
                  </h2>
                  <div className="h-px flex-1 bg-(--border-light)" />
                </div>
                <div className="flex flex-col gap-6">
                  {featuredPosts.map((post, index) => (
                    <FeaturedCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            )}

          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-['Bebas_Neue',cursive] text-[32px] tracking-[0.04em] text-(--text-primary)">
              {searchQuery
                ? t("list.searchResultTitle", { query: searchQuery })
                : t("list.allArticlesTitle")}
              <span className="ml-3 font-['Barlow',sans-serif] text-[18px] font-normal text-(--text-secondary)">
                ({filteredPosts.length})
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/project/fhi"
                className="rounded-full border-2 border-(--border-light) bg-(--secondary-main) px-4.5 py-2 text-[13px] font-bold tracking-[0.04em] text-white no-underline transition-colors duration-200 hover:border-(--secondary-light) hover:bg-(--secondary-light)"
              >
                + {t("list.writeArticle")}
              </Link>

              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`cursor-pointer rounded-full border-2 px-4.5 py-2 text-[13px] font-bold tracking-[0.04em] transition-all duration-200 ${
                    activeFilter === filter.value
                      ? "border-(--primary-main) bg-(--primary-main) text-white shadow-[0_2px_8px_rgba(192,16,32,0.35)]"
                      : "border-(--border-light) bg-(--bg-secondary) text-(--text-secondary) hover:border-(--primary-main) hover:text-(--primary-main)"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="px-5 py-24 text-center">
              <div className="mb-5 text-6xl">🔍</div>
              <h3 className="mb-3 font-['Bebas_Neue',cursive] text-[28px] text-(--text-primary)">
                {t("list.emptyTitle")}
              </h3>
              <p className="mb-6 text-(--text-secondary)">
                {t("list.emptyDescription")}
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="cursor-pointer rounded-lg border-none bg-(--primary-main) px-7 py-2.5 font-bold text-white shadow-[0_4px_14px_rgba(192,16,32,0.35)] transition-colors duration-200 hover:bg-(--primary-hover)"
              >
                {t("list.resetFilter")}
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#040a16] px-6 py-8 text-white/50">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-3">
          <Link
            href="/project/fhi"
            className="flex items-center gap-2 font-bold text-white/65 no-underline transition-colors duration-200 hover:text-white"
          >
            <span>🏑</span> FHI - {t("list.footerBrand")}
          </Link>
          <span className="text-[13px] text-white/30">
            {t("list.footerCopyright")}
          </span>
          <Link
            href="/project/fhi"
            className="text-[13px] font-semibold text-(--primary-main) no-underline transition-colors duration-200 hover:text-(--primary-hover)"
          >
            ← {t("list.backHome")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
