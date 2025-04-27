import { OrderItem } from './orderitems';

export interface Order {
  orderId: number;
  customerName: string;
  orderDate: string;
  shippingAddress: string;
  status: string;
  totalPrice: number;
  orderItems: OrderItem[];
}