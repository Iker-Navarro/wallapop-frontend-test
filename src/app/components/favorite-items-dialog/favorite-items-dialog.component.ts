import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/model/Item';

@Component({
  selector: 'app-favorite-items-dialog',
  templateUrl: './favorite-items-dialog.component.html',
  styleUrls: ['./favorite-items-dialog.component.scss']
})
export class FavoriteItemsDialogComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.itemService.currentFavorites$
      .subscribe((favorites: Item[]) => {
        console.log(favorites);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
