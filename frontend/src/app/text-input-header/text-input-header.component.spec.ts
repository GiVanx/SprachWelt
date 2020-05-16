import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputHeaderComponent } from './text-input-header.component';

describe('TextInputHeaderComponent', () => {
  let component: TextInputHeaderComponent;
  let fixture: ComponentFixture<TextInputHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInputHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
