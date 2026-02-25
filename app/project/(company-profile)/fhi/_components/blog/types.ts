export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml?: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  categoryName: string;
  categoryColor: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogCategory {
  slug: string;
  name: string;
  color: string;
}
