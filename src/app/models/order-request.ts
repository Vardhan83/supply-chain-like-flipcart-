export interface OrderRequest {
    status: string; // Always 'PLACED'
    customerName:string;
    shippingAddress:string;
    orderDate:Date;
    totalPrice:number;
    orderItems: Array<{
      quantity: number;
      product: {
        productId: number;
      };
    }>;
  }
  