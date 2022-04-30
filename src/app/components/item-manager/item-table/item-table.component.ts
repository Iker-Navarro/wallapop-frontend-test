import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/model/Item';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.scss']
})
export class ItemTableComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public itemsDataSource: MatTableDataSource<Item> = new MatTableDataSource();
  public displayedColumns: string[] = [
    "image",
    "title",
    "description",
    "price",
    "email",
    "actions"
  ];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems()
    .subscribe({
      next: (res) => this.initializeItems(res),
      error: (err) => this.onError(err)
    })
  }

  ngAfterViewInit(): void {
    this.itemsDataSource.paginator = this.paginator;
    this.itemsDataSource.sort = this.sort;
  }

  public changeFavorite(item: Item){
    this.itemService.changeFavorites(item);
  }

  private initializeItems(items: Item[]){
    this.itemsDataSource.data = items;
  }

  private onError(err: Error){
    console.error(err);
  }
}
