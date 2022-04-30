import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearcherComponent } from './item-searcher.component';

describe('ItemSearcherComponent', () => {
  let component: ItemSearcherComponent;
  let fixture: ComponentFixture<ItemSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
