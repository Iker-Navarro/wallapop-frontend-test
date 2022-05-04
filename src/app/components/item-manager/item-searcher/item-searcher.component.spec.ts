import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { SearchType } from 'src/app/shared/model/filterEvent';
import { MinMax } from 'src/app/shared/model/minMax';
import { DOMHelper } from 'src/testing-utils/dom-helper';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { ItemSearcherComponent } from './item-searcher.component';

describe('ItemSearcherComponent', () => {
  let component: ItemSearcherComponent;
  let fixture: ComponentFixture<ItemSearcherComponent>;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  let dh: DOMHelper<ItemSearcherComponent>;

  let minMaxPrice: MinMax;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['changeFilter']);
    minMaxPrice =itemHelper.getMinMaxPrice(itemHelper.getFavoriteItems(10));
    itemServiceMock.minMaxPrices$ = of(minMaxPrice);
    await TestBed.configureTestingModule({
      declarations: [ ItemSearcherComponent ],
      providers: [
        {provide: ItemService, useValue: itemServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearcherComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should launch a search on keyup event of child searcher', () => {
    const key = "x";
    component.genericSearch(key)
    expect(itemServiceMock.changeFilter).toHaveBeenCalledWith(itemHelper.getGenericFilterEvent("x"));
  });

  it('should launch a search on click of advanced search button', () => {
    dh.getNthElement("button", 2).click();

    expect(itemServiceMock.changeFilter).toHaveBeenCalledWith(itemHelper.getAdvancedFilter({
      title: "",
      description: "",
      email: "",
      priceRange: minMaxPrice
    }));
  });

  it('should clear searches on clear button press', ()=>{
    dh.getNthElement("button", 1).click();
    expect(itemServiceMock.changeFilter).toHaveBeenCalledWith(itemHelper.getGenericFilterEvent(""));
  })

  it('should clear input fields on clear button press', (done: DoneFn)=>{
    component.clearAdvSearchForm$.subscribe((val)=>{
      expect(val).toBeTrue();
      done();
    })

    dh.getNthElement("button", 1).click();
  })
});
