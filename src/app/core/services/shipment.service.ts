// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ShipmentService {

//   constructor() { }
// }
import { Shipment } from '../../models/shipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private apiUrl = 'http://localhost:6060/api/shipments';

  constructor(private http: HttpClient) {}

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`${this.apiUrl}`);
  }

  updateShipmentStatus(id: number, status: string): Observable<Shipment> {
    return this.http.put<Shipment>(`${this.apiUrl}/${id}/status`, status, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  // 🔵 Create shipment manually from order ID (✅ newly added API)
  createShipmentFromOrder(orderId: number): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.apiUrl}/create-from-order/${orderId}`, {});
  }
}
