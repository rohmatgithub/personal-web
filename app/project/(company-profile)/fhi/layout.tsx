import type { Metadata } from "next";
import FhiProviders from "./_components/company-profile/FhiProviders";
import "./fhi.css";

export const metadata: Metadata = {
  title: "FHI - Company Profile",
  description:
    "Company profile Federasi Hockey Indonesia (FHI) dengan informasi organisasi, visi misi, prestasi, dan kontak.",
};

export default function FhiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FhiProviders>{children}</FhiProviders>;
}
