// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reports',
//   standalone: true,
//   imports: [],
//   templateUrl: './reports.component.html',
//   styleUrl: './reports.component.scss'
// })
// export class ReportsComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../core/services/order.service';
import { ProductService } from '../../core/services/product.service';
import { InventorySummary } from '../../models/inventorysummary';
import { Order } from '../../models/order';
import { signal } from '@angular/core';
import { Product,InventoryStats } from '../../models/product';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,MatCardModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  stats = signal<InventoryStats | null>(null);
  totalSales = 0;
  // inventorySummary: InventorySummary = {
  //   totalProducts: 0,
  //   lowStockProducts: 0,
  //   outOfStockProducts: 0,
  //   totalProductValue:0
  // };
 
  totalProducts = 0;
  lowStockProducts = 0;
  outOfStockProducts = 0;
  totalValue=0;
  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.totalSales = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    });

    // Fetch all products
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.totalProducts = products.length;
      this.outOfStockProducts = products.filter(p => p.quantityInStock === 0).length;
      this.totalValue = products.reduce((sum, p) => sum + (p.price * p.quantityInStock), 0);
      
    });

    // Fetch low stock products
    this.productService.getLowStockProducts().subscribe((lowStockProducts: Product[]) => {
      this.lowStockProducts = lowStockProducts.length;
    });
  
  }
  
  
}
