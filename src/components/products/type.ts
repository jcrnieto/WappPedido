export interface CreateProductInput {
  id?: string; // opcional para la creación
  name: string;
  description?: string;
  price: number;
  images_url?: string[]; // arreglo de URLs
  category_id?: string | null;
  user_id?: string; // ID del usuario que crea el producto
}

export interface ProductResponse extends CreateProductInput {
  id: string;
  created_at: string;
}
