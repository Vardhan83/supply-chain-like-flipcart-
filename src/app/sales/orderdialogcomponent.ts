
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductService } from '../core/services/product.service';
import { Order } from '../models/order';
import { Product } from '../models/product';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Order Details (ID: {{ data.orderId }})</h2>
    <mat-dialog-content>
      <p><strong>Status:</strong> {{ data.status }}</p>
      <p><strong>Customer:</strong> {{ data.customerName }}</p>
      <p><strong>Shipping Address:</strong> {{ data.shippingAddress }}</p>
      <p><strong>Total Price:</strong> ₹{{ data.totalPrice }}</p>

      <h3>Items:</h3>
      <ul>
        <li *ngFor="let item of data.orderItems">
          <strong>Product:</strong> {{ getProductName(item.productId) }} × {{ item.quantity }} 
          = ₹{{ item.quantity * (item.price ?? 0) }}
        </li>
      </ul>
    </mat-dialog-content>
  `
})
export class OrderDetailDialogComponent implements OnInit {
  products: Product[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private productService: ProductService
  ) {}


  ngOnInit(): void {
    // Fetch products details based on productId in orderItems
    this.loadProducts();
  }

  loadProducts() {
    this.data.orderItems.forEach(item => {
      if (item.productId !== undefined && item.productId !== null) {
        this.productService.getProductById(item.productId).subscribe({
          next: (product) => {
            this.products.push(product);
          },
          error: (err) => {
            console.error('Failed to fetch product details for productId:', item.productId, err);
          }
        });
      } else {
        console.warn('Order item missing productId:', item);
      }
    });
  }
  

  getProductName(productId: number): string {
    const product = this.products.find(p => p.productId === productId);
    return product ? product.name : 'Unknown Product';
  }
}
