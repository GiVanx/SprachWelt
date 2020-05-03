import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFillGameComponent } from './text-fill-game.component';

describe('TextFillGameComponent', () => {
  let component: TextFillGameComponent;
  let fixture: ComponentFixture<TextFillGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFillGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFillGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
