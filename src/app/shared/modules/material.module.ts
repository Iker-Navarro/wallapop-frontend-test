import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const materialModules = [
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatExpansionModule
]

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {

    const mainLogo = '../../assets/icon/logo.svg';

    this.matIconRegistry.addSvgIcon(
      'main-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(mainLogo),
      {viewBox: "0 0 42 42"}
    );
  }
}
