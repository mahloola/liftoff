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

export interface BikeSpec {
  frameType: string;
  frameMaterial: string;
  drivetrainType: string;
  wheelSize: string;
  year: number;
  componentGroup: string;
  verifiedStatus: boolean;
  source: 'bikeindex';
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  qualifiesForFreeShipping: boolean;
}
