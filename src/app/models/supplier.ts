export interface Supplier {
    supplierId: number;
    name: string;
    contactInfo: string;
    products: { name: string; price: number }[];
  }
//   export interface Product {
//     productId: number;
//     name: string;
//     category: string;
//     price: number;
//     quantityInStock: number;
//     reorderThreshold: number;
//   }