import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatDialogModule],
  template: `
    <h2 mat-dialog-title>Your Cart</h2>
    <mat-dialog-content>
      <div *ngIf="data.cartItems.length === 0">Cart is empty.</div>

      <ul *ngIf="data.cartItems.length > 0">
        <li *ngFor="let item of data.cartItems">
          {{ item.product.name }} × {{ item.quantity }} = ₹{{ item.product.price * item.quantity }}
        </li>
      </ul>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button color="warn" (click)="clearCart()">Clear Cart</button>
      <button mat-button color="primary" (click)="placeOrder()">Place Order</button>
    </mat-dialog-actions>
  `
})
export class CartDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cartItems: any[] },
    private dialogRef: MatDialogRef<CartDialogComponent>
  ) {}

  clearCart() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('product-cart');
    }
    this.dialogRef.close();
  }

  placeOrder() {
    // Redirect to order form page if needed
    window.location.href = '/sales/order'; // Adjust route as needed
    this.dialogRef.close();
  }
}
