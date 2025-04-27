// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-shipment-tracking',
//   standalone: true,
//   imports: [],
//   templateUrl: './shipment-tracking.component.html',
//   styleUrl: './shipment-tracking.component.scss'
// })
// export class ShipmentTrackingComponent {

// }
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ShipmentService } from '../../../core/services/shipment.service';
import { Shipment } from '../../../models/shipment';

@Component({
  selector: 'app-shipment-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: '././shipment-tracking.component.html',
  styleUrls: ['./shipment-tracking.component.scss']
})
export class ShipmentTrackerComponent implements OnInit {
  private shipmentService = inject(ShipmentService);

  shipments: Shipment[] = [];
  statuses: string[] = ['Pending', 'Shipped', 'Delivered'];

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments() {
    this.shipmentService.getAllShipments().subscribe(data => {
      this.shipments = data;
    });
  }

  updateStatus(shipment: Shipment) {
    this.shipmentService.updateShipmentStatus(shipment.shipmentId, shipment.status).subscribe(() => {
      this.loadShipments(); // Refresh after update
    });
  }
}
