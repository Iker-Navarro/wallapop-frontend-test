import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, EMPTY, Observable, BehaviorSubject } from 'rxjs';
import { baseApiUrl } from '../shared/constants';
import { Item } from '../shared/model/Item';
import { ItemsResponse } from '../shared/model/itemsResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private getItemsUrl: string = `${baseApiUrl}/items.json`;

  private favorites: Item[] = [];
  private currentFavorites: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]); 
  public currentFavorites$: Observable<Item[]> = this.currentFavorites.asObservable();


  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getItems(): Observable<Item[]>{
    return this.http.get<ItemsResponse>(this.getItemsUrl)
    .pipe(
      map(({items}) => {
        return items.map((item: Item) => {
          item.isFavorite = false;
          return item;
        }); 
      }),
      catchError(err => {
        this.onError("Error ocurred while getting the item data!")
        throw err;
      })
    )
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
  }

  private removeFavorite(item: Item){
    const i = this.favorites.findIndex(fav => fav === item);
    this.favorites.splice(i, 1);
    this.currentFavorites.next(Object.assign([], this.favorites));
  }
  
  private onError(message: string){
    this.snackBar.open( message, "close", { duration: 3000 });
  }
}
