export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishDate: string;
  readTime: number;
  likes: number;
}