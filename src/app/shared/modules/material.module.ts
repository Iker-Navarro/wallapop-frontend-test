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

  customSvgIcons: CustomIconData[] = [
    { icon: 'main-logo', url: '../../assets/icon/logo.svg', viewBox: "0 0 42 42" },
  ]

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.customSvgIcons.forEach((icon: CustomIconData) => {
      this.addSvgIcon(icon)
    })
  }

  private addSvgIcon(iconData: CustomIconData){
    this.matIconRegistry.addSvgIcon(
      iconData.icon,
      this.domSanitizer.bypassSecurityTrustResourceUrl(iconData.url),
      {viewBox: iconData.viewBox ?? ""}
    );
  }
}

interface CustomIconData {
  icon: string;
  url: string;
  viewBox?: string;
}
