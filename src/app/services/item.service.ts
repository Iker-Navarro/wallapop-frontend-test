import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, Observable, BehaviorSubject, tap, ReplaySubject, Subject } from 'rxjs';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { baseApiUrl } from '../shared/constants';
import { FilterEvent } from '../shared/model/filterEvent';
import { Item } from '../shared/model/Item';
import { ItemsResponse, RawItem } from '../shared/model/itemsResponse';
import { MinMax } from '../shared/model/minMax';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private getItemsUrl: string = `${baseApiUrl}/items.json`;

  private favorites: Item[] = [];
  private currentFavorites: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  public currentFavorites$: Observable<Item[]> = this.currentFavorites.asObservable();

  private applyFilter: Subject<FilterEvent> = new Subject<FilterEvent>();
  public applyFilter$: Observable<FilterEvent> = this.applyFilter.asObservable();

  private minMaxPrices: ReplaySubject<MinMax> = new ReplaySubject<MinMax>();
  public minMaxPrices$: Observable<MinMax> = this.minMaxPrices.asObservable();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getItems(): Observable<Item[]>{
    return this.http.get<ItemsResponse>(this.getItemsUrl)
    .pipe(
      map(({items}) => {
        return items.map((item: RawItem, i) => {
          const endItem: any = Object.assign({}, item)
          endItem.isFavorite = false;
          return endItem as Item;
        });
      }),
      tap((items: Item[])=>{
        // Not optimal but better readability: change for a single loop if optimization is necesary
        const prices: number[] = items.map((item: Item) => Number(item.price));
        this.minMaxPrices.next({
          min: Math.min(...prices),
          max: Math.max(...prices)
        })
      }),
      catchError(err => {
        this.onError("Error ocurred while getting the item data!")
        throw err;
      })
    )
  }

  public changeFilter(filter: FilterEvent){
    this.applyFilter.next(filter);
  }

  public changeFavorites(item: Item){
    if(item.isFavorite){
      this.removeFavorite(item);
    }
    else{
      this.addFavorite(item);
    }

    item.isFavorite = !item.isFavorite;
  }

  private addFavorite(item: Item){
    this.favorites.push(item);
    this.currentFavorites.next(Object.assign([], this.favorites));
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        message: `"${item.title}" added to favourites`,
        isSvg: false,
        icon: "star",
        iconClass: "yellow"
      },
      panelClass: ['light-toast'],
      duration: 1500
    });
  }

  private removeFavorite(item: Item){
    const i = this.favorites.findIndex(fav => fav === item);
    this.favorites.splice(i, 1);
    this.currentFavorites.next(Object.assign([], this.favorites));
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        message: `"${item.title}" removed from favourites`,
        isSvg: false,
        icon: "delete",
        iconClass: "red"
      },
      panelClass: ['light-toast'],
      duration: 1500
    });
  }

  private onError(message: string){
    this.snackBar.openFromComponent(ToastComponent, {
      data: {
        message: message,
        isSvg: false,
        icon: "error",
        iconClass: "red"
      },
      panelClass: ['light-toast'],
      duration: 1500
    });
  }
}
