
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../models/product';
import { CartDialogComponent } from '../../sales/product-search/cartviewdialog'; // We'll create this below

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);

  allProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  cart = new Map<number, number>(); // productId -> quantity

  uniqueCategories: string[] = [];

  searchTerm = '';
  selectedCategory = '';
  showLowStockOnly = false;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartFromStorage();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts.set(products);
      this.uniqueCategories = Array.from(new Set(products.map(product => product.category)));
      this.filterProducts();
    });
  }

  filterProducts() {
    const term = this.searchTerm.toLowerCase();
    const category = this.selectedCategory;

    const filtered = this.allProducts().filter(product =>
      (!term || product.name.toLowerCase().includes(term)) &&
      (!category || product.category === category) &&
      (!this.showLowStockOnly || product.quantityInStock <= product.reorderThreshold)
    );

    this.filteredProducts.set(filtered);
  }

  addToCart(product: Product) {
    if (product.quantityInStock > 0) {
      product.quantityInStock--;
      const currentQty = this.cart.get(product.productId) || 0;
      this.cart.set(product.productId, currentQty + 1);
      this.saveCartToStorage();
    }
  }

  removeFromCart(product: Product) {
    const currentQty = this.cart.get(product.productId) || 0;
    if (currentQty > 0) {
      product.quantityInStock++;
      if (currentQty === 1) {
        this.cart.delete(product.productId);
      } else {
        this.cart.set(product.productId, currentQty - 1);
      }
      this.saveCartToStorage();
    }
  }

  getProductCartQuantity(productId: number): number {
    return this.cart.get(productId) || 0;
  }

  saveCartToStorage() {
    if (typeof window !== 'undefined') {
      const cartArray = Array.from(this.cart.entries());
      localStorage.setItem('product-cart', JSON.stringify(cartArray));
    }
  }

  loadCartFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('product-cart');
      if (stored) {
        const cartArray: [number, number][] = JSON.parse(stored);
        this.cart = new Map(cartArray);
      }
    }
  }

  openCartDialog() {
    const cartItems = Array.from(this.cart.entries()).map(([productId, quantity]) => {
      const product = this.allProducts().find(p => p.productId === productId);
      return {
        product: product!,
        quantity
      };
    });

    this.dialog.open(CartDialogComponent, {
      width: '500px',
      data: { cartItems }
    });
  }
  
}
