export interface OrderItem {
    orderItemId?: number;
    productId: number;
    quantity: number;
    price?: number; // single product price
  }