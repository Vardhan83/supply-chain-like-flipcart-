// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class InventorySummaryService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { Product,InventoryStats } from '../../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  sendLowStockNotification(productName: string) {
    console.log(`🚨 Low Stock Alert: ${productName}`);
  }
  

}