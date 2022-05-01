import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { MinMax } from 'src/app/shared/model/minMax';

@Component({
  selector: 'app-price-range-slider',
  templateUrl: './price-range-slider.component.html',
  styleUrls: ['./price-range-slider.component.scss']
})
export class PriceRangeSliderComponent implements OnInit, OnDestroy {
  @Output() onChange = new EventEmitter<MinMax>();

  @Input() clearEvent: Observable<boolean>;

  public load: boolean = false;
  
  public minValue: number;
  public maxValue: number;
  public options: Options = {
    translate: this.translateCurrency,
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.minMaxPrices$
    .subscribe(({min, max})=>{
      this.minValue = min;
      this.maxValue = max;
      this.options.floor = min;
      this.options.ceil = max;

      this.load = true;
    })
    if(this.clearEvent){
      this.subscriptions.push(
        this.clearEvent.subscribe((evt) => this.reset())
      )
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  public change(event: ChangeContext){
    this.onChange.emit({
      min: event.value,
      max: event.highValue ?? 0
    })
  }

  private translateCurrency(value: number, label: LabelType): string {
    return value.toLocaleString('es') + "€";
  }

  private reset(){
    const {floor, ceil} = this.options;
    if(floor && ceil){
      this.minValue = floor;
      this.maxValue = ceil;
    }
  }
}
