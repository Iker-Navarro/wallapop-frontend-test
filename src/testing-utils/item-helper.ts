import { FilterEvent, SearchType } from "src/app/shared/model/filterEvent";
import { Item } from "src/app/shared/model/Item";
import { MinMax } from "src/app/shared/model/minMax";

export class ItemHelper{
  alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) ).reverse();

  getItems(amount: number): Item[] {
    const items: Item[] = [];
    for (let i = 0; i < amount; i++) {
      items.push({
        title: "testing" + i,
        description: "testing desc" + i,
        email: "testing@testing.com" + i,
        image: "testing.png" + i,
        price: "" + ((0) * 11),
        isFavorite: false
      });
    }
    return items;
  }

  getMinMaxPrice(items: Item[]): MinMax{
    const prices: number[] = items.map((item: Item) => Number(item.price));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }

  getFavoriteItems(amount: number): Item[] {
    const items: Item[] = this.getItems(amount);
    items.forEach(item => item.isFavorite = true)
    return items;
  }

  getFilterEvent(): FilterEvent{
    return {
      filterTerm: "",
      type: SearchType.Generic
    }
  }
}
