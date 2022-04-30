import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-manager-header',
  templateUrl: './item-manager-header.component.html',
  styleUrls: ['./item-manager-header.component.scss']
})
export class ItemManagerHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event:any){
    console.log(event);
    
  }
}
