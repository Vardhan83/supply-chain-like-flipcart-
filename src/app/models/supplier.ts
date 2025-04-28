import { Product } from '../models/product';

export interface Supplier {
    supplierId: number;
    name: string;
    contactInfo: string;
    // products: { name: string; price: number }[];
    products: Product[];
  }
