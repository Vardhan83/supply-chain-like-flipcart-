import { Routes } from '@angular/router';
import { LoginComponent } from './loginSignup/login/login.component';
import { SignupComponent } from './loginSignup/Signup/sign-up.component';
import { authGuard } from './Guards/auth-gard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { UserManagementComponent } from './loginSignup/user-management/user-management.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'warehouse',
    canActivate: [authGuard],
    loadComponent: () => import('./features/warehouse/inventory/inventory.component').then(m => m.InventoryComponent)
  },
  {
    path: 'shipments',
    canActivate: [authGuard],
    loadComponent: () => import('./features/warehouse/shipment-tracking/shipment-tracking.component').then(m => m.ShipmentTrackerComponent)
  },
  {
    path: 'sales/products',
    canActivate: [authGuard],
    loadComponent: () => import('./sales/product-search/product-search.component').then(m => m.ProductSearchComponent)
  },
  {
    path: 'sales/order',
    canActivate: [authGuard],
    loadComponent: () => import('./sales/order-form/order-form.component').then(m => m.OrderFormComponent)
  },
  {
    path: 'sales/track',
    canActivate: [authGuard],
    loadComponent: () => import('./sales/order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent)
  },
  {
    path: 'management/reports',
    canActivate: [authGuard],
    loadComponent: () => import('./managememt/reports/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: 'management/suppliers',
    canActivate: [authGuard],
    loadComponent: () => import('./managememt/supplier-performance/supplier-performance.component').then(m => m.SupplierPerformanceComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  }
  ,
  // {
  //   path:"**",
  //   component:UnauthorizedComponent
  // },
  {
    path: 'admin-panel',
    component: UserManagementComponent
  }
  
  
];
// import { Routes } from '@angular/router';
// import { LoginComponent } from './loginSignup/login/login.component';
// import { SignupComponent } from './loginSignup/Signup/sign-up.component';
// import { authGuard } from './Guards/auth-gard.guard';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
// import { roleGuard } from './Guards/role-guard.guard';


// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//   {
//     path: 'signup',
//     component: SignupComponent
//   },
//   {
//     path: 'warehouse',
//     canActivate: [authGuard,roleGuard],
//     data:{role:['WAREHOUSE']},
//     loadComponent: () => import('./features/warehouse/inventory/inventory.component').then(m => m.InventoryComponent)
//   },
//   {
//     path: 'shipments',
//     canActivate: [authGuard,roleGuard],
//     data:{role:['WAREHUSE']},
//     loadComponent: () => import('./features/warehouse/shipment-tracking/shipment-tracking.component').then(m => m.ShipmentTrackerComponent)
//   },
//   {
//     path: 'sales/products',
//     canActivate: [authGuard,roleGuard],
//     data:{role:['SALES','USERS']},
//     loadComponent: () => import('./sales/product-search/product-search.component').then(m => m.ProductSearchComponent)
//   },
//   {
//     path: 'sales/order',
//     canActivate: [authGuard,roleGuard],
//     data:{
//       role:['SALES','USERS']
//     },
//     loadComponent: () => import('./sales/order-form/order-form.component').then(m => m.OrderFormComponent)
//   },
//   {
//     path: 'sales/track',
//     canActivate: [authGuard,roleGuard],
//     data:{role:['SALES']},
//     loadComponent: () => import('./sales/order-tracking/order-tracking.component').then(m => m.OrderTrackingComponent)
//   },
//   {
//     path: 'management/reports',
//     canActivate: [authGuard,roleGuard],
//     data:{role:['ADMIN']},
//     loadComponent: () => import('./managememt/reports/reports.component').then(m => m.ReportsComponent)
//   },
//   {
//     path: 'management/suppliers',
//     canActivate: [authGuard,roleGuard],
//     data:{role:['ADMIN']},
//     loadComponent: () => import('./managememt/supplier-performance/supplier-performance.component').then(m => m.SupplierPerformanceComponent)
//   },
//   {
//     path: 'unauthorized',
//     loadComponent: () => import('./unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
//   }
//   ,
//   {
//     path:"**",
//     component:UnauthorizedComponent
//   }
  
// ];
