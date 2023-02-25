export interface ErrorPostBlog {
  status: number;
  data: { detail: string },
  error?: string;
}