import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  @Input() title: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit(): void {
  }

}
