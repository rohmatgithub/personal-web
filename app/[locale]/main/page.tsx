import { redirect } from "next/navigation";

type LocalizedMainPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedMainPage({ params }: LocalizedMainPageProps) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
