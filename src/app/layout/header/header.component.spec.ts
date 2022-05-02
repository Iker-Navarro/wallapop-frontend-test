import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let matDialogMock: any;
  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['']);
    itemServiceMock.currentFavorites$ = of(itemHelper.getFavoriteItems(10));
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: MatDialog, useValue: matDialogMock},
        {provide: ItemService, useValue: itemServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
