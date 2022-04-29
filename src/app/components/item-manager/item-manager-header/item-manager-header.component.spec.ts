import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManagerHeaderComponent } from './item-manager-header.component';

describe('ItemManagerHeaderComponent', () => {
  let component: ItemManagerHeaderComponent;
  let fixture: ComponentFixture<ItemManagerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemManagerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManagerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
