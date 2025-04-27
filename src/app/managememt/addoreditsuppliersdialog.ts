import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule,MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'add' ? 'Add Supplier' : 'Edit Supplier' }}</h2>
    <mat-dialog-content>
      <form>
        <label>Name:</label>
        <input type="text" [(ngModel)]="data.supplier.name" name="name" required /><br /><br />
        
        <label>Contact Info:</label>
        <input type="text" [(ngModel)]="data.supplier.contactInfo" name="contactInfo" /><br /><br />
        
        <label>Address:</label>
        <input type="text" [(ngModel)]="data.supplier.address" name="address" /><br />
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Cancel</button>
      <button mat-button color="primary" (click)="save()">Save</button>
    </mat-dialog-actions>
  `
})
export class SupplierFormDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit'; supplier: any },
    private dialogRef: MatDialogRef<SupplierFormDialogComponent>
  ) {}

  save() {
    this.dialogRef.close(this.data.supplier);
  }

  cancel() {
    this.dialogRef.close();
  }
}
