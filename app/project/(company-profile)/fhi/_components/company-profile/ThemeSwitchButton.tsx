"use client";

import { useTheme } from "./theme-context";

export default function ThemeSwitchButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed right-5 bottom-5 z-120 inline-flex items-center gap-2 rounded-full border border-(--border-main) bg-(--bg-secondary) px-4 py-2 text-sm font-semibold text-(--text-primary) shadow-(--shadow-md) transition-all duration-200 hover:-translate-y-0.5 hover:shadow-(--shadow-lg)"
    >
      <span className="text-base" aria-hidden="true">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
