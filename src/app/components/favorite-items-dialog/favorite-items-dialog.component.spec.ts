import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { DOMHelper } from 'src/testing-utils/dom-helper';
import { ItemHelper } from 'src/testing-utils/item-helper';

import { FavoriteItemsDialogComponent } from './favorite-items-dialog.component';

describe('FavoriteItemsDialogComponent', () => {
  let component: FavoriteItemsDialogComponent;
  let fixture: ComponentFixture<FavoriteItemsDialogComponent>;

  let matDialogRefMock: any;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  let dh: DOMHelper<FavoriteItemsDialogComponent>;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['changeFavorites']);
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ FavoriteItemsDialogComponent ],
      imports: [ MaterialModule ],
      providers: [
        { provide: ItemService, useValue: itemServiceMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteItemsDialogComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("tests with no starting favorites", ()=>{
    beforeEach(()=>{
      itemServiceMock.currentFavorites = new BehaviorSubject([]);
      itemServiceMock.currentFavorites$ = itemServiceMock.currentFavorites.asObservable();

      fixture.detectChanges();
    })

    it('should display a message when no favourites have been added', () => {
      expect(dh.getFirstElem(".nothing-found")).toBeTruthy();
    });

    it('should close modal on button click', () => {
      dh.clickButtonByTagName("")
      expect(matDialogRefMock.close).toHaveBeenCalled();
    })
  })

  describe("tests with starting favorites", ()=>{
    beforeEach(()=>{
      itemServiceMock.currentFavorites = new BehaviorSubject(itemHelper.getFavoriteItems(10));
      itemServiceMock.currentFavorites$ = itemServiceMock.currentFavorites.asObservable();
      
      fixture.detectChanges();
    })

    it('should NOT display a message when favourites have been added', () => {
      expect(dh.getFirstElem(".nothing-found")).toBeFalsy();
    });

    it('should display the favourites paginated', () => {
      expect(dh.countElems("mat-row")).toBe(5);
    });

    it('should filter the data by title using the searcher', (done: DoneFn)=>{
      const key = "2";
      component.search(key)

      fixture.detectChanges();
      fixture.whenStable()
      .then(()=>{
        expect(dh.countElems("mat-row")).toBe(1);
        done();
      })
    })

    it('should display the paginator if there are more than 5 favourites', ()=>{
      expect(dh.countElems("mat-paginator")).toBe(1)
    })
  })

  describe("tests removing favourites", ()=>{
    beforeEach(()=>{
      itemServiceMock.currentFavorites = new BehaviorSubject(itemHelper.getFavoriteItems(2));
      itemServiceMock.currentFavorites$ = itemServiceMock.currentFavorites.asObservable();
      
      fixture.detectChanges();
    })

    it('should NOT display the paginator if there are less than 6 favourites', ()=>{
      expect(dh.countElems("mat-paginator")).toBe(0)
    })

    it("should remove an item when using the trash button", ()=>{
      dh.getFirstElem("button").click()
      expect(itemServiceMock.changeFavorites).toHaveBeenCalledWith(component.favoritesDataSource.data[0]);
    })

    it('should add the nothing found message after deleting all the favourites', (done: DoneFn)=>{
      itemServiceMock.currentFavorites.next([]);
      fixture.detectChanges();
      fixture.whenStable()
      .then(() => {
        expect(dh.getFirstElem(".nothing-found")).toBeTruthy();
        done();
      })
    })
  })
});
