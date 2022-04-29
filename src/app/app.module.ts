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

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ItemManagerHeaderComponent } from './components/item-manager/item-manager-header/item-manager-header.component';

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
    ItemManagerHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-ES' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
