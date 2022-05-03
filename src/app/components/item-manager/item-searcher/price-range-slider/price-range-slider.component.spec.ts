import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { PriceRangeSliderComponent } from './price-range-slider.component';

describe('PriceRangeSliderComponent', () => {
  let component: PriceRangeSliderComponent;
  let fixture: ComponentFixture<PriceRangeSliderComponent>;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['']);
    itemServiceMock.minMaxPrices$ = of(itemHelper.getMinMaxPrice(itemHelper.getFavoriteItems(10)));

    await TestBed.configureTestingModule({
      declarations: [ PriceRangeSliderComponent ],
      providers: [
        {provide: ItemService, useValue: itemServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
