import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { ItemTableComponent } from './item-table.component';

describe('ItemTableComponent', () => {
  let component: ItemTableComponent;
  let fixture: ComponentFixture<ItemTableComponent>;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['getItems']);
    itemServiceMock.getItems.and.returnValue(of(itemHelper.getItems(20)));
    itemServiceMock.applyFilter$ = of(itemHelper.getFilterEvent())
    await TestBed.configureTestingModule({
      declarations: [ ItemTableComponent ],
      providers: [
        { provide: ItemService, useValue: itemServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
