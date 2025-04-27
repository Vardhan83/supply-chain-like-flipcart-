export interface Product {
    productId: number;
    name: string;
    category: string;
    price: number;
    quantityInStock: number;
    reorderThreshold: number;
  }
  export interface InventoryStats {
    totalProducts: number;
    totalValue: number;
    lowStockItems: number;
    categoryDistribution: { [key: string]: number };
  }