import BlogDetailPage from "../../_components/blog/BlogDetailPage";

type BlogDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function FhiBlogDetailPage({ params }: BlogDetailRouteProps) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
