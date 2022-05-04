import { FilterEvent, SearchType } from "src/app/shared/model/filterEvent";
import { Item } from "src/app/shared/model/Item";
import { ItemFilter } from "src/app/shared/model/itemFilter";
import { ItemsResponse } from "src/app/shared/model/itemsResponse";
import { MinMax } from "src/app/shared/model/minMax";

export class ItemHelper{
  private cyclingStrings = ["first", "second", "third", "repeat"];

  getDummyRequestItems(amount: number){
    const res: ItemsResponse = { items : []}
    res.items = [...Array(amount)].map((el, i)=>{
      return {
        title: "request test " + i,
        description: "request test description" + i,
        email: `request${i}@test.com`,
        image: `request_test${i}.png`,
        price: "" + (i * 10)
      }
    })
    return res;
  }

  getItems(amount: number): Item[] {
    const items: Item[] = [];
    for (let i = 0; i < amount; i++) {
      const cyclingIndex = i % this.cyclingStrings.length;
      items.push({
        title: "testing" + i,
        description: "testing desc" + (amount - i),
        email: this.cyclingStrings[cyclingIndex] + "@testing.com",
        image: "testing" + i + ".png",
        price: "" + ((i + 1) * 10),
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

  getGenericFilterEvent(term: string): FilterEvent{
    return {
      filterTerm: term,
      type: SearchType.Generic
    }
  }

  getAdvancedFilter(jsonVal: ItemFilter): FilterEvent{
    return {
      filterTerm: JSON.stringify(jsonVal),
      type: SearchType.Advanced
    }
  }

}
