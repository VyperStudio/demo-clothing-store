export type Category = "Mujer" | "Hombre" | "Accesorios";

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: Category;
  image_url?: string | null;
  available: boolean;
  featured: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
}