export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  image: number; // require() result
  category: ProductCategory;
  description: string;
  inStock: boolean;
}

export type ProductCategory = 'bicycle' | 'road' | 'mountain' | 'helmet';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BikeIndexBike {
  id: number;
  title: string;
  manufacturer_name: string;
  frame_model: string;
  frame_colors: string[];
  year: number | null;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_location: string | null;
  propulsion_type_slug: string;
  description: string;
  large_img: string | null;
  thumb: string | null;
  url: string;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  qualifiesForFreeShipping: boolean;
}
