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
    name: 'PEUGOT - LR01',
    brand: 'PEUGOT',
    model: 'LR01',
    price: 1999.99,
    image: require('@/assets/png/PEUGOT - LR01.png'),
    category: 'road',
    description:
      "The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles' 130-year history and combines it with agile, dynamic performance that's perfectly suited to navigating today's cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.",
    inStock: true,
  },
  {
    id: 'smith-trade',
    name: 'SMITH - Trade',
    brand: 'SMITH',
    model: 'Trade',
    price: 120,
    image: require('@/assets/png/SMITH - Trade.png'),
    category: 'helmet',
    description: 'Versatile trail bike built for technical terrain and all-day comfort.',
    inStock: true,
  },
  {
    id: 'smith-trade-2',
    name: 'SMITH - Trade',
    brand: 'SMITH',
    model: 'Trade',
    price: 120,
    image: require('@/assets/png/SMITH - Trade.png'),
    category: 'helmet',
    description: 'Versatile trail bike built for technical terrain and all-day comfort.',
    inStock: true,
  },
  {
    id: 'pilot-chromoly',
    name: 'PILOT - CHROMOLY 520',
    brand: 'PILOT',
    model: 'CHROMOLY 520',
    price: 3999.99,
    image: require('@/assets/png/PILOT - CHROMOLY 520.png'),
    category: 'road',
    description: 'Classic chromoly steel frame with a buttery smooth ride quality.',
    inStock: false,
  },
];

export const FEATURED_PRODUCT = PRODUCTS[0];
export const BEST_SELLERS = PRODUCTS.slice(1, 3);
