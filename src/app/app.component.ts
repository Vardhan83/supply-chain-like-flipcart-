// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'chatgptproject';
// }
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Supply Chain System</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/warehouse">Inventory</a>
      <a mat-button routerLink="/shipments">Shipments</a>
      <a mat-button routerLink="/sales/products">Sales</a>
      <!-- <a mat-button routerLink="/sales/order">Order</a> -->
      <a mat-button routerLink="/sales/track">Track</a>
      <a mat-button routerLink="/management/reports">Reports</a>
      <a mat-button routerLink="/management/suppliers">Suppliers</a>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    a { text-decoration: none; color: white; margin-right: 1rem; }
  `]
})
export class AppComponent {}
