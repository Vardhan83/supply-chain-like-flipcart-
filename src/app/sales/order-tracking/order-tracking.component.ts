
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/order';
import { OrderDetailDialogComponent } from '../orderdialogcomponent';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShipmentService } from '../../core/services/shipment.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {
  private orderService = inject(OrderService);
  private shipmentService = inject(ShipmentService);
  private dialog = inject(MatDialog);
  private router = inject(Router); 

  orders: Order[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

  openOrderDetails(order: Order) {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '500px',
      data: order
    });
  }

  // createShipment(order: Order) {
  //   this.shipmentService.createShipmentFromOrder(order.orderId).subscribe({
  //     next: () => {
  //       alert('Shipment created successfully!');
  //       this.router.navigate(['/shipments']); 
  //     },
  //     error: () => {
  //       alert('Failed to create shipment.');
  //     }
  //   });
  // }
  createShipment(order: Order) {
    this.shipmentService.createShipmentFromOrder(order.orderId).subscribe({
      next: () => {
        // After shipment is created, update order status to 'Processing'
        const updatedOrder = { ...order, status: 'Processing' };
        this.orderService.updateOrderStatus(updatedOrder.orderId, updatedOrder.status).subscribe({
          next: () => {
            alert('Shipment created and Order status updated to Processing!');
            this.loadOrders(); // Refresh the orders list
            this.router.navigate(['/shipments']);
          },
          error: () => {
            alert('Shipment created, but failed to update order status.');
          }
        });
      },
      error: () => {
        alert('Failed to create shipment.');
      }
    });
  }
  
}
