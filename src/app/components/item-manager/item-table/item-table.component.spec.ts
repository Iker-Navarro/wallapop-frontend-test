import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Subject } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ItemHelper } from 'src/testing-utils/item-helper';
import es from '@angular/common/locales/es';
import { ItemTableComponent } from './item-table.component';
import { DOMHelper } from 'src/testing-utils/dom-helper';
import { Item } from 'src/app/shared/model/Item';
import { FilterEvent } from 'src/app/shared/model/filterEvent';

describe('ItemTableComponent', () => {
  let component: ItemTableComponent;
  let fixture: ComponentFixture<ItemTableComponent>;

  let itemHelper: ItemHelper = new ItemHelper();
  let itemServiceMock: any;

  let dh: DOMHelper<ItemTableComponent>;

  const TEST_SAMPLE_SIZE = 20;
  const EXPECTED_ROW_PER_PAGE = 5;

  beforeEach(async () => {
    itemServiceMock = jasmine.createSpyObj('ItemService', ['getItems']);
    
    itemServiceMock.applyFilter = new Subject<FilterEvent>()
    itemServiceMock.applyFilter$ = itemServiceMock.applyFilter.asObservable();

    registerLocaleData(es);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
      ],
      declarations: [ ItemTableComponent ],
      providers: [
        { provide: LOCALE_ID, useValue: 'es-ES' },
        { provide: ItemService, useValue: itemServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTableComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
  });

  describe("General tests", () => {
    beforeEach(()=>{
      itemServiceMock.getItems.and.returnValue(of(itemHelper.getItems(TEST_SAMPLE_SIZE)));
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should display the correct amount of rows, 5 per table page", ()=>{
      expect(dh.countElems("mat-row")).toBe(EXPECTED_ROW_PER_PAGE)
    })
  });

  describe("Test sorting with unordered data", () => {
    let items = itemHelper.getItems(TEST_SAMPLE_SIZE)
    beforeEach(()=>{
      const unsorted = items.slice().sort((a, b) => 0.5 - Math.random());
      itemServiceMock.getItems.and.returnValue(of(unsorted));
      fixture.detectChanges();
    })

    const sortCases = [
      {field: "price", type: "number"},
      {field: "title", type: "string"},
      {field: "description", type: "string"},
      {field: "email", type: "string"}
    ]

    sortCases.forEach((sortCase) => {
      const f = sortCase.field as keyof Item;
      let ascSortedItems: Item[];

      if(sortCase.type === "string"){
        ascSortedItems = items.slice().sort((a,b) => a[f].toString().localeCompare(b[f].toString()));
      }
      else{
        ascSortedItems = items.slice().sort((a,b) => a[f].toString().localeCompare(b[f].toString(), undefined, {numeric: true}));
      }

      it(`should sort by ${sortCase.field} ascending`, (done: DoneFn)=>{
        const matSort = dh.getFirstElem(".mat-sort-header.mat-column-"+sortCase.field);
        matSort.click();

        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          const expectedValue: string = ascSortedItems[0][sortCase.field as keyof Item] as string;
          expect(dh.getFirstElemText('mat-cell.mat-column-'+sortCase.field)).toContain(expectedValue)
          done()
        })
      })

      it(`should sort by ${sortCase.field} descending`, (done: DoneFn)=>{
        const matSort = dh.getFirstElem(".mat-sort-header.mat-column-"+sortCase.field);
        matSort.click();
        matSort.click();

        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          const expectedValue: string = ascSortedItems[TEST_SAMPLE_SIZE-1][sortCase.field as keyof Item] as string;
          expect(dh.getFirstElemText('mat-cell.mat-column-'+sortCase.field)).toContain(expectedValue)
          done()
        })
      })
    })
  });

  describe("Test pagination", ()=>{
    let items: Item[];
    const PAGE_SIZE = 5;

    beforeEach(()=>{
      items = itemHelper.getItems(TEST_SAMPLE_SIZE);
      itemServiceMock.getItems.and.returnValue(of(items));
      fixture.detectChanges();
    });

    it ("correctly sets paginator", (done)=>{
      fixture.whenStable().then(()=>{
        expect(component.paginator.length).toBe(TEST_SAMPLE_SIZE);
        done()
      })
    })
  })

  describe("test filtering and searches", ()=>{
    let items: Item[];
    beforeEach(()=>{
      items = itemHelper.getItems(TEST_SAMPLE_SIZE);
      itemServiceMock.getItems.and.returnValue(of(items));
      fixture.detectChanges();
    });

    it("displays a message when nothing is found", (done: DoneFn)=>{
      itemServiceMock.applyFilter.next(itemHelper.getGenericFilterEvent("asfas"))
      fixture.detectChanges()
      fixture.whenStable().then(()=>{
        expect(dh.getFirstElem(".table-container__empty")).toBeTruthy();
        done();
      })
    })

    it("filters out rows by using the generic search", (done: DoneFn)=>{
      itemServiceMock.applyFilter.next(itemHelper.getGenericFilterEvent(items[8].title))
      fixture.detectChanges()
      fixture.whenStable().then(()=>{
        expect(dh.countElems("mat-row")).toBe(1);
        done();
      })
    })

    describe("advanced search tests", ()=>{
      
      it("uses the advanced search to filter by title", (done: DoneFn)=>{
        itemServiceMock.applyFilter.next(itemHelper.getAdvancedFilter({
          title: items[8].title,
          description: "",
          email: "",
          priceRange: null
        }))
        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          expect(dh.countElems("mat-row")).toBe(1);
          done();
        })
      })

      it("uses the advanced search to filter by description", (done: DoneFn)=>{
        itemServiceMock.applyFilter.next(itemHelper.getAdvancedFilter({
          title: "",
          description: items[3].description,
          email: "",
          priceRange: null
        }))
        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          expect(dh.countElems("mat-row")).toBe(1);
          done();
        })
      })

      it("uses the advanced search to filter by email", (done: DoneFn)=>{
        itemServiceMock.applyFilter.next(itemHelper.getAdvancedFilter({
          title: "",
          description: "",
          email: items[6].email,
          priceRange: null
        }))
        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          // 5 repeating emails containing "third"
          expect(dh.countElems("mat-row")).toBe(5);
          done();
        })
      })

      it("uses the advanced search to filter by price range", (done: DoneFn)=>{
        itemServiceMock.applyFilter.next(itemHelper.getAdvancedFilter({
          description: "",
          email: "",
          title: "",
          priceRange: {
            min: 0,
            max: 30
          }
        }))
        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          // rows withprices 10, 20 & 30
          expect(dh.countElems("mat-row")).toBe(3);
          done();
        })
      })
      
      it("filters the data combining advanced filters", (done: DoneFn) => {
        itemServiceMock.applyFilter.next(itemHelper.getAdvancedFilter({
          description: "test",
          email: "first",
          title: "",
          priceRange: {
            min: 30,
            max: 60
          }
        }))
        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          expect(dh.countElems("mat-row")).toBe(1);
          done();
        })
      })

      it("filters the data over the maximum page capacity (5)", (done: DoneFn) => {
        fixture.detectChanges();
        itemServiceMock.applyFilter.next(itemHelper.getAdvancedFilter({
          description: "",
          email: "",
          title: "",
          priceRange: {
            min: 110,
            max: 200
          }
        }))
        fixture.detectChanges()
        fixture.whenStable().then(()=>{
          // 10 prices from 110 to 200 in increments of 10
          expect(component.itemsDataSource.filteredData.length).toBe(10);
          done();
        })
      })
    })
  })

  describe("favourites tests", () => {
    let items: Item[];
    beforeEach(()=>{
      items = itemHelper.getItems(TEST_SAMPLE_SIZE);
      items[1].isFavorite =
      itemServiceMock.getItems.and.returnValue(of(items));
      fixture.detectChanges();
    });

    it("saves favourite on button click", () => {
      spyOn(component, 'changeFavorite');
      dh.getFirstElem(".mat-column-actions button").click();
      expect(component.changeFavorite).toHaveBeenCalledWith(items[0]);
    })

    it("has non favourite button style", () => {
      expect(dh.getFirstElemText(".mat-column-actions button .mat-button-wrapper")).toBe(" Add favourite ");
    })

    it("changes style on favourited items", () => {
      expect(dh.getNthElementText(".mat-column-actions button .mat-button-wrapper", 1)).toBe(" Remove favourite ");
    })

  })
});
