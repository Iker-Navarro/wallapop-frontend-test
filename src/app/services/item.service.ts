import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, catchError, EMPTY, Observable } from 'rxjs';
import { baseApiUrl } from '../shared/constants';
import { Item } from '../shared/model/Item';
import { ItemsResponse } from '../shared/model/itemsResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private getItemsUrl: string = `${baseApiUrl}/items.json`;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  public getItems(): Observable<Item[]>{
    return this.http.get<ItemsResponse>(this.getItemsUrl)
    .pipe(
      map(({items}) => {
        return items; 
      }),
      catchError(err => {
        this.onError("Error ocurred while getting the item data!")
        throw err;
      })
    )
  }

  private onError(message: string){
    this.snackBar.open( message, "close", { duration: 3000 });
  }
}
