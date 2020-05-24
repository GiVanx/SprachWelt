import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithGapsComponent } from './text-with-gaps.component';

describe('TextWithGapsComponent', () => {
  let component: TextWithGapsComponent;
  let fixture: ComponentFixture<TextWithGapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWithGapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithGapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
