// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-inventory',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './inventory.component.html',
// //   styleUrl: './inventory.component.scss'
// // })
// // export class InventoryComponent {

// // }
// import { Component, inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatBadgeModule } from '@angular/material/badge';
// import { ProductService } from '../../../core/services/product.service';
// import { Product } from '../../../models/product';
// import { MatDialog } from '@angular/material/dialog';
// import { ProductFormDialogComponent } from '../../product-form-dialog/product-form-dialog.component';

// @Component({
//   selector: 'app-inventory',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule,
//     MatIconModule,
//     MatBadgeModule
//   ],
//   templateUrl: './inventory.component.html',
//   styleUrls: ['./inventory.component.scss']
// })
// export class InventoryComponent implements OnInit {
//   private productService = inject(ProductService);
//   private dialog = inject(MatDialog);

//   products: Product[] = [];
//   searchTerm = '';
//   showLowStockOnly = false;
//   updatedQuantities: { [productId: number]: number } = {};

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts() {
//     this.productService.getAllProducts().subscribe(data => {
//       this.products = data;
//     });
//   }

//   filteredProducts() {
//     return this.products.filter(product => {
//       const matchesName = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
//       const lowStock = product.quantityInStock <= product.reorderThreshold;
//       return (!this.showLowStockOnly || lowStock) && matchesName;
//     });
//   }

//   updateStock(product: Product) {
//     const quantity = this.updatedQuantities[product.productId];
//     if (quantity != null && quantity >= 0) {
//       this.productService.updateProductStock(product.productId, quantity).subscribe(() => {
//         this.loadProducts(); // Refresh list
//       });
//     }
//   }
//   addNewProduct() {
//     const dialogRef = this.dialog.open(ProductFormDialogComponent, {
//       width: '400px',
//       data: {
//         mode: 'add',
//         product: {
//           productId: 0,
//           name: '',
//           category: '',
//           price: 0,
//           quantityInStock: 0,
//           reorderThreshold: 0
//         }
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.productService.addProduct(result).subscribe(() => {
//           this.loadProducts();
//         });
//       }
//     });
//   }

//   editProduct(product: Product) {
//     const dialogRef = this.dialog.open(ProductFormDialogComponent, {
//       width: '400px',
//       data: {
//         mode: 'edit',
//         product
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.productService.editProduct(product.productId, result).subscribe(() => {
//           this.loadProducts();
//         });
//       }
//     });
//   }

//   clearSearch() {
//     this.searchTerm = '';
//     this.showLowStockOnly = false;
//   }
// }
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product';
import { ProductFormDialogComponent } from '../../product-form-dialog/product-form-dialog.component';
import { ConfirmDialogComponent } from '../../conform-dialog/conform-dialog.component';
import { UpdateStockDialogComponent } from '../../update-stock-dialog/update-stock-dialog.component';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  products = signal<Product[]>([]);
  showLowStockOnly = signal<boolean>(false);
  
  searchTerm = '';
  updatedQuantities: { [productId: number]: number } = {};

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products.set(data);
    });
  }

  get filteredProducts() {
    const term = this.searchTerm.toLowerCase();
    const showLow = this.showLowStockOnly();
    if (showLow){
      return this.products().filter(p => p.quantityInStock <=p.reorderThreshold);
    }
    
    return this.products().filter(p => 
      !term || p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) 
      
      
    );

  }
  toggleLowStock() {
    this.showLowStockOnly.update(value => !value);
  }

  updateStock(product: Product) {
    const dialogRef = this.dialog.open(UpdateStockDialogComponent, {
      width: '300px',
      data: { product }
    });
  
    dialogRef.afterClosed().subscribe(quantity => {
      if (quantity != null && quantity >= 0) {
        this.productService.updateProductStock(product.productId, quantity).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
  

  addNewProduct() {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '400px',
      data: {
        mode: 'add',
        product: {
          productId: 0,
          name: '',
          category: '',
          price: 0,
          quantityInStock: 0,
          reorderThreshold: 0
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '400px',
      data: {
        mode: 'edit',
        product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.editProduct(product.productId, result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

  deleteProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this product?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productService.deleteProduct(productId).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }

 
    
}
