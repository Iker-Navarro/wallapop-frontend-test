import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { MinMax } from 'src/app/shared/model/minMax';

@Component({
  selector: 'app-price-range-slider',
  templateUrl: './price-range-slider.component.html',
  styleUrls: ['./price-range-slider.component.scss']
})
export class PriceRangeSliderComponent implements OnInit {
  @Output() valueChange = new EventEmitter<MinMax>();

  public load: boolean = false;
  
  public minValue: number;
  public maxValue: number;
  public options: Options = {
    translate: this.translateCurrency,
  };

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
  }

  public onChange(event: ChangeContext){
    console.log(event)
    this.valueChange.emit({
      min: event.value,
      max: event.highValue ?? 0
    })
  }

  private translateCurrency(value: number, label: LabelType): string {
    return value.toLocaleString('es') + "€";
  }
}
