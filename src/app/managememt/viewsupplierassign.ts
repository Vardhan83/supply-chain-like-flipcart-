import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Supplier } from '../models/supplier';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-view-products-dialog',
    standalone: true,
    imports:[MatDialogModule, MatDialogTitle,CommonModule],
    template: `
      <h2 mat-dialog-title>Products for Supplier: {{ data.supplier.name }}</h2>
      <mat-dialog-content>
        <ul *ngIf="data.supplier.products && data.supplier.products.length > 0; else noProducts">
          <li *ngFor="let product of data.supplier.products">
            {{ product.name }}
          </li>
        </ul>
        <ng-template #noProducts>
          <p>No products assigned to this supplier.</p>
        </ng-template>
      </mat-dialog-content>
    `
  })
  export class ViewProductsDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { supplier: Supplier }) {}
  }
  