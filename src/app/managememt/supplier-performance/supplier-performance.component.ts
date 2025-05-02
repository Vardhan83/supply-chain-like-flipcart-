
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatCardModule } from '@angular/material/card';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatChipsModule } from '@angular/material/chips';
// import { SupplierService } from '../../core/services/supplier.service';
// import { ProductService } from '../../core/services/product.service';
// import { Supplier } from '../../models/supplier';
// import { Product } from '../../models/product';
// import { SupplierFormDialogComponent } from '../addoreditsuppliersdialog';
// import { AssignProductsDialogComponent } from '../assingnewsupplierdialog';
// import { ViewProductsDialogComponent } from '../viewsupplierassign';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// @Component({
//   selector: 'app-supplier-performance',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule,
//     MatDialogModule,
//     MatCardModule,
//     MatTooltipModule,
//     MatChipsModule,
//     MatProgressSpinnerModule,

//   ],
//   templateUrl: './supplier-performance.component.html',
//   styleUrls: ['./supplier-performance.component.scss']
// })
// export class SupplierPerformanceComponent implements OnInit {
//   private supplierService = inject(SupplierService);
//   private productService = inject(ProductService);
//   private dialog = inject(MatDialog);
//   productCount:number=0;

//   suppliers = signal<Supplier[]>([]);
//   products = signal<Product[]>([]);
//   isLoading = signal(true);

//   displayedColumns = ['supplierId', 'name', 'contactInfo', 'products', 'actions'];

//   ngOnInit(): void {
//     this.loadSuppliers();
//     this.loadProducts();
//   }

//   loadSuppliers() {
//     this.isLoading.set(true);
//     this.supplierService.getAllSuppliers().subscribe({
//       next: (data) => {
//         this.suppliers.set(data);
//         this.isLoading.set(false);
//       },
//       error: (err) => {
//         console.error('Error loading suppliers:', err);
//         this.isLoading.set(false);
//       }
//     });
//   }

//   loadProducts() {
//     this.productService.getAllProducts().subscribe(data => {
//       this.products.set(data);
//     });
//   }

//   openAddSupplierDialog() {
//     const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
//       width: '400px',
//       data: { mode: 'add', supplier: {} }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.supplierService.addSupplier(result).subscribe(() => {
//           this.loadSuppliers();
//         });
//       }
//     });
//   }

//   openEditSupplierDialog(supplier: Supplier) {
//     const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
//       width: '400px',
//       data: { mode: 'edit', supplier }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.supplierService.editSupplier(supplier.supplierId, result).subscribe(() => {
//           this.loadSuppliers();
//         });
//       }
//     });
//   }

//   openAssignProductsDialog(supplier: Supplier) {
//     const dialogRef = this.dialog.open(AssignProductsDialogComponent, {
//       width: '600px',
//       data: { 
//         supplier, 
//         products: this.products(),
//         currentlyAssigned: supplier.products?.map(p => p.productId) || []
//       }
//     });
  
//     dialogRef.afterClosed().subscribe(selectedProductIds => {
//       if (selectedProductIds) {
//         this.isLoading.set(true);
//         this.supplierService.assignProductsToSupplier(supplier.supplierId, selectedProductIds)
//           .subscribe({
//             next: (updatedSupplier) => {
//               // Update the products list in the supplier
//               updatedSupplier.productCount = selectedProductIds.length; // Add the count
//               this.suppliers.update(suppliers => 
//                 suppliers.map(s => 
//                   s.supplierId === supplier.supplierId ? updatedSupplier : s
//                 )
//               );
//               this.isLoading.set(false);
//               alert('Successfully to assign products. Please add any product if required again.');
//             },
//             error: (err) => {
//               console.error('Error assigning products:', err);
//               this.isLoading.set(false);
//               alert('Failed to assign products. Please try again.');
//             }
//           });
//       }
//     });
//   }
  

//   openViewProductsDialog(supplier: Supplier) {
//     // Get fresh data to ensure we have latest product details
//     this.supplierService.getSupplierById(supplier.supplierId).subscribe({
//       next: (freshSupplier) => {
//         this.dialog.open(ViewProductsDialogComponent, {
//           width: '600px',
//           data: { 
//             supplierName: freshSupplier.name,
//             products: freshSupplier.products || [],
//             contactInfo: freshSupplier.contactInfo
//           }
//         });
//       },
//       error: () => {
//         // Fallback to local data if fresh fetch fails
//         this.dialog.open(ViewProductsDialogComponent, {
//           width: '600px',
//           data: { 
//             supplierName: supplier.name,
//             products: supplier.products || [],
//             contactInfo: supplier.contactInfo
//           }
//         });
//       }
//     });
//   }

 
//   deleteSupplier(supplier: Supplier) {
//     if (confirm(`Are you sure you want to delete ${supplier.name}?`)) {
//       this.supplierService.deleteSupplier(supplier.supplierId).subscribe(() => {
//         this.loadSuppliers();
//       });
//     }
//   }

//   getProductCount(products: Product[] | undefined): number {
//     return products?.length || 0;
//   }
// }

import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SupplierService } from '../../core/services/supplier.service';
import { ProductService } from '../../core/services/product.service';
import { Supplier } from '../../models/supplier';
import { Product } from '../../models/product';
import { SupplierFormDialogComponent } from '../addoreditsuppliersdialog';
import { AssignProductsDialogComponent } from '../assingnewsupplierdialog';
import { ViewProductsDialogComponent } from '../viewsupplierassign';

@Component({
  selector: 'app-supplier-performance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './supplier-performance.component.html',
  styleUrls: ['./supplier-performance.component.scss']
})
export class SupplierPerformanceComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  suppliers = signal<Supplier[]>([]);
  products = signal<Product[]>([]);
  isLoading = signal(true);

  displayedColumns = ['supplierId', 'name', 'contactInfo', 'products', 'actions'];

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
  }

  loadSuppliers() {
    this.isLoading.set(true);
    this.supplierService.getAllSuppliers().subscribe({
      next: (data) => {
        // For each supplier, fetch product count & attach
        const suppliersWithCount$ = data.map(supplier =>
          this.supplierService.getSupplierProducts(supplier.supplierId).toPromise().then((res: any) => ({
            ...supplier,
            products: res.products,
            productCount: res.productCount
          }))
        );
  
        Promise.all(suppliersWithCount$).then(suppliers => {
          this.suppliers.set(suppliers);
          this.isLoading.set(false);
        });
      },
      error: (err) => {
        console.error('Error loading suppliers:', err);
        this.isLoading.set(false);
      }
    });
  }
  

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  openAddSupplierDialog() {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '400px',
      data: { mode: 'add', supplier: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.addSupplier(result).subscribe(() => {
          this.loadSuppliers();
        });
      }
    });
  }

  openEditSupplierDialog(supplier: Supplier) {
    const dialogRef = this.dialog.open(SupplierFormDialogComponent, {
      width: '400px',
      data: { mode: 'edit', supplier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supplierService.editSupplier(supplier.supplierId, result).subscribe(() => {
          this.loadSuppliers();
        });
      }
    });
  }

  openAssignProductsDialog(supplier: Supplier) {
    const dialogRef = this.dialog.open(AssignProductsDialogComponent, {
      width: '600px',
      data: {
        supplier,
        products: this.products(),
        currentlyAssigned: supplier.products?.map(p => p.productId) || []
      }
    });

    dialogRef.afterClosed().subscribe(selectedProductIds => {
      if (selectedProductIds && selectedProductIds.length > 0) {
        this.isLoading.set(true);
        this.supplierService.assignProductsToSupplier(supplier.supplierId, selectedProductIds)
          .subscribe({
            next: () => {
              this.loadSuppliers(); // reload to get updated product count
              this.isLoading.set(false);
              alert('Products assigned successfully.');
            },
            error: (err) => {
              console.error('Error assigning products:', err);
              this.isLoading.set(false);
              alert('Failed to assign products. Please try again.');
            }
          });
      }
    });
  }
  
  

  openViewProductsDialog(supplier: Supplier) {
    this.supplierService.getSupplierProducts(supplier.supplierId).subscribe({
      next: (res: any) => {
        this.dialog.open(ViewProductsDialogComponent, {
          width: '600px',
          data: {
            supplierName: supplier.name,
            contactInfo: supplier.contactInfo,
            products: res.products,
            supplierId: supplier.supplierId,
            productCount: res.productCount
          }
        });
      },
      error: () => {
        this.dialog.open(ViewProductsDialogComponent, {
          width: '600px',
          data: {
            supplierName: supplier.name,
            contactInfo: supplier.contactInfo,
            supplierId: supplier.supplierId,
            products: supplier.products || [],
            productCount: supplier.products?.length || 0
          }
        });
      }
    });
  }
  

  deleteSupplier(supplier: Supplier) {
    if (confirm(`Are you sure you want to delete ${supplier.name}?`)) {
      this.supplierService.deleteSupplier(supplier.supplierId).subscribe(() => {
        this.loadSuppliers();
      });
    }
  }

  getProductCount(products: Product[] | undefined): number {
    return products?.length || 0;
  }
}
