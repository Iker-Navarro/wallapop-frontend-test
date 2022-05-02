import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { ItemSearcherComponent } from './item-searcher.component';

describe('ItemSearcherComponent', () => {
  let component: ItemSearcherComponent;
  let fixture: ComponentFixture<ItemSearcherComponent>;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['']);
    itemServiceMock.minMaxPrices$ = of(itemHelper.getMinMaxPrice(itemHelper.getFavoriteItems(10)));
    await TestBed.configureTestingModule({
      declarations: [ ItemSearcherComponent ],
      providers: [
        {provide: ItemService, useValue: itemServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
