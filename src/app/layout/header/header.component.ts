import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteItemsDialogComponent } from 'src/app/components/favorite-items-dialog/favorite-items-dialog.component';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/model/Item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public favoriteAmount: number;

  constructor(
    private dialog: MatDialog,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.currentFavorites$
    .subscribe((favorites: Item[])=>{
      this.favoriteAmount = favorites.length;
    })
  }

  openFavorites(){
    this.dialog.open(FavoriteItemsDialogComponent);
  }
}
