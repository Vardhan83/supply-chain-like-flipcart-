import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'edit' ? 'Edit Product' : 'Add New Product' }}</h2>
    <mat-dialog-content>
      <form>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Product Name</mat-label>
          <input matInput [(ngModel)]="product.name" name="name" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Category</mat-label>
          <input matInput [(ngModel)]="product.category" name="category" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Price</mat-label>
          <input matInput type="number" [(ngModel)]="product.price" name="price" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Quantity in Stock</mat-label>
          <input matInput type="number" [(ngModel)]="product.quantityInStock" name="quantityInStock" required />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Reorder Threshold</mat-label>
          <input matInput type="number" [(ngModel)]="product.reorderThreshold" name="reorderThreshold" required />
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="save()">Save</button>
      <button mat-button (click)="cancel()">Cancel</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 1rem; }
  `]
})
export class ProductFormDialogComponent {
  product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; product: Product },
    private dialogRef: MatDialogRef<ProductFormDialogComponent>
  ) {
    this.product = { ...data.product };
  }

  save() {
    this.dialogRef.close(this.product);
  }

  cancel() {
    this.dialogRef.close();
  }
}
