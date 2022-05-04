import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/services/item.service';
import { FilterEvent, SearchType } from 'src/app/shared/model/filterEvent';
import { Item } from 'src/app/shared/model/Item';
import { ItemFilter } from 'src/app/shared/model/itemFilter';
import { MinMax } from 'src/app/shared/model/minMax';

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

  // to store the current active filter type
  private activeFilterType: SearchType;

  // columns to search in with the generic search input
  private genericSearchColumns: string[] = [
    "title",
    "description",
    "price",
    "email",
  ]

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems()
    .subscribe({
      next: (res) => this.initializeItems(res),
      error: (err) => this.onError(err)
    })

    // recieve filter requests from service
    this.itemService.applyFilter$
    .subscribe((filterEvent: FilterEvent)=>{
      this.activeFilterType = filterEvent.type;
      this.itemsDataSource.filter = filterEvent.filterTerm;
      this.loadFirstPage()
    })
  }

  ngAfterViewInit(): void {
    this.itemsDataSource.paginator = this.paginator;
    this.itemsDataSource.sort = this.sort;
    this.itemsDataSource.filterPredicate = this.getCustomFilterPredicate();
  }

  public changeFavorite(item: Item){
    this.itemService.changeFavorites(item);
  }

  public clearSearch(){
    this.activeFilterType = SearchType.Generic;
    this.itemsDataSource.filter = "";
  }

  public loadFirstPage(){
    this.paginator.firstPage();
  }

  private initializeItems(items: Item[]){
    this.itemsDataSource.data = items;
  }

  private onError(err: Error){
    // snackbar is automatically displayed from service
    console.error(err);
  }

  private getCustomFilterPredicate() {

    // Function to create a different predicate depending on the current 'activeFilterType'
    const filterPredicate = (item: Item, filter: string) => {
      if(this.activeFilterType === SearchType.Generic){

        // generic filter searches with single text in every field specified in 'genericSearchColumns'
        return this.genericSearchColumns.some((colName:string) => {
          return this.containsString(item[colName as keyof Item].toString(), filter);
        });
      }
      else{
        
        // Independently search each available field, empty field will make no filtering attempts
        const filterJson: ItemFilter = JSON.parse(filter);

        if(filterJson.title && !this.containsString(item.title, filterJson.title))
          return false;

        if(filterJson.description && !this.containsString(item.description, filterJson.description))
          return false;

        if(filterJson.email && !this.containsString(item.email, filterJson.email))
          return false;

        if(filterJson.priceRange && !this.isPriceInRange(item.price, filterJson.priceRange))
          return false;

        return true;
      }
    }
    return filterPredicate;
  }

  private containsString(field: string, string: string){
    return field.toUpperCase().includes(string.toUpperCase());
  }

  private isPriceInRange(priceStr: string, range: MinMax){
    const price = Number(priceStr);
    return price >= range.min && price <= range.max;
  }
}
