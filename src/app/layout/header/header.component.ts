import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteItemsDialogComponent } from 'src/app/components/favorite-items-dialog/favorite-items-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openFavorites(){
    this.dialog.open(FavoriteItemsDialogComponent);
  }
}
