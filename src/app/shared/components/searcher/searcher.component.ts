import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, OnDestroy {
  @Output() onKeyUp: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() title: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() placeholder: string;
  @Input() clearEvent: Observable<boolean>;

  @ViewChild('inputElement') input: ElementRef;

  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    if(this.clearEvent){
      this.subscriptions.push(
        this.clearEvent.subscribe((evt) => this.clear())
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public keyUp(event: KeyboardEvent){
    const target = event.target as HTMLInputElement;
    this.onKeyUp.emit(target.value);    
  }

  public change(event: Event){
    const target = event.target as HTMLInputElement;
    this.onChange.emit(target.value);    
  }

  private clear(){
    this.input.nativeElement.value = '';
  }
}
