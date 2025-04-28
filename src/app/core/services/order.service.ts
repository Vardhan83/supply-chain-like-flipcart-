// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor() { }
// }
import { Order } from '../../models/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequest } from '../../models/order-request';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5050/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(order: OrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}`, order);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
  updateOrderStatus(orderId: number, status: string) {
    return this.http.put(`${this.apiUrl}/${orderId}/status`, { status });
  }
  
  
}
