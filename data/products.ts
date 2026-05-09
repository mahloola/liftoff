import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'electric-01',
    name: 'Electric Bicycle Pro',
    brand: 'LiftOff',
    model: 'Electric Pro',
    price: 1749,
    originalPrice: 2499,
    discountPercent: 30,
    image: require('@/assets/png/Electric Bicycle.png'),
    category: 'bicycle',
    description: 'High-performance electric bicycle with 80km range and regenerative braking.',
    inStock: true,
  },
  {
    id: 'peugot-lr01',
    name: 'PEUGOT LR01',
    brand: 'PEUGOT',
    model: 'LR01',
    price: 899,
    image: require('@/assets/png/PEUGOT - LR01.png'),
    category: 'road',
    description: 'Lightweight road bike with carbon-aluminium frame and Shimano 105 groupset.',
    inStock: true,
  },
  {
    id: 'smith-trade',
    name: 'SMITH Trade',
    brand: 'SMITH',
    model: 'Trade',
    price: 649,
    image: require('@/assets/png/SMITH - Trade.png'),
    category: 'mountain',
    description: 'Versatile trail bike built for technical terrain and all-day comfort.',
    inStock: true,
  },
  {
    id: 'pilot-chromoly',
    name: 'PILOT CHROMOLY 520',
    brand: 'PILOT',
    model: 'CHROMOLY 520',
    price: 749,
    image: require('@/assets/png/PILOT - CHROMOLY 520.png'),
    category: 'road',
    description: 'Classic chromoly steel frame with a buttery smooth ride quality.',
    inStock: false,
  },
];

export const FEATURED_PRODUCT = PRODUCTS[0];
export const BEST_SELLERS = PRODUCTS.slice(1, 3);
