import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsResponse } from '../shared/model/itemsResponse';
import { ItemService } from './item.service';
import { ItemHelper } from 'src/testing-utils/item-helper';
import { Item } from '../shared/model/Item';
import { baseApiUrl } from '../shared/constants';
import { MinMax } from '../shared/model/minMax';
import { BehaviorSubject } from 'rxjs';

describe('ItemService', () => {
  let service: ItemService;

  let httpMock: HttpTestingController;
  let snackBarMock: any;

  let itemHelper = new ItemHelper();

  const TEST_RESPONSE_SIZE = 10;

  beforeEach(() => {
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatSnackBar, useValue: snackBarMock}
      ]
    });
    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('http test', ()=>{
    let mockedRequestResponse: ItemsResponse;
    beforeEach(()=>{
      mockedRequestResponse = itemHelper.getDummyRequestItems(TEST_RESPONSE_SIZE);
    })

    afterEach(()=>{
      httpMock.verify()
    })

    it('should retrieve and parse items from remote server', () => {
      service.getItems().subscribe((items: Item[]) => {
        expect(items.length).toBe(TEST_RESPONSE_SIZE);
        expect(items[0].isFavorite).toBeFalse();
      })

      const request = httpMock.expectOne(`${baseApiUrl}/items.json`);
      expect(request.request.method).toBe('GET');

      request.flush(mockedRequestResponse);
    })

    it('displays a snackbar on error', () => {
      service.getItems().subscribe({
        next: () => { },
        error: ( error ) => {
          expect(snackBarMock.openFromComponent).toHaveBeenCalledTimes(1);
        }
      })

      const request = httpMock.expectOne(`${baseApiUrl}/items.json`);
      request.flush(null, {status: 400, statusText: "Bad Request"});
    })

    it("should store min-max prices for future use", () => {
      service.getItems().subscribe((items: Item[]) => {
        service.minMaxPrices$.subscribe((minMax: MinMax)=>{
          const expected: MinMax = {min: 0, max: (TEST_RESPONSE_SIZE - 1)*10}
          expect(minMax).toEqual(expected);
        })
      })

      const request = httpMock.expectOne(`${baseApiUrl}/items.json`);
      expect(request.request.method).toBe('GET');

      request.flush(mockedRequestResponse);
    })
  })

  describe('favourite logic tests', () => {
    let startingFavs: Item[];

    const STARTING_AMOUNT = 0;

    beforeEach(() => {

    })

    it('has 0 favourites by default', () => {
      service.currentFavorites$.subscribe((items: Item[])=>{
        expect(items.length).toBe(0);
      })
    })

    it('adds a favourite', () => {
      service.changeFavorites(itemHelper.getItems(1)[0])

      service.currentFavorites$.subscribe((items: Item[])=>{
        expect(items.length).toBe(1);

      })
    })

    it('removes a favourite', () => {
      const testItem: Item = itemHelper.getItems(1)[0];
      //add it
      service.changeFavorites(testItem);

      //remove it
      service.changeFavorites(testItem);

      service.currentFavorites$.subscribe((items: Item[])=>{
        expect(items.length).toBe(0);
      })
    })

    it('adds multiple favourites', () => {
      const testItems: Item[] = itemHelper.getItems(3);
      testItems.forEach(item => service.changeFavorites(item));
      service.currentFavorites$.subscribe((items: Item[])=>{
        expect(items.length).toBe(testItems.length);
      })
    })

    it("Removes the correct favourite", ()=>{
      const testItems: Item[] = itemHelper.getItems(3);
      testItems.forEach(item => service.changeFavorites(item));

      //remove penultimate item
      const removeItem = testItems[testItems.length - 1];
      service.changeFavorites(removeItem)

      service.currentFavorites$.subscribe((items: Item[])=>{
        expect(items.length).toBe(testItems.length - 1);
        expect(items).not.toContain(removeItem)
      })
    })


    it("displays a toast on favourite value change", ()=>{
      service.changeFavorites(itemHelper.getItems(1)[0])
      expect(snackBarMock.openFromComponent).toHaveBeenCalledTimes(1);
    })
  })
});
