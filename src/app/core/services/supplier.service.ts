
import { Supplier } from '../../models/supplier';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private apiUrl = 'http://localhost:5050/api/suppliers';

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`);
  }

  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  // Add a new supplier
  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}`, supplier);
  }

  // Edit (update) supplier
  editSupplier(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, supplier);
  }

  // Delete a supplier
  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Assign products to a supplier
  assignProductsToSupplier(supplierId: number, productIds: number[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/${supplierId}/products`, productIds);
  }
  // Remove a product from a supplier
  removeProductFromSupplier(supplierId: number, productId: number): Observable<Supplier> {
    return this.http.delete<Supplier>(`${this.apiUrl}/${supplierId}/products/${productId}`);
  }
  //count of product that supplier providing
  getProductCountForSupplier(supplierId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${supplierId}/product-count`);
  }
  
}
