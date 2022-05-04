import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { FavoriteItemsDialogComponent } from 'src/app/components/favorite-items-dialog/favorite-items-dialog.component';
import { ItemService } from 'src/app/services/item.service';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { DOMHelper } from 'src/testing-utils/dom-helper';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let matDialogMock: any;
  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  let dh: DOMHelper<HeaderComponent>;

  const FAV_AMOUNT = 10;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['']);
    itemServiceMock.currentFavorites = new BehaviorSubject([]);
    itemServiceMock.currentFavorites$ = itemServiceMock.currentFavorites.asObservable();

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MaterialModule, HttpClientModule ],
      providers: [
        {provide: MatDialog, useValue: matDialogMock},
        {provide: ItemService, useValue: itemServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    itemServiceMock.currentFavorites.next([]);
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have single button', () => {
    expect(dh.countElems('button')).toBe(1);
  })

  it('should display correct favourite amount on button', (done: DoneFn) => {
    itemServiceMock.currentFavorites.next(itemHelper.getFavoriteItems(FAV_AMOUNT));
    fixture.detectChanges()
    fixture.whenStable().then(()=>{
      expect(dh.getFirstElemText('button')).toContain(''+FAV_AMOUNT)
      done()
    })
  })

  it('should have no mat-primary class with no favorites', (done: DoneFn) => {
    itemServiceMock.currentFavorites.next([]);

    const favButton = dh.getFirstElem("button") as HTMLButtonElement;
    fixture.detectChanges()
    fixture.whenStable().then(()=>{
      expect(favButton.classList.contains("mat-primary")).toBeFalse();
      done()
    })

  })

  it('should have mat-primary class with favorites', (done: DoneFn) => {
    itemServiceMock.currentFavorites.next(itemHelper.getFavoriteItems(10));

    const favButton = dh.getFirstElem("button") as HTMLButtonElement;
    fixture.detectChanges()
    fixture.whenStable().then(()=>{
      expect(favButton.classList.contains("mat-primary")).toBeTrue();
      done()
    })
  })

  it('should open favourites modal', () => {
    dh.clickButtonByTagName(".header__button")
    expect(matDialogMock.open).toHaveBeenCalledOnceWith(FavoriteItemsDialogComponent)
  })
});
