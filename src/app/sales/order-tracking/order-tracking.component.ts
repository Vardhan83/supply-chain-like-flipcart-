
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/order';
import { OrderDetailDialogComponent } from '../orderdialogcomponent'; // we'll define it next
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatFormFieldModule
  ],
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {
  private orderService = inject(OrderService);
  private dialog = inject(MatDialog);

  orders: Order[] = [];
  searchTerm:string='';
  selectedSatus:string='';
  fileredorders:any[]=[];

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
}
