import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ItemManagerComponent } from './components/item-manager/item-manager.component';
import { FavoriteItemsDialogComponent } from './components/favorite-items-dialog/favorite-items-dialog.component';
import { MaterialModule } from './shared/modules/material.module';
import { ImageDisplayComponent } from './shared/components/image-display/image-display.component';
import { ImageThumbnailComponent } from './shared/components/image-thumbnail/image-thumbnail.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ItemSearcherComponent } from './components/item-manager/item-searcher/item-searcher.component';
import { ItemTableComponent } from './components/item-manager/item-table/item-table.component';
import { SearcherComponent } from './shared/components/searcher/searcher.component';
import { PriceRangeSliderComponent } from './components/item-manager/item-searcher/price-range-slider/price-range-slider.component';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ToastComponent } from './shared/components/toast/toast.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ItemManagerComponent,
    FavoriteItemsDialogComponent,
    ImageDisplayComponent,
    ImageThumbnailComponent,
    ItemSearcherComponent,
    ItemTableComponent,
    SearcherComponent,
    PriceRangeSliderComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    NgxSliderModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-ES' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
