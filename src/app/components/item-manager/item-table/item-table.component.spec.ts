import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ItemHelper } from 'src/testing-utils/item-helper';
import es from '@angular/common/locales/es';
import { ItemTableComponent } from './item-table.component';
import { DOMHelper } from 'src/testing-utils/dom-helper';
import { Item } from 'src/app/shared/model/Item';
import { MatPaginator } from '@angular/material/paginator';

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
    itemServiceMock.applyFilter$ = of(itemHelper.getFilterEvent())

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

    it("correctly changes data on next page click", (done: DoneFn) => {
      component.paginator.nextPage();
      fixture.autoDetectChanges()
      fixture.whenStable().then(()=>{
        expect(dh.getFirstElemText('mat-cell.mat-column-title')).toContain(items[PAGE_SIZE].title);
        done();
      })
    })
  })
});
