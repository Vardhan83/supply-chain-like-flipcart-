import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockDialogComponent } from './update-stock-dialog.component';

describe('UpdateStockDialogComponent', () => {
  let component: UpdateStockDialogComponent;
  let fixture: ComponentFixture<UpdateStockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStockDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
