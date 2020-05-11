import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFillGameHeaderComponent } from './text-fill-game-header.component';

describe('TextFillGameHeaderComponent', () => {
  let component: TextFillGameHeaderComponent;
  let fixture: ComponentFixture<TextFillGameHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFillGameHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFillGameHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
