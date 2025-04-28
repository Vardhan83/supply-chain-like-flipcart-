
// import { Component, Inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { Product } from '../models/product';
// import { Supplier } from '../models/supplier';

// @Component({
//   selector: 'app-assign-products-dialog',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatDialogModule, MatCheckboxModule],
//   template: `
//     <h2 mat-dialog-title>Assign Products to {{ data.supplier.name }}</h2>
//     <mat-dialog-content>
//       <div class="product-list">
//         @for (product of data.products; track product.productId) {
//           <div class="product-item">
//             <mat-checkbox 
//               [(ngModel)]="selectedProducts[product.productId]"
//               name="product-{{ product.productId }}"
//             >
//               {{ product.name }} ({{ product.category }})
//             </mat-checkbox>
//           </div>
//         }
//       </div>
//     </mat-dialog-content>

//     <mat-dialog-actions align="end">
//       <button mat-button (click)="cancel()">Cancel</button>
//       <button mat-raised-button color="primary" (click)="assign()">Assign Selected</button>
//     </mat-dialog-actions>
//   `,
//   styles: [`
//     .product-list {
//       display: flex;
//       flex-direction: column;
//       gap: 8px;
//     }
//     .product-item {
//       padding: 8px;
//       border-bottom: 1px solid #eee;
//     }
//   `]
// })
// export class AssignProductsDialogComponent {
//   selectedProducts: { [productId: number]: boolean } = {};

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: { 
//       supplier: Supplier; 
//       products: Product[];
//       currentlyAssigned: number[];
//     },
//     private dialogRef: MatDialogRef<AssignProductsDialogComponent>
//   ) {
//     // Initialize checkboxes based on currently assigned products
//     data.currentlyAssigned.forEach(id => {
//       this.selectedProducts[id] = true;
//     });
//   }

//   assign() {
//     const selectedIds = Object.keys(this.selectedProducts)
//       .filter(key => this.selectedProducts[+key])
//       .map(id => +id);
//     this.dialogRef.close(selectedIds);
//   }

//   cancel() {
//     this.dialogRef.close();
//   }
// }
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Product } from '../models/product';
import { Supplier } from '../models/supplier';
import { Component,Inject } from '@angular/core';

@Component({
  selector: 'app-assign-products-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatCheckboxModule],
  template: `
    <h2 mat-dialog-title>Assign Products to {{ data.supplier.name }}</h2>
    <mat-dialog-content>
      <div class="product-list">
        <div *ngFor="let product of data.products; trackBy: trackByProductId">
          <div class="product-item">
            <mat-checkbox 
              [(ngModel)]="selectedProducts[product.productId]"
              name="product-{{ product.productId }}"
            >
              {{ product.name }} ({{ product.category }})
            </mat-checkbox>
          </div>
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="assign()">Assign Selected</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .product-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .product-item {
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class AssignProductsDialogComponent {
  selectedProducts: { [productId: number]: boolean } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      supplier: Supplier; 
      products: Product[];
      currentlyAssigned: number[];
    },
    private dialogRef: MatDialogRef<AssignProductsDialogComponent>
  ) {
    // Initialize checkboxes based on currently assigned products
    data.currentlyAssigned.forEach(id => {
      this.selectedProducts[id] = true;
    });
  }

  assign() {
    const selectedIds = Object.keys(this.selectedProducts)
      .filter(key => this.selectedProducts[+key])
      .map(id => +id);
  
    console.log('Selected Product IDs:', selectedIds); // Log selected IDs for debugging
    
    // Now send the selected IDs directly as an array
    this.dialogRef.close(selectedIds);
  }
  

  cancel() {
    this.dialogRef.close();
  }

  trackByProductId(index: number, product: Product): number {
    return product.productId;
  }
}

