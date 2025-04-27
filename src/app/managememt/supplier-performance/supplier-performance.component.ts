// // import { Component, inject, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { MatCardModule } from '@angular/material/card';
// // import { SupplierService } from '../../core/services/supplier.service';
// // import { Supplier } from '../../models/supplier';

// // @Component({
// //   selector: 'app-supplier-performance',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     MatCardModule
// //   ],
// //   templateUrl: './supplier-performance.component.html',
// //   styleUrls: ['./supplier-performance.component.scss']
// // })
// // export class SupplierPerformanceComponent implements OnInit {
// //   private supplierService = inject(SupplierService);

// //   suppliers: Supplier[] = [];

// //   ngOnInit(): void {
// //     this.loadSuppliers();
// //   }

// //   loadSuppliers() {
// //     this.supplierService.getAllSuppliers().subscribe(data => {
// //       this.suppliers = data;
// //     });
// //   }
// // }
// import { Component, inject, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { SupplierService } from '../../core/services/supplier.service';
// import { ProductService } from '../../core/services/product.service';
// import { Supplier } from '../../models/supplier';
// import { Product } from '../../models/product';
// import { SupplierFormDialogComponent } from '../addoreditsuppliersdialog';
// import { AssignProductsDialogComponent } from '../assingnewsupplierdialog';
// import { MatCardModule } from '@angular/material/card';

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
//     MatCardModule
//   ],
//   templateUrl: './supplier-performance.component.html',
//   styleUrls: ['./supplier-performance.component.scss']
// })
// export class SupplierPerformanceComponent implements OnInit {
//   private supplierService = inject(SupplierService);
//   private productService = inject(ProductService);
//   private dialog = inject(MatDialog);

//   suppliers = signal<Supplier[]>([]);
//   products = signal<Product[]>([]);
//   displayedColumns = ['supplierId', 'name', 'products', 'actions'];

//   ngOnInit(): void {
//     this.loadSuppliers();
//     this.loadProducts();
//   }

//   loadSuppliers() {
//     this.supplierService.getAllSuppliers().subscribe(data => {
//       this.suppliers.set(data);
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
//       width: '500px',
//       data: { supplier, products: this.products() }
//     });
  
//     dialogRef.afterClosed().subscribe(selectedProductIds => {
//       if (selectedProductIds && selectedProductIds.length > 0) {
//         this.supplierService.assignProductsToSupplier(supplier.supplierId, selectedProductIds).subscribe(() => {
//           this.loadSuppliers(); // ✅ Load updated supplier list
//           alert('Products assigned successfully!'); // Optional: small alert for success
//         });
//       }
//     });
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
    MatCardModule
  ],
  templateUrl: './supplier-performance.component.html',
  styleUrls: ['./supplier-performance.component.scss']
})
export class SupplierPerformanceComponent implements OnInit {
  private supplierService = inject(SupplierService);
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  suppliers = signal<Supplier[]>([]);
  products = signal<Product[]>([]); // Initialize as empty array

  displayedColumns = ['supplierId', 'name', 'products', 'actions'];

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadProducts();
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(data => {
      this.suppliers.set(data);
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
      width: '500px',
      data: { supplier, products: this.products() }
    });
  
    dialogRef.afterClosed().subscribe(selectedProductIds => {
      if (selectedProductIds && selectedProductIds.length > 0) {
        this.supplierService.assignProductsToSupplier(supplier.supplierId, selectedProductIds).subscribe(() => {
          this.loadSuppliers(); // ✅ Reload supplier list with updated products
          alert('Products assigned successfully!'); // ✅ Optional notification
        });
      }
    });
  }

  getProductNames(productList: Product[] | undefined): string {
    if (!productList || productList.length === 0) {
      return 'No Products';
    }
    return productList.map(p => p.name).join(', ');
  }
  

  openViewProductsDialog(supplier: Supplier) {
    this.dialog.open(ViewProductsDialogComponent, {
      width: '500px',
      data: { supplier }
    });
  }
  

}
