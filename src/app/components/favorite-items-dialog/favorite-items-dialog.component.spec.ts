import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { FavoriteItemsDialogComponent } from './favorite-items-dialog.component';

describe('FavoriteItemsDialogComponent', () => {
  let component: FavoriteItemsDialogComponent;
  let fixture: ComponentFixture<FavoriteItemsDialogComponent>;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['']);
    itemServiceMock.currentFavorites$ = of(itemHelper.getFavoriteItems(10));
    await TestBed.configureTestingModule({
      declarations: [ FavoriteItemsDialogComponent ],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
