export type Category = {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type Todo = {
  id: number;
  content: string;
  category_id: number;
  created_at?: string;
  updated_at?: string;
};
