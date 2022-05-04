import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { SearchType } from 'src/app/shared/model/filterEvent';
import { ItemFilter } from 'src/app/shared/model/itemFilter';
import { MinMax } from 'src/app/shared/model/minMax';

@Component({
  selector: 'app-item-searcher',
  templateUrl: './item-searcher.component.html',
  styleUrls: ['./item-searcher.component.scss']
})
export class ItemSearcherComponent implements OnInit {

  private clearGnrSearchForm: Subject<boolean> = new Subject<boolean>();
  public clearGnrSearchForm$: Observable<boolean> = this.clearGnrSearchForm.asObservable();

  private clearAdvSearchForm: Subject<boolean> = new Subject<boolean>();
  public clearAdvSearchForm$: Observable<boolean> = this.clearAdvSearchForm.asObservable();

  // starting advanced item filter, empty
  public itemFilter: ItemFilter = {
    title: "",
    description: "",
    email: "",
    priceRange: null
  };

  // flag to display warning message
  public displayNote: boolean = true;

  private storedMinMax: MinMax;

  constructor(
    private itemService: ItemService,
  ) { }

  ngOnInit(): void {
    this.itemService.minMaxPrices$
    .subscribe((minMax: MinMax) => {
      this.storedMinMax = minMax;
      this.itemFilter.priceRange = minMax;
    })
  }

  public clearForm(){
    this.genericSearch("")
    this.clearAdvSearchForm.next(true);
    this.itemFilter = {
      title: "",
      description: "",
      email: "",
      priceRange: this.storedMinMax
    }
  }

  public genericSearch(term: string){
    this.itemService.changeFilter({
      filterTerm: term,
      type: SearchType.Generic
    })
  }

  public advancedSearch(){
    this.clearGnrSearchForm.next(true);
    this.itemService.changeFilter({
      filterTerm: JSON.stringify(this.itemFilter),
      type: SearchType.Advanced
    })
  }
}
