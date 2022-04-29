import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteItemsDialogComponent } from './favorite-items-dialog.component';

describe('FavoriteItemsDialogComponent', () => {
  let component: FavoriteItemsDialogComponent;
  let fixture: ComponentFixture<FavoriteItemsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteItemsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
