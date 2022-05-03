import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { ImageThumbnailComponent } from './image-thumbnail.component';

describe('ImageThumbnailComponent', () => {
  let component: ImageThumbnailComponent;
  let fixture: ComponentFixture<ImageThumbnailComponent>;
  let matDialogMock: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageThumbnailComponent ],
      providers: [
        {provide: MatDialog, useValue: matDialogMock},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
