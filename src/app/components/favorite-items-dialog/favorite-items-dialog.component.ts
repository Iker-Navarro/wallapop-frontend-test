import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/model/Item';

@Component({
  selector: 'app-favorite-items-dialog',
  templateUrl: './favorite-items-dialog.component.html',
  styleUrls: ['./favorite-items-dialog.component.scss']
})
export class FavoriteItemsDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscriptions: Subscription[] = [];

  public favoritesDataSource: MatTableDataSource<Item> = new MatTableDataSource();
  public displayedColumns: string[] = [
    "image",
    "title",
    "actions"
  ];

  constructor(
    private itemService: ItemService,
    private dialogRef: MatDialogRef<FavoriteItemsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.itemService.currentFavorites$
      .subscribe((favorites: Item[]) => {
        this.favoritesDataSource.data = favorites;
      })
    );
  }

  ngAfterViewInit(): void {
    this.favoritesDataSource.paginator = this.paginator;
    this.favoritesDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public removeItem(item: Item){
    this.itemService.changeFavorites(item);
  }

  public close(){
    this.dialogRef.close();
  }
}
