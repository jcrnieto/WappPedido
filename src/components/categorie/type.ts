export interface CreateCategoryInput {
  name: string;
  image_url?: string | null;
  user_id: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  image_url: string | null;
  user_id: string;
  created_at: string;
}

export interface UpdateCategoryInput {
  id: string;
  name?: string;
  image_url?: string;
}
