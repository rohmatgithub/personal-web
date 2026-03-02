import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposal FHI | Rohmatullah",
  description: "Proposal penawaran website Federasi Hockey Indonesia.",
};

export default function ProposalFhiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
