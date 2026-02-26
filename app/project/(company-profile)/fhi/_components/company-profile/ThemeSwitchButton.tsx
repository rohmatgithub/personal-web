"use client";

import { useTheme } from "./theme-context";

export default function ThemeSwitchButton() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme mode"
      className="fixed right-5 bottom-5 z-120 inline-flex items-center gap-2 rounded-full border border-(--border-main) bg-(--bg-secondary) px-4 py-2 text-sm font-semibold text-(--text-primary) shadow-(--shadow-md) transition-all duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-lg)"
    >
      <span className="text-base" aria-hidden="true">
        🌓
      </span>
      <span>Theme</span>
    </button>
  );
}
