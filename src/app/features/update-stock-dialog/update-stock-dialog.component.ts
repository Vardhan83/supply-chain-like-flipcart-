// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-update-stock-dialog',
//   standalone: true,
//   imports: [],
//   templateUrl: './update-stock-dialog.component.html',
//   styleUrl: './update-stock-dialog.component.scss'
// })
// export class UpdateStockDialogComponent {

// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-stock-dialog',
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
    <h2 mat-dialog-title>Update Stock - {{ data.product.name }}</h2>
    <mat-dialog-content>
      <p>Current Stock: {{ data.product.quantityInStock }}</p>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>New Quantity</mat-label>
        <input matInput type="number" [(ngModel)]="quantity" />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="confirm()">Update</button>
    </mat-dialog-actions>
  `
})
export class UpdateStockDialogComponent {
  quantity: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: any },
    private dialogRef: MatDialogRef<UpdateStockDialogComponent>
  ) {}

  confirm() {
    this.dialogRef.close(this.quantity);
  }

  cancel() {
    this.dialogRef.close();
  }
}
