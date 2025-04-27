import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../models/product';

@Component({
  selector: 'app-assign-products-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule,MatDialogModule],
  template: `
    <h2 mat-dialog-title>Assign Products to {{ data.supplier.name }}</h2>
    <mat-dialog-content>
      <form>
        <div *ngFor="let product of data.products">
          <label>
            <input
              type="checkbox"
              [(ngModel)]="selectedProducts[product.productId]"
              name="product-{{ product.productId }}"
            />
            {{ product.name }}
          </label>
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-button color="primary" (click)="assign()">Assign</button>
    </mat-dialog-actions>
  `
})
export class AssignProductsDialogComponent {
  selectedProducts: { [productId: number]: boolean } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { supplier: any; products: Product[] },
    private dialogRef: MatDialogRef<AssignProductsDialogComponent>
  ) {
    if (data.supplier.products) {
      for (const prod of data.supplier.products) {
        this.selectedProducts[prod.productId] = true;
      }
    }
  }

  assign() {
    const selectedIds = Object.keys(this.selectedProducts)
      .filter(key => this.selectedProducts[+key])
      .map(id => +id);
    this.dialogRef.close(selectedIds);
  }

  cancel() {
    this.dialogRef.close();
  }
}
