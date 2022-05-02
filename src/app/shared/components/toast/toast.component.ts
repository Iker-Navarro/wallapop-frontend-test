import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public message: string;
  public icon: string;
  public isSvg: boolean;
  public iconClass: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: any) { }

  ngOnInit(): void {
    this.message = this.data.message ?? "";
    this.icon = this.data.icon ?? "";
    this.isSvg = this.data.isSvg ?? false;
    this.iconClass = this.data.iconClass ?? "";
  }
}
