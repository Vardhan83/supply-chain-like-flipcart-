// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-order-form',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './order-form.component.html',
// //   styleUrl: './order-form.component.scss'
// // })
// // export class OrderFormComponent {

// // }
// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// import { ProductService } from '../../core/services/product.service';
// import { OrderService } from '../../core/services/order.service';
// import { Product } from '../../models/product';
// import { OrderItem } from '../../models/orderitems';
// import { Order } from '../../models/order';

// @Component({
//   selector: 'app-order-form',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//     MatIconModule,
//     MatCardModule,
//     MatSnackBarModule
//   ],
//   templateUrl: './order-form.component.html',
//   styleUrls: ['./order-form.component.scss']
// })
// export class OrderFormComponent implements OnInit {
//   private productService = inject(ProductService);
//   private orderService = inject(OrderService);
//   private snackBar = inject(MatSnackBar);

//   allProducts: Product[] = [];
//   cartProductIds: number[] = [];
//   cartProducts: Product[] = [];
//   orderItems: OrderItem[] = [];

//   customerName = '';
//   shippingAddress = '';
//   orderDate = new Date().toISOString().split('T')[0];

//   ngOnInit() {
//     this.loadCart();
//     this.loadProducts();
//   }

//   loadCart() {
//     const stored = localStorage.getItem('product-cart');
//     this.cartProductIds = stored ? JSON.parse(stored) : [];
//   }

//   loadProducts() {
//     this.productService.getAllProducts().subscribe(products => {
//       this.allProducts = products;
//       this.cartProducts = products.filter(p => this.cartProductIds.includes(p.productId));
//       this.orderItems = this.cartProducts.map(p => ({
//         productId: p.productId,
//         quantity: 1,
//         price: p.price
//       }));
//     });
//   }

//   calculateTotalPrice(): number {
//     return this.orderItems.reduce((sum, item) => {
//       const price = this.cartProducts.find(p => p.productId === item.productId)?.price ?? 0;
//       return sum + (price * item.quantity);
//     }, 0);
//   }

//   placeOrder() {
//     if (!this.customerName || !this.shippingAddress || this.orderItems.length === 0) {
//       this.snackBar.open('Please fill all fields and add at least one product.', 'Close', { duration: 3000 });
//       return;
//     }

//     const order: Partial<Order> = {
//       customerName: this.customerName,
//       shippingAddress: this.shippingAddress,
//       orderDate: this.orderDate,
//       status: 'PLACED',
//       totalPrice: this.calculateTotalPrice(),
//       orderItems: this.orderItems
//     };

//     this.orderService.placeOrder(order).subscribe({
//       next: () => {
//         this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
//         localStorage.removeItem('product-cart');
//         this.customerName = '';
//         this.shippingAddress = '';
//         this.orderItems = [];
//         this.cartProducts = [];
//       },
//       error: () => {
//         this.snackBar.open('Failed to place order.', 'Close', { duration: 3000 });
//       }
//     });
//   }
// }
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { OrderRequest } from '../../models/order-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  products = signal<Product[]>([]);
  orderItems = signal<{ productId: number; quantity: number; price: number }[]>([]);
  customerName = '';
  shippingAddress = '';
  orderDate = new Date().toISOString().split('T')[0];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.loadProductsAndCart();
  }

  loadProductsAndCart() {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('product-cart');
      if (storedCart) {
        const cartArray: [number, number][] = JSON.parse(storedCart);
        const productIds = cartArray.map(([productId]) => productId);

        this.productService.getAllProducts().subscribe(allProducts => {
          this.products.set(allProducts);
          const items = cartArray.map(([productId, quantity]) => {
            const product = allProducts.find(p => p.productId === productId);
            return {
              productId: productId,
              quantity: quantity,
              price: product?.price ?? 0
            };
          });
          this.orderItems.set(items);
        });
      }
    }
  }
  getProductName(productId: number): string {
    return this.products().find(p => p.productId === productId)?.name || 'Unknown Product';
  }
  

  getTotalAmount(): number {
    return this.orderItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  placeOrder() {
    if (!this.customerName || !this.shippingAddress || this.orderItems().length === 0) {
      this.snackBar.open('Please fill all fields and have at least one product.', 'Close', { duration: 3000 });
      return;
    }

    const orderRequest: OrderRequest = {
      customerName: this.customerName,
      shippingAddress: this.shippingAddress,
      orderDate: new Date(),
      status: 'PLACED',
      totalPrice: this.getTotalAmount(),
      orderItems: this.orderItems().map(item => ({
        product: { productId: item.productId },
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: () => {
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['sales/products']);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('product-cart');
        }
        this.resetForm();
      },
      error: () => {
        this.snackBar.open('Failed to place order.', 'Close', { duration: 3000 });
      }
    });
  }

  resetForm() {
    this.customerName = '';
    this.shippingAddress = '';
    this.orderItems.set([]);
  }
  close(){
    this.router.navigate(['sales/products']);
  }
}
