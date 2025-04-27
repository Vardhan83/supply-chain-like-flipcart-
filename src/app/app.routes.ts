import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'warehouse',
        pathMatch: 'full'
      },
      {
        path: 'warehouse',
        loadComponent: () => import('./features/warehouse/inventory/inventory.component').then(m => m.InventoryComponent)
      },
      {
        path: 'shipments',
        loadComponent: () => import('./features/warehouse/shipment-tracking/shipment-tracking.component').then(m => m.ShipmentTrackerComponent)
      },
      {
        path: 'sales/products',
        loadComponent: () => import('./sales/product-search/product-search.component').then(m => m.ProductSearchComponent)
      },
      {
        path: 'sales/order',
        loadComponent: () => import('./sales/order-form/order-form.component').then(m => m.OrderFormComponent)
      },
      {
        path: 'sales/track',
        loadComponent: () => import('./sales/order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent)
      },
      {
        path: 'management/reports',
        loadComponent: () => import('./managememt/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'management/suppliers',
        loadComponent: () => import('./managememt/supplier-performance/supplier-performance.component').then(m => m.SupplierPerformanceComponent)
      }
];
