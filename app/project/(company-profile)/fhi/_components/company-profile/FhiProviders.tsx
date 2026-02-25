"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "./i18n-context";
import { ThemeProvider } from "./theme-context";

export default function FhiProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="company-theme">{children}</div>
      </I18nProvider>
    </ThemeProvider>
  );
}
