import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDisplayComponent } from '../image-display/image-display.component';

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() title: string;
  @Input() isSmall: boolean;
  
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  showFullSize(){
    this.dialog.open(ImageDisplayComponent, {data: {url: this.imageUrl, title: this.title}})
  }
}
