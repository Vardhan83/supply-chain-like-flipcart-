// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product,InventoryStats } from '../../models/product';
import { InventorySummary } from '../../models/inventorysummary';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:5050/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  searchProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/name?name=${name}`);
  }

  getLowStockProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/low-stock`);
  }

  updateProductStock(productId: number, quantity: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}/stock?quantity=${quantity}`, {});
  }

  getInventorySummary(): Observable<InventorySummary> {
    return this.http.get<InventorySummary>(`${this.apiUrl}/inventory-summary`);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }
  editProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
  }
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
  getInventoryStats(): Observable<InventoryStats> {
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      map((products: Product[]) => {
        const categoryDistribution: { [key: string]: number } = {};
        let totalProducts = 0;
        let totalValue = 0;
        let lowStockItems = 0;
  
        products.forEach(product => {
          // Count per category
          categoryDistribution[product.category] = (categoryDistribution[product.category] || 0) + 1;
  
          // Total products
          totalProducts += 1;
  
          // Total inventory value = quantity * price
          totalValue += product.quantityInStock * product.price;
  
          // Low stock items (assuming threshold property exists)
          if (product.quantityInStock <= product.reorderThreshold) {
            lowStockItems += 1;
          }
        });
  
        return {
          categoryDistribution,
          totalProducts,
          totalValue,
          lowStockItems
        };
      })
    );
  }
  assignSupplierToProduct(productId: number, supplierId: number) {
    return this.http.put(`${this.apiUrl}/${productId}/supplier/${supplierId}`, {});
  }
  removeSupplierToProduct(productId: number, supplierId: number): Observable<Product> {
      return this.http.delete<Product>(`${this.apiUrl}/${productId}/supplier/${supplierId}`);
    }
  

}