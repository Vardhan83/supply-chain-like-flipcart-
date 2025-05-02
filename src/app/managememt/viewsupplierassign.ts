
// import { Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MatListModule } from '@angular/material/list';
// import { Product } from '../models/product';

// @Component({
//   selector: 'app-view-products-dialog',
//   standalone: true,
//   imports: [CommonModule, MatDialogModule, MatListModule],
//   template: `
//     <h2 mat-dialog-title>Products supplied by {{ data.supplierName }}</h2>
//     <mat-dialog-content>
//       @if (data.products.length === 0) {
//         <p>No products assigned to this supplier</p>
//       } @else {
//         <mat-list>
//           @for (product of data.products; track product.productId) {
//             <mat-list-item>
//               <span matListItemTitle>{{ product.name }}</span>
//               <span matListItemLine>Category: {{ product.category }}</span>
//               <span matListItemLine>Price: {{ product.price | currency }}</span>
//             </mat-list-item>
//           }
//         </mat-list>
//       }
//     </mat-dialog-content>
//     <mat-dialog-actions align="end">
//       <button mat-button mat-dialog-close>Close</button>
//     </mat-dialog-actions>
//   `,
//   styles: [`
//     mat-list-item {
//       height: 100px;
//     }
//   `]
// })
// export class ViewProductsDialogComponent {
//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: { 
//       supplierName: string; 
//       products: Product[] 
//     }
//   ) {}
// }

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models/product';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-view-products-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>inventory</mat-icon>
      Products supplied by {{ data.supplierName }}
    </h2>
    <mat-dialog-content>
      <div class="supplier-info">
        <p><strong>Contact:</strong> {{ data.contactInfo || 'Not specified' }}</p>
      </div>
      
      <mat-divider></mat-divider>

      <h3 class="products-header">
        <mat-icon>list_alt</mat-icon>
        Product List ({{ data.products.length }})
      </h3>

      @if (data.products.length === 0) {
        <div class="no-products">
          <mat-icon>warning</mat-icon>
          <p>No products assigned to this supplier</p>
        </div>
      } @else {
        <mat-list class="product-list">
          <ng-container *ngFor="let product of data.products; trackBy: trackByProductId">
            <mat-list-item class="product-item">
                <div matListItemIcon>
                  <mat-icon>shopping_basket</mat-icon>
                </div>
                
                <div matListItemTitle>{{ product.name }}</div>
                <div matListItemLine>
                  <span class="product-category">{{ product.category }}</span>
                  <span class="product-price">{{ product.price | currency }}</span>
                </div>
                <!-- <div matListItemLine>
                  Stock: {{ product.quantityInStock }} 
                  @if (product.reorderThreshold && product.quantityInStock <= product.reorderThreshold) {
                    <span class="low-stock">(Low stock!)</span>
                  }
                </div> -->
              <button mat-icon-button color="warn" (click)="removeProductFromSupplier(product.productId)">
                <mat-icon>delete</mat-icon>
              </button>
                </mat-list-item>
          </ng-container>

          <!-- @for (product of data.products; track product.productId) { -->
            <!-- <mat-list-item class="product-item">
              <div matListItemIcon>
                <mat-icon>shopping_basket</mat-icon>
              </div>
              
              <div matListItemTitle>{{ product.name }}</div>
              <div matListItemLine>
                <span class="product-category">{{ product.category }}</span>
                <span class="product-price">{{ product.price | currency }}</span>
              </div>
              <div matListItemLine>
                Stock: {{ product.quantityInStock }} 
                @if (product.reorderThreshold && product.quantityInStock <= product.reorderThreshold) {
                  <span class="low-stock">(Low stock!)</span>
                }
              </div> -->
            <!-- </mat-list-item> -->
            <mat-divider></mat-divider>
          <!-- } -->
        </mat-list>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>
        <mat-icon>close</mat-icon> Close
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .supplier-info {
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    .products-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 16px 0;
    }
    .no-products {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px;
      color: #666;
    }
    .product-list {
      padding: 2px;
      display:flex;
      flex-direction:column;
      height:100%;
    }
    .product-item {
      flex-grow:1;
      max-width:200px;
      height: auto;
      width:auto;
      padding: 12px 12px;
    }
    .product-category {
      color: #666;
      margin-right: 16px;
    }
    .product-price {
      font-weight: bold;
      color: #2e7d32;
    }
    .low-stock {
      color: #d32f2f;
      font-weight: bold;
      margin-left: 8px;
    }
    mat-icon {
      color: #3f51b5;
    }
    mat-list-item {
      height: 100px !important; 
      width:auto;
    }
    
  `]
})
export class ViewProductsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      supplierName: string;
      contactInfo: string;
      supplierId: number;
      products: Product[];
    },
    private productService:ProductService
  ) {}

//newly added
  trackByProductId(index: number, product: Product): number {
    return product.productId;
  }
 
  removeProductFromSupplier(productId: number): void {
    if(confirm('Are you sure you want to delete this product?')){
      this.productService.removeSupplierToProduct(productId, this.data.supplierId).subscribe(
        () => {
          this.data.products = this.data.products.filter(p => p.productId !== productId);
        },
        (err) => {
          console.error('Failed to remove product:', err);
        }
      );
      }
  }
  
  
}