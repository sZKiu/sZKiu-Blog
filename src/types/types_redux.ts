export interface Blog {
  id: string;
  author_id: string;
  author: string;
  title: string;
  body: string;
  category: string;
  image: string;
  time: number;
}

export interface User {
  id: string;
  username: string | null;
  image: string | null;
  password: string | null;
  email: string | null;
}