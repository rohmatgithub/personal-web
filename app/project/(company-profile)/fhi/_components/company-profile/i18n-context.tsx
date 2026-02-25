"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./locales/en.json";
import id from "./locales/id.json";

type Language = "id" | "en";

type TranslationDict = Record<string, unknown>;

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, TranslationDict> = { id, en };

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function getByPath(dict: TranslationDict, key: string): unknown {
  return key.split(".").reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[part];
  }, dict);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "id";
    const savedLanguage = window.localStorage.getItem("appLanguage");
    return savedLanguage === "en" ? "en" : "id";
  });

  useEffect(() => {
    window.localStorage.setItem("appLanguage", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string) => {
      const translated = getByPath(translations[language], key);
      return typeof translated === "string" ? translated : key;
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(namespace?: string) {
  void namespace;
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }

  return {
    t: context.t,
    i18n: {
      language: context.language,
      changeLanguage: async (language: Language) => {
        context.setLanguage(language);
      },
    },
  };
}
